# Working rules for this project

## How to work with me

Talk to me like a normal person. I'll describe what I want in plain English. Just do it.

If I say "make another page," make another page — files, structure, whatever it takes. If I say "make this button blue," just change the colour. Match your effort to what I'm actually asking for.

## Speed and focus

- Act fast. Don't over-think simple things.
- Make the smallest change that does what I asked. Don't refactor or "improve" stuff I didn't mention.
- Don't reason out loud through multiple approaches before acting. Pick the obvious one and go.
- No "actually wait, let me reconsider" mid-task. If you're genuinely unsure, stop and ask me one short question.

## Finding things

- If I name a section, class, file, or ID, go straight there. Don't run a bunch of greps first.
- If you genuinely can't find what I mean, ask me — don't search blindly.

## Output

- Keep responses short. After an edit, one line on what changed and where. That's it.
- Don't explain how CSS or HTML works unless I ask.
- Don't list alternatives I didn't ask for.

## When in doubt

- Smallest change that does the job.
- Ask, don't assume.
- Stop, don't ramble.

## The design token system

This site uses custom tokens with the `gs-` prefix:
- `gs-tagline` — tagline/eyebrow text
- `gs-heading` — h2 headings  
- `gs-body` — body paragraphs
- `gs-stat-label` — stat labels
- `btn-adaptive` — buttons (adapts light/dark)
- `section-dark` — add to a `<section>` to flip it to dark mode

Use these tokens for new sections. Don't hardcode colours.

## Tech stack

Static HTML, Tailwind CSS, vanilla JavaScript. No React, no frameworks, no build steps. Python files in the root are one-off scripts — ignore them unless I ask.

## Context efficiency

- Don't re-read files you've already read this session unless I say something changed.
- Don't re-explain previous edits. Assume I remember.
- Don't summarise what you're about to do before doing it. Just do it.