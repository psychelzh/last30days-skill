import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_SANS } from "../lib/colors";

const LINES = [
  { text: "You pick the topic.", color: COLORS.fgPrimary },
  { text: "The agent picks the peers.", color: COLORS.accentCyan },
  { text: "The engine fans out.", color: COLORS.accentMagenta },
];

export const Scene5HowItWorks: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 60%, ${COLORS.bgPanelSoft} 0%, ${COLORS.bgDeep} 70%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
      }}
    >
      {LINES.map((line, idx) => {
        const start = 10 + idx * 28;
        const fade = interpolate(frame, [start, start + 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const slide = interpolate(frame, [start, start + 18], [24, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={line.text}
            style={{
              opacity: fade,
              transform: `translateY(${slide}px)`,
              fontFamily: FONT_SANS,
              fontSize: 78,
              fontWeight: 600,
              color: line.color,
              letterSpacing: -1,
            }}
          >
            {line.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
