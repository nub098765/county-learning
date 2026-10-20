ALTER TABLE public.completions
  ADD COLUMN IF NOT EXISTS game_run_id text;

CREATE OR REPLACE VIEW public.concentrated_effort_achievements AS
WITH game_points AS (
  SELECT
    c.user_id,
    c.game_run_id,
    sum(s.multiplier * w.weight) AS points
  FROM public.completions c
  JOIN public.state_multipliers s USING (state_key)
  JOIN public.mode_weights w USING (mode)
  WHERE c.game_run_id IS NOT NULL
  GROUP BY c.user_id, c.game_run_id
)
SELECT DISTINCT user_id
FROM game_points
WHERE points >= 1000;

GRANT SELECT ON public.concentrated_effort_achievements TO anon, authenticated;

COMMENT ON VIEW public.concentrated_effort_achievements IS
  'Users who earned at least 1000 county points from newly recorded completions in one game.';
