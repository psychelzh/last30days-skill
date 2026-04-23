import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_MONO } from "../lib/colors";

type Props = {
  startFrame?: number;
  size?: "small" | "large";
};

export const BadgeBar: React.FC<Props> = ({ startFrame = 0, size = "large" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = Math.max(0, frame - startFrame);

  const scale = spring({
    frame: elapsed,
    fps,
    config: { damping: 12, stiffness: 90 },
    from: 0.85,
    to: 1,
  });
  const opacity = spring({
    frame: elapsed,
    fps,
    config: { damping: 20 },
    from: 0,
    to: 1,
  });

  const fontSize = size === "large" ? 56 : 28;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
        opacity,
        fontFamily: FONT_MONO,
        fontSize,
        color: COLORS.fgPrimary,
        letterSpacing: 0.5,
      }}
    >
      <span style={{ fontSize: fontSize * 1.1, marginRight: 16 }}>🌐</span>
      <span>last30days</span>
      <span
        style={{
          marginLeft: 14,
          color: COLORS.accentCyan,
          fontWeight: 600,
        }}
      >
        v3.1
      </span>
      <span
        style={{
          marginLeft: 16,
          color: COLORS.fgDim,
          fontSize: fontSize * 0.55,
        }}
      >
        · synced 2026-04-22
      </span>
    </div>
  );
};
