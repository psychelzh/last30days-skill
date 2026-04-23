import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BadgeBar } from "../components/BadgeBar";
import { COLORS, FONT_SANS } from "../lib/colors";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const captionOpacity = interpolate(frame, [20, 35, 75, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const captionLift = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15, stiffness: 70 },
    from: 16,
    to: 0,
  });

  const badgeFadeOut = interpolate(frame, [70, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, ${COLORS.bgPanelSoft} 0%, ${COLORS.bgDeep} 60%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 64,
      }}
    >
      <div style={{ opacity: badgeFadeOut }}>
        <BadgeBar />
      </div>
      <div
        style={{
          opacity: captionOpacity,
          transform: `translateY(${captionLift}px)`,
          fontFamily: FONT_SANS,
          fontSize: 96,
          fontWeight: 600,
          color: COLORS.fgPrimary,
          textAlign: "center",
          letterSpacing: -1.5,
          lineHeight: 1.1,
          maxWidth: 1400,
        }}
      >
        What if one search
        <br />
        ran <span style={{ color: COLORS.accentCyan }}>3 at once?</span>
      </div>
    </AbsoluteFill>
  );
};
