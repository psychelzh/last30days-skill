import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ComparisonTable } from "../components/ComparisonTable";
import { COLORS, FONT_SANS } from "../lib/colors";

const ROWS = [
  {
    dimension: "What it is",
    cells: [
      "GPT-5 leader, Plus + API",
      "Claude 4, safety-first",
      "Grok, X-native, fast",
    ] as [string, string, string],
  },
  {
    dimension: "30-day momentum",
    cells: [
      "GPT-5 launch wave",
      "Claude 4.7 1M context",
      "Grok 5 reveal",
    ] as [string, string, string],
  },
  {
    dimension: "Community vibe",
    cells: [
      "Defensive but deep",
      "Quiet, devs-only",
      "Loud, meme-rich",
    ] as [string, string, string],
  },
  {
    dimension: "Best for",
    cells: [
      "Mainstream + tools",
      "Long-context coding",
      "Live X intel",
    ] as [string, string, string],
  },
];

export const Scene4Comparison: React.FC = () => {
  const frame = useCurrentFrame();

  const captionFade = interpolate(frame, [0, 12, 180, 210], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const captionLift = interpolate(frame, [0, 14], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tableFade = interpolate(frame, [16, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDeep,
        padding: "48px 80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity: captionFade,
          transform: `translateY(${captionLift}px)`,
          fontFamily: FONT_SANS,
          fontSize: 38,
          color: COLORS.fgMuted,
          textAlign: "center",
          marginBottom: 36,
        }}
      >
        <span style={{ color: COLORS.accentCyan, fontWeight: 600 }}>
          3 full passes.
        </span>
        <span style={{ marginLeft: 18, color: COLORS.accentMagenta, fontWeight: 600 }}>
          3 save files.
        </span>
        <span style={{ marginLeft: 18, color: COLORS.fgPrimary, fontWeight: 600 }}>
          1 comparison.
        </span>
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: 1640,
          opacity: tableFade,
        }}
      >
        <ComparisonTable
          startFrame={20}
          entities={["OpenAI", "Anthropic", "xAI"]}
          rows={ROWS}
          rowStaggerFrames={22}
        />
      </div>
    </AbsoluteFill>
  );
};
