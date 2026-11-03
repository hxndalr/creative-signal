window.LU = window.LU || {};
LU.activities = LU.activities || {};

/* ---------- LEVEL 5 ---------- */

LU.activities['L5-1'] = {
  type: 'order',
  skill: 'editing',
  title: 'Build the paper edit',
  task: 'These are the shots of a fictional 30 second tea spot, Juniper & Co. (fictional). Put them in paper-edit order, from the first shot on screen to the last.',
  expected: 'A shape with an arresting hook, a build, proof and detail in the middle, and a clear closer with the brand.',
  minutes: 8,
  criteria: [
    'The most arresting image opens the piece',
    'Shots build from detail to proof before the closer',
    'The brand and end card come last'
  ],
  passMark: 0.7,
  items: [
    { text: 'Hook (0-3s): close-up of steam rising from a cup', why: 'Open on the most arresting image to stop the scroll. The hook has to earn the next second before anything is explained.' },
    { text: 'Build (3-8s): the pour, in close-up', why: 'After the hook, show the action that explains what the viewer is looking at. This gives the hook a context.' },
    { text: 'Detail (8-16s): hands, tin and shelf, slower and wider', why: 'A longer, calmer run of shots changes the rhythm. Contrast between short and long shots stops the edit feeling flat.' },
    { text: 'Proof (16-24s): window light and the first sip', why: 'The sip is the payoff that proves the promise. It comes after the viewer has been given a reason to care.' },
    { text: 'Closer (24-28s): pack shot on the shelf', why: 'The product shot is the closer. It stays on screen long enough to be remembered, after the emotion has landed.' },
    { text: 'End card (28-30s): logo and tagline', why: 'The brand lands last, when attention is highest. Putting a logo first would delay the hook.' }
  ]
};

LU.activities['L5-2'] = {
  type: 'match',
  skill: 'music',
  title: 'Licence types and what they allow',
  task: 'Match each type of audio source to what it usually means for a client project. These are common patterns only: the real permission is always whatever the written licence for that track says.',
  expected: 'You can say, for each source, what to check before you use it, and you never treat "free" or "easy to get" as permission.',
  minutes: 7,
  criteria: [
    'Royalty-free is understood as a payment model, not as no rules',
    'Non-commercial or personal licences are not used for client work',
    'Every source has a saved licence and a cue sheet line'
  ],
  passMark: 0.7,
  pairs: [
    { left: 'Royalty-free stock track', right: 'Usually a one-off or no per-use fee, but the licence still limits where, how long and what type of project: check the actual licence' },
    { left: 'Track marked "personal use only" or "non-commercial"', right: 'Not for a client project or paid ad; replace it or buy a commercial licence, and check the actual licence wording' },
    { left: 'Music recorded or commissioned by your own team', right: 'You can document who made it, with a signed agreement or release saved to the project folder' },
    { left: 'A song ripped from a video or streaming platform', right: 'Not licensed for your use at all: a claim or takedown is likely, so do not use it' },
    { left: 'AI-generated audio from a service', right: 'Terms and ownership rules differ by service and change over time, so read the current terms and save a copy for every project' }
  ]
};

LU.activities['L5-3'] = {
  type: 'plan',
  skill: 'soundscape',
  title: 'Plan a layered soundscape',
  task: 'Plan the sound for a fictional 15 second vertical ad for Studio Kettle cafe (fictional): a barista pours a flat white, a customer smiles, the logo appears with a short voice-over line. For each field, say what you would use and when it enters.',
  expected: 'Each layer has a job and a timing, the voice is clearly the priority layer, and every sound has a documented source.',
  minutes: 10,
  criteria: [
    'Each layer has a specific sound and a timing',
    'The mix notes say how the music gives way to the voice',
    'Every layer has a source or licence note'
  ],
  passMark: 0.7,
  slots: [
    { id: 'ambience', label: 'Ambience', hint: 'The room or place under everything. What is it and how long does it run?', minWords: 3 },
    { id: 'foley', label: 'Foley / SFX', hint: 'One or two sounds tied to the action, with the second they land.', minWords: 4 },
    { id: 'music', label: 'Music', hint: 'Mood, instrument or tempo, and where it enters and ends.', minWords: 4 },
    { id: 'vo', label: 'Dialogue / VO', hint: 'The line (or the idea) and where it sits in the 15 seconds.', minWords: 3 },
    { id: 'mix', label: 'Mix notes', hint: 'What gets lowered under what? Which check will you do on the final?', minWords: 5 },
    { id: 'licence', label: 'Licence / source', hint: 'Where each sound comes from and where the licence or release is stored.', minWords: 4 }
  ],
  checks: [
    {
      field: 'mix', kind: 'regex', pattern: '(duck|lower|dip|drop|quieter|under the (voice|vo|line)|priority|sit under|reduce)',
      label: 'A ducking or priority note is present',
      worked: 'You said how the music or ambience gives way to the voice, which is what keeps speech clear.',
      improve: 'Say what is lowered while the voice speaks, for example "music ducks a few dB under the VO, then lifts back for the end card".'
    },
    {
      field: 'licence', kind: 'regex', pattern: '(licen|source|royalty|stock|library|recorded|original|release|commission|cue sheet|permission)',
      label: 'A source or licence note is present',
      worked: 'You named where the audio comes from, so you could answer "where did this sound come from?" in a minute.',
      improve: 'Name the source for each layer (stock library, recorded by the team, commissioned) and where the licence file is saved.'
    },
    {
      field: '*', kind: 'regex', pattern: '(lufs|-14|loudness|peak|phone|speaker|headphone|meter)',
      label: 'A loudness or listening check is named',
      worked: 'You planned a check against a loudness target or a phone-speaker test instead of trusting your ears alone.',
      improve: 'Add a check, such as a loudness target to verify against the platform spec, or a listen on a phone speaker.'
    },
    {
      field: '*', kind: 'notContains', words: ['nice sound', 'good music', 'cool sound', 'something nice'],
      label: 'Layers are described specifically',
      worked: 'You named actual sounds rather than vague approval.',
      improve: 'Replace vague words with the sound itself, for example "soft piano bed" or "milk steam hiss".'
    }
  ]
};

/* ---------- LEVEL 6 ---------- */

LU.activities['L6-1'] = {
  type: 'plan',
  skill: 'brand',
  title: 'Write testable visual rules',
  task: 'Write the visual section of a brand bible for Northline Bikes (fictional), a commuter bike brand about unrushed freedom. Make each rule specific enough that two strangers could check it the same way.',
  expected: 'Rules that name colours, proportions, light, positions or limits, plus a clear never-do and a reason.',
  minutes: 12,
  criteria: [
    'Colour rule names actual colours and a proportion or role',
    'Image style and composition are checkable, not mood words',
    'There is a never-do rule and a reason behind the rules'
  ],
  passMark: 0.7,
  slots: [
    { id: 'colour', label: 'Colour', hint: 'Named colours, their roles, and how much of the frame each gets.', minWords: 6 },
    { id: 'type', label: 'Type', hint: 'Headline and body style, case, and a minimum size for small screens.', minWords: 5 },
    { id: 'image', label: 'Image style', hint: 'Light direction, softness, lens feel, grade, texture.', minWords: 6 },
    { id: 'composition', label: 'Composition', hint: 'Where the subject sits and how much empty space there is.', minWords: 5 },
    { id: 'never', label: 'Never-do rule', hint: 'One or two things the brand must never show or do.', minWords: 3 },
    { id: 'reason', label: 'Reason', hint: 'Why do these rules fit the brand? One or two sentences.', minWords: 5 }
  ],
  checks: [
    {
      field: 'colour', kind: 'regex', pattern: '(\\d|percent|%|third|half|quarter|primary|accent|background|text|never|only|under|over|less|more)',
      label: 'Colour has a role or a proportion',
      worked: 'You gave colours a role or an amount, so someone can measure whether a frame passes.',
      improve: 'Add a role or proportion, such as "accent green under 10 percent of the frame" or "background is warm grey".'
    },
    {
      field: 'composition', kind: 'regex', pattern: '(\\d|third|half|left|right|centre|center|top|bottom|corner|space|margin|empty|angle|level|eye)',
      label: 'Composition names a position or amount of space',
      worked: 'You said where things sit or how much room they get, which is checkable.',
      improve: 'Name a position or amount, for example "rider on the right third, left half left empty for text".'
    },
    {
      field: '*', kind: 'notContains', words: ['beautiful', 'amazing', 'nice', 'stunning', 'premium', 'clean look', 'modern'],
      label: 'Avoids vague praise words',
      worked: 'You used rules, not adjectives that nobody can test.',
      improve: 'Swap mood words like "premium" or "modern" for something a stranger could check yes or no.'
    },
    {
      field: 'never', kind: 'contains', words: ['no ', 'never', 'avoid', 'without', 'not ', "don't", 'ban'],
      label: 'A never-do is stated as a limit',
      worked: 'A clear "never" lets a new team member say no without asking you.',
      improve: 'Phrase it as a limit: "never pure black", "no text over the horizon", "avoid more than one hero object".'
    },
    {
      field: 'reason', kind: 'regex', pattern: '(because|so |since|to keep|to make|to help|which|that is why|fits|supports)',
      label: 'A reason is given',
      worked: 'A reason lets someone apply the rules to a case the bible did not predict.',
      improve: 'Connect the rules to the brand with a because, for example "because the brand sells unrushed freedom, nothing should look hurried".'
    }
  ]
};

LU.activities['L6-2'] = {
  type: 'build',
  skill: 'brand',
  title: 'Build a reusable prompt template',
  task: 'Build a reusable prompt template for Studio Kettle cafe (fictional): bright mornings, wood and ceramic, a mustard-yellow accent. Fill the locked parts that carry the brand, the variable slots that change per job, and a clause for what to avoid. Put square or curly brackets around anything a team member should replace.',
  expected: 'Locked parts that never change, a small number of marked variable slots, and an avoid clause, so five people could produce one look.',
  minutes: 12,
  criteria: [
    'The locked style phrase carries the look, not just a mood',
    'Variable slots are clearly marked so nobody edits the wrong part',
    'An avoid clause states what must never appear'
  ],
  passMark: 0.7,
  slots: [
    { id: 'style', label: 'LOCKED: style phrase', hint: 'The brand look, with materials and palette. Copied unchanged every time.', minWords: 6 },
    { id: 'light', label: 'LOCKED: light and composition', hint: 'Light direction and softness, subject position, empty space.', minWords: 6 },
    { id: 'avoid', label: 'LOCKED: avoid clause', hint: 'What must never appear. Start with no, never, avoid or without.', minWords: 4 },
    { id: 'subject', label: 'VARIABLE: subject', hint: 'Mark it, for example [subject: a flat white in a ceramic cup].', minWords: 2 },
    { id: 'action', label: 'VARIABLE: action or setting', hint: 'Mark it, for example [action / setting].', minWords: 2 }
  ],
  checks: [
    {
      field: 'style', kind: 'regex', pattern: '(wood|ceramic|mustard|yellow|linen|warm|bright|morning|palette|texture|editorial|still life|matte)',
      label: 'The locked style phrase names real brand ingredients',
      worked: 'Your locked phrase carries materials or palette, so it keeps the look the same from job to job.',
      improve: 'Name the actual ingredients, such as "wood and ceramic textures, warm palette with a mustard-yellow accent".'
    },
    {
      field: '*', kind: 'regex', pattern: '(\\[|\\]|\\{|\\}|<|>|variable|slot|replace|fill in|swap)',
      label: 'Variable slots are clearly marked',
      worked: 'Brackets or labels show which parts change, so the locked parts are safe from accidental edits.',
      improve: 'Wrap the changing parts in brackets, like [subject], or label them VARIABLE.'
    },
    {
      field: 'avoid', kind: 'contains', words: ['no ', 'never', 'avoid', 'without', 'not ', "don't", 'exclude'],
      label: 'An avoid or negative clause is present',
      worked: 'The avoid clause tells every team member what must never show up.',
      improve: 'Start the clause with a limit such as "no text in image, avoid clutter, never harsh shadows".'
    },
    {
      field: 'light', kind: 'regex', pattern: '(left|right|above|behind|window|soft|diffuse|shadow|third|space|lower|upper|centre|center|angle)',
      label: 'Light or placement is specific',
      worked: 'You gave a direction or position, which two people can check the same way.',
      improve: 'Say where the light comes from and where the subject sits, for example "soft window light from the left, subject on the lower third".'
    },
    {
      field: '*', kind: 'notContains', words: ['nice picture', 'on brand', 'looks good', 'beautiful', 'amazing'],
      label: 'Avoids vague words in place of rules',
      worked: 'The template uses rules in place of approval words.',
      improve: 'Replace "on brand" or "looks good" with the specific things that make it on brand.'
    }
  ]
};

LU.activities['L6-3'] = {
  type: 'spot',
  skill: 'brand',
  title: 'Find the consistency problems',
  task: 'Check this set of deliverables (fictional) against the brand bible and tick every real consistency or versioning problem. Not everything listed is a fault.',
  expected: 'You tick the items that break a written rule or a version process, and you leave alone the items that follow the bible.',
  minutes: 8,
  criteria: [
    'You compare each output with the written rule, not with taste',
    'You spot drift, undocumented changes and tool differences',
    'You do not flag outputs that follow the rules'
  ],
  passMark: 0.7,
  work: 'Juniper & Co. tea (fictional) brand bible v1.2 says: warm off-white backgrounds, deep green accent under 10 percent of the frame, never pure black (use charcoal), soft window light from camera left, one hero object per frame, subject on the lower third. This week the team delivers: (1) a website banner with a deep green background filling most of the frame; (2) a product still in soft window light from the left, charcoal text, a teapot on the lower third; (3) a reel frame made in the clip tool that looks bluish and cool; (4) a social post with a neon pink accent a designer added "because it looked fun", with no note to the owner; (5) a still with a teapot, a cup and a tin all in focus; (6) a poster file named "final_FINAL2.png" with no bible version noted; (7) a lifestyle still with a warm off-white background, a single cup, and a small green accent.',
  items: [
    { text: 'The website banner uses deep green as most of the background', real: true, explain: 'The rule limits the accent to under 10 percent of the frame. A green-filled banner is a measurable breach, and also breaks the warm off-white background rule.' },
    { text: 'The reel frame from the clip tool comes out bluish and cool', real: true, explain: 'The bible asks for warm whites. A tool that interprets the same words differently needs a translation note and a check against the reference set.' },
    { text: 'The neon pink accent was added by a designer with no note to the owner', real: true, explain: 'This is how drift starts. A change must go to the owner, be tested and be logged in a new bible version, not copied by others later.' },
    { text: 'One still has a teapot, a cup and a tin all in focus', real: true, explain: 'The rule is one hero object per frame. Several competing objects break the composition rule and weaken the focus.' },
    { text: 'The poster is named "final_FINAL2.png" with no bible version noted', real: true, explain: 'Without a version number and a change note, nobody can tell which version of the rules the work follows, or go back to an earlier one.' },
    { text: 'The product still has charcoal text and a teapot on the lower third in soft window light from the left', real: false, explain: 'This follows the rules: charcoal rather than black, lower-third placement and the specified light direction. Passing work should not be flagged.' },
    { text: 'The lifestyle still has a single cup and only a small green accent', real: false, explain: 'A small green accent stays under 10 percent and a single cup keeps one hero object, so this still matches the bible.' }
  ]
};

/* ---------- LEVEL 7 ---------- */

LU.activities['L7-1'] = {
  type: 'choose',
  skill: 'direction',
  title: 'Pick a concept route',
  task: 'Choose the route you would recommend for this fictional brief, then justify it against the audience, the message and the constraints.',
  expected: 'A route that serves the goal within budget and time, backed by a reason that names the audience, the message or a constraint. More than one route can be valid.',
  minutes: 8,
  criteria: [
    'The route serves the single message of the brief',
    'The reason names the audience, message, budget or time',
    'Risks of the other routes are acknowledged'
  ],
  passMark: 0.7,
  scenario: 'Brief (fictional): Northline Bikes wants a 30 second film to launch a commuter bike. Audience: city workers tired of traffic. Message: the ride home can be the best part of your day. Budget is small, the deadline is three weeks, and the legal contact dislikes direct comparisons with cars. Three routes are on the table.',
  options: [
    { text: 'Route A, "The Long Way Home": a rider chooses the scenic route and arrives happier, in warm evening light.', ok: true, feedback: 'Strong fit. It carries the emotional message, is achievable with a few locations and a simple soundscape, and avoids a comparison that would need legal review.' },
    { text: 'Route B, "Beat the Clock": a split-screen race between a car stuck in traffic and the bike.', ok: false, feedback: 'It speaks to the traffic pain, but a direct comparison with cars may need legal review, and a split-screen race needs precise matched footage, which is expensive in three weeks. The message is speed, not the joy of the ride.' },
    { text: 'Route C, "City Hush": the soundscape of a city slowing down as the rider glides through.', ok: true, feedback: 'A valid, distinctive route that fits a small budget because the idea lives in sound. The risk is that it depends on excellent audio design and may be too subtle for a silent social feed, so it needs captions or a strong visual hook.' },
    { text: 'Present all three routes in new colour palettes so the client has nine options.', ok: false, feedback: 'Nine variations of the same three ideas is not more creative choice, and it adds work and delay. Routes differ in idea, and a director recommends one rather than handing the decision back.' }
  ],
  reasonMin: 12,
  reasonKeywords: ['audience', 'message', 'budget', 'brief', 'goal', 'deadline', 'time', 'legal', 'emotion', 'commut', 'feel', 'risk']
};

LU.activities['L7-2'] = {
  type: 'order',
  skill: 'direction',
  title: 'Order the production milestones',
  task: 'Put these milestones of a fictional Studio Kettle (fictional) 30 second film into the order they should happen, with the approval gates before the expensive work.',
  expected: 'Direction is approved before generation, the rough cut is approved before finishing, and delivery comes with an archive and review at the end.',
  minutes: 8,
  criteria: [
    'Approval gates come before the costly stages',
    'Colour and mix follow a locked edit',
    'The project closes with delivery, archive and review'
  ],
  passMark: 0.7,
  items: [
    { text: 'Brief restated, research done, music shortlisted', why: 'Everything starts from an agreed brief. Shortlisting music now avoids the late re-cut that happens when music is chosen after the edit.' },
    { text: 'Three routes presented and the treatment approved by the named approver (gate 1)', why: 'Changing a written treatment is far cheaper than changing generated footage. Work does not start until this yes.' },
    { text: 'Prompts, generation and selection of the best shots', why: 'Making only begins after direction is approved. Selection narrows the material before it is cut.' },
    { text: 'Rough cut presented and approved (gate 2)', why: 'The second gate catches story and pacing problems before sound and colour work, which depend on a locked edit.' },
    { text: 'Edit locked, then sound and colour finishing, with buffer days held back', why: 'Colour and mix come after the edit is locked, otherwise they are redone. The buffer absorbs slow generations or late feedback.' },
    { text: 'Delivery of every agreed version, then archive of masters and licences and a post-project review', why: 'Delivery closes the scope, the archive protects future cutdowns, and the review feeds improvements into the next project.' }
  ]
};

LU.activities['L7-3'] = {
  type: 'spot',
  skill: 'critique',
  title: 'Critique the rough cut',
  task: 'Read this fictional rough cut and its notes. Tick the real problems against the brief and the critique rubric, which asks for notes that tie to the goal. Leave the items that are not actually problems.',
  expected: 'You tick the problems that hurt the goal or the process, and you do not tick preferences or things that are working.',
  minutes: 8,
  criteria: [
    'Problems are judged against the brief, not taste',
    'You separate real issues from items that already work',
    'You notice process problems as well as picture problems'
  ],
  passMark: 0.7,
  work: 'Rough cut v01 of a 30 second Juniper & Co. evening-tea film (fictional). The brief: help late workers switch off; one message, "your evening, slowed down"; mood statement: "the quiet minute after the day ends". The cut: it opens on a fast montage of 12 shots in the first 5 seconds; the middle is a slow, warm pour in one 9 second take; the end card with the product name shows for just 1 second; the music is an upbeat pop track; the voice-over is clear and calm; the client feedback arrived as two conflicting emails and the editor started changing both; and the logo sits inside the safe area.',
  items: [
    { text: 'The opening is a fast 12-shot montage', real: true, explain: 'It contradicts the mood statement and the message about slowing down. A viewer arriving to switch off meets rush in the first seconds.' },
    { text: 'The end card shows the product name for only 1 second', real: true, explain: 'Viewers cannot read or remember the name in a second, which defeats the goal of brand recall. Hold it a few seconds longer.' },
    { text: 'The upbeat pop track plays under a calm brief', real: true, explain: 'The music works against the mood statement. Use it as the test: a track that cannot say no to energy does not belong in "the quiet minute".' },
    { text: 'The editor started changing both conflicting feedback emails without asking', real: true, explain: 'Conflicts must be resolved with the client before work starts. Doing both wastes a revision round and may satisfy nobody.' },
    { text: 'The middle section is one slow 9 second pour', real: false, explain: 'This is working. The slow take matches the mood and provides rhythm contrast against the fast opening, so it should be kept.' },
    { text: 'The voice-over is clear and calm', real: false, explain: 'It supports the message and the mood. Praise that stays on target is not a problem to fix.' },
    { text: 'The logo sits inside the safe area', real: false, explain: 'Keeping logos away from edges and platform buttons is correct practice, so this is a strength.' }
  ]
};
