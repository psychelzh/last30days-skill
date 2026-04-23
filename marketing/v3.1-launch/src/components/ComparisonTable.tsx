import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_MONO } from "../lib/colors";

type Row = {
  dimension: string;
  cells: [string, string, string];
};

type Props = {
  startFrame: number;
  entities: [string, string, string];
  rows: Row[];
  rowStaggerFrames?: number;
};

export const ComparisonTable: React.FC<Props> = ({
  startFrame,
  entities,
  rows,
  rowStaggerFrames = 18,
}) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(
    frame - startFrame,
    [0, 12],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const colTemplate = "1.4fr 1fr 1fr 1fr";
  const cellPad = "16px 22px";

  return (
    <div
      style={{
        width: "100%",
        background: COLORS.bgPanel,
        borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
        overflow: "hidden",
        fontFamily: FONT_MONO,
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: colTemplate,
          background: COLORS.bgPanelSoft,
          borderBottom: `1px solid ${COLORS.border}`,
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            padding: cellPad,
            color: COLORS.fgMuted,
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          Dimension
        </div>
        {entities.map((entity, idx) => (
          <div
            key={entity}
            style={{
              padding: cellPad,
              color: idx === 0 ? COLORS.accentCyan : COLORS.fgPrimary,
              fontSize: 26,
              fontWeight: 600,
              borderLeft: `1px solid ${COLORS.border}`,
            }}
          >
            {entity}
          </div>
        ))}
      </div>
      {rows.map((row, idx) => {
        const rowStart = startFrame + 12 + idx * rowStaggerFrames;
        const rowOpacity = interpolate(
          frame - rowStart,
          [0, 14],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const rowSlide = interpolate(
          frame - rowStart,
          [0, 14],
          [12, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <div
            key={row.dimension}
            style={{
              display: "grid",
              gridTemplateColumns: colTemplate,
              borderBottom:
                idx === rows.length - 1 ? "none" : `1px solid ${COLORS.border}`,
              opacity: rowOpacity,
              transform: `translateY(${rowSlide}px)`,
            }}
          >
            <div
              style={{
                padding: cellPad,
                color: COLORS.fgMuted,
                fontSize: 22,
              }}
            >
              {row.dimension}
            </div>
            {row.cells.map((cell, cellIdx) => (
              <div
                key={cellIdx}
                style={{
                  padding: cellPad,
                  color: COLORS.fgPrimary,
                  fontSize: 22,
                  borderLeft: `1px solid ${COLORS.border}`,
                  lineHeight: 1.35,
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
