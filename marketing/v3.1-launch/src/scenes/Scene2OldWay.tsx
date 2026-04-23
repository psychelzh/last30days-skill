import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TerminalWindow } from "../components/TerminalWindow";
import { TypedLine } from "../components/TypedLine";
import { COLORS, FONT_MONO, FONT_SANS } from "../lib/colors";

export const Scene2OldWay: React.FC = () => {
  const frame = useCurrentFrame();

  const enter = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slide = interpolate(frame, [0, 20], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Result card fades in after type completes (~70 frames)
  const resultFade = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Caption appears late
  const captionFade = interpolate(frame, [110, 130, 150], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDeep,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 1400,
          height: 520,
          opacity: enter,
          transform: `translateY(${slide}px)`,
        }}
      >
        <TerminalWindow title="bash">
          <TypedLine
            text="/last30days OpenAI"
            startFrame={20}
            prefix="$"
            fontSize={42}
          />
          <div
            style={{
              opacity: resultFade,
              marginTop: 36,
              padding: "20px 24px",
              background: COLORS.bgPanelSoft,
              borderRadius: 12,
              border: `1px solid ${COLORS.border}`,
              fontFamily: FONT_MONO,
              fontSize: 26,
              color: COLORS.fgPrimary,
              lineHeight: 1.6,
            }}
          >
            <div style={{ color: COLORS.accentGreen }}>
              ✅ All agents reported back!
            </div>
            <div style={{ color: COLORS.fgMuted, marginTop: 6 }}>
              ├─ 🟠 Reddit: 14 threads
            </div>
            <div style={{ color: COLORS.fgMuted }}>
              ├─ 🔵 X: 22 posts
            </div>
            <div style={{ color: COLORS.fgMuted }}>
              └─ 🟡 HN: 1 story
            </div>
          </div>
        </TerminalWindow>
      </div>

      <div
        style={{
          opacity: captionFade,
          marginTop: 60,
          fontFamily: FONT_SANS,
          fontSize: 38,
          color: COLORS.fgMuted,
        }}
      >
        The old way: <span style={{ color: COLORS.fgPrimary }}>one topic.</span>
      </div>
    </AbsoluteFill>
  );
};
