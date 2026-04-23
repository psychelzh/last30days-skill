import React from "react";
import { COLORS, FONT_MONO } from "../lib/colors";

type Props = {
  title?: string;
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
  glow?: boolean;
};

export const TerminalWindow: React.FC<Props> = ({
  title = "/last30days",
  width = "100%",
  height = "100%",
  children,
  glow = false,
}) => {
  return (
    <div
      style={{
        width,
        height,
        background: COLORS.bgPanel,
        borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
        boxShadow: glow
          ? `0 0 60px ${COLORS.accentCyan}33, 0 24px 60px rgba(0,0,0,0.6)`
          : "0 24px 60px rgba(0,0,0,0.6)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: FONT_MONO,
      }}
    >
      <div
        style={{
          height: 36,
          background: COLORS.bgPanelSoft,
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 8,
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: 12,
            background: COLORS.trafficRed,
          }}
        />
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: 12,
            background: COLORS.trafficYellow,
          }}
        />
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: 12,
            background: COLORS.trafficGreen,
          }}
        />
        <span
          style={{
            marginLeft: 16,
            color: COLORS.fgMuted,
            fontSize: 14,
            fontFamily: FONT_MONO,
            letterSpacing: 0.5,
          }}
        >
          {title}
        </span>
      </div>
      <div
        style={{
          flex: 1,
          padding: "20px 28px",
          color: COLORS.fgPrimary,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};
