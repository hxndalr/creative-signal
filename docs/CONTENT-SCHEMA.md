# Content schema (how to edit the curriculum)

All learning content lives in plain JavaScript data files in `content/`. They are loaded with
ordinary `<script>` tags (no build step), so the app still works when you double-click `index.html`.

Each level file pushes one object onto `LU.levels`:

```js
window.LU = window.LU || {};
LU.levels = LU.levels || [];
LU.levels.push({
  id: 'L1',                 // L1..L7, unique
  num: 1,
  name: 'First Steps',
  tagline: 'One short line',
  summary: '2-3 sentences: what this level is for',
  outcomes: ['By the end you can ...'],          // 3-5 items
  skills: ['direction', 'responsible'],          // ids from LU.skills (see content/core.js)

  lessons: [{
    id: 'L1-1', title: '...', minutes: 15,
    blocks: [                                     // rendered in order
      { type: 'p', text: 'Paragraph. **bold** and *italic* are allowed.' },
      { type: 'terms', items: [{ term: 'Prompt', def: 'Plain-language definition' }] },
      { type: 'list', title: 'Optional heading', items: ['...'] },
      { type: 'steps', title: 'Optional heading', items: ['Step 1 ...', 'Step 2 ...'] },
      { type: 'callout', tone: 'tip' | 'warn' | 'tool', title: '...', text: '...' },
          // tone 'tool' = tool-specific instruction. The app labels it
          // "Tool-specific - check the current version". Keep principles out of these.
      { type: 'flow', title: '...', steps: ['Brief', 'Research', ...], highlight: [0, 1] },
      { type: 'prompt', title: '...', parts: [{ label: 'Subject', text: 'a ceramic mug' }] },
          // colour-coded prompt breakdown; labels from: Subject, Action, Setting, Style,
          // Light, Camera, Mood, Format, Constraints (others render in a neutral colour)
      { type: 'timeline', title: '...', duration: 30,
        tracks: [{ name: 'Video', clips: [{ label: 'Hook', start: 0, end: 3 }] }] },
          // seconds; used for edit plans and sound maps
      { type: 'compare', title: '...', left: { label: 'Before', text: '...' },
        right: { label: 'After', text: '...' } },
      { type: 'example', fictional: true, title: '...', text: '...' }
          // fictional:true shows a "Fictional teaching example" badge
    ]
  }],

  exercises: [{
    id: 'L1-E1',
    kind: 'prompt' | 'scenario' | 'critique' | 'reference' | 'task',
    title: '...', minutes: 20,
    task: 'What to do',
    output: 'What the student should end up with',
    hints: ['...'],
    rubric: [{ criterion: 'Clarity', developing: '...', solid: '...', strong: '...' }],
    required: true,                // counts toward level completion

    // kind: 'prompt'   -> starter: 'weak prompt to improve', checklist: ['Names a subject', ...]
    // kind: 'scenario' -> situation: '...', options: [{ text, correct: true|false, feedback }]
    // kind: 'critique' -> before: 'the flawed work, described in words',
    //                     modelNotes: ['what an expert would flag'], after: 'revised version'
    // kind: 'reference'-> focus: ['Colour', 'Light', 'Movement', 'Sound', ...] (fields to analyse)
    // kind: 'task'     -> fields: ['Label of a text box', ...]
  }],

  checkpoint: {
    criteria: ['Complete every lesson', 'Complete required exercises', 'Score 75%+ on the check'],
    passMark: 0.75,
    questions: [{ q: '...', options: ['a', 'b', 'c', 'd'], answer: 1, explain: 'Why' }]
  },

  instructor: {
    notes: 'Teaching notes for this level',
    activity: { title: '...', minutes: 30, steps: ['...'] },
    discussion: ['Group discussion prompt', '...']
  }
});
```

## Rules for content

- Plain, practical language. Define unfamiliar terms the first time they appear.
- Teach decisions ("why this, not that"), not button clicks.
- Keep principles tool-flexible. Put anything specific to one tool in a `tone: 'tool'` callout.
- Any invented example must be marked fictional (`example` block with `fictional: true`, or the
  word "Fictional" in the exercise text). Do not invent projects, habits, tools or achievements
  for RS Hundal.
