window.LU = window.LU || {};
LU.levels = LU.levels || [];
LU.levels.push({
  id: `L4`,
  num: 4,
  name: `Maker`,
  tagline: `Make, select, fix and adapt: from raw generations to platform-ready work.`,
  summary: `This level is about turning generations into finished assets. You will practise making and refining images, video and animation, selecting takes on purpose, keeping characters, products and style consistent, fixing artifacts, and adapting one piece of content to several formats and platforms with sensible hooks and captions.`,
  outcomes: [
    `Refine an output through short, deliberate rounds instead of starting over each time.`,
    `Select and cull takes using criteria written before you look.`,
    `Keep a character, product or style consistent across several outputs.`,
    `Choose between regenerating, repairing and upscaling when a flaw appears.`,
    `Adapt content to different aspect ratios and platforms, respecting safe zones, hooks and captions.`
  ],
  skills: [`making`, `social`, `prompting`],

  lessons: [
    {
      id: `L4-1`, title: `Making, refining and selecting`, minutes: 25,
      blocks: [
        { type: `p`, text: `Making is a loop: generate, look, decide, adjust. The beginner mistake is to treat each output as a fresh lottery ticket. The maker's habit is to treat each output as information about what to change next.` },
        { type: `steps`, title: `A refinement round`, items: [
          `Generate a small batch (four to eight) from your best current prompt.`,
          `Pick the closest one and name what is right and what is wrong in one sentence each.`,
          `Change one thing to fix the biggest problem. Keep what is right.`,
          `Generate again. Repeat for three or four rounds, then stop and choose.`
        ] },
        { type: `terms`, items: [
          { term: `Take`, def: `One generated attempt, a word borrowed from filming.` },
          { term: `Cull`, def: `Remove the takes that will not be used so only real candidates remain.` },
          { term: `Image-to-video`, def: `Animating a still image into a short clip, which often keeps the look steadier than starting from text alone.` },
          { term: `Keyframe`, def: `A chosen frame that defines a key moment, such as the start or end of a move.` },
          { term: `Variation`, def: `A new output that stays close to a chosen one but differs in small ways.` }
        ] },
        { type: `list`, title: `Selection criteria to write before you look`, items: [
          `Does it meet the brief (subject, mood, format)?`,
          `Is it believable and free of obvious artifacts?`,
          `Does it match the other chosen takes in look and light?`,
          `Is there room for text, a logo or a crop where the layout needs it?`,
          `Can I explain in one sentence why I chose it over the next best?`
        ] },
        { type: `timeline`, title: `A tiny animation plan: still to clip (seconds)`, duration: 8, tracks: [
          { name: `Shots`, clips: [{ label: `Still hero`, start: 0, end: 2 }, { label: `Slow push-in`, start: 2, end: 5 }, { label: `Pour detail`, start: 5, end: 8 }] },
          { name: `Notes`, clips: [{ label: `Hold`, start: 0, end: 2 }, { label: `Add subtle motion only`, start: 2, end: 8 }] }
        ] },
        { type: `callout`, tone: `tool`, title: `Variation and extend controls`, text: `Many tools offer ways to vary a chosen output or extend a clip. Names and behaviour differ and change, so check the options in your current tool before planning around them.` },
        { type: `example`, fictional: true, title: `Juniper & Co. tea: four rounds`, text: `Round 1: the tin is right but the cloth is too busy. Round 2: simplify the cloth; now the light is flat. Round 3: change only the light; steam appears. Round 4: pick from six variations; chosen for room at the top for a headline. The team stops after round 4 because the selection criteria are met.` }
      ]
    },
    {
      id: `L4-2`, title: `Consistency, artifacts and upscaling`, minutes: 25,
      blocks: [
        { type: `p`, text: `One good image is easy. Six that look like they belong together is craft. **Consistency** means the same character, product or style across many outputs. Models do not remember, so you have to supply the sameness yourself.` },
        { type: `list`, title: `Ways to build consistency`, items: [
          `Write a short **character or product sheet**: fixed descriptive words you paste into every prompt (for example "a woman in her thirties, short grey bob, round tortoiseshell glasses, mustard cardigan").`,
          `Use reference images where your tool allows, and use the same ones each time.`,
          `Keep style words, light and palette identical across a set.`,
          `Change one thing per shot (pose or setting), not everything.`,
          `Accept limits: for exact logos, text and packaging, add the real asset in editing rather than asking the model to draw it.`
        ] },
        { type: `terms`, items: [
          { term: `Character sheet`, def: `A short written (and sometimes visual) description that keeps a character the same across outputs.` },
          { term: `Style lock`, def: `Reusing the same style words, palette and light to keep a set cohesive.` },
          { term: `Inpainting`, def: `Regenerating only a selected area, such as fixing one hand, and leaving the rest alone.` },
          { term: `Upscaling`, def: `Increasing resolution, usually with software that adds plausible detail.` }
        ] },
        { type: `flow`, title: `Fix it: choose the cheapest effective repair`, steps: [`Spot the flaw`, `Is it small and local?`, `Repair that area`, `Is it everywhere?`, `Adjust the prompt and regenerate`, `Is it just low resolution?`, `Upscale last`], highlight: [0, 2, 4] },
        { type: `compare`, title: `Wrong tool for the flaw versus right tool`, left: { label: `Wrong`, text: `Upscaling an image with a garbled hand. The larger image has a larger, sharper garbled hand.` }, right: { label: `Right`, text: `Repair the hand area first, then upscale the corrected image once everything else is approved.` } },
        { type: `callout`, tone: `tip`, title: `Upscale last`, text: `Fix composition and artifacts first. Upscaling every draft wastes time, and it can lock in flaws or add new ones. Check upscaled results at full size.` },
        { type: `example`, fictional: true, title: `Northline Bikes courier: five shots, one rider`, text: `For a fictional five-shot sequence, the team writes a character sheet: "courier, mid-twenties, red helmet, grey rain jacket, teal backpack". They paste it into every prompt and change only the action. Shot 3 gives the rider a blue helmet, so they regenerate that shot rather than patching it, because the colour error affects the whole frame. Shot 4 has one odd hand; they repair only that area.` }
      ]
    },
    {
      id: `L4-3`, title: `Adapting for formats and platforms`, minutes: 25,
      blocks: [
        { type: `p`, text: `The same idea needs different shapes in different places. A wide film frame, a vertical story and a square feed post have different layouts, different viewing habits, and different interface elements covering parts of the picture. Plan for the shape before you generate, not after.` },
        { type: `terms`, items: [
          { term: `Aspect ratio`, def: `Frame shape as width:height. Common examples are 16:9 (wide), 1:1 (square), 4:5 (tall feed) and 9:16 (full-screen vertical).` },
          { term: `Safe zone`, def: `The part of the frame that stays clear of platform buttons, captions and cropping. Keep faces and key text inside it.` },
          { term: `Hook`, def: `The first moment of a video, built to earn the viewer's next few seconds.` },
          { term: `Caption`, def: `On-screen text that shows what is being said or adds key words. Many people watch with sound off.` }
        ] },
        { type: `callout`, tone: `tool`, title: `Specs and safe zones`, text: `Platforms change their recommended sizes, lengths and safe-zone layouts often. Check the current guidance for each platform before delivery and keep a note of the date you checked.` },
        { type: `timeline`, title: `A 12-second vertical edit with hook and captions`, duration: 12, tracks: [
          { name: `Video`, clips: [{ label: `Hook: rain on the window`, start: 0, end: 3 }, { label: `Ride begins`, start: 3, end: 8 }, { label: `Product close-up`, start: 8, end: 12 }] },
          { name: `Captions`, clips: [{ label: `First dry day.`, start: 0.5, end: 3 }, { label: `Ride into spring.`, start: 4, end: 8 }, { label: `Northline Bikes`, start: 9, end: 12 }] },
          { name: `Sound`, clips: [{ label: `Rain bed`, start: 0, end: 3 }, { label: `Light music`, start: 3, end: 12 }] }
        ] },
        { type: `steps`, title: `Adapting one master idea`, items: [
          `Choose the main format first and design the shot for it.`,
          `Leave extra space around the subject ("room to crop") if you will reuse it in other shapes.`,
          `Place faces and key words inside the safe zone.`,
          `Rewrite the hook for the platform, not only crop the picture.`,
          `Add captions and check they do not hide the subject or collide with interface elements.`,
          `Export each version with a clear name that says platform and size.`
        ] },
        { type: `compare`, title: `Cropping versus adapting`, left: { label: `Lazy crop`, text: `A wide frame cut down the middle to vertical. The subject's head is cut at the edge and the caption sits under a platform button.` }, right: { label: `Adapted`, text: `A vertical version designed with extra headroom, the subject centred, the hook line in the top third and captions inside the safe area.` } },
        { type: `example`, fictional: true, title: `Studio Kettle cafe: one idea, three posts`, text: `For the fictional Studio Kettle cafe, the team plans one 16:9 hero video, then a 9:16 version with a rewritten hook ("Your first quiet minute today"), and a 4:5 still with a headline. Each is checked against its own safe zone and has captions where there is speech or key text.` }
      ]
    }
  ],

  exercises: [
    {
      id: `L4-E1`,
      kind: `scenario`,
      title: `Four takes, one deadline`,
      minutes: 15,
      task: `Read the situation (fictional) and choose the best next step. Read the feedback on every option.`,
      output: `Your chosen step and the selection principle behind it.`,
      hints: [
        `Check what the brief asked for before looking at which take is prettiest.`,
        `Consider which flaw is cheapest to fix and which is not fixable.`,
        `Think about consistency with the rest of the set.`
      ],
      rubric: [
        { criterion: `Uses criteria`, developing: `Chooses by gut feeling.`, solid: `Refers to the brief.`, strong: `Refers to the brief and the set.` },
        { criterion: `Matches fix to flaw`, developing: `Fixes the wrong thing.`, solid: `Chooses a sensible fix.`, strong: `Chooses the cheapest effective fix and says why.` },
        { criterion: `Protects consistency`, developing: `Ignores the set.`, solid: `Notes the set.`, strong: `Notes the set and plans a check.` }
      ],
      required: true,
      situation: `(Fictional) You have four takes of the Northline Bikes courier for shot 3 of a five-shot sequence. Take A is the most striking but the rider wears a blue helmet (the character sheet says red). Take B has the right helmet and light, but one hand holding the handlebar is distorted. Take C is correct but flat and dull. Take D is correct but the rider is turned away from camera. Delivery is in two hours.`,
      options: [
        { text: `Choose Take A. It is the most striking, and nobody will notice the helmet colour.`, correct: false, feedback: `A colour mismatch in a sequence is noticed and breaks consistency. Striking does not outweigh a continuity error.` },
        { text: `Choose Take C because it has no flaws.`, correct: false, feedback: `It has a flaw: it is dull against a brief that asks for hopeful energy. Safe is not the same as right.` },
        { text: `Choose Take B and repair only the distorted hand area, then check it against shots 2 and 4 for look and light.`, correct: true, feedback: `Correct. The flaw is small and local, everything else matches the brief and the set, and the repair is cheap.` },
        { text: `Throw them all out and regenerate from scratch with a new prompt.`, correct: false, feedback: `You would lose a take that is nearly right and burn time you do not have.` }
      ]
    },
    {
      id: `L4-E2`,
      kind: `critique`,
      title: `Before and after: the social adaptation`,
      minutes: 20,
      task: `Read the description of a first social version, write your critique of it, then compare with the expert notes and the revised version.`,
      output: `A critique with at least three issues, each with a fix, and a one-sentence rewritten hook.`,
      hints: [
        `Check the hook, the safe zone, the captions and the format separately.`,
        `Ask what a viewer with the sound off would see.`,
        `Say what you would keep, not only what you would change.`
      ],
      rubric: [
        { criterion: `Finds format issues`, developing: `Finds none.`, solid: `Finds one or two.`, strong: `Finds all the main ones and ranks them.` },
        { criterion: `Fixes are specific`, developing: `"Make it better for social."`, solid: `Fixes for most issues.`, strong: `Fixes that say where, how much and why.` },
        { criterion: `Rewrites the hook`, developing: `No rewrite.`, solid: `A rewrite that is clear.`, strong: `A rewrite that earns attention in the first seconds and fits the platform.` }
      ],
      required: true,
      before: `(Fictional) Studio Kettle cafe, vertical 9:16 reel, 12 seconds. A wide 16:9 clip was cropped to vertical, so the barista's head touches the top edge. The first three seconds are a slow logo animation with no motion in the scene. Captions sit at the very bottom, overlapped by the platform's buttons. The caption text is small, light grey on a pale background. There is no sound plan, only loud music from the first frame.`,
      modelNotes: [
        `Hook: three seconds of logo with nothing happening is a weak opening. Start on the most interesting moment, such as the steam or the pour.`,
        `Framing: a lazy crop cut the head. Regenerate or reshoot with vertical framing and headroom, or re-frame within a larger source.`,
        `Safe zone: captions under platform buttons will be unreadable. Move them into the safe area, away from the bottom edge.`,
        `Captions: small light-grey text on a pale background fails for contrast and size. Use larger text with strong contrast.`,
        `Sound: loud music from frame one is harsh for a calm brand. Start soft, build gently, and confirm the reel works with sound off.`
      ],
      after: `Open on the pour and rising steam. Hook caption: "Your first quiet minute today." Reframed vertical with headroom. Large dark captions in the safe area. Music starts soft at about one second. Logo appears only at the end.`
    },
    {
      id: `L4-E3`,
      kind: `prompt`,
      title: `A consistent set`,
      minutes: 30,
      task: `For the fictional Juniper & Co. tea, create a short character-or-product sheet and write four prompts (for example a tin on a shelf, a hand pouring, a close-up of leaves, a table setting) that keep the same style, light and palette. Then write a version of one prompt adapted for a 9:16 story with safe-zone notes.`,
      output: `A sheet, four consistent prompts, and one adapted 9:16 prompt.`,
      hints: [
        `Paste the same sheet into every prompt.`,
        `Change one thing per prompt (the subject or the action).`,
        `For the 9:16 prompt, say where the headline will go and leave space for it.`
      ],
      rubric: [
        { criterion: `Consistency`, developing: `Prompts feel unrelated.`, solid: `Shared style and light words.`, strong: `Shared sheet, style, light and palette with one change each.` },
        { criterion: `Reusable sheet`, developing: `No sheet or too vague.`, solid: `A clear sheet.`, strong: `A short, concrete sheet another person could paste and use.` },
        { criterion: `Format awareness`, developing: `Ignores the 9:16 shape.`, solid: `States the aspect ratio.`, strong: `States ratio, headroom and the area reserved for text.` }
      ],
      required: false,
      starter: `tea pictures for instagram, nice and consistent`,
      checklist: [`Includes a written character or product sheet`, `Same style and light words in every prompt`, `One change per prompt`, `Includes a short negative constraint`, `The 9:16 version names the aspect ratio and a text area`]
    }
  ],

  checkpoint: {
    criteria: [`Complete every lesson`, `Complete required exercises`, `Score 75%+ on the check`],
    passMark: 0.75,
    questions: [
      { q: `After a batch, what is the best next step?`, options: [`Start from a completely new prompt.`, `Generate hundreds more at random.`, `Pick the closest take, name what is right and wrong, and change one thing.`, `Upscale every take.`], answer: 2, explain: `Refinement treats each output as information. Keep what works, change one thing, and repeat.` },
      { q: `How do you best keep a character consistent across several prompts?`, options: [`Hope the model remembers.`, `Reuse a written character sheet and the same references and style words, changing only one thing per shot.`, `Change the description each time for variety.`, `Only describe the pose.`], answer: 1, explain: `Models do not remember between generations, so consistency has to be supplied by you.` },
      { q: `An image has a distorted hand and is also low resolution. What should you do first?`, options: [`Upscale it.`, `Add more negative words.`, `Repair the hand area (or regenerate), then upscale once the image is approved.`, `Ignore the hand.`], answer: 2, explain: `Fix content flaws first. Upscaling first would only enlarge the flaw.` },
      { q: `Why is cropping a wide video to vertical often a poor adaptation?`, options: [`It can cut the subject, mishandle safe zones and leave the hook unchanged; it should be adapted deliberately.`, `Platforms forbid cropped video.`, `Vertical video cannot include captions.`, `Cropping always improves quality.`], answer: 0, explain: `Adaptation means reframing, rewriting the hook and checking safe zones, not only cutting the picture.` },
      { q: `What is a hook in short-form video?`, options: [`The logo animation.`, `The final call to action.`, `The background music.`, `The first moment, designed to earn the viewer's next few seconds.`], answer: 3, explain: `The hook comes at the start. A logo with no action rarely earns attention, so lead with the most interesting moment.` }
    ]
  },

  instructor: {
    notes: `This level can feel mechanical, so keep it anchored in decisions: why this take, why this repair, why this crop. Make students write selection criteria before they look at the outputs. Remind them that platform guidance changes quickly and they should check current specs rather than memorise numbers. If tools are limited, run the activity with a small batch of pre-generated takes that include deliberate flaws.`,
    activity: {
      title: `Cull, repair and adapt`,
      minutes: 45,
      steps: [
        `Give each group a set of eight outputs (or a storyboard) for a fictional brand, with some deliberate flaws and one continuity error.`,
        `Groups write four selection criteria before reviewing the set.`,
        `Groups cull the set to three and justify each choice in one sentence.`,
        `For the chosen takes, groups decide whether to regenerate, repair or upscale and write their reasons.`,
        `Groups plan a 9:16 and a 4:5 adaptation with hook, safe zone and caption notes.`,
        `Present plans to the class and compare the reasons, not only the choices.`
      ]
    },
    discussion: [
      `When is it better to regenerate than to repair, and how do you decide?`,
      `How would you explain to a client why you rejected the most striking take?`,
      `What changes about a hook when the same idea moves from a wide film to a vertical feed?`
    ]
  }
});
