window.LU = window.LU || {};
LU.levels = LU.levels || [];
LU.levels.push({
  id: `L2`,
  num: 2,
  name: `Prompt Builder`,
  tagline: `Write prompts that say what you mean, then test them properly.`,
  summary: `A prompt is a set of decisions written down. This level teaches you the parts of a good prompt, how to adjust them for images, motion and sound, and how to test changes one at a time so you learn what actually works. You will also keep a prompt log so good results can be repeated.`,
  outcomes: [
    `Break any prompt into subject, action, setting, style, light, camera, mood, format and constraints.`,
    `Write prompts suited to an image, a moving clip and a music or sound description.`,
    `Change one variable at a time and record what it did.`,
    `Use negative constraints without overloading a prompt.`,
    `Keep a prompt log that another person could reuse.`
  ],
  skills: [`prompting`],

  lessons: [
    {
      id: `L2-1`, title: `The anatomy of a prompt`, minutes: 20,
      blocks: [
        { type: `p`, text: `A strong prompt answers the questions a human artist would ask before starting: what is it, what is happening, where, in what look, lit how, seen from where, feeling like what, in which shape, and what must be avoided. Leave a question unanswered and the model will answer it for you, often not the way you wanted.` },
        { type: `prompt`, title: `One idea, nine parts`, parts: [
          { label: `Subject`, text: `a hand-thrown ceramic teapot` },
          { label: `Action`, text: `steam curling from the spout` },
          { label: `Setting`, text: `on a dark oak shelf in a quiet kitchen` },
          { label: `Style`, text: `warm editorial product photograph, natural textures` },
          { label: `Light`, text: `soft window light from the left, gentle shadow` },
          { label: `Camera`, text: `35mm look, eye level, shallow depth of field` },
          { label: `Mood`, text: `calm, unhurried, early morning` },
          { label: `Format`, text: `4:5 portrait, space at the top for a headline` },
          { label: `Constraints`, text: `no text, no logos, no people` }
        ] },
        { type: `terms`, items: [
          { term: `Subject`, def: `The main thing in the frame.` },
          { term: `Depth of field`, def: `How much of the picture is sharp. Shallow means only the subject is sharp and the background is soft.` },
          { term: `Composition`, def: `How things are arranged inside the frame.` },
          { term: `Aspect ratio`, def: `The shape of the frame, written as width:height, such as 16:9 or 9:16.` }
        ] },
        { type: `list`, title: `Order and weight`, items: [
          `Put the most important idea first. Many models give early words more weight.`,
          `Prefer concrete words ("brushed steel") over vague ones ("nice material").`,
          `Do not stack contradictory styles. "Minimal and ornate" gives the model nothing to decide with.`,
          `Shorter is not always better. Aim for complete, not long.`
        ] },
        { type: `callout`, tone: `tool`, title: `Prompt length and syntax`, text: `Some tools prefer full sentences, others respond to short phrases, and some support special weighting syntax. Check your tool's current guidance and test both styles.` },
        { type: `example`, fictional: true, title: `Juniper & Co. tea: vague to specific`, text: `Vague: "nice tea packaging photo". Specific: "a matte green tea tin with a plain cream label, on a pale linen cloth, soft morning window light from the left, top-down view, calm and clean, 4:5, no text". The second prompt makes the major decisions for the model, so differences between outputs become small and useful.` }
      ]
    },
    {
      id: `L2-2`, title: `Prompting for image, motion and sound`, minutes: 25,
      blocks: [
        { type: `p`, text: `The same nine parts apply everywhere, but their importance shifts. Images care most about composition and light. Video adds time, so you must say what moves and how the camera moves. Sound has no picture, so you describe mood, instruments, pace and structure.` },
        { type: `prompt`, title: `A video prompt: motion becomes the star`, parts: [
          { label: `Subject`, text: `a courier on a red commuter bike` },
          { label: `Action`, text: `rides toward camera, slows, and smiles` },
          { label: `Setting`, text: `a wet city street at dawn` },
          { label: `Camera`, text: `slow dolly back, steady, eye level` },
          { label: `Light`, text: `cool blue morning with warm shop-window glow` },
          { label: `Mood`, text: `hopeful, quiet energy` },
          { label: `Format`, text: `9:16 vertical, 5 seconds` },
          { label: `Constraints`, text: `one rider only, no text, no logos` }
        ] },
        { type: `p`, text: `Keep video actions simple. One subject doing one clear thing works better than a crowd doing several. Complex choreography is where models break, so plan to build complexity in the edit by joining several simple shots.` },
        { type: `prompt`, title: `A sound description: no picture, so describe the feel`, parts: [
          { label: `Subject`, text: `instrumental track for a café reel` },
          { label: `Mood`, text: `warm, relaxed, a little playful` },
          { label: `Style`, text: `acoustic guitar, soft brushed drums, light bass` },
          { label: `Action`, text: `gentle intro, groove from 4 seconds, soft ending` },
          { label: `Format`, text: `about 20 seconds, around 90 beats per minute, loop-friendly` },
          { label: `Constraints`, text: `no vocals, no sudden loud hits` }
        ] },
        { type: `terms`, items: [
          { term: `Dolly`, def: `A camera move toward or away from the subject, as if on wheels.` },
          { term: `Pan`, def: `Turning the camera left or right without moving its position.` },
          { term: `BPM`, def: `Beats per minute, the speed of music.` },
          { term: `Loop-friendly`, def: `Ends in a way that can restart smoothly.` }
        ] },
        { type: `compare`, title: `Same goal, two prompts`, left: { label: `Image-style prompt used for video`, text: `"A courier on a red bike, cinematic, beautiful, dramatic, 4k."` }, right: { label: `Motion-aware prompt`, text: `"A courier on a red bike rides toward camera and slows, slow dolly back, wet street at dawn, cool light, 9:16, 5 seconds, one rider only."` } },
        { type: `example`, fictional: true, title: `Northline Bikes: three formats, one idea`, text: `For the fictional Northline Bikes spring sale, the team writes one idea ("the first dry morning of spring") three ways: a still for a poster, a five-second clip for stories, and a sound description for a background track. The idea stays the same. The wording changes to fit what each medium needs: composition for the still, motion for the clip, mood and pace for the sound.` }
      ]
    },
    {
      id: `L2-3`, title: `Testing, negatives and the prompt log`, minutes: 25,
      blocks: [
        { type: `p`, text: `If you change five things at once, you cannot know which one helped. **Controlled testing** means changing one variable, keeping the rest the same, and comparing results. It feels slower but it is how you build reliable skill.` },
        { type: `steps`, title: `A simple testing loop`, items: [
          `Write a baseline prompt and generate a small batch.`,
          `Decide what you want to learn (for example: does a lower camera angle feel more heroic?).`,
          `Change only that one part. Keep everything else the same, including the seed if your tool allows it.`,
          `Generate another small batch and compare the two sets side by side.`,
          `Write down what changed and whether you keep it.`
        ] },
        { type: `terms`, items: [
          { term: `Variable`, def: `One thing you can change, such as camera angle, light or colour palette.` },
          { term: `Baseline`, def: `The starting prompt you compare every change against.` },
          { term: `Negative constraint`, def: `A statement of what you do not want, such as "no text" or "no extra people".` },
          { term: `Prompt log`, def: `A record of prompts, settings and results so good outcomes can be repeated.` }
        ] },
        { type: `p`, text: `**Negative constraints** help, but a long list of "do not" can confuse a model, and mentioning an unwanted thing can even make it appear. Use a short list for real problems you have seen, such as text or extra people, and fix the rest by describing what you do want.` },
        { type: `callout`, tone: `tool`, title: `Negative prompt fields`, text: `Some tools have a separate field for things to avoid; others expect you to write it inside the main prompt. Check how yours handles it.` },
        { type: `timeline`, title: `A testing session plan (minutes)`, duration: 30, tracks: [
          { name: `Baseline`, clips: [{ label: `Write + generate`, start: 0, end: 6 }] },
          { name: `Test`, clips: [{ label: `Change light`, start: 6, end: 14 }, { label: `Change angle`, start: 14, end: 22 }] },
          { name: `Record`, clips: [{ label: `Log results`, start: 22, end: 30 }] }
        ] },
        { type: `example`, fictional: true, title: `A log entry for Studio Kettle cafe`, text: `Date: today. Goal: calm hero image for "Quiet Mornings". Baseline prompt: "ceramic mug on oak table, window light, calm, 4:5". Change tested: light direction only (left vs. behind). Result: behind-light made steam visible and felt warmer; left-light looked flatter. Decision: keep behind-light. Next test: mug position. Anyone reading this log can repeat the result.` }
      ]
    }
  ],

  exercises: [
    {
      id: `L2-E1`,
      kind: `prompt`,
      title: `Rescue the weak prompt`,
      minutes: 20,
      task: `Rewrite the starter prompt for the fictional Northline Bikes spring sale poster. Use at least six of the nine parts and write it as one clear paragraph. Then say which decision you made on purpose for each part.`,
      output: `A revised prompt and a short note listing the parts you used and why.`,
      hints: [
        `Decide the format before the style.`,
        `Make the light and mood specific, not just "nice".`,
        `Add one negative constraint for something you do not want.`
      ],
      rubric: [
        { criterion: `Completeness`, developing: `Uses fewer than four parts.`, solid: `Uses six or more parts.`, strong: `Uses most parts and orders them by importance.` },
        { criterion: `Specificity`, developing: `Mostly vague words.`, solid: `Mostly concrete words.`, strong: `Concrete words that do not contradict each other.` },
        { criterion: `Fit to the brief`, developing: `Ignores the sale and the audience.`, solid: `Fits the sale and the audience.`, strong: `Fits them and leaves space for the headline.` }
      ],
      required: true,
      starter: `bike poster, cool, sale, cinematic, awesome`,
      checklist: [`Names a clear subject`, `Describes an action or pose`, `Gives a setting`, `Specifies a style`, `Specifies light`, `States a mood`, `Gives the format or aspect ratio`, `Includes a short negative constraint`]
    },
    {
      id: `L2-E2`,
      kind: `scenario`,
      title: `The results are all over the place`,
      minutes: 15,
      task: `Read the situation (fictional) and choose the best next step. Read the feedback for every option.`,
      output: `Your chosen step and one sentence describing the testing principle behind it.`,
      hints: [
        `What would you need to know to improve the next batch?`,
        `If you change many things, can you tell which one worked?`,
        `Think about the baseline.`
      ],
      rubric: [
        { criterion: `Applies controlled testing`, developing: `Picks a random change.`, solid: `Picks a single-variable change.`, strong: `Picks a single-variable change and names the baseline.` },
        { criterion: `Reads the evidence`, developing: `Ignores the batch.`, solid: `Refers to the batch results.`, strong: `Names a pattern in the batch.` },
        { criterion: `Explains the reason`, developing: `Restates the answer.`, solid: `Gives a reason.`, strong: `Gives a reason and the follow-up test.` }
      ],
      required: true,
      situation: `(Fictional) You generate six images for Juniper & Co. tea. Three look warm and inviting, three look cold and blue, and you cannot tell why. Your prompt mentions "morning light", a "pale cloth", "minimal" and "cinematic" and "moody". The client wants warm and inviting.`,
      options: [
        { text: `Rewrite the whole prompt from scratch with new words and hope for better luck.`, correct: false, feedback: `You lose your baseline and learn nothing about what caused the cold look.` },
        { text: `Add ten more "do not" words such as "no blue, no cold, no dark, no grey".`, correct: false, feedback: `Long negative lists can confuse the model and may even bring the unwanted look forward. Describe the light you want instead.` },
        { text: `Keep everything the same except remove "moody" and "cinematic", which often push toward cold, dark looks, then compare a new batch to this one.`, correct: false, feedback: `Close, but removing two words at once muddies the test. Change one thing at a time.` },
        { text: `Keep everything else identical and change one thing: replace "morning light" with "warm window light from the left", then compare batches.`, correct: true, feedback: `Correct. One variable, one baseline, and a direct link to the client's request.` }
      ]
    },
    {
      id: `L2-E3`,
      kind: `prompt`,
      title: `Three media, one idea`,
      minutes: 25,
      task: `Pick the idea "the first warm day" for the fictional Studio Kettle cafe. Write one image prompt, one five-second video prompt, and one sound description. Keep the idea consistent but adapt each prompt to its medium.`,
      output: `Three prompts and a prompt-log entry for one test you would run next.`,
      hints: [
        `The video prompt needs a camera move and a simple action.`,
        `The sound description needs mood, instruments and pace.`,
        `Log the single variable you plan to test.`,
        `Write the log entry so a stranger could repeat it.`
      ],
      rubric: [
        { criterion: `Fits each medium`, developing: `Same text pasted three times.`, solid: `Wording adapted for each medium.`, strong: `Wording adapted and uses the strengths of each medium.` },
        { criterion: `Consistent idea`, developing: `Three unrelated ideas.`, solid: `One idea throughout.`, strong: `One idea with matching mood and palette across all three.` },
        { criterion: `Log quality`, developing: `No log.`, solid: `Log lists prompt and goal.`, strong: `Log lists prompt, one variable, expected result and next step.` }
      ],
      required: false,
      starter: `warm day cafe image video music`,
      checklist: [`Image prompt names composition and light`, `Video prompt names a camera move and one action`, `Sound description names mood, instruments and pace`, `All three share one mood`, `Log entry names one variable`]
    }
  ],

  checkpoint: {
    criteria: [`Complete every lesson`, `Complete required exercises`, `Score 75%+ on the check`],
    passMark: 0.75,
    questions: [
      { q: `Why is it better to name the light in a prompt than to write "nice lighting"?`, options: [`Because tools ignore the word "nice".`, `Because specific light (direction, softness, colour) removes a decision the model would otherwise guess.`, `Because it makes the prompt longer.`, `Because light is the only thing that affects quality.`], answer: 1, explain: `Vague words leave the choice to the model. Specific words make results more predictable.` },
      { q: `What makes a video prompt different from an image prompt?`, options: [`It must be much longer.`, `It should avoid describing the setting.`, `It must include time: what moves and how the camera moves.`, `It cannot include a style.`], answer: 2, explain: `Video adds time. Subject action and camera movement become key parts of the prompt.` },
      { q: `You change the angle, the colour palette and the subject at once, and the result improves. What is the problem?`, options: [`There is no problem.`, `You cannot tell which change helped.`, `Tools do not allow multiple changes.`, `The result cannot really have improved.`], answer: 1, explain: `Controlled testing changes one variable so you can link cause and effect.` },
      { q: `Which is the best use of a negative constraint?`, options: [`A long list of every unwanted thing you can imagine.`, `Describing the whole image in negatives.`, `Replacing the subject.`, `A short list for a real problem you have seen, such as "no text".`], answer: 3, explain: `Short, targeted negatives help. Long lists can confuse the model, so describe what you want instead.` },
      { q: `What is the main purpose of a prompt log?`, options: [`To make good results repeatable and show what you learned.`, `To store the final files.`, `To prove the tool is working.`, `To lengthen the prompt.`], answer: 0, explain: `A log lets you or a colleague repeat a result and avoid repeating failed tests.` }
    ]
  },

  instructor: {
    notes: `Students often write long prompts that are really lists of adjectives. Push them toward complete, concrete, non-contradictory prompts. Insist on the one-variable rule during exercises, and have them show their logs. If tools are unavailable, run the activity as a paper exercise where one student acts as the model and draws or describes the result.`,
    activity: {
      title: `The one-variable relay`,
      minutes: 35,
      steps: [
        `Give each small group the same baseline prompt for a fictional product.`,
        `Each group chooses one variable (light, angle, mood or palette) and writes two versions of the prompt that differ only in that variable.`,
        `Groups generate or sketch results for both versions.`,
        `Groups write a prompt-log entry with goal, change, result and decision.`,
        `Swap logs between groups. Each group tries to reproduce the other group's result from the log alone.`,
        `Discuss what was missing from logs that could not be reproduced.`
      ]
    },
    discussion: [
      `When is a long prompt helpful and when does it hurt?`,
      `What is one thing you tried to fix with a negative that would have been better described positively?`,
      `How would a good prompt log change the way a team works together?`
    ]
  }
});
