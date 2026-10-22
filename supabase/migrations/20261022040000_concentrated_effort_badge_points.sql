ALTER TABLE public.state_runs
  ADD COLUMN IF NOT EXISTS game_run_id text;

CREATE UNIQUE INDEX IF NOT EXISTS state_runs_game_run_unique
  ON public.state_runs (user_id, state_key, mode, game_run_id)
  WHERE game_run_id IS NOT NULL;

CREATE OR REPLACE VIEW public.concentrated_effort_achievements AS
WITH county_game_points AS (
  SELECT
    c.user_id,
    c.game_run_id,
    sum(s.multiplier * w.weight) AS points
  FROM public.completions AS c
  JOIN public.state_multipliers AS s USING (state_key)
  JOIN public.mode_weights AS w USING (mode)
  WHERE c.game_run_id IS NOT NULL
  GROUP BY c.user_id, c.game_run_id
),
first_mode_runs AS (
  SELECT user_id, state_key, mode, game_run_id, completed_at
  FROM (
    SELECT
      sr.user_id,
      sr.state_key,
      sr.mode,
      sr.game_run_id,
      sr.completed_at,
      row_number() OVER (
        PARTITION BY sr.user_id, sr.state_key, sr.mode
        ORDER BY sr.completed_at, sr.mode
      ) AS mode_run_number
    FROM public.state_runs AS sr
    WHERE sr.mode IN ('pin', 'pin-hard', 'mc', 'type', 'type-hard', 'type-strict')
  ) AS ranked
  WHERE mode_run_number = 1
),
badge_run_steps AS (
  SELECT
    f.*,
    count(*) OVER (
      PARTITION BY f.user_id, f.state_key
      ORDER BY f.completed_at, f.mode
      ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
    ) AS previous_modes
  FROM first_mode_runs AS f
),
badge_game_points AS (
  SELECT
    b.user_id,
    b.game_run_id,
    sum(
      s.county_count * s.multiplier * (
        CASE WHEN coalesce(b.previous_modes, 0) = 0 THEN 2 ELSE 0 END +
        CASE WHEN b.previous_modes = 2 THEN 3 ELSE 0 END +
        CASE WHEN b.previous_modes = 5 THEN 5 ELSE 0 END
      )
    ) AS points
  FROM badge_run_steps AS b
  JOIN public.state_multipliers AS s USING (state_key)
  WHERE b.game_run_id IS NOT NULL
  GROUP BY b.user_id, b.game_run_id
),
all_game_points AS (
  SELECT user_id, game_run_id, points FROM county_game_points
  UNION ALL
  SELECT user_id, game_run_id, points FROM badge_game_points
),
totals AS (
  SELECT user_id, game_run_id, sum(points) AS points
  FROM all_game_points
  GROUP BY user_id, game_run_id
)
SELECT DISTINCT user_id
FROM totals
WHERE points >= 1000;

GRANT SELECT ON public.concentrated_effort_achievements TO anon, authenticated;

COMMENT ON VIEW public.concentrated_effort_achievements IS
  'Users who earned at least 1000 newly earned county points and badge milestone points in one game; historic runs without game IDs contribute county points only.';
