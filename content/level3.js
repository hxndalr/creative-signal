window.LU = window.LU || {};
LU.levels = LU.levels || [];
LU.levels.push({
  id: `L3`,
  num: 3,
  name: `Researcher`,
  tagline: `Find references, understand why they work, and borrow principles, not products.`,
  summary: `Good work starts with good looking and good listening. This level teaches you to collect and analyse visual, motion, music and sound references, build mood boards that guide decisions, and turn what you learn into principles you can use without copying. You will also learn to organise and credit references and understand licensing basics for music and sound effects.`,
  outcomes: [
    `Find references that match a brief and analyse them using named qualities such as colour, light, movement and sound.`,
    `Build a mood board that gives a team a shared direction.`,
    `Turn a reference into a transferable principle rather than a copy.`,
    `Organise references with source notes so they can be cited and rechecked.`,
    `Explain the basic differences between common music and sound licences and ask the right questions before using a track.`
  ],
  skills: [`references`, `music`, `responsible`],

  lessons: [
    {
      id: `L3-1`, title: `Finding and analysing references`, minutes: 20,
      blocks: [
        { type: `p`, text: `A **reference** is an existing piece of work you study to understand a look, a movement, a sound or a feeling. References do three jobs: they help a team agree on what "warm" or "energetic" means, they teach you what works, and they give you words to use in prompts.` },
        { type: `list`, title: `Where to look`, items: [
          `Photography, film, advertising and design work in the same category as your brief.`,
          `Work from outside your category. A bakery brand can learn from architecture photography.`,
          `Art history, nature and everyday life. Light and colour are not owned by any industry.`,
          `Sound: films, games, field recordings and live performance, not only music libraries.`
        ] },
        { type: `terms`, items: [
          { term: `Reference`, def: `Existing work you study for understanding, not to copy.` },
          { term: `Palette`, def: `The set of main colours in a piece of work.` },
          { term: `Contrast`, def: `The difference between light and dark areas, or between colours.` },
          { term: `Pacing`, def: `How fast or slow things change over time in a video or a sound.` },
          { term: `Texture`, def: `The surface quality, such as grain, softness or roughness, in a picture or a sound.` }
        ] },
        { type: `p`, text: `To analyse a reference, do not say "I like it". Break it into qualities and write one plain observation for each. That turns a feeling into something you can use.` },
        { type: `prompt`, title: `Turning a reference into prompt words`, parts: [
          { label: `Style`, text: `muted pastel palette, flat graphic shapes, visible paper grain` },
          { label: `Light`, text: `even, shadowless, overcast feel` },
          { label: `Camera`, text: `straight-on, centred, static` },
          { label: `Mood`, text: `quiet, playful, orderly` }
        ] },
        { type: `callout`, tone: `tip`, title: `Describe, then name`, text: `Write what you see in plain words first ("pale green wall, long soft shadow, tiny figure"). Only then add technical names. If you cannot describe it plainly, you have not understood it yet.` },
        { type: `example`, fictional: true, title: `Analysing a reference for Juniper & Co. tea`, text: `The team collects a still from an old tea-ceremony film (invented for this lesson). Colour: muted greens and cream. Light: soft side light through paper screens. Movement: nearly none, held shots. Sound: a kettle, distant birds, no music. Takeaway: calm comes from stillness and quiet, not from adding pretty things. That principle can be used in any new work.` }
      ]
    },
    {
      id: `L3-2`, title: `Mood boards and borrowing without copying`, minutes: 25,
      blocks: [
        { type: `p`, text: `A **mood board** is a small, curated set of references arranged to communicate direction. It is not a collage of things you like. A good board is selective: every image earns its place by showing one named quality.` },
        { type: `steps`, title: `Building a useful board`, items: [
          `Start from the brief: write three feeling words (for example calm, honest, warm).`,
          `Collect widely, then cut hard. Keep six to twelve items.`,
          `Label each item with the one quality it shows (colour, light, composition, texture, movement, sound).`,
          `Add one "avoid" item that shows what the work must not look like.`,
          `Check with the client or team before you generate anything.`
        ] },
        { type: `compare`, title: `Copying versus borrowing a principle`, left: { label: `Copying`, text: `Recreating a specific photographer's famous shot: same pose, same composition, same props, same colour grade.` }, right: { label: `Borrowing a principle`, text: `Noticing that the photographer uses low side light and a wide empty margin to feel quiet, then applying that to your own subject, setting and palette.` } },
        { type: `list`, title: `Tests that you are borrowing, not copying`, items: [
          `Could a viewer name the source from a quick look? If yes, you may be too close.`,
          `Did you change subject, setting and composition, not only small details?`,
          `Can you state the principle in one sentence without naming the source?`,
          `Would you be comfortable showing the source and your work side by side?`
        ] },
        { type: `callout`, tone: `warn`, title: `Do not prompt for a living artist's style`, text: `Asking a tool to imitate a named living artist or a protected character raises copyright and ethical concerns, and rules are still developing. Describe the qualities you want instead: palette, line, texture, light.` },
        { type: `terms`, items: [
          { term: `Principle`, def: `A reusable idea about why something works, such as "empty space makes a subject feel calm".` },
          { term: `Mood board`, def: `A curated set of references that sets a direction.` },
          { term: `Derivative work`, def: `A new work that is too closely based on an existing one.` }
        ] },
        { type: `example`, fictional: true, title: `Northline Bikes board`, text: `For the fictional Northline Bikes, a board holds eight items: two street photographs for low dawn light, one film still for handheld energy, one packaging design for bold red against grey, two short sound clips of wet-street bike tyres, one avoid image of an aggressive extreme-sports ad. Each item is labelled with its quality. The board says "quietly hopeful", and the team now argues about the board, not about taste.` }
      ]
    },
    {
      id: `L3-3`, title: `Music and sound research, organising and licensing`, minutes: 25,
      blocks: [
        { type: `p`, text: `Sound carries a large part of a video's feeling, yet it is often chosen last. Research it early. For a brief, decide tempo (fast or slow), energy (calm or driving), instruments, and space (sparse or full). Then find references and write them down.` },
        { type: `timeline`, title: `A sound map for a 20-second reel`, duration: 20, tracks: [
          { name: `Music`, clips: [{ label: `Soft intro`, start: 0, end: 4 }, { label: `Groove`, start: 4, end: 16 }, { label: `Resolve`, start: 16, end: 20 }] },
          { name: `Sound effects`, clips: [{ label: `Kettle`, start: 1, end: 3 }, { label: `Pour`, start: 8, end: 10 }, { label: `Cup set down`, start: 15, end: 16 }] },
          { name: `Voice`, clips: [{ label: `Tagline`, start: 16, end: 19 }] }
        ] },
        { type: `terms`, items: [
          { term: `Licence`, def: `The written permission that says how you may use a piece of music or sound.` },
          { term: `Royalty-free`, def: `Usually means you pay once or follow set terms instead of paying per use. It does not mean free, and it does not mean no rules.` },
          { term: `Attribution`, def: `Crediting the creator as the licence requires.` },
          { term: `Public domain`, def: `Work whose copyright has ended or been given up. Rules vary by country, so check the recording and the composition separately.` },
          { term: `Sync licence`, def: `Permission to pair music with moving images.` }
        ] },
        { type: `list`, title: `Questions to ask before using any track or sound effect`, items: [
          `Who made it, and where does the licence text live?`,
          `Is commercial use allowed, and for what platforms and how long?`,
          `Is attribution required, and in what wording?`,
          `Does the licence cover the recording and the underlying composition?`,
          `Can I keep proof (a receipt or a screenshot of the licence terms) with the project file?`
        ] },
        { type: `callout`, tone: `tool`, title: `Licence terms change`, text: `Libraries and platforms update their terms. Always read the current licence on the day you use a track and save a copy of it.` },
        { type: `steps`, title: `A simple reference log`, items: [
          `Give each reference an ID and a file or link.`,
          `Record title, creator, date accessed and where you found it.`,
          `Write the quality it shows and how you used it.`,
          `For sound, add the licence type and a link to the terms.`
        ] },
        { type: `example`, fictional: true, title: `Studio Kettle cafe: the track that almost shipped`, text: `The fictional Studio Kettle cafe loves a track found in a video the editor liked. Nobody knows its source. The team follows the licence questions and cannot answer the first one. They choose a library track with clear commercial terms and save the licence page in the project folder. The final reel feels almost the same and has no risk attached.` }
      ]
    }
  ],

  exercises: [
    {
      id: `L3-E1`,
      kind: `reference`,
      title: `Analyse one reference`,
      minutes: 25,
      task: `Pick any image, short video clip or sound that suits the fictional brief for Studio Kettle cafe ("calm, warm, local"). Analyse it using every focus field. Then write one principle you could borrow without copying.`,
      output: `An analysis with one observation per field and a one-sentence transferable principle.`,
      hints: [
        `Describe first, then name the technique.`,
        `Be specific: "soft light from the left" beats "nice light".`,
        `For sound, note tempo, instruments and how much space there is.`,
        `State the principle without naming the source.`
      ],
      rubric: [
        { criterion: `Observation quality`, developing: `Mostly opinions ("I like it").`, solid: `Plain observations for most fields.`, strong: `Plain, specific observations for every field.` },
        { criterion: `Transferable principle`, developing: `Describes how to recreate the reference.`, solid: `States a principle tied to the reference.`, strong: `States a principle usable in a different subject and setting.` },
        { criterion: `Source notes`, developing: `No source recorded.`, solid: `Source and date recorded.`, strong: `Source, date, licence or usage note recorded.` }
      ],
      required: true,
      focus: [`Colour`, `Light`, `Composition`, `Movement`, `Sound`, `Mood`, `Principle to borrow`, `Source and licence note`]
    },
    {
      id: `L3-E2`,
      kind: `scenario`,
      title: `The track from the competitor`,
      minutes: 15,
      task: `Read the situation (fictional) and choose the best next step. Read the feedback on every option.`,
      output: `Your chosen step and the licensing principle behind it.`,
      hints: [
        `What do you actually know about the track's rights?`,
        `Separate what the client likes (the feel) from what you need (the rights).`,
        `Think about what you can keep as proof.`
      ],
      rubric: [
        { criterion: `Separates feel from rights`, developing: `Treats liking as permission.`, solid: `Notes rights are unknown.`, strong: `Notes rights are unknown and extracts the feel as a brief.` },
        { criterion: `Chooses a safe route`, developing: `Uses the track anyway.`, solid: `Looks for a licensed alternative.`, strong: `Looks for a licensed alternative and records the terms.` },
        { criterion: `Communicates`, developing: `Does not tell the client.`, solid: `Tells the client the issue.`, strong: `Tells the client the issue and offers options.` }
      ],
      required: true,
      situation: `(Fictional) The owner of Northline Bikes sends a link to a competitor's ad and says "use this exact song". You do not know who made it, where it came from, or what its licence is. The ad launches in four days.`,
      options: [
        { text: `Rip the audio from the ad and use it. The owner asked for it, so it is their responsibility.`, correct: false, feedback: `Being asked does not create a licence. You would be using unlicensed music, and the risk lands on the client and on you.` },
        { text: `Describe what the owner likes in the song (tempo, instruments, energy), then find a library track with clear commercial terms that matches, and save the licence terms with the project.`, correct: true, feedback: `Correct. You keep the feel, remove the unknown rights, and leave a paper trail.` },
        { text: `Use a short clip of only five seconds so it counts as fair use.`, correct: false, feedback: `Short length does not guarantee permission. Do not assume a legal exception applies; rules vary and risk remains.` },
        { text: `Use the track, but speed it up slightly so it sounds different.`, correct: false, feedback: `Changing a recording slightly does not change who owns it. This is still unlicensed use.` }
      ]
    },
    {
      id: `L3-E3`,
      kind: `task`,
      title: `Build a mood board and reference log`,
      minutes: 30,
      task: `For the fictional brief "Juniper & Co. tea: quiet morning ritual", collect six to ten references across visual, motion and sound. Label each with its quality and write a one-sentence direction statement.`,
      output: `A labelled board plus a reference log with sources and licence notes.`,
      hints: [
        `Cut hard. Fewer, clearer references beat many vague ones.`,
        `Add one item that shows what to avoid.`,
        `Log the source and date for each item as you collect it.`
      ],
      rubric: [
        { criterion: `Curation`, developing: `Many items with no clear direction.`, solid: `Selected items with a clear direction.`, strong: `Selected items, each earning its place, plus an avoid item.` },
        { criterion: `Labelling`, developing: `No labels.`, solid: `Labelled with a quality.`, strong: `Labelled with a quality and how it will be used.` },
        { criterion: `Organisation and sources`, developing: `No source information.`, solid: `Sources recorded.`, strong: `Sources, dates and licence notes recorded.` }
      ],
      required: false,
      fields: [`Direction statement (one sentence)`, `Three feeling words`, `Visual references and what each shows`, `Motion references and what each shows`, `Sound references and licence notes`, `Avoid item and why`, `Principles you will borrow`]
    }
  ],

  checkpoint: {
    criteria: [`Complete every lesson`, `Complete required exercises`, `Score 75%+ on the check`],
    passMark: 0.75,
    questions: [
      { q: `What is the best way to use a reference?`, options: [`Extract the principle that makes it work and apply it to your own subject.`, `Recreate it as closely as possible.`, `Ask the tool to imitate the named creator.`, `Use it unchanged if it is short.`], answer: 0, explain: `References teach principles. Copying specifics risks derivative work and teaches you little.` },
      { q: `Which observation is most useful in a reference analysis?`, options: [`"It looks cool."`, `"I would buy this."`, `"Soft side light, pale green palette, held static shot."`, `"The creator is famous."`], answer: 2, explain: `Specific plain observations can be turned into prompts, briefs and decisions.` },
      { q: `A mood board has forty images and no labels. What is the main problem?`, options: [`It needs more images.`, `It does not communicate a clear direction because nothing is selected or explained.`, `It should only contain photographs.`, `Mood boards cannot include sound.`], answer: 1, explain: `A board is a curated tool. Cutting and labelling is what makes it useful.` },
      { q: `"Royalty-free" music means...`, options: [`You can use it anywhere with no rules.`, `It costs nothing.`, `It has no copyright.`, `Usually that you follow set terms, often a one-off payment, instead of paying per use; the licence still applies.`], answer: 3, explain: `The term describes a payment model. Always read the specific licence terms.` },
      { q: `Which is a sign you may be copying rather than borrowing?`, options: [`A viewer could quickly name the source from your work.`, `You changed subject, setting and composition.`, `You can state the principle without naming the source.`, `You are comfortable showing both side by side.`], answer: 0, explain: `If the source is instantly recognisable in your work, you are probably too close.` }
    ]
  },

  instructor: {
    notes: `Students tend to collect images they like and call it research. Keep pulling them back to named qualities and transferable principles. Licensing is a topic where confidence is dangerous: teach the questions to ask and the habit of saving terms, not legal conclusions. If students bring real tracks or artists, treat them as study material only and keep the focus on principles.`,
    activity: {
      title: `Principle swap`,
      minutes: 40,
      steps: [
        `Each student brings one reference (image, clip or sound) that they admire and a source note.`,
        `Students analyse it on paper using colour, light, composition, movement, sound and mood.`,
        `Each student writes one transferable principle without naming the source.`,
        `Swap principles only, not references. Each student creates a quick sketch, storyboard or sound description from another student's principle.`,
        `Compare the new work to the original reference. Discuss whether the principle carried over without copying.`,
        `Finish with a five-minute licence-questions drill on a sample track description.`
      ]
    },
    discussion: [
      `Where is the line between inspiration and copying, and who decides?`,
      `Why might sound references be harder to collect and credit than visual ones?`,
      `What information would you want in a reference log if a colleague took over your project?`
    ]
  }
});
