---
title: "marketing: v3.1 launch video — 30s Remotion piece for X"
type: feat
status: active
date: 2026-04-22
---

# marketing: v3.1 launch video — 30s Remotion piece for X

## Overview

Build a 30-second Remotion-rendered MP4 marketing video announcing **v3.1: Competitors mode** for `/last30days`. Posts to X. Frames the new vs-mode-with-auto-discovery as the headline — three full passes, three save files, one comparison — without burying it in CLI minutiae.

Marketing release tag is **v3.1** (rebrands the 3.0.11-3.0.14 bundle into one shippable narrative for the launch tweet). Engine version stays 3.0.14 — `3.1` is the marketing version, not a code version bump.

## Script (60 frames per second × 30 seconds = 900 frames; this version assumes 30fps × 30s = 900 frames at 30fps)

Total runtime: 30.0 seconds @ 30fps = 900 frames. Six scenes, on-screen text only (silent autoplay-friendly).

### Scene 1 — Hook (0:00 – 0:03 | frames 0-90)

**Visual:** Black background. The `/last30days` badge animates in (the literal `🌐 last30days v3.1 · synced 2026-04-22` line) with the spring scale-in used in slick devtool intros.

**Caption (overlay, large):**
```
What if one search
ran 3 at once?
```

### Scene 2 — Set the world (0:03 – 0:08 | frames 90-240)

**Visual:** Single mac terminal window center-stage. Type-on animation:
```
$ /last30days OpenAI
```
Below it, a simple result card stub appears (Reddit upvote count + X likes), then static.

**Caption (small bottom-left):**
```
The old way: one topic.
```

### Scene 3 — The reveal (0:08 – 0:14 | frames 240-420)

**Visual:** The terminal types one more flag:
```
$ /last30days OpenAI --competitors
```
Hard cut → the single terminal **splits into 3 panes** side by side. Each pane shows a different topic header animating in, in this order:
- Left: `OpenAI`
- Middle: `vs Anthropic`
- Right: `vs xAI`

Pane content scrolls fake "search progress" lines (Reddit, X, YouTube indicators) in parallel, like a live fan-out.

**Caption (top center):**
```
Now it discovers competitors
and runs all 3.
```

### Scene 4 — Result reveal (0:14 – 0:21 | frames 420-630)

**Visual:** The 3 panes collapse into a single comparison surface — the `## Head-to-Head` table from the actual engine output, with rows fading in one by one (What it is, Streams, Best for, Trajectory). Each entity column lights up as its row populates.

**Caption (bottom):**
```
3 full passes. 3 save files.
1 comparison.
```

### Scene 5 — How it's special (0:21 – 0:26 | frames 630-780)

**Visual:** Cut to a clean text card, large mono font:
```
You pick the topic.
The agent picks the peers.
The engine fans out.
```
Each line fades in 1.5s apart.

### Scene 6 — CTA (0:26 – 0:30 | frames 780-900)

**Visual:** Black background. Centered:
- Top: `🌐 last30days v3.1`
- Middle: `/last30days {topic} --competitors`
- Bottom: `github.com/mvanhorn/last30days-skill`

Subtle pulse on the install line.

**End frame holds for ~0.5s.**

## Problem Frame

The 3.0.11-3.0.14 release bundle ships a transformative feature (per-entity vs-mode fanout + `--competitors` shortcut + per-entity save files), but the value lands flat in a tweet thread or screenshot. A 30s video does what static text cannot: shows the fan-out happening in real time and the 3 → 1 collapse into a comparison. Higher tweet engagement, easier to RT/QT.

## Requirements Trace

- R1. Final artifact: a single MP4 file, 1920×1080, 30fps, ~30 seconds (±0.5s), under 30MB, suitable for direct X upload.
- R2. Six-scene script as defined above, with text/visuals/timing matching to within 5 frames.
- R3. Branded look: matches the `🌐 last30days v3.1` badge style (terminal aesthetic, mono font, dark background).
- R4. Silent — no voiceover, no music in v1. Captions baked in. Designed for autoplay-muted feeds.
- R5. Reproducible: another contributor (or a future-me) can re-render with one command. Project lives in-repo so the source is versioned.

## Scope Boundaries

- No voiceover. Text-on-screen only. (Voice can be a v1.1 if engagement is high.)
- No background music in the rendered MP4. (Music can be added in post via QuickTime/iMovie if desired before posting.)
- No localization. English captions only.
- No A/B test variants. One video.
- No 9:16 vertical version. 16:9 only. (Vertical can be a separate render after launch validates the format.)

### Deferred to Separate Tasks

- Voiceover variant: defer to follow-up if v1 lands well.
- 9:16 mobile cut: defer; same source compositions can re-render at 1080×1920 in a follow-up.
- Animated GIF for embedding in README.md: defer; can be ffmpeg-extracted from the MP4.

## Context & Research

### Relevant Code and Patterns

- `SKILL.md` — the comparison render scaffold (`## Head-to-Head` table) is the visual reference for Scene 4's table look.
- `scripts/lib/render.py` `_render_comparison_scaffold` — emits the 9-axis table whose visual style we're recreating in a more polished form.
- `CHANGELOG.md` 3.0.11-3.0.14 entries — the prose source for the script's beats.
- `.claude-plugin/plugin.json` version 3.0.14 — current code version (marketing version is 3.1 for the launch).

### External References

- Remotion 4.x docs (https://www.remotion.dev/docs/) — current API for compositions, sequences, springs, and render CLI.
- X video specs 2026: max 2 min 20 s, ≤512MB, MP4 with H.264 + AAC, recommended 1920×1080 for landscape autoplay.

### Institutional Learnings

- No prior `marketing/` dir or video plans in `docs/plans/`. This is a greenfield asset directory.

## Key Technical Decisions

- **Remotion, not ffmpeg-only.** Remotion's React-based compositions handle the typed-on terminal effect, spring-animated badges, and scene transitions far more cleanly than raw ffmpeg filtergraphs. Render output is still MP4 via Remotion's bundled ffmpeg.
- **In-repo asset directory at `marketing/v3.1-launch/`.** Lives with the product so future versions can fork the project. Adds `marketing/` to `.gitignore` exceptions only for source files; rendered MP4 stays out of git (uploaded separately).
- **16:9 1920×1080 @ 30fps.** Best fit for X landscape autoplay on desktop and mobile feed. 30fps is plenty for typed-text + UI animation; 60fps doubles render time without obvious quality gain.
- **Silent + captions.** X autoplay defaults to muted. Sound-off is the realistic viewing condition. Captions baked into the visual.
- **Six scenes, one composition.** Single Remotion composition with sequenced child compositions per scene. Easier to re-time than scene-files. Frame-numbered timing in the script enables precise edits.
- **Mono font (JetBrains Mono or Geist Mono).** Matches the terminal aesthetic of the actual `/last30days` output. Available via Google Fonts or @remotion/google-fonts.
- **Marketing version 3.1 ≠ engine version 3.0.14.** `3.1` is the launch label. Engine stays 3.0.14. Avoids confusion in CHANGELOG.

## Open Questions

### Resolved During Planning

- **Aspect ratio?** 16:9 1080p. Best X autoplay format; vertical can be a follow-up.
- **Voiceover or silent?** Silent + on-screen captions. Autoplay-muted is the realistic condition.
- **In-repo or separate repo?** In-repo at `marketing/v3.1-launch/`. Rendered MP4 not committed; source compositions are.
- **Length?** Exactly 30s (900 frames @ 30fps). No flex.
- **Marketing version label?** `v3.1`. Engine code version stays 3.0.14.

### Deferred to Implementation

- Exact animation easing curves per scene — pick during build via Remotion preview iteration.
- Whether the comparison-table mock in Scene 4 uses canned text or pulls from the actual saved `*-raw.md` files. Probably canned for visual control.
- Whether Scene 3's "search progress" lines are typed individually or use a marquee scroll. Pick during preview.
- Exact accent color palette beyond "terminal dark." Iterate against preview.

## Output Structure

    marketing/
      v3.1-launch/
        package.json                  # Remotion dependency manifest
        tsconfig.json                 # TypeScript config
        remotion.config.ts            # Remotion render config (codec, fps, resolution)
        src/
          index.ts                    # Remotion entry — registers compositions
          Root.tsx                    # Root composition definition
          LaunchVideo.tsx             # Main 30s composition that sequences scenes
          scenes/
            Scene1Hook.tsx
            Scene2OldWay.tsx
            Scene3FanOut.tsx
            Scene4Comparison.tsx
            Scene5HowItWorks.tsx
            Scene6CTA.tsx
          components/
            TerminalWindow.tsx        # Reusable mac-style terminal frame
            TypedLine.tsx             # Type-on animation primitive
            ComparisonTable.tsx       # The Head-to-Head table mock
            BadgeBar.tsx              # The 🌐 last30days v3.1 badge
          lib/
            timing.ts                 # Frame ranges per scene (single source of truth)
            colors.ts                 # Brand palette
        public/                       # Static assets (logo, fonts if local)
        out/                          # Rendered MP4 lives here (gitignored)
        README.md                     # How to preview/render

## High-Level Technical Design

> *Directional guidance for review — not implementation specification.*

```
LaunchVideo (durationInFrames = 900)
├── <Sequence from={0} durationInFrames={90}>     <Scene1Hook />
├── <Sequence from={90} durationInFrames={150}>   <Scene2OldWay />
├── <Sequence from={240} durationInFrames={180}>  <Scene3FanOut />
├── <Sequence from={420} durationInFrames={210}>  <Scene4Comparison />
├── <Sequence from={630} durationInFrames={150}>  <Scene5HowItWorks />
└── <Sequence from={780} durationInFrames={120}>  <Scene6CTA />
```

Per-scene components use `useCurrentFrame()` + `interpolate()` + `spring()` for timing. `TerminalWindow` is the dominant motif across scenes 2-4.

## Implementation Units

- [ ] **Unit 1: Remotion project scaffold**

**Goal:** Spin up a working Remotion project at `marketing/v3.1-launch/` that previews a blank composition and renders to MP4.

**Requirements:** R1, R5

**Files:**
- Create: `marketing/v3.1-launch/package.json`
- Create: `marketing/v3.1-launch/tsconfig.json`
- Create: `marketing/v3.1-launch/remotion.config.ts`
- Create: `marketing/v3.1-launch/src/index.ts`
- Create: `marketing/v3.1-launch/src/Root.tsx`
- Create: `marketing/v3.1-launch/README.md`
- Modify: `.gitignore` (add `marketing/v3.1-launch/out/`, `marketing/v3.1-launch/node_modules/`)

**Approach:**
- Use `npx create-video@latest --blank` (Remotion 4.x scaffolding) targeting `marketing/v3.1-launch/`. Strip the demo composition.
- Configure: 1920×1080, 30fps, H.264, AAC (audio codec needed even for silent — empty track).
- README documents `npm install`, `npm run preview` (Remotion Studio), `npm run render` (one-command MP4).

**Test scenarios:**
- Test expectation: none for scaffold, but verification = `npm run preview` opens Remotion Studio with a blank 30s composition; `npm run render` produces a black MP4 at the right resolution.

**Verification:**
- Studio loads at localhost:3000 with the empty `LaunchVideo` composition listed.
- A render produces `out/launch-video.mp4` at 1920×1080, 30s, valid MP4.

- [ ] **Unit 2: Reusable components (Terminal, TypedLine, BadgeBar)**

**Goal:** Build the three primitive components scenes 2-6 will compose. Each is independently previewable.

**Requirements:** R3, R5

**Dependencies:** Unit 1

**Files:**
- Create: `marketing/v3.1-launch/src/components/TerminalWindow.tsx`
- Create: `marketing/v3.1-launch/src/components/TypedLine.tsx`
- Create: `marketing/v3.1-launch/src/components/BadgeBar.tsx`
- Create: `marketing/v3.1-launch/src/lib/colors.ts`
- Create: `marketing/v3.1-launch/src/lib/timing.ts`

**Approach:**
- `TerminalWindow`: mac-style traffic-light header, dark gradient background, mono content area. Accepts children.
- `TypedLine`: takes a string and a `startFrame`, renders character-by-character at ~30 chars/sec. Reuses Remotion's `interpolate(useCurrentFrame() - startFrame, [0, lengthFrames], [0, text.length])` clamped.
- `BadgeBar`: renders the literal `🌐 last30days v3.1 · synced 2026-04-22` line in mono with the same gradient color treatment as the engine's compact emit.
- `colors.ts`: 5-7 brand colors (terminal-bg, terminal-fg, accent-cyan, accent-magenta, muted, success-green, warning-amber).
- `timing.ts`: exports the scene frame ranges as named constants. Single source of truth for any retiming.

**Test scenarios:**
- Test expectation: none — visual components verified in Remotion Studio.

**Verification:**
- Each component renders standalone in Studio when wrapped in a temporary preview composition.
- TypedLine animates character-by-character without flicker.

- [ ] **Unit 3: Scenes 1-3 (Hook, Old way, Fan-out reveal)**

**Goal:** Build the first half of the video (frames 0-420). The narrative arc up through the visual fan-out.

**Requirements:** R2

**Dependencies:** Unit 2

**Files:**
- Create: `marketing/v3.1-launch/src/scenes/Scene1Hook.tsx`
- Create: `marketing/v3.1-launch/src/scenes/Scene2OldWay.tsx`
- Create: `marketing/v3.1-launch/src/scenes/Scene3FanOut.tsx`
- Modify: `marketing/v3.1-launch/src/Root.tsx` (register sequences)

**Approach:**
- Scene 1: spring-in BadgeBar, large overlay caption, 3-second hold.
- Scene 2: TerminalWindow with TypedLine (`$ /last30days OpenAI`), then a single result-card mock fading in.
- Scene 3: typing animation appends `--competitors`, hard cut, three TerminalWindow components arranged in a row with staggered fade-in. Each pane shows a different entity header + scrolling progress lines.

**Test scenarios:**
- Test expectation: none — verified visually in Studio.

**Verification:**
- Scrub the 0-14s range in Studio; visuals match the script timing within 5 frames.
- The fan-out moment (frame 240) lands cleanly; no jank in the transition from 1 → 3 panes.

- [ ] **Unit 4: Scenes 4-6 (Comparison reveal, How it works, CTA)**

**Goal:** Build the back half of the video (frames 420-900). Resolution + payoff + call to action.

**Requirements:** R2

**Dependencies:** Unit 2

**Files:**
- Create: `marketing/v3.1-launch/src/scenes/Scene4Comparison.tsx`
- Create: `marketing/v3.1-launch/src/scenes/Scene5HowItWorks.tsx`
- Create: `marketing/v3.1-launch/src/scenes/Scene6CTA.tsx`
- Create: `marketing/v3.1-launch/src/components/ComparisonTable.tsx`

**Approach:**
- Scene 4: ComparisonTable component renders 3-column markdown-style table; rows fade in one by one (stagger 15-20 frames). Uses canned data — OpenAI / Anthropic / xAI with believable cell content drawn from real 3.0.13 outputs.
- Scene 5: three-line text card; lines fade in 45 frames apart.
- Scene 6: three centered text blocks; install line gets a 1Hz subtle opacity pulse for emphasis.

**Test scenarios:**
- Test expectation: none — verified visually.

**Verification:**
- Scrub 14-30s; table reveal feels paced (not too slow, not strobed); CTA holds long enough to read (~3-4s).
- ComparisonTable cells are legible at 1920×1080 (mono font ≥ 28px).

- [ ] **Unit 5: Final composition wiring + render**

**Goal:** Wire the six scenes into the master `LaunchVideo` composition, render to MP4, verify against X upload constraints.

**Requirements:** R1, R2, R5

**Dependencies:** Units 3, 4

**Files:**
- Modify: `marketing/v3.1-launch/src/LaunchVideo.tsx` (sequence all 6 scenes)
- Modify: `marketing/v3.1-launch/README.md` (add render command + verification checklist)

**Approach:**
- `LaunchVideo` is a single Composition that imports `Scene1Hook` … `Scene6CTA` and wraps each in `<Sequence from=… durationInFrames=…>` matching `lib/timing.ts`.
- Run `npx remotion render LaunchVideo out/last30days-v3.1-launch.mp4 --codec=h264 --crf=18`.
- Verify output: 30.0s ±0.1s, 1920×1080, file size <30MB, opens in QuickTime, plays without dropped frames.

**Test scenarios:**
- Test expectation: none — verification is the rendered MP4 itself.

**Verification:**
- `ffprobe out/last30days-v3.1-launch.mp4` reports 1920×1080, 30fps, ~30.0s, h264, faststart-friendly.
- Manual play-through end-to-end in QuickTime feels coherent and on-pace.
- File <30MB so X upload is instant.

- [ ] **Unit 6: Polish pass + ship**

**Goal:** Watch the full render, fix obvious jank, do a second render, and stage for X posting.

**Requirements:** R1, R2, R3

**Dependencies:** Unit 5

**Files:**
- Possibly modify: any scene file based on watch-through findings.

**Approach:**
- Watch the rendered MP4 at full size. Note: timing felt off, transitions too fast, captions overflow, color clash, anything visibly broken.
- Iterate: edit scene component → re-preview in Studio → re-render full MP4.
- Cap at 2 polish passes; ship the better of the two renders.
- Final MP4 sits at `marketing/v3.1-launch/out/last30days-v3.1-launch.mp4` ready for X upload.

**Test scenarios:**
- Test expectation: none — pure subjective polish.

**Verification:**
- User watches the final render and approves.
- No glaring visual bugs (overflowing text, frozen frames, color clashes).

## System-Wide Impact

- **Interaction graph:** None — this is a standalone marketing artifact. Doesn't touch the Python engine, doesn't change any user-facing behavior.
- **State lifecycle risks:** None.
- **API surface parity:** N/A.
- **Unchanged invariants:** The shipped 3.0.14 engine is untouched.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Remotion install pulls 200MB+ of node_modules. | `marketing/v3.1-launch/node_modules/` in `.gitignore`; checked-in source stays small. |
| Render time blows past patience (>5 min for 30s @ 1080p30). | Bun-based render or `--concurrency` flag. Default Remotion is fast enough on M-series Macs. If slow, lower preview to 720p, render final at 1080p. |
| Captions overflow the 1920px width on certain fonts. | Use a known mono font with a measured per-character width; cap caption lines at 36 chars. |
| The "fan-out" visual in Scene 3 looks confusing instead of magical. | Polish pass (Unit 6) is the safety net; if still bad, fall back to a simpler "1 → 3 panes wipe" instead of typed split. |
| File size >30MB hits X upload friction. | Use `--crf=18` (high quality, reasonable size); fall back to `--crf=23` if over. 30s @ 1080p30 H.264 is normally 5-15MB. |

## Documentation / Operational Notes

- README at `marketing/v3.1-launch/README.md` documents preview / render commands.
- After render, the MP4 is uploaded directly to X. Tweet copy is the user's call (this plan stops at the rendered file).

## Sources & References

- Related code: `scripts/lib/render.py` (`_render_comparison_scaffold` is the visual model for Scene 4); `SKILL.md` Competitor mode section (the narrative source).
- Related PRs: #308, #311, #312 (the 3.0.11 → 3.0.14 release bundle this video markets as "v3.1").
- External docs: https://www.remotion.dev/docs/ (Remotion 4.x API).
- X video specs: https://help.x.com/en/using-x/twitter-videos.
