INSERT INTO public.mode_weights (mode, weight)
VALUES
  ('pin', 2),
  ('pin-hard', 3),
  ('mc', 1),
  ('type', 2),
  ('type-hard', 5),
  ('type-strict', 3)
ON CONFLICT (mode) DO UPDATE
SET weight = EXCLUDED.weight;

ALTER TABLE public.state_runs
  ADD COLUMN IF NOT EXISTS completed_at timestamptz NOT NULL DEFAULT now();

CREATE OR REPLACE VIEW public.leaderboard_with_badges AS
WITH county_mode_counts AS (
  SELECT
    user_id,
    state_key,
    mode,
    count(DISTINCT county_id)::numeric AS counties_found
  FROM public.completions
  GROUP BY user_id, state_key, mode
),
county_points AS (
  SELECT
    c.user_id,
    sum(least(c.counties_found, s.county_count) * s.multiplier * w.weight) AS points
  FROM county_mode_counts c
  JOIN public.state_multipliers s USING (state_key)
  JOIN public.mode_weights w USING (mode)
  GROUP BY c.user_id
),
badge_mode_counts AS (
  SELECT
    user_id,
    state_key,
    count(DISTINCT mode) FILTER (
      WHERE mode IN ('pin', 'pin-hard', 'mc', 'type', 'type-hard', 'type-strict')
    ) AS modes_mastered
  FROM public.state_runs
  GROUP BY user_id, state_key
),
badge_points AS (
  SELECT
    b.user_id,
    sum(
      s.county_count * s.multiplier * (
        CASE WHEN b.modes_mastered >= 1 THEN 2 ELSE 0 END +
        CASE WHEN b.modes_mastered >= 3 THEN 3 ELSE 0 END +
        CASE WHEN b.modes_mastered >= 6 THEN 5 ELSE 0 END
      )
    ) AS points
  FROM badge_mode_counts b
  JOIN public.state_multipliers s USING (state_key)
  GROUP BY b.user_id
),
tuc_completions AS (
  SELECT DISTINCT user_id
  FROM public.tuc_completions
)
SELECT
  p.id,
  p.username,
  (
    coalesce(c.points, 0) +
    coalesce(b.points, 0) +
    CASE WHEN t.user_id IS NOT NULL THEN 266260 ELSE 0 END
  )::bigint AS points,
  (t.user_id IS NOT NULL) AS has_tuc
FROM public.profiles p
LEFT JOIN county_points c ON c.user_id = p.id
LEFT JOIN badge_points b ON b.user_id = p.id
LEFT JOIN tuc_completions t ON t.user_id = p.id
WHERE p.username IS NOT NULL;

GRANT SELECT ON public.leaderboard_with_badges TO anon, authenticated;

COMMENT ON VIEW public.leaderboard_with_badges IS
  'Leaderboard scores: county points, cumulative Bronze/Silver/Gold perfect-run rewards, and 266260 points for the Ultimate Challenge.';
