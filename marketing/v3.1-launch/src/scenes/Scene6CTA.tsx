import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BadgeBar } from "../components/BadgeBar";
import { COLORS, FONT_MONO, FONT_SANS } from "../lib/colors";

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const installFade = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Stronger 1Hz pulse on the install line for end-of-video emphasis
  const pulse = 0.8 + 0.2 * Math.sin((frame / fps) * 2 * Math.PI);
  const glowPulse = 0.4 + 0.4 * Math.sin((frame / fps) * 2 * Math.PI);

  const repoFade = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const enterScale = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 90 },
    from: 0.95,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 50%, ${COLORS.bgPanelSoft} 0%, ${COLORS.bgDeep} 70%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 56,
        transform: `scale(${enterScale})`,
      }}
    >
      <BadgeBar />
      <div
        style={{
          opacity: installFade * pulse,
          padding: "18px 36px",
          background: COLORS.bgPanel,
          border: `1px solid ${COLORS.accentCyan}`,
          borderRadius: 14,
          boxShadow: `0 0 ${40 + glowPulse * 60}px ${COLORS.accentCyan}${Math.round(40 + glowPulse * 80).toString(16)}`,
          fontFamily: FONT_MONO,
          fontSize: 44,
          color: COLORS.fgPrimary,
        }}
      >
        <span style={{ color: COLORS.accentGreen, marginRight: 18 }}>$</span>
        /last30days <span style={{ color: COLORS.fgMuted }}>{"{topic}"}</span>{" "}
        <span style={{ color: COLORS.accentCyan }}>--competitors</span>
      </div>
      <div
        style={{
          opacity: repoFade,
          fontFamily: FONT_SANS,
          fontSize: 28,
          color: COLORS.fgMuted,
        }}
      >
        github.com/mvanhorn/last30days-skill
      </div>
    </AbsoluteFill>
  );
};
