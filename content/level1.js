window.LU = window.LU || {};
LU.levels = LU.levels || [];
LU.levels.push({
  id: `L1`,
  num: 1,
  name: `First Steps`,
  tagline: `Understand the tools, trust your eye, and use them responsibly.`,
  summary: `This level gives you a plain-language picture of how AI image, video and audio generators work, what they do well and where they fail. You will see the whole production workflow once, practise judging creative work, and learn the habits that keep you and your clients safe.`,
  outcomes: [
    `Explain in plain words how a generator turns a text description into media.`,
    `Name the strengths and the typical failures of AI image, video and audio tools.`,
    `Describe the eleven stages of the production workflow and what each one produces.`,
    `Judge a piece of work against a brief instead of by taste alone.`,
    `Apply a responsible-use checklist: permission, likeness, attribution, disclosure, copyright caution and data privacy.`
  ],
  skills: [`direction`, `responsible`, `critique`],

  lessons: [
    {
      id: `L1-1`, title: `What generators are and how they work`, minutes: 15,
      blocks: [
        { type: `p`, text: `An **AI generator** is software that makes new images, video clips or audio from a description you write. It does not search the internet for a matching picture. It builds something new, guided by patterns it learned from a very large set of examples.` },
        { type: `p`, text: `A useful mental model: the tool has seen millions of examples of "a rainy street at night" and has learned what those tend to look like. When you ask for one, it starts from random noise and gradually shapes that noise into something that fits your words. You can steer it, but you cannot fully control it.` },
        { type: `terms`, items: [
          { term: `Model`, def: `The trained system that does the generating. Different models have different looks, strengths and limits.` },
          { term: `Prompt`, def: `The written description (and sometimes reference images) you give the model to steer the result.` },
          { term: `Generation`, def: `One attempt the model produces from your prompt. Expect to make many.` },
          { term: `Seed`, def: `A number that starts the random process. The same prompt with a different seed gives a different result.` },
          { term: `Artifact`, def: `A visible flaw in generated media, such as a hand with extra fingers or text that turns into gibberish.` }
        ] },
        { type: `flow`, title: `What happens when you generate`, steps: [`You write a prompt`, `Model reads the meaning`, `Starts from noise`, `Shapes noise step by step`, `You get several options`, `You judge and choose`], highlight: [0, 5] },
        { type: `list`, title: `What each kind of generator makes`, items: [
          `**Image generators** make a still picture. They are the fastest to iterate with, so they are often used to explore ideas first.`,
          `**Video generators** make short moving clips, usually a few seconds. Keeping a subject consistent across frames is hard for them.`,
          `**Audio generators** make music, sound effects or speech. They respond to descriptions of mood, instruments and pace.`
        ] },
        { type: `callout`, tone: `tool`, title: `Where to find the controls`, text: `Most tools let you set an aspect ratio, a length and sometimes a seed. Names and locations change between tools and versions, so check where yours puts them.` },
        { type: `example`, fictional: true, title: `Juniper & Co. tea: the first try`, text: `A student at the fictional brand Juniper & Co. tea types "tea tin on a table" and gets four images: one with a mangled logo, one with a lovely warm window light, one with a tin that has no lid, and one that looks like a stock photo. Nothing is wrong with the tool. The vague prompt left almost every decision to the model, so the four results disagree. Lesson: the model fills every gap you leave, so specific words reduce surprises.` }
      ]
    },
    {
      id: `L1-2`, title: `Strengths, limits and the workflow`, minutes: 20,
      blocks: [
        { type: `p`, text: `Knowing what a tool is bad at saves more time than knowing what it is good at. Generators are strong at mood, atmosphere, texture, variation and speed. They are weak at exact text, exact counts, precise geometry, real brand assets, and anything that must stay identical from one output to the next.` },
        { type: `compare`, title: `Good use versus risky use`, left: { label: `Plays to the strengths`, text: `Exploring five moods for a poster in an hour. Making a background plate. Creating a rough animatic to test pacing. Generating placeholder music to cut to.` }, right: { label: `Fights the limits`, text: `Rendering a legal disclaimer as readable small print. Showing the exact product packaging from every angle. Matching a real person's face reliably. Counting exactly seven candles.` } },
        { type: `p`, text: `Production is not one button. It is a chain of decisions, and the quality of each stage depends on the one before it. A weak brief produces a weak concept, and no amount of clever prompting rescues it later.` },
        { type: `flow`, title: `The full workflow`, steps: [`Brief`, `Research`, `Concept`, `Prompt`, `Generation`, `Selection`, `Editing`, `Sound`, `Polish`, `Delivery`, `Review`], highlight: [0, 3, 5] },
        { type: `terms`, items: [
          { term: `Brief`, def: `A short document stating the goal, audience, format, tone, constraints and deadline.` },
          { term: `Concept`, def: `The central idea you will express, written before you touch a tool.` },
          { term: `Selection`, def: `Choosing the best outputs and rejecting the rest on purpose.` },
          { term: `Delivery`, def: `Exporting the final files in the right format, size and naming for where they will be used.` }
        ] },
        { type: `steps`, title: `A one-minute habit for every project`, items: [
          `Write the goal in one sentence: who is this for and what should they feel or do?`,
          `List the hard constraints: format, length, things that must or must not appear.`,
          `Only then open a tool.`
        ] },
        { type: `example`, fictional: true, title: `Northline Bikes: why the brief came first`, text: `The fictional Northline Bikes wants a 15-second social clip for a spring sale. The team skips the brief and generates twenty beautiful mountain-biking clips. The shop sells commuter bikes in a flat city. All twenty clips are unusable. A five-line brief would have caught it: audience, product, setting, tone, call to action.` }
      ]
    },
    {
      id: `L1-3`, title: `Responsible use and creative judgment`, minutes: 25,
      blocks: [
        { type: `p`, text: `Using generators well includes using them fairly. The rules differ by country and by tool, and they are changing, so treat this lesson as habits, not legal advice. When a project has real money, real people or a real client at stake, check the current rules and ask the client.` },
        { type: `list`, title: `The responsible-use checklist`, items: [
          `**Permission:** do you have the right to use every input you upload, such as photos, logos, voices or footage?`,
          `**Likeness and consent:** never generate or alter a real person's face or voice without their clear consent. Be especially careful with minors and public figures.`,
          `**Attribution:** credit sources and collaborators where the licence or good practice calls for it.`,
          `**Disclosure:** be honest with clients and audiences about when AI was used, especially where it could mislead. Some platforms and clients require a label.`,
          `**Copyright caution:** do not ask a tool to copy a living artist's style or a protected character. Borrow principles, not products.`,
          `**Tool limitations:** read the tool's terms. They say what you may use outputs for, and they can change.`,
          `**Data privacy:** do not paste confidential client material, personal data or unreleased work into a tool without knowing how it stores and uses inputs.`
        ] },
        { type: `callout`, tone: `warn`, title: `When in doubt, stop and ask`, text: `If you cannot say who gave permission for an input, do not use it. Asking a client one extra question is cheap. A takedown or a broken trust is not.` },
        { type: `terms`, items: [
          { term: `Likeness`, def: `A person's recognisable face, body or voice.` },
          { term: `Disclosure`, def: `Telling people that AI helped make something.` },
          { term: `Licence`, def: `The permission, and its conditions, that lets you use someone else's work.` }
        ] },
        { type: `p`, text: `The other half of this lesson is **judgment**: deciding whether work is good for its purpose. Judge against the brief. Ask three questions: Does it do the job? Is it believable and consistent? Is it clean (no artifacts, no accidental meanings)? Personal taste matters, but it comes after the brief.` },
        { type: `compare`, title: `Two ways to give feedback`, left: { label: `Taste only`, text: `"I don't like it. Make it better."` }, right: { label: `Against the brief`, text: `"The brief asks for calm and trustworthy. The orange glow reads as urgent. Keep the composition, cool the light, and remove the second shadow under the cup."` } },
        { type: `example`, fictional: true, title: `Studio Kettle cafe: the face on the poster`, text: `The fictional Studio Kettle cafe wants a poster of a "friendly barista". An assistant uploads a photo of a real regular customer, taken at the counter, to get a likeness. The customer never agreed. The right move is to use a generated, non-specific character or hire a model who consents, and to tell the cafe owner which route was used.` }
      ]
    }
  ],

  exercises: [
    {
      id: `L1-E1`,
      kind: `scenario`,
      title: `The unclear permission`,
      minutes: 15,
      task: `Read the situation (fictional) and choose the next step. Then read the feedback on every option, including the ones you did not pick.`,
      output: `Your chosen option and one sentence explaining the principle behind it.`,
      hints: [
        `Ask who owns or controls each input.`,
        `Think about which choice is reversible if you are wrong.`,
        `A fast option is not the same as a safe option.`
      ],
      rubric: [
        { criterion: `Identifies the risk`, developing: `Picks an answer without naming the risk.`, solid: `Names the main risk (permission or consent).`, strong: `Names the risk and who could be affected.` },
        { criterion: `Chooses a reversible, honest step`, developing: `Chooses the fastest route.`, solid: `Chooses to check before proceeding.`, strong: `Chooses to check and records the answer for the project.` },
        { criterion: `Explains the principle`, developing: `Restates the answer only.`, solid: `Links the answer to a checklist item.`, strong: `Links it to a checklist item and a practical habit.` }
      ],
      required: true,
      situation: `(Fictional) You are making a short promo for Juniper & Co. tea. The client emails a folder of photos and says "use whatever you like". One photo shows a smiling woman holding a cup, and you cannot tell if she is a model, an employee or a customer. You want to feed that photo to a tool to build a character that looks like her. The deadline is tomorrow morning.`,
      options: [
        { text: `Use the photo now to save time and mention it to the client afterwards if they ask.`, correct: false, feedback: `Risky. If she did not consent, the harm is done before anyone can object, and "if they ask" hides the issue from the client.` },
        { text: `Ask the client who she is and whether she agreed to be used in AI-edited promo material, and work on other shots until you hear back.`, correct: true, feedback: `Correct. You protect the person, the client and yourself, and you keep working so the deadline is not wasted.` },
        { text: `Blur her face slightly and use it, since a blurred face is not really her likeness.`, correct: false, feedback: `A slight blur does not remove recognisability, and it does not create consent. It also lowers quality.` },
        { text: `Skip the client entirely and search for a similar-looking photo online to use instead.`, correct: false, feedback: `You would be swapping a known question for an unknown source, with its own permission problems.` }
      ]
    },
    {
      id: `L1-E2`,
      kind: `critique`,
      title: `Judge it against the brief`,
      minutes: 20,
      task: `Read the brief and the described image. Write what works, what fails and what you would change. Compare with the expert notes only after you have written your own.`,
      output: `A short critique with at least two strengths, three issues tied to the brief, and one change request written so an artist could act on it.`,
      hints: [
        `Start with the brief, not your taste.`,
        `Separate the idea from the execution: the idea may be right while the execution has artifacts.`,
        `Write change requests as an instruction, not a feeling.`,
        `Check text, hands, edges and shadows for artifacts.`
      ],
      rubric: [
        { criterion: `Uses the brief`, developing: `Comments are about taste only.`, solid: `Most comments refer to the brief.`, strong: `Every issue is tied to a line in the brief.` },
        { criterion: `Spots artifacts`, developing: `Misses obvious flaws.`, solid: `Finds the obvious flaws.`, strong: `Finds obvious and subtle flaws and ranks them.` },
        { criterion: `Actionable feedback`, developing: `"Make it nicer."`, solid: `Gives a clear change for at least one issue.`, strong: `Gives clear changes for every issue and says what to keep.` }
      ],
      required: true,
      before: `(Fictional) Brief for Studio Kettle cafe: a calm, warm image for a "Quiet Mornings" social post. Image as generated: a steaming mug on a wooden table by a window, soft low sun, a plant in the background. The mug has two handles. The chalkboard behind it says "Qiuet Mornigns". There are three shadows pointing in different directions.`,
      modelNotes: [
        `Strength: mood matches the brief. Warm, calm, low light.`,
        `Artifact: the second handle breaks believability. Fixable by regenerating or by repairing that area.`,
        `Artifact: the garbled chalkboard text will damage the brand. Remove the text and add real type later in editing.`,
        `Inconsistency: three shadows imply three light sources. Ask for one clear light direction.`,
        `A good change request keeps the composition and the light, and names each fix.`
      ],
      after: `Keep the warm window light, mug position and plant. Regenerate with one handle, one light direction from the left, and a blank chalkboard. Add the words "Quiet Mornings" as real text in editing.`
    },
    {
      id: `L1-E3`,
      kind: `task`,
      title: `Map your own workflow`,
      minutes: 20,
      task: `Pick a small creative project you could realistically do (a poster, a 10-second clip, a short sound bed). For each workflow stage, write one sentence about what you would do and one thing you would check.`,
      output: `A one-page workflow plan with a goal sentence, constraints and the checks for each stage.`,
      hints: [
        `Start with the goal sentence before listing the stages.`,
        `Stages you want to skip are often the ones you most need.`,
        `Add one responsible-use check somewhere in the plan.`
      ],
      rubric: [
        { criterion: `Covers the workflow`, developing: `Skips several stages.`, solid: `Covers all stages briefly.`, strong: `Covers all stages and shows how each feeds the next.` },
        { criterion: `Clear goal and constraints`, developing: `Goal is vague.`, solid: `Goal and format are clear.`, strong: `Goal, audience, format and limits are all clear.` },
        { criterion: `Responsible checks`, developing: `No checks listed.`, solid: `One relevant check.`, strong: `Checks placed at the right stages with reasons.` }
      ],
      required: false,
      fields: [`Project and one-sentence goal`, `Hard constraints (format, length, must-haves, must-nots)`, `Brief and research plan`, `Concept and prompt plan`, `Generation and selection plan`, `Editing, sound and polish plan`, `Delivery and review plan`, `Responsible-use checks`]
    }
  ],

  checkpoint: {
    criteria: [`Complete every lesson`, `Complete required exercises`, `Score 75%+ on the check`],
    passMark: 0.75,
    questions: [
      { q: `Which statement best describes how an image generator works?`, options: [`It searches the web for the closest existing picture and copies it.`, `It builds a new image from noise, guided by patterns learned from many examples and by your prompt.`, `It looks up your prompt in a database of finished artworks.`, `It draws exactly what you type, with no randomness.`], answer: 1, explain: `Generators create new outputs from learned patterns. Randomness is part of the process, which is why the same prompt can give different results.` },
      { q: `A generated mug has two handles. This is best described as...`, options: [`A style choice`, `A brief requirement`, `A copyright issue`, `An artifact`], answer: 3, explain: `An artifact is a visible flaw produced by the generator. Name it as such, then regenerate or repair.` },
      { q: `Why does the workflow start with a brief?`, options: [`Because every later decision depends on knowing the goal, audience and constraints.`, `Because tools will not run without one.`, `Because it makes the final files smaller.`, `Because briefs are legally required for AI use.`], answer: 0, explain: `Without a brief you cannot judge outputs or choose well. Nothing technical forces it; it simply prevents wasted work.` },
      { q: `You are unsure whether a person in a client photo agreed to be used. What is the best action?`, options: [`Use it and apologise if needed.`, `Blur the face and continue.`, `Ask the client, and do not use it until permission is clear.`, `Replace the face with a generated one that looks nearly identical.`], answer: 2, explain: `Consent must be established before use. Blurring or imitating the face does not solve the permission problem.` },
      { q: `Which feedback is most useful to an artist?`, options: [`"It feels off."`, `"Keep the composition and cool the light to match the calm tone in the brief; remove the second shadow."`, `"Try again."`, `"I would have made it differently."`], answer: 1, explain: `Good feedback is tied to the brief, says what to keep and gives specific changes.` }
    ]
  },

  instructor: {
    notes: `This level is about mindset more than technique. Spend time on the idea that generators fill gaps with guesses, and on the habit of judging against the brief. Keep the responsible-use discussion practical: use the fictional scenarios, avoid legal advice and encourage students to check current rules for real client work. Make sure every student leaves able to say what the eleven workflow stages are.`,
    activity: {
      title: `Brief, generate, judge`,
      minutes: 40,
      steps: [
        `Give each pair a fictional brief (for example Juniper & Co. tea or Northline Bikes) with goal, audience and one hard constraint.`,
        `Each pair writes a one-sentence goal and picks which workflow stages matter most for this brief.`,
        `If tools are available, each pair generates a small set of outputs. Otherwise use a printed set of sample outputs with deliberate flaws.`,
        `Pairs critique the set against the brief using the three questions: does it do the job, is it believable, is it clean.`,
        `Pairs swap critiques and run the responsible-use checklist on each other's plan.`,
        `Share one learning per pair with the class.`
      ]
    },
    discussion: [
      `Where in the workflow does a mistake cost the most, and why?`,
      `When would you tell a client that AI was used, and how would you word it?`,
      `What is the difference between borrowing a principle and copying a style?`
    ]
  }
});
