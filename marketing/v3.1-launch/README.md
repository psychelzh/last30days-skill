# /last30days v3.1 Launch Video

30-second Remotion-rendered MP4 announcing **v3.1: Competitors mode** for posting on X.

## Quick start

```bash
cd marketing/v3.1-launch
npm install            # one-time, ~200MB of node_modules
npm run preview        # opens Remotion Studio at localhost:3000 to scrub frames
npm run render         # writes out/last30days-v3.1-launch.mp4 (high quality, CRF 18)
npm run render:fast    # writes a CRF 23 preview for fast iteration
```

## Specs

- 1920×1080, 30fps, 30 seconds (900 frames)
- H.264 / MP4
- Silent (autoplay-muted-friendly; captions baked in)
- Marketing label `v3.1` (engine code version stays 3.0.14)

## Scene timing (single source of truth: `src/lib/timing.ts`)

| Scene | Frames | Time | What |
|-------|--------|------|------|
| 1. Hook | 0-89 | 0.0-3.0s | Badge animates in + "What if one search ran 3 at once?" |
| 2. Old way | 90-239 | 3.0-8.0s | Single terminal: `/last30days OpenAI` |
| 3. Fan-out | 240-419 | 8.0-14.0s | `--competitors` types in → splits into 3 panes |
| 4. Comparison | 420-629 | 14.0-21.0s | 3 panes collapse into Head-to-Head table |
| 5. How | 630-779 | 21.0-26.0s | 3-line text card |
| 6. CTA | 780-899 | 26.0-30.0s | Install command + repo URL |

Edit `src/lib/timing.ts` to retime scenes; the `LaunchVideo` composition reads from there.

## Output

Rendered MP4 lives at `out/last30days-v3.1-launch.mp4` (gitignored). Upload directly to X.
