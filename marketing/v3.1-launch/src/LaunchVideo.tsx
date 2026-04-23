import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SCENES } from "./lib/timing";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2OldWay } from "./scenes/Scene2OldWay";
import { Scene3FanOut } from "./scenes/Scene3FanOut";
import { Scene4Comparison } from "./scenes/Scene4Comparison";
import { Scene5HowItWorks } from "./scenes/Scene5HowItWorks";
import { Scene6CTA } from "./scenes/Scene6CTA";
import { COLORS } from "./lib/colors";

export const LaunchVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bgDeep }}>
      <Sequence from={SCENES.hook.from} durationInFrames={SCENES.hook.durationInFrames}>
        <Scene1Hook />
      </Sequence>
      <Sequence from={SCENES.oldWay.from} durationInFrames={SCENES.oldWay.durationInFrames}>
        <Scene2OldWay />
      </Sequence>
      <Sequence from={SCENES.fanOut.from} durationInFrames={SCENES.fanOut.durationInFrames}>
        <Scene3FanOut />
      </Sequence>
      <Sequence from={SCENES.comparison.from} durationInFrames={SCENES.comparison.durationInFrames}>
        <Scene4Comparison />
      </Sequence>
      <Sequence from={SCENES.howItWorks.from} durationInFrames={SCENES.howItWorks.durationInFrames}>
        <Scene5HowItWorks />
      </Sequence>
      <Sequence from={SCENES.cta.from} durationInFrames={SCENES.cta.durationInFrames}>
        <Scene6CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
