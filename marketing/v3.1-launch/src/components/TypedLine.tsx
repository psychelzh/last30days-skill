import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_MONO } from "../lib/colors";

type Props = {
  text: string;
  startFrame: number;
  charsPerSec?: number;
  fontSize?: number;
  color?: string;
  prefix?: string;
  prefixColor?: string;
  showCursor?: boolean;
  fps?: number;
};

export const TypedLine: React.FC<Props> = ({
  text,
  startFrame,
  charsPerSec = 28,
  fontSize = 32,
  color = COLORS.fgPrimary,
  prefix,
  prefixColor = COLORS.accentGreen,
  showCursor = true,
  fps = 30,
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const totalChars = text.length;
  const lengthFrames = Math.ceil((totalChars / charsPerSec) * fps);
  const visibleChars = Math.round(
    interpolate(elapsed, [0, lengthFrames], [0, totalChars], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const visible = text.slice(0, visibleChars);
  const done = visibleChars >= totalChars;
  const cursorOn = showCursor && Math.floor(frame / 15) % 2 === 0;

  return (
    <div
      style={{
        fontFamily: FONT_MONO,
        fontSize,
        color,
        whiteSpace: "pre",
        lineHeight: 1.4,
      }}
    >
      {prefix ? (
        <span style={{ color: prefixColor, marginRight: 12 }}>{prefix}</span>
      ) : null}
      <span>{visible}</span>
      {(!done || cursorOn) && (
        <span
          style={{
            display: "inline-block",
            width: fontSize * 0.55,
            height: fontSize * 0.95,
            background: color,
            verticalAlign: "text-bottom",
            marginLeft: 2,
            opacity: cursorOn ? 0.85 : 0,
          }}
        />
      )}
    </div>
  );
};
