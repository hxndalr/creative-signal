/* Core content: skills, project paths, brief builder, delivery checklist, capstone, portfolio.
   Edit freely - see docs/CONTENT-SCHEMA.md. Everything marked fictional is an invented teaching example. */
window.LU = window.LU || {};
LU.levels = LU.levels || [];

LU.workflow = ['Brief', 'Research', 'Concept', 'Prompt', 'Generation', 'Selection', 'Editing', 'Sound', 'Polish', 'Delivery', 'Review'];

LU.skills = [
  { id: 'direction',   name: 'Brief to creative direction', desc: 'Turn a brief into a clear idea, mood and plan.' },
  { id: 'references',  name: 'Reference research',          desc: 'Find and analyse references, then use them to guide original work.' },
  { id: 'prompting',   name: 'Prompt writing & iteration',  desc: 'Write, test and improve prompts for different creative goals.' },
  { id: 'making',      name: 'Images, video & animation',   desc: 'Make and refine AI images, video and animation.' },
  { id: 'editing',     name: 'Edit planning',               desc: 'Plan edits, pacing, transitions, continuity and versions.' },
  { id: 'music',       name: 'Music & SFX research',        desc: 'Research, evaluate, organise and use music and sound effects.' },
  { id: 'soundscape',  name: 'Soundscape design',           desc: 'Design a layered soundscape and integrate it into video.' },
  { id: 'social',      name: 'Social adaptation',           desc: 'Adapt posts for different formats and platforms.' },
  { id: 'brand',       name: 'Brand bibles & systems',      desc: 'Build visual rules, voice, examples and reusable prompts.' },
  { id: 'critique',    name: 'Critique, revise, deliver',   desc: 'Give and use feedback, revise, and deliver finished work.' },
  { id: 'responsible', name: 'Responsible use',             desc: 'Permissions, attribution, licensing, likeness and tool limits.' }
];
LU.skillLevels = ['Not Started', 'Practicing', 'Confident'];

/* ---------- Brief builder ---------- */
LU.briefFields = [
  { id: 'title',       label: 'Project name',              hint: 'A short working title.', short: true },
  { id: 'audience',    label: 'Audience',                  hint: 'Who exactly is this for? Age, situation, what they already know, what they care about.' },
  { id: 'message',     label: 'Key message',               hint: 'The ONE thing the audience should feel or remember. If you need "and", it is probably two messages.' },
  { id: 'platform',    label: 'Platform & placement',      hint: 'Where will people see it? (e.g. vertical social feed, website hero, cinema pre-roll, event screen)' },
  { id: 'style',       label: 'Style & tone',              hint: 'Three to five adjectives plus any references. e.g. "warm, handmade, calm - like a Sunday morning".' },
  { id: 'deliverables',label: 'Deliverables',              hint: 'List every file: length, aspect ratio, versions, stills, captions.' },
  { id: 'constraints', label: 'Constraints',               hint: 'Budget, deadline, must-include elements, things to avoid, legal or brand rules, tools available.' },
  { id: 'success',     label: 'How we will judge success', hint: 'What would make the client / you say "yes, that worked"?' }
];

/* ---------- Project paths (all sample briefs are FICTIONAL teaching examples) ---------- */
LU.projects = [
  {
    id: 'product', name: 'Product or service video', icon: 'P',
    summary: 'A 30-second film that makes one product or service feel wanted - plus 15s and 6s cutdowns.',
    sample: {
      title: 'Juniper & Co. - "The Slow Cup" (fictional)',
      audience: 'Busy 25-40 year olds who drink tea at their desk and want a calmer moment in the day.',
      message: 'A proper cup of loose-leaf tea takes three minutes and gives you back ten.',
      platform: 'Website hero (16:9) and vertical social (9:16).',
      style: 'Warm, slow, tactile. Morning light, steam, close-ups of hands and leaves. Quiet piano or no music.',
      deliverables: '30s 16:9 master; 15s and 6s 9:16 cutdowns; 3 stills; burned-in captions on social versions.',
      constraints: 'No real people\'s faces generated to look like real customers. Product packaging must match the real design exactly (composite real packshots). Two-week deadline.',
      success: 'Viewers can describe the "three minutes back" idea after one watch; client approves within two rounds.'
    },
    milestones: [
      'Brief approved', 'Reference board (8-12 refs) with notes', 'Two concept routes written', 'Prompt log with at least 3 iterations per hero shot',
      'Selects folder with chosen takes', 'Rough cut (v01)', 'Sound pass: music + 3 SFX layers', 'Fine cut + colour polish (v02)', 'Delivery package checked', 'Post-project review written'
    ]
  },
  {
    id: 'social', name: 'Social campaign', icon: 'S',
    summary: 'A set of 5 connected posts (stills, carousel and short video) that adapt one idea across formats.',
    sample: {
      title: 'Northline Bikes - "Ride the Long Way" (fictional)',
      audience: 'City commuters who own a bike but mostly take the bus; 20-35.',
      message: 'The long way home is the best part of your day.',
      platform: 'Vertical feed and stories (9:16), square feed (1:1), carousel (4:5).',
      style: 'Golden-hour city, motion blur, handheld energy, bold one-line captions.',
      deliverables: '1 x 15s vertical video, 1 x 5-frame carousel, 3 single stills, caption copy for each, alt text.',
      constraints: 'Generated riders must not resemble real people; real product photos for any close-up of the bike frame.',
      success: 'Each post works alone, and together they read as one campaign.'
    },
    milestones: [
      'Brief approved', 'Platform & format plan (safe zones, ratios)', 'Reference board with notes', 'Campaign line + 5 post concepts',
      'Prompt template with locked/variable parts', 'Hero visuals selected', 'Video edited with captions', 'Captions + alt text written', 'Delivery package checked', 'Review: what to change next time'
    ]
  },
  {
    id: 'brand', name: 'Brand launch', icon: 'B',
    summary: 'A mini brand bible plus a launch film and three launch assets that obey it.',
    sample: {
      title: 'Studio Kettle cafe - opening week (fictional)',
      audience: 'Neighbourhood residents and remote workers looking for a quiet third place.',
      message: 'Your new favourite corner of the neighbourhood.',
      platform: 'Instagram, in-store screen (16:9), printed poster.',
      style: 'Soft pastels, rounded type, playful but calm. Illustrated textures.',
      deliverables: 'Brand bible (6+ pages), 20s launch film, poster, 2 social posts, reusable prompt pack.',
      constraints: 'Logo is supplied by the client and must never be redrawn by AI. Accessible colour contrast for all text.',
      success: 'A new team member could make an on-brand post using only the bible.'
    },
    milestones: [
      'Brief approved', 'Brand references + competitor scan', 'Visual rules (colour, type, image style)', 'Voice & tone page',
      'Do / Don\'t examples', 'Reusable prompt pack tested by someone else', 'Launch film rough cut', 'Sound identity chosen', 'All assets checked against bible', 'Review'
    ]
  },
  {
    id: 'story', name: 'Short film or visual story', icon: 'F',
    summary: 'A 60-90 second narrative piece with a beginning, middle and end, built from consistent AI shots.',
    sample: {
      title: '"The Last Lighthouse Keeper" (fictional)',
      audience: 'Festival-style short-film viewers; general audience 16+.',
      message: 'Small rituals keep us company when everything changes.',
      platform: 'Online screening (16:9), festival-style export.',
      style: 'Painterly, muted blues and amber, slow camera moves, wind and sea as the score.',
      deliverables: '60-90s film, poster still, 3-sentence synopsis, credits list.',
      constraints: 'One consistent character across all shots; all music licensed or original; credit every tool and source.',
      success: 'An audience member can retell the story; the character looks like the same person in every shot.'
    },
    milestones: [
      'Story brief + logline', 'Reference board (look, motion, sound)', 'Script / beat sheet', 'Storyboard or shot list',
      'Character & style reference sheet', 'Shots generated and selected', 'Assembly edit', 'Soundscape + score', 'Picture lock + polish', 'Screening + review'
    ]
  },
  {
    id: 'motion', name: 'Motion graphics piece', icon: 'M',
    summary: 'A 20-40 second animated explainer or title sequence mixing AI elements with designed type and motion.',
    sample: {
      title: '"How Compost Works" explainer (fictional)',
      audience: 'Primary-school teachers looking for a quick classroom explainer.',
      message: 'Compost is just tiny helpers turning scraps back into soil.',
      platform: 'Classroom screen (16:9) and a vertical version for social.',
      style: 'Flat, friendly shapes; bold colours; bouncy easing; clear readable type.',
      deliverables: '30s explainer with captions, 9:16 version, style frames, source project files.',
      constraints: 'Facts must be checked by a human; type size readable from the back of a classroom.',
      success: 'A ten-year-old can explain the compost cycle after watching once.'
    },
    milestones: [
      'Brief approved', 'Script + fact check', 'Reference board for motion & style', 'Style frames (3)',
      'Animatic (timed rough)', 'Assets generated / designed', 'Animation pass', 'Sound + VO', 'Captions + accessibility check', 'Delivery + review'
    ]
  }
];

/* ---------- File & delivery checklist ---------- */
LU.checklist = [
  { group: 'Organisation', items: [
    { id: 'org1', text: 'Project folder uses a fixed structure: 01_Brief, 02_References, 03_Prompts, 04_Generations, 05_Selects, 06_Edit, 07_Audio, 08_Exports, 09_Admin' },
    { id: 'org2', text: 'Raw generations are kept separately from selected takes' },
    { id: 'org3', text: 'Prompt log saved with the settings/seed (if your tool shows one) next to each output' }
  ]},
  { group: 'Filenames', items: [
    { id: 'fn1', text: 'Names follow: project_deliverable_ratio_length_version (e.g. juniper_hero_16x9_30s_v03.mp4)' },
    { id: 'fn2', text: 'No spaces or special characters; versions are zero-padded (v01, v02...)' },
    { id: 'fn3', text: 'The word "final" is NOT in any filename - use version numbers instead' }
  ]},
  { group: 'Usage rights & permissions', items: [
    { id: 'ur1', text: 'The AI tool\'s current terms allow this use (commercial / client work) - checked and noted with date' },
    { id: 'ur2', text: 'Written permission exists for any real person, voice, location, logo or artwork used as input' },
    { id: 'ur3', text: 'No output imitates a living artist\'s signature style or a real person\'s likeness without consent' },
    { id: 'ur4', text: 'Client knows which elements are AI-generated (disclosure agreed)' }
  ]},
  { group: 'Music & SFX licensing', items: [
    { id: 'ml1', text: 'Every music track and SFX has a recorded source, licence type and licence number/receipt' },
    { id: 'ml2', text: 'Licence covers the platforms, territories and duration this piece will run' },
    { id: 'ml3', text: 'AI-generated music: tool terms checked for commercial use and ownership' }
  ]},
  { group: 'Credits', items: [
    { id: 'cr1', text: 'Credits list includes people, tools used, music and SFX sources as required by licences' },
    { id: 'cr2', text: 'Attribution wording matches what each licence asks for' }
  ]},
  { group: 'Formats & exports', items: [
    { id: 'fx1', text: 'Each deliverable matches its spec: aspect ratio, resolution, frame rate, length' },
    { id: 'fx2', text: 'Audio loudness checked against the platform\'s current target; no clipping' },
    { id: 'fx3', text: 'Captions/subtitles exported (burned-in and/or sidecar file) and proofread' },
    { id: 'fx4', text: 'Watched every export start to finish on the target device size' },
    { id: 'fx5', text: 'Thumbnail / cover still exported' }
  ]},
  { group: 'Handover', items: [
    { id: 'ho1', text: 'Delivery note lists every file, its purpose and spec' },
    { id: 'ho2', text: 'Backup copy of the whole project folder made' }
  ]}
];

/* ---------- Capstone ---------- */
LU.capstone = {
  title: 'Capstone: Full Production',
  intro: 'Run the whole workflow on one project from brief to review. Pick a project path, write your own brief (or adapt a sample), and take it all the way to a delivered, documented piece.',
  brief: [
    'Choose one project path. You may adapt the fictional sample brief or write a brief for a real client only if you have their permission.',
    'Deliver one master piece (30-90s video, or campaign of 5 assets) plus at least one adapted version for a second platform.',
    'Use AI for at least three workflow stages and document every decision in your prompt log and reflections.',
    'All music and SFX must be licensed, original or tool-generated with commercial-use terms checked.',
    'Present your work in the showcase with a 3-minute walkthrough of your process.'
  ],
  milestones: [
    { id: 'c1', stage: 'Brief',      text: 'Brief written and saved in Brief Builder' },
    { id: 'c2', stage: 'Research',   text: 'At least 8 references saved to Library with analysis notes' },
    { id: 'c3', stage: 'Concept',    text: 'Two concept routes written; one chosen with a reason' },
    { id: 'c4', stage: 'Prompt',     text: 'Reusable prompt template saved with locked and variable parts' },
    { id: 'c5', stage: 'Generation', text: 'Generations made with at least 3 documented iterations on key shots' },
    { id: 'c6', stage: 'Selection',  text: 'Selects chosen with written reasons for the top 3' },
    { id: 'c7', stage: 'Editing',    text: 'Edit plan / timeline and rough cut done' },
    { id: 'c8', stage: 'Sound',      text: 'Sound map with music, SFX and ambience - sources and licences logged' },
    { id: 'c9', stage: 'Polish',     text: 'Feedback received and one revision round completed' },
    { id: 'c10', stage: 'Delivery',  text: 'Delivery checklist 100% complete' },
    { id: 'c11', stage: 'Review',    text: 'Portfolio entry + final reflection written; showcase presented' }
  ],
  rubric: [
    { criterion: 'Brief & direction', developing: 'Brief is vague; the idea drifts.', solid: 'Clear brief; idea is mostly consistent.', strong: 'Sharp brief; every choice traces back to it.' },
    { criterion: 'Research & originality', developing: 'Few references or copied directly.', solid: 'Good references used for principles.', strong: 'References analysed and transformed into something original.' },
    { criterion: 'Prompting & generation', developing: 'One-shot prompts, little iteration.', solid: 'Iterated with notes on what changed.', strong: 'Controlled tests; reusable templates; consistent results.' },
    { criterion: 'Edit & pacing', developing: 'Shots placed without rhythm.', solid: 'Clear structure and pacing.', strong: 'Pacing serves the message; continuity is clean.' },
    { criterion: 'Sound', developing: 'Music only, or levels uneven.', solid: 'Layered sound with logged sources.', strong: 'Sound carries emotion and story; mix is clean and licensed.' },
    { criterion: 'Delivery & responsibility', developing: 'Missing files, rights unclear.', solid: 'Checklist complete; rights logged.', strong: 'Professional package; disclosure and credits handled well.' },
    { criterion: 'Reflection & presentation', developing: 'Describes what was made.', solid: 'Explains decisions and changes.', strong: 'Shows growth, trade-offs and what they would do next.' }
  ]
};

/* ---------- Portfolio + showcase ---------- */
LU.portfolioPrompts = {
  process: 'What did you do, step by step? Which stages used AI and which were done by hand?',
  choices: 'What were your key creative decisions and why did you make them?',
  revisions: 'What changed between versions? What feedback did you act on?',
  learning: 'What did you learn, and what would you do differently next time?'
};
LU.portfolioMilestones = [
  { id: 'pm1', text: 'First portfolio piece saved (any level)' },
  { id: 'pm2', text: 'A before/after revision pair documented' },
  { id: 'pm3', text: 'A piece with a documented sound design' },
  { id: 'pm4', text: 'A brand-system piece (bible page or prompt pack)' },
  { id: 'pm5', text: 'Capstone piece saved and marked for showcase' }
];
LU.showcase = {
  title: 'Showcase',
  steps: [
    'Pick one or two pieces marked "Showcase" in your portfolio.',
    'Prepare a 3-minute walkthrough: the brief, one key decision, one revision, the final result.',
    'Show one "before" and its "after". Name what feedback caused the change.',
    'Listen to two peers present. Give each one "what worked" and one "next step" note.',
    'Write a final reflection: how has your process changed since Level 1?'
  ],
  feedbackFrame: ['What worked and why', 'One clear next step', 'A question you still have']
};

LU.reflectionPrompts = [
  'What surprised you in this level?',
  'Which decision are you most proud of, and why?',
  'Where did the AI tool help most, and where did your own judgment matter more?',
  'What would you do differently if you started again?'
];

/* ---------- Instructor: general rubric & session plan ---------- */
LU.instructorGeneral = {
  notes: [
    'Data lives in this browser only. If students share a PC, remind them to choose their own profile every time.',
    'This instructor view is not password protected - anyone at this computer can open it. Treat it as a review tool, not a secure gradebook.',
    'Ask students to export a backup at the end of each session and keep it somewhere private (their own USB or folder).',
    'All sample briefs and examples are fictional teaching material. Swap in your own approved examples by editing content/core.js.'
  ],
  session: [
    '10 min - warm-up: show one piece of work and ask "what is the brief behind this?"',
    '15 min - teach one lesson together on the projector',
    '30 min - students do the level exercise individually',
    '15 min - pair critique using the feedback frame',
    '10 min - checkpoint or reflection; export backups'
  ]
};
