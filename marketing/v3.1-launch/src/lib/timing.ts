// Single source of truth for scene frame ranges.
// 30fps × 30s = 900 frames total.
export const FPS = 30;
export const TOTAL_FRAMES = 900;

export const SCENES = {
  hook: { from: 0, durationInFrames: 90 },
  oldWay: { from: 90, durationInFrames: 150 },
  fanOut: { from: 240, durationInFrames: 180 },
  comparison: { from: 420, durationInFrames: 210 },
  howItWorks: { from: 630, durationInFrames: 150 },
  cta: { from: 780, durationInFrames: 120 },
} as const;
