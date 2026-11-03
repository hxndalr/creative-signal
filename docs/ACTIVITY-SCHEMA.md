# Lesson activity schema

Every lesson ends with ONE hands-on activity. A lesson counts as complete only when its activity reaches
`passMark`. Attempts, scores and feedback are saved per student, and the student can retry as often as they like.

The app grades activities **locally and deterministically**: no AI service is involved. For open creative work, the
checks look for the *ingredients* the rubric asks for (specific details, a constraint, a reason that names the
audience, and so on). They do not check for one "right" answer, so different creative answers can pass.

Files: `content/activities-a.js` (levels 1-4) and `content/activities-b.js` (levels 5-7). Each is a classic script:

```js
window.LU = window.LU || {};
LU.activities = LU.activities || {};
LU.activities['L2-1'] = {
  type: 'build',                 // quick | order | choose | build | match | plan | spot
  skill: 'prompting',            // ONE id from LU.skills (see below)
  title: 'Build a product-shot prompt',
  task: 'One or two sentences: what to do.',
  expected: 'What a good result looks like.',
  minutes: 8,
  criteria: ['Assessment criterion shown BEFORE the attempt', '...'],   // 2-4 items
  passMark: 0.7,                 // 0..1, default 0.7
  // ...type-specific fields below
};
```

Skill ids: `direction, references, prompting, making, editing, music, soundscape, social, brand, critique, responsible`.

## Types

**quick**: a knowledge check (auto-graded).
```js
questions: [{ q: '...', options: ['a','b','c'], answer: 0, explain: 'why' }]   // 3 questions
```

**order**: put steps or shots in order (storyboard ordering, workflow, edit structure). Write `items` in the
CORRECT order; the app shuffles them. `why` explains each item's place and is shown when it is misplaced.
```js
items: [{ text: 'Hook: close-up of steam', why: 'Open on the most arresting image to stop the scroll.' }]  // 4-6 items
```

**choose**: pick an option, then justify it (concept selection, pacing choices, format choices). More than one option
may be `ok: true`, so different good answers are accepted. The reason is scored too: it must reach `reasonMin` words
and mention at least one word in `reasonKeywords` (lower-case stems; a match anywhere in a word counts).
```js
scenario: 'Situation text',
options: [{ text: '...', ok: true, feedback: 'why this works / does not' }],   // 3-4 options
reasonMin: 12,
reasonKeywords: ['audience', 'message', 'platform', 'brief', 'pace']
```
Score: a chosen `ok` option = 0.6, plus 0.4 if the reason passes.

**build**: fill labelled slots to build something (a prompt, a caption, a shot description).
**plan**: a structured plan (soundscape, brand-bible page, edit plan, delivery spec). Same fields as build:
```js
slots: [{ id: 'subject', label: 'Subject', hint: 'What exactly is in frame?', minWords: 2 }],
checks: [
  { field: 'light', kind: 'minWords', n: 3, label: 'Light is described', worked: 'Clear lighting direction.', improve: 'Say where the light comes from and how soft it is.' },
  { field: '*', kind: 'notContains', words: ['beautiful', 'amazing', 'nice', 'stunning'], label: 'Avoids vague praise words', worked: '...', improve: '...' },
  { field: 'constraints', kind: 'contains', words: ['no ', 'avoid', 'without'], label: 'States what to avoid', worked: '...', improve: '...' },
  { field: 'licence', kind: 'regex', pattern: '(cc|licen|royalty|original|commission)', label: '...', worked: '...', improve: '...' }
]
```
Every slot automatically counts as one check (filled to its `minWords`). `field: '*'` means all slots joined.
`contains` passes if ANY of the words appear; `notContains` passes if NONE appear (case-insensitive).
Use 3-6 checks. The score is the share of checks passed.

**match**: match items (terms to definitions, platforms to formats, sounds to layers). The app shuffles the right side.
```js
pairs: [{ left: 'Foley', right: 'Everyday sounds performed to picture' }]   // 4-6 pairs
```

**spot**: critique against a rubric. Show a piece of work in words; the student ticks the real problems. Include 2-3
plausible distractors (`real: false`). Score = (real ones ticked - wrong ones ticked) / real count.
```js
work: 'Description of the flawed piece (fictional).',
items: [{ text: 'The hook arrives after 6 seconds', real: true, explain: 'why it matters' }]   // 5-7 items
```

## Rules
- Activities must be doable inside the app, with no external tool. Never claim the app generated or evaluated media.
- Any invented client or piece of work is fictional; say "(fictional)" in the task or work text.
- Do not mention RS Hundal.
- Use plain language. Feedback (`worked`, `improve`, `feedback`, `why`, `explain`) must teach something specific.
