CREATE TABLE public.state_run_backfill_allowlist (
  user_id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  completed_at timestamptz
);

ALTER TABLE public.state_run_backfill_allowlist ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.state_run_backfill_allowlist FROM PUBLIC, anon, authenticated;

INSERT INTO public.state_run_backfill_allowlist (user_id)
SELECT id
FROM public.profiles
WHERE lower(username) IN (
  'mellohihellohi',
  'stalgoodman',
  'nub098765',
  'phil',
  'daydownerrr'
)
ON CONFLICT (user_id) DO NOTHING;

DO $$
DECLARE
  trusted_user_count integer;
BEGIN
  SELECT count(DISTINCT id)
  INTO trusted_user_count
  FROM public.profiles
  WHERE lower(username) IN (
    'mellohihellohi',
    'stalgoodman',
    'nub098765',
    'phil',
    'daydownerrr'
  );

  IF trusted_user_count <> 5 THEN
    RAISE EXCEPTION 'Expected all five trusted profiles for legacy run import; found %', trusted_user_count;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.can_import_legacy_state_runs()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.state_run_backfill_allowlist
    WHERE user_id = auth.uid()
      AND completed_at IS NULL
  );
$$;

REVOKE ALL ON FUNCTION public.can_import_legacy_state_runs() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_import_legacy_state_runs() TO authenticated;

CREATE OR REPLACE FUNCTION public.import_legacy_state_run_bests(p_runs jsonb)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  requesting_user_id uuid := auth.uid();
  backfill_completed_at timestamptz;
  imported_count integer;
BEGIN
  IF requesting_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication is required';
  END IF;

  SELECT completed_at
  INTO backfill_completed_at
  FROM public.state_run_backfill_allowlist
  WHERE user_id = requesting_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'This account is not eligible for legacy run import';
  END IF;

  IF backfill_completed_at IS NOT NULL THEN
    RETURN 0;
  END IF;

  IF jsonb_typeof(p_runs) IS DISTINCT FROM 'array' THEN
    RAISE EXCEPTION 'Invalid legacy run import payload';
  END IF;

  IF jsonb_array_length(p_runs) > 1000 THEN
    RAISE EXCEPTION 'Invalid legacy run import payload';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM jsonb_array_elements(p_runs) AS entry(value)
    WHERE jsonb_typeof(entry.value) IS DISTINCT FROM 'object'
  ) THEN
    RAISE EXCEPTION 'Invalid legacy run import payload';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM jsonb_to_recordset(p_runs) AS run(state_key text, mode text, time_ms numeric)
    WHERE run.state_key IS NULL
       OR run.mode IS NULL
       OR run.mode NOT IN ('pin', 'pin-hard', 'mc', 'type', 'type-hard', 'type-strict')
       OR run.time_ms IS NULL
       OR run.time_ms < 1
       OR run.time_ms > 2147483647
       OR run.time_ms <> trunc(run.time_ms)
       OR NOT EXISTS (
         SELECT 1
         FROM public.state_multipliers AS state
         WHERE state.state_key = run.state_key
       )
  ) THEN
    RAISE EXCEPTION 'Legacy run import contains an invalid state, mode, or time';
  END IF;

  WITH parsed_runs AS (
    SELECT state_key, mode, min(time_ms)::integer AS time_ms
    FROM jsonb_to_recordset(p_runs) AS run(state_key text, mode text, time_ms numeric)
    GROUP BY state_key, mode
  )
  INSERT INTO public.state_runs (user_id, state_key, mode, time_ms)
  SELECT requesting_user_id, run.state_key, run.mode, run.time_ms
  FROM parsed_runs AS run
  WHERE NOT EXISTS (
    SELECT 1
    FROM public.state_runs AS existing
    WHERE existing.user_id = requesting_user_id
      AND existing.state_key = run.state_key
      AND existing.mode = run.mode
      AND existing.time_ms <= run.time_ms
  );

  GET DIAGNOSTICS imported_count = ROW_COUNT;

  UPDATE public.state_run_backfill_allowlist
  SET completed_at = now()
  WHERE user_id = requesting_user_id;

  RETURN imported_count;
END;
$$;

REVOKE ALL ON FUNCTION public.import_legacy_state_run_bests(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.import_legacy_state_run_bests(jsonb) TO authenticated;
