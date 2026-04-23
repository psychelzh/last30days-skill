import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TerminalWindow } from "../components/TerminalWindow";
import { TypedLine } from "../components/TypedLine";
import { COLORS, FONT_MONO, FONT_SANS } from "../lib/colors";

const PROGRESS_LINES = [
  { source: "Reddit", color: "#ff6a3d" },
  { source: "X", color: "#36d6f7" },
  { source: "YouTube", color: "#ff5757" },
  { source: "TikTok", color: "#5fff9f" },
  { source: "Instagram", color: "#ff55a3" },
];

const ENTITIES: { label: string; tag: string; accent: string }[] = [
  { label: "OpenAI", tag: "$ /last30days OpenAI", accent: COLORS.accentCyan },
  { label: "Anthropic", tag: "$ /last30days Anthropic", accent: COLORS.accentMagenta },
  { label: "xAI", tag: "$ /last30days xAI", accent: COLORS.accentAmber },
];

const FanPane: React.FC<{
  label: string;
  tag: string;
  accent: string;
  panelStart: number;
}> = ({ label, tag, accent, panelStart }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - panelStart);

  const enter = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, stiffness: 80 },
    from: 0,
    to: 1,
  });
  const slide = interpolate(localFrame, [0, 20], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        opacity: enter,
        transform: `translateY(${slide}px)`,
        height: 480,
      }}
    >
      <TerminalWindow title={label} glow>
        <div
          style={{
            color: accent,
            fontSize: 18,
            fontFamily: FONT_MONO,
            marginBottom: 14,
          }}
        >
          {tag}
        </div>
        <div
          style={{
            fontSize: 22,
            color: COLORS.accentGreen,
            fontFamily: FONT_MONO,
            marginBottom: 12,
          }}
        >
          [Competitors] running...
        </div>
        {PROGRESS_LINES.map((line, idx) => {
          const lineStart = panelStart + 16 + idx * 6;
          const lineFade = interpolate(
            frame - lineStart,
            [0, 8],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          // pulse the in-progress dot
          const dotOn = Math.floor((frame - lineStart) / 6) % 2 === 0;
          return (
            <div
              key={line.source}
              style={{
                opacity: lineFade,
                fontFamily: FONT_MONO,
                fontSize: 20,
                color: COLORS.fgMuted,
                display: "flex",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  background: dotOn ? line.color : COLORS.bgPanelSoft,
                  marginRight: 12,
                  boxShadow: dotOn ? `0 0 10px ${line.color}` : "none",
                }}
              />
              <span style={{ color: line.color, marginRight: 8 }}>
                ►
              </span>
              <span>{line.source}</span>
              <span style={{ marginLeft: "auto", color: COLORS.fgDim }}>
                {dotOn ? "..." : "·"}
              </span>
            </div>
          );
        })}
      </TerminalWindow>
    </div>
  );
};

export const Scene3FanOut: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1 (0-30 frames): single terminal types --competitors flag
  // Phase 2 (30+): split into 3 panes
  const splitProgress = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const singleOpacity = interpolate(frame, [0, 8, 30, 45], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Caption fades in shortly after panes settle so it has time to read.
  const captionFade = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDeep,
        padding: 60,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          opacity: captionFade,
          textAlign: "center",
          fontFamily: FONT_SANS,
          fontSize: 42,
          color: COLORS.fgPrimary,
          marginBottom: 32,
        }}
      >
        Now it discovers competitors
        <br />
        <span style={{ color: COLORS.accentCyan }}>and runs all 3.</span>
      </div>

      <div
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        {/* Single terminal during phase 1, fades out as panes appear */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: singleOpacity,
          }}
        >
          <div style={{ width: 1200, height: 380 }}>
            <TerminalWindow title="bash">
              <TypedLine
                text="/last30days OpenAI --competitors"
                startFrame={0}
                prefix="$"
                fontSize={42}
              />
            </TerminalWindow>
          </div>
        </div>

        {/* Three panes fade in starting frame ~30 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            opacity: splitProgress,
          }}
        >
          {ENTITIES.map((entity, idx) => (
            <FanPane
              key={entity.label}
              label={entity.label}
              tag={entity.tag}
              accent={entity.accent}
              panelStart={45 + idx * 8}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
