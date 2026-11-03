window.LU = window.LU || {};
LU.activities = LU.activities || {};

/* ---------- LEVEL 1 ---------- */

LU.activities['L1-1'] = {
  type: 'quick',
  skill: 'direction',
  title: 'How generators work: quick check',
  task: 'Answer three short questions about how a generator turns words into media.',
  expected: 'You can explain that a generator builds something new from noise, that a vague prompt leaves decisions to the model, and what an artifact is.',
  minutes: 4,
  criteria: [
    'Knows a generator builds new media rather than searching for existing pictures',
    'Understands why vague prompts give inconsistent results',
    'Can name the key terms: seed, artifact, generation'
  ],
  passMark: 0.67,
  questions: [
    {
      q: 'A fictional tea brand types "tea tin on a table" and gets four very different images. What is the best explanation?',
      options: [
        'The tool is broken and should be reported',
        'The prompt left most decisions open, so the model filled each gap differently',
        'The tool searched the internet and found four unrelated photos'
      ],
      answer: 1,
      explain: 'A model fills every gap you leave. Short, vague prompts leave many gaps, so each attempt answers them differently. Specific words reduce that spread.'
    },
    {
      q: 'You run the same prompt twice with two different seeds. What should you expect?',
      options: [
        'Two different results, because the seed changes where the random process starts',
        'Two identical results, because the prompt is the same',
        'An error, because a prompt can only be used once'
      ],
      answer: 0,
      explain: 'The seed is the starting number for the random process. Same prompt plus a different seed gives a different generation, which is why you expect to make many attempts.'
    },
    {
      q: 'A generated poster shows a hand with six fingers and a headline of nonsense letters. What are these flaws called?',
      options: [
        'Seeds',
        'Artifacts',
        'Briefs'
      ],
      answer: 1,
      explain: 'An artifact is a visible flaw in generated media. Hands and lettering are two of the most common places they appear, so always check those first.'
    }
  ]
};

LU.activities['L1-2'] = {
  type: 'order',
  skill: 'direction',
  title: 'Put the production workflow in order',
  task: 'A fictional bike shop, Northline Bikes, needs a 15-second spring-sale clip. Put the production steps in the order a careful team would do them.',
  expected: 'Brief and research come before concept, the concept comes before any prompt, and selection comes before editing and delivery.',
  minutes: 5,
  criteria: [
    'Starts with the brief, not the tool',
    'Keeps concept before prompting',
    'Selects the best outputs before editing and delivery'
  ],
  passMark: 0.7,
  items: [
    { text: 'Write the brief: audience, product, tone, format, call to action', why: 'Everything later depends on the brief. Without it a team can make twenty beautiful clips that sell the wrong thing.' },
    { text: 'Research references for commuter-bike mood and city streets', why: 'Research gives the team words and examples for the look before any idea is fixed.' },
    { text: 'Write the concept in one sentence', why: 'The concept is decided before touching a tool, so prompts have something to express.' },
    { text: 'Write prompts and generate a batch of clips', why: 'Only now does the tool come out. Prompts turn the concept into instructions the model can follow.' },
    { text: 'Select the best takes and reject the rest on purpose', why: 'Selection happens before editing so you only polish clips that meet the brief.' },
    { text: 'Edit, add sound, and export in the right sizes', why: 'Editing, sound and delivery come last because they depend on which takes were chosen.' }
  ]
};

LU.activities['L1-3'] = {
  type: 'choose',
  skill: 'responsible',
  title: 'The customer photo dilemma',
  task: 'The fictional Studio Kettle cafe wants a "friendly barista" poster. Choose the best way forward, then explain your choice.',
  expected: 'You choose a route that does not use a real person without consent, and your reason names consent, permission or disclosure.',
  minutes: 6,
  criteria: [
    'Rejects using a real person\'s likeness without consent',
    'Picks an option that still delivers the poster',
    'Gives a reason that names consent, permission or honesty with the client'
  ],
  passMark: 0.7,
  scenario: 'An assistant has a snapshot of a regular customer at the counter. It would give a very realistic "friendly barista" likeness for an AI poster. The customer has not been asked. The poster goes up in the cafe window next week.',
  options: [
    {
      text: 'Upload the snapshot to get the likeness. It is only a poster.',
      ok: false,
      feedback: 'The customer never agreed to their face being used or altered. Size of the project does not remove the need for consent, and a recognisable face on a public poster is exactly where trouble starts.'
    },
    {
      text: 'Generate a non-specific character from a written description, and tell the cafe owner you did.',
      ok: true,
      feedback: 'This delivers the poster with no real person involved. Telling the owner keeps the client informed of the AI route, which is the disclosure habit.'
    },
    {
      text: 'Ask the customer for clear, written permission first, and only use the photo if they agree.',
      ok: true,
      feedback: 'Consent given before use makes this acceptable. Get it in writing, explain where the poster will appear, and be ready to use a different route if they say no.'
    },
    {
      text: 'Use the snapshot but change the hair and clothes so nobody notices.',
      ok: false,
      feedback: 'Altering a real face does not remove the permission problem, and the customer may still recognise themselves. Disguising the source is the opposite of the honesty this checklist asks for.'
    }
  ],
  reasonMin: 12,
  reasonKeywords: ['consent', 'permission', 'agree', 'likeness', 'disclos', 'honest', 'owner', 'client', 'real person', 'tell']
};

/* ---------- LEVEL 2 ---------- */

LU.activities['L2-1'] = {
  type: 'build',
  skill: 'prompting',
  title: 'Build a product-shot prompt',
  task: 'The fictional brand Juniper & Co. sells loose-leaf tea. Fill in each part to build one complete still-image prompt for a tin on a pale surface. Make specific choices, not vague ones.',
  expected: 'A prompt where subject, setting, light, camera view, mood, shape and an avoid-list are all decided with concrete words.',
  minutes: 8,
  criteria: [
    'Subject is described with concrete detail (colour, material, label)',
    'Light has a direction and a quality',
    'A format and at least one thing to avoid are stated'
  ],
  passMark: 0.7,
  slots: [
    { id: 'subject', label: 'Subject', hint: 'What exactly is in frame? Colour, material, label.', minWords: 4 },
    { id: 'setting', label: 'Setting and surface', hint: 'What is it sitting on, and what is around it?', minWords: 3 },
    { id: 'light', label: 'Light', hint: 'Where does the light come from, and is it soft or hard?', minWords: 4 },
    { id: 'camera', label: 'Camera view and composition', hint: 'Top-down? Eye level? Where does the subject sit in the frame?', minWords: 3 },
    { id: 'mood', label: 'Mood', hint: 'Two or three feeling words.', minWords: 2 },
    { id: 'format', label: 'Aspect ratio and avoid-list', hint: 'For example a ratio, and what must not appear.', minWords: 3 }
  ],
  checks: [
    { field: 'light', kind: 'regex', pattern: '(left|right|behind|above|window|side|back|front|top|overhead|low|morning|evening|dawn|dusk|sun|lamp)', label: 'Light has a direction or source', worked: 'The light has a clear origin, which makes the shadows predictable.', improve: 'Say where the light comes from (window on the left, from behind, overhead) and whether it is soft or hard.' },
    { field: 'format', kind: 'regex', pattern: '(\\d+\\s*[:x/]\\s*\\d+|square|vertical|wide|portrait|landscape)', label: 'A frame shape is stated', worked: 'Naming the ratio makes the composition fit the final use.', improve: 'Give the shape of the frame, such as 4:5, 1:1 or 16:9.' },
    { field: 'format', kind: 'contains', words: ['no ', 'avoid', 'without', 'not '], label: 'States something to avoid', worked: 'A short avoid-list heads off a known problem such as text or clutter.', improve: 'Add one thing you do not want, for example "no text" or "no extra objects".' },
    { field: '*', kind: 'notContains', words: ['beautiful', 'amazing', 'nice', 'stunning', 'awesome', 'great'], label: 'Avoids vague praise words', worked: 'Concrete words give the model real decisions to follow.', improve: 'Swap praise words like "nice" for something you can see, such as "matte", "pale linen" or "soft shadow".' },
    { field: 'subject', kind: 'regex', pattern: '(matte|glossy|brushed|green|cream|tin|paper|metal|label|steel|ceramic|wood|linen|[a-z]+ed )', label: 'Subject uses a material or colour word', worked: 'A material or colour makes the subject specific enough to repeat.', improve: 'Describe the tin with at least one colour or material, such as "matte green tin with cream label".' }
  ]
};

LU.activities['L2-2'] = {
  type: 'plan',
  skill: 'prompting',
  title: 'One idea, three media',
  task: 'The fictional Northline Bikes idea is "the first dry morning of spring". Write what each medium needs: a still, a five-second clip and a background sound.',
  expected: 'Three versions of the same idea, each using the vocabulary its medium needs: composition and light for the still, movement and camera for the clip, mood and pace for the sound.',
  minutes: 9,
  criteria: [
    'Still names a composition or light choice',
    'Clip says what moves and how the camera moves, keeping one simple action',
    'Sound describes mood, instruments or pace without any picture words'
  ],
  passMark: 0.7,
  slots: [
    { id: 'still', label: 'Still image prompt', hint: 'Subject, setting, light and composition for a poster.', minWords: 6 },
    { id: 'subject_action', label: 'Clip: the one action', hint: 'One subject doing one clear thing.', minWords: 4 },
    { id: 'camera_move', label: 'Clip: camera movement', hint: 'Dolly, pan, static, handheld? Which direction?', minWords: 3 },
    { id: 'sound', label: 'Sound description', hint: 'Mood, instruments, pace (slow, mid, fast) and feel.', minWords: 6 }
  ],
  checks: [
    { field: 'still', kind: 'regex', pattern: '(light|sun|shadow|dawn|morning|window|top-down|eye level|low angle|close-up|wide|centre|center|third|frame)', label: 'Still includes light or composition', worked: 'A still lives on composition and light, and you named at least one.', improve: 'Add a light or framing choice, such as "low morning sun" or "rider on the left third".' },
    { field: 'camera_move', kind: 'regex', pattern: '(dolly|pan|tilt|track|static|handheld|push|pull|follow|orbit|still|locked|zoom|slow)', label: 'Camera movement is named', worked: 'A named camera move tells the model how the shot travels in time.', improve: 'Name a move: dolly in, slow pan left, locked-off, or handheld follow.' },
    { field: 'subject_action', kind: 'regex', pattern: '(ride|rides|riding|pedal|walk|roll|turn|open|look|step|lift|move|wheel|push|pour)', label: 'The clip has one clear action verb', worked: 'One subject, one action is the pattern video models handle best.', improve: 'Use a single action verb such as "rides", "rolls" or "opens" instead of a crowd doing many things.' },
    { field: 'sound', kind: 'regex', pattern: '(bpm|slow|mid|fast|tempo|piano|guitar|strings|drums|synth|acoustic|ambient|bells|soft|warm|hopeful|calm|upbeat|loop|pulse)', label: 'Sound names mood, instruments or pace', worked: 'Sound has no picture, so mood, instruments and pace carry the whole description.', improve: 'Add an instrument, a pace (slow, 90 BPM) and a mood word.' },
    { field: 'sound', kind: 'notContains', words: ['camera', 'close-up', 'frame', 'shot of', 'zoom'], label: 'Sound prompt stays in sound words', worked: 'You kept camera language out of the sound brief.', improve: 'Remove picture words such as "camera" or "close-up"; describe how it should sound, not look.' }
  ]
};

LU.activities['L2-3'] = {
  type: 'spot',
  skill: 'prompting',
  title: 'Spot the testing mistakes',
  task: 'Read this prompt-testing session for the fictional Studio Kettle cafe. Tick every real problem with how the testing was done.',
  expected: 'You catch the changes made all at once, the missing baseline and log, and the overlong negative list, and you do not flag sound practice.',
  minutes: 7,
  criteria: [
    'Spots that more than one variable changed at a time',
    'Notices missing record-keeping',
    'Recognises problems with long negative lists'
  ],
  passMark: 0.7,
  work: 'Studio Kettle cafe (fictional) wants a calm hero image for "Quiet Mornings". Session notes: "Prompt 1: ceramic mug on oak table, window light, calm, 4:5. Result looked flat. Prompt 2: I changed the light to sunset, swapped the mug for a teapot, made the table marble, moved the camera to a low angle and switched to 16:9. It looks much better! Prompt 3: added: no text, no people, no hands, no logo, no clutter, no steam, no shadows, no reflections, no blur, no grain, no cups. Result was weird. I did not save the prompts. I will remember what worked."',
  items: [
    { text: 'Five things changed between Prompt 1 and Prompt 2', real: true, explain: 'Light, object, surface, angle and format all moved at once, so nobody can say which change made it better.' },
    { text: 'The negative list in Prompt 3 is very long and includes things the image needs, such as shadows', real: true, explain: 'Long "do not" lists can confuse a model. Use a short list for problems you have actually seen.' },
    { text: 'The prompts were not saved in a log', real: true, explain: 'Without a log, the good result cannot be repeated or explained to a teammate.' },
    { text: 'The tester judged Prompt 2 by feeling ("much better") with no stated goal', real: true, explain: 'A test needs a question, such as "does a lower angle feel more heroic?", so the comparison has a clear meaning.' },
    { text: 'Prompt 1 used the word "calm", which is a mood word', real: false, explain: 'Mood words are useful in a prompt. This is not a testing mistake.' },
    { text: 'The tester started with a simple baseline prompt', real: false, explain: 'Starting from a clear baseline is good practice; the mistake was what happened after it.' },
    { text: 'The first result looked flat, so the tester kept going', real: false, explain: 'Iterating after a weak first result is normal. The problem was how the iterations were run.' }
  ]
};

/* ---------- LEVEL 3 ---------- */

LU.activities['L3-1'] = {
  type: 'plan',
  skill: 'references',
  title: 'Analyse a reference',
  task: 'Imagine a still from an old fictional film: a single figure in a pale green room, long soft shadow across the floor, a kettle steaming on a low table, no music, only distant birds. Break it into observations, then turn them into prompt words.',
  expected: 'Plain, observable notes on colour, light, movement and sound, a takeaway principle, and a short prompt phrase built from them.',
  minutes: 8,
  criteria: [
    'Each quality is a plain observation, not "I like it"',
    'The takeaway is a reusable principle, not a copy of the scene',
    'The prompt words come from the observations'
  ],
  passMark: 0.7,
  slots: [
    { id: 'colour', label: 'Colour and palette', hint: 'Name two or three colours you see.', minWords: 3 },
    { id: 'light', label: 'Light', hint: 'Direction and softness.', minWords: 4 },
    { id: 'movement', label: 'Movement and pacing', hint: 'How fast does anything change?', minWords: 3 },
    { id: 'sound', label: 'Sound', hint: 'What would you hear, and what is missing?', minWords: 3 },
    { id: 'principle', label: 'Principle you can reuse', hint: 'One sentence: why does this feel the way it does?', minWords: 6 },
    { id: 'prompt', label: 'Prompt words for your own new work', hint: 'Use new subject and setting, not the same scene.', minWords: 6 }
  ],
  checks: [
    { field: '*', kind: 'notContains', words: ['i like it', 'looks cool', 'beautiful', 'amazing', 'nice', 'pretty', 'stunning'], label: 'Avoids "I like it" style judgments', worked: 'You described what is there instead of how you feel about it.', improve: 'Replace praise with something you can see or hear, such as "pale green wall" or "kettle hiss".' },
    { field: 'colour', kind: 'regex', pattern: '(green|cream|beige|grey|gray|white|pale|muted|warm|cool|blue|red|yellow|brown|tone)', label: 'Names actual colours', worked: 'Named colours turn a feeling into a palette you can reuse.', improve: 'Name the colours, such as "muted green and cream".' },
    { field: 'light', kind: 'regex', pattern: '(soft|side|window|shadow|long|low|diffus|warm|dim|from the|left|right|behind)', label: 'Light has direction or softness', worked: 'You described how the light behaves, not only that it exists.', improve: 'Say where it comes from and whether it is soft or hard.' },
    { field: 'principle', kind: 'regex', pattern: '(because|so |makes|feels|creates|when|by |less|stillness|quiet|space|slow)', label: 'Principle gives a reason', worked: 'A reason makes the idea portable to other projects.', improve: 'Explain why it works, for example "calm comes from stillness and quiet, not extra decoration".' },
    { field: 'prompt', kind: 'regex', pattern: '(light|soft|muted|pale|shadow|palette|calm|still|texture|tone|warm|cool|green|cream)', label: 'Prompt uses words from the analysis', worked: 'Your prompt carries the qualities you identified, not just a subject.', improve: 'Pull words from your notes (colours, light, mood) into the prompt.' }
  ]
};

LU.activities['L3-2'] = {
  type: 'build',
  skill: 'references',
  title: 'Draft a mood board brief',
  task: 'For the fictional bakery Hearth & Rye, whose brief is "honest, warm, unhurried", write the labelled parts of a mood board in words. Each item must show one named quality, and one must show what to avoid.',
  expected: 'Three feeling words, three labelled items that each show a single quality, one avoid item with a reason, and a borrowing statement that names a principle rather than a source.',
  minutes: 9,
  criteria: [
    'Each item is labelled with ONE quality (colour, light, texture, movement, sound)',
    'Includes an avoid item with a reason',
    'Borrows a principle in one sentence without naming a source to copy'
  ],
  passMark: 0.7,
  slots: [
    { id: 'feelings', label: 'Three feeling words', hint: 'From the brief or close to it.', minWords: 3 },
    { id: 'item1', label: 'Item 1: description and quality', hint: 'Describe the image or sound and name the quality it shows.', minWords: 5 },
    { id: 'item2', label: 'Item 2: description and quality', hint: 'A different quality from item 1.', minWords: 5 },
    { id: 'item3', label: 'Item 3: description and quality', hint: 'Another quality such as texture, sound or movement.', minWords: 5 },
    { id: 'avoid', label: 'Avoid item and why', hint: 'What the work must not look like, and the reason.', minWords: 5 },
    { id: 'principle', label: 'Principle you are borrowing', hint: 'One sentence about why it works. Do not name a living artist.', minWords: 6 }
  ],
  checks: [
    { field: 'item1', kind: 'regex', pattern: '(colour|color|light|texture|movement|composition|sound|palette|shadow|grain)', label: 'Item 1 names its quality', worked: 'Labelling the quality is what makes a board arguable and useful.', improve: 'End the item with the quality it shows, such as "shows warm low light".' },
    { field: 'item2', kind: 'regex', pattern: '(colour|color|light|texture|movement|composition|sound|palette|shadow|grain)', label: 'Item 2 names its quality', worked: 'Each item earns its place by showing something specific.', improve: 'Name the one quality this item shows.' },
    { field: 'item3', kind: 'regex', pattern: '(colour|color|light|texture|movement|composition|sound|palette|shadow|grain)', label: 'Item 3 names its quality', worked: 'Three labelled items give the team something concrete to react to.', improve: 'Name the one quality this item shows.' },
    { field: 'avoid', kind: 'regex', pattern: '(because|so |too |would|makes|feels|clash|cold|loud|aggressive|sterile|cheap|rushed)', label: 'Avoid item gives a reason', worked: 'A reason tells the team exactly what to steer away from.', improve: 'Say why it is wrong for this brand, for example "too sterile, it feels rushed".' },
    { field: 'principle', kind: 'notContains', words: ['in the style of', 'copy', 'exactly like', 'same as'], label: 'Borrows without copying', worked: 'You stated a principle, not an instruction to imitate.', improve: 'Rewrite as an idea, such as "soft side light makes food feel generous", with no "in the style of".' }
  ]
};

LU.activities['L3-3'] = {
  type: 'match',
  skill: 'music',
  title: 'Match the licensing terms',
  task: 'Match each music and sound term to the meaning that keeps a project safe.',
  expected: 'You can tell royalty-free from free, know what a sync licence covers, and know what attribution and public domain mean.',
  minutes: 5,
  criteria: [
    'Does not confuse royalty-free with free of rules',
    'Knows a sync licence is for pairing music with picture',
    'Understands attribution and public domain'
  ],
  passMark: 0.75,
  pairs: [
    { left: 'Royalty-free', right: 'Pay once or follow set terms instead of paying per use, but the licence still has rules' },
    { left: 'Sync licence', right: 'Permission to pair a piece of music with moving images' },
    { left: 'Attribution', right: 'Crediting the creator in the wording the licence requires' },
    { left: 'Public domain', right: 'Copyright has ended or been given up, but the recording and the composition must be checked separately' },
    { left: 'Licence text', right: 'The written document that says where, how long and for what purpose you may use a track' }
  ]
};

/* ---------- LEVEL 4 ---------- */

LU.activities['L4-1'] = {
  type: 'order',
  skill: 'making',
  title: 'Order a refinement round',
  task: 'The fictional Juniper & Co. team is improving a tea-tin image. Put one round of the make-and-refine loop in the right order.',
  expected: 'Write the criteria first, generate a batch, pick the closest, name what is right and wrong, change one thing, then stop when criteria are met.',
  minutes: 5,
  criteria: [
    'Writes selection criteria before looking at results',
    'Changes one thing at a time',
    'Stops on purpose when the criteria are met'
  ],
  passMark: 0.7,
  items: [
    { text: 'Write your selection criteria before looking at any results', why: 'Criteria written first stop you choosing by whichever image looks flashiest on the day.' },
    { text: 'Generate a small batch of four to eight from your best prompt', why: 'A small batch gives you information without burying you in options.' },
    { text: 'Pick the closest take and write one sentence on what is right and one on what is wrong', why: 'Naming right and wrong turns each output into information about what to change next.' },
    { text: 'Change only the one thing that fixes the biggest problem', why: 'One change per round means you can see what caused the improvement.' },
    { text: 'Generate again, then repeat for three or four rounds', why: 'Iteration only works when it is repeated with the kept parts held steady.' },
    { text: 'Stop, cull the rest, and choose the take that meets the criteria', why: 'Stopping on purpose avoids endless regenerating, and culling leaves only real candidates.' }
  ]
};

LU.activities['L4-2'] = {
  type: 'choose',
  skill: 'making',
  title: 'Choose the cheapest repair',
  task: 'A fictional courier sequence for Northline Bikes has a flaw in shot 3. Choose the repair route and explain why it fits the flaw.',
  expected: 'You match the repair to the flaw: regenerate when the error affects the whole frame, repair locally when it is small, and upscale only last.',
  minutes: 6,
  criteria: [
    'Matches the repair to the size of the flaw',
    'Does not upscale before fixing the real problem',
    'Reason mentions the flaw, the whole frame, or the character sheet'
  ],
  passMark: 0.7,
  scenario: 'The character sheet says: "courier, mid-twenties, red helmet, grey rain jacket, teal backpack". In shot 3 the rider has a blue helmet and the helmet colour appears in every frame of the shot. The rest of the shot is good. Shots 1, 2, 4 and 5 are correct.',
  options: [
    {
      text: 'Regenerate shot 3 with the character sheet pasted in again, changing only the action if needed.',
      ok: true,
      feedback: 'The wrong colour touches the whole frame, so regenerating with the fixed words is cheaper and cleaner than patching it. Keeping the same sheet restores consistency with the other shots.'
    },
    {
      text: 'Repair only the helmet area with an inpainting tool and keep the rest of the frame.',
      ok: true,
      feedback: 'This can work if the helmet is clearly in one area and the edges blend well. Check the repair at full size, since colour spill and edge halos are common. Regenerating is safer if it affects many frames.'
    },
    {
      text: 'Upscale shot 3, because a sharper image will look more professional.',
      ok: false,
      feedback: 'Upscaling adds resolution, not correctness. A blue helmet at higher resolution is still a blue helmet, and upscaling can lock in or add new flaws. Upscale last.'
    },
    {
      text: 'Rewrite the character sheet with a blue helmet so it matches shot 3, then regenerate the others.',
      ok: false,
      feedback: 'This throws away four good shots to fit one mistake. Fix the flaw where it is; the sheet was right.'
    }
  ],
  reasonMin: 12,
  reasonKeywords: ['whole', 'frame', 'colour', 'color', 'local', 'small', 'sheet', 'consisten', 'flaw', 'upscal', 'last', 'cheap']
};

LU.activities['L4-3'] = {
  type: 'plan',
  skill: 'social',
  title: 'Adapt one line for three formats',
  task: 'The fictional Studio Kettle cafe has one campaign line: "Your first quiet minute, poured." Adapt it into a 9:16 story, a 1:1 feed post and a 4:5 feed post. Say what changes for each shape and where key content stays safe.',
  expected: 'Three adaptations that are not just crops: each rewrites or repositions something (hook, headline, subject placement), and each names a safe-zone consideration.',
  minutes: 10,
  criteria: [
    'Each version states a specific change for its shape, not only "crop it"',
    'Safe-zone thinking is mentioned for the vertical version',
    'Captions or key text are placed so they do not hide the subject'
  ],
  passMark: 0.7,
  slots: [
    { id: 'v916', label: '9:16 story: layout, hook and text', hint: 'What is in the first seconds? Where does the text sit?', minWords: 6 },
    { id: 'safe916', label: '9:16 safe-zone note', hint: 'What stays away from the top and bottom edges?', minWords: 5 },
    { id: 'v11', label: '1:1 square post: layout and text', hint: 'Where does the subject sit? Where does the line go?', minWords: 5 },
    { id: 'v45', label: '4:5 feed post: layout and text', hint: 'How do you use the extra height?', minWords: 5 },
    { id: 'naming', label: 'Export naming', hint: 'One example file name that shows platform and size.', minWords: 1 }
  ],
  checks: [
    { field: 'v916', kind: 'regex', pattern: '(hook|first|opens|opening|second|caption|text|headline|rewrit|reword)', label: '9:16 version has a hook or text decision', worked: 'You designed the first moment for the platform instead of only cropping.', improve: 'Say what the viewer sees and reads in the first seconds, such as a rewritten hook line.' },
    { field: 'safe916', kind: 'regex', pattern: '(top|bottom|edge|button|interface|ui|caption|face|centre|center|middle|inside|clear|cover)', label: 'Safe zone names where content stays clear', worked: 'You named which parts of the frame platform buttons and captions can cover.', improve: 'Say what you keep out of the top and bottom edges and what stays in the middle.' },
    { field: 'v11', kind: 'regex', pattern: '(centre|center|left|right|top|bottom|middle|corner|subject|headline|line|space)', label: 'Square version places subject or text', worked: 'You made a placement choice for the square frame.', improve: 'Say where the subject sits and where the headline goes.' },
    { field: 'v45', kind: 'regex', pattern: '(height|taller|extra|above|below|headline|space|room|top|bottom|stack|crop)', label: '4:5 version uses the extra height', worked: 'You used the taller frame on purpose.', improve: 'Describe what goes in the extra space, such as a headline above the subject.' },
    { field: '*', kind: 'notContains', words: ['just crop', 'simply crop', 'only crop', 'same everywhere', 'same for all'], label: 'Avoids "just crop it"', worked: 'You adapted each version rather than cropping one master.', improve: 'Describe a real change per format, such as a new hook, a different layout or moved text.' }
  ]
};
