window.LU = window.LU || {};
LU.levels = LU.levels || [];
LU.levels.push({
  id: "L5",
  num: 5,
  name: "Finisher",
  tagline: "Turn good clips into a finished, deliverable piece.",
  summary: "Generation gives you raw material. This level is about everything after it: planning the edit, building a soundscape, sourcing and licensing music, and exporting files that play correctly where they are going. You learn to make decisions about rhythm, sound and delivery, and to explain the reasons.",
  outcomes: [
    "Plan an edit with a shot list and a paper edit before touching the timeline",
    "Control pacing, transitions and continuity, and version a project cleanly (v01, v02, cutdowns)",
    "Research, evaluate, organise and license music and sound effects, keeping proof of the source",
    "Design a layered soundscape and explain ducking and loudness targets in simple terms",
    "Choose delivery specs (codec, frame rate, aspect ratio, captions) to match the destination"
  ],
  skills: ["editing", "music", "soundscape", "critique"],

  lessons: [
    {
      id: "L5-1",
      title: "Planning the edit: shot lists, paper edits, rhythm and versions",
      minutes: 25,
      blocks: [
        { type: "p", text: "An edit that starts on the timeline with no plan usually turns into a pile of nice shots with no shape. Planning is cheaper than re-cutting. Before you open any editing software, you decide **what the piece says, in what order, and how long each part gets**." },
        { type: "terms", items: [
          { term: "Shot list", def: "A numbered list of every shot you have or need, with a short description and its role (hook, proof, detail, closer)." },
          { term: "Paper edit", def: "A written version of the edit: the order of shots, the words or sounds with them, and rough timings. You can judge the story on paper before spending time on the timeline." },
          { term: "Pacing", def: "How fast information and images arrive over the length of the piece." },
          { term: "Rhythm", def: "The pattern of long and short shots. Even rhythm feels flat; contrast gives the viewer something to feel." },
          { term: "Continuity", def: "Things that should stay the same from shot to shot (colour, light direction, props, character look, screen direction) so the cut does not feel like a mistake." },
          { term: "Cutdown", def: "A shorter version of a finished edit, such as 30, 15 or 6 seconds, made for a different placement." }
        ] },
        { type: "flow", title: "Where editing sits in the workflow", steps: ["Brief", "Research", "Concept", "Prompt", "Generation", "Selection", "Editing", "Sound", "Polish", "Delivery", "Review"], highlight: [5, 6, 7] },
        { type: "p", text: "A good paper edit gives every shot a **job**. If you cannot say what a shot is doing (introducing, proving, surprising, resting), it probably should not be in the piece. Rank your selects: keep the best hook, the best proof, and the best final frame first, then fill in between." },
        { type: "timeline", title: "A 30 second edit plan (fictional product reel)", duration: 30,
          tracks: [
            { name: "Video", clips: [
              { label: "Hook: steam rising", start: 0, end: 3 },
              { label: "Pour, close", start: 3, end: 8 },
              { label: "Hands, tin, shelf", start: 8, end: 16 },
              { label: "Window light, sip", start: 16, end: 24 },
              { label: "Pack shot + logo", start: 24, end: 30 }
            ] },
            { name: "Text / titles", clips: [
              { label: "Line 1", start: 4, end: 8 },
              { label: "Line 2", start: 17, end: 22 },
              { label: "End card", start: 25, end: 30 }
            ] },
            { name: "Music", clips: [
              { label: "Soft intro", start: 0, end: 12 },
              { label: "Lift", start: 12, end: 26 },
              { label: "Tail", start: 26, end: 30 }
            ] }
          ] },
        { type: "p", text: "**Transitions** are punctuation. A plain cut is a full stop: it says the next thing follows. A dissolve says time passed or the mood is soft. A wipe or a flashy effect draws attention to itself, so use it only when the effect carries meaning. If every transition is different, none of them mean anything." },
        { type: "list", title: "Continuity checks for generated footage", items: [
          "Light direction and colour temperature roughly match between neighbouring shots",
          "Subject look (clothing, props, proportions) does not drift between clips",
          "Screen direction stays consistent: if someone walks left to right, the next shot should not reverse it without a reason",
          "Motion speed feels the same; slow-motion looking clips next to fast ones jar",
          "Cut on movement or on a sound, so the eye is busy and hides the join"
        ] },
        { type: "p", text: "**Versioning** protects you. Save each meaningful change as a new version (v01, v02, v03) instead of overwriting, and keep a one-line change note. When the client says 'go back to how it was on Tuesday', you can. Cutdowns are separate deliverables: the 15s is not just the 30s sped up. Pick the hook, one proof, and the closer, and drop the rest." },
        { type: "compare", title: "Naming versions", left: { label: "Hard to track", text: "final.mp4, final2.mp4, final_REAL.mp4, final_use_this.mp4" }, right: { label: "Easy to track", text: "JuniperTea_Reel_30s_v03_2026-03-02.mp4 with a note: 'v03: shorter hook, new end card'" } },
        { type: "example", fictional: true, title: "Juniper & Co. tea: 30s to 6s", text: "Juniper & Co. tea needs a 30s film, a 15s cutdown and a 6s bumper. The editor keeps the steam hook (0-3s) in all three. The 15s uses hook, pour and pack shot. The 6s is only steam, one sip, logo. Each file is checked on a phone with the sound off, because many viewers will see it that way. (Invented brand, for teaching.)" },
        { type: "callout", tone: "tool", title: "Editing software", text: "Most editing apps have markers, bins and a way to duplicate a timeline for versions. Menu names change between releases, so check your tool's current documentation; the planning method above does not depend on any one app." }
      ]
    },
    {
      id: "L5-2",
      title: "Music and sound effects: find, judge, organise, license",
      minutes: 25,
      blocks: [
        { type: "p", text: "Sound is roughly half of how a piece feels. Music chosen late and in a hurry is the most common reason an otherwise good edit feels cheap. Treat music as a **researched decision**, the same way you treat visual reference." },
        { type: "terms", items: [
          { term: "Licence", def: "The written permission that says how you may use a piece of music or sound: where, for how long, in what kind of project." },
          { term: "Royalty-free", def: "Usually means you pay once (or nothing) instead of per use. It does NOT mean free of rules. Always read the terms." },
          { term: "Stock library", def: "A catalogue of pre-made music and sound effects you license for use." },
          { term: "AI-generated audio", def: "Music or sound made by a generator. The terms of use and ownership rules differ by service and change over time, so check them for every project." },
          { term: "Cue sheet", def: "A simple table listing each piece of audio in the finished piece: title, source, licence, start and end time." },
          { term: "Stem", def: "A part of a music track on its own (drums, melody, bass) which lets you remove or lower one layer." }
        ] },
        { type: "steps", title: "A method for choosing music", items: [
          "Write the emotional brief in words first (calm, warm, building, never cheesy), plus a tempo range and what to avoid.",
          "Collect 5 to 8 candidates from licensed sources. Do not fall in love with a track you cannot legally use.",
          "Test each against the picture with the rough cut playing. Mute your eyes: does it fit the first 5 seconds?",
          "Check structure: does it have a moment that can land on your key beat or end card, and can it be cut cleanly?",
          "Check the licence for your use (paid ads, social, broadcast, client site), the territory and the term. Save a copy of the licence.",
          "Log the decision and the source in a cue sheet before you move on."
        ] },
        { type: "compare", title: "Evaluating a candidate track", left: { label: "Weak reason", text: "'I like this one, it is on my playlist.'" }, right: { label: "Strong reason", text: "'Slow build over 12s matches the pour; lift at 0:12 lands on the sip; stems let me drop the drums for the quiet end card; licence covers paid social for 12 months.'" } },
        { type: "list", title: "Licensing red flags", items: [
          "You cannot find who owns the track or where it came from",
          "The licence says 'personal use' or 'non-commercial' and the project is for a client",
          "A 'free' download with no written terms",
          "Music ripped from a video platform or a streaming service",
          "A track that sounds exactly like a famous song (risk of a copyright claim even if the audio is new)"
        ] },
        { type: "p", text: "**Sound effects (SFX)** follow the same logic. Keep one folder per project with the original download, the licence file and a short note. If a client or a platform later asks 'where did this sound come from?', you answer in one minute instead of one day." },
        { type: "example", fictional: true, title: "A cue sheet for Northline Bikes", text: "Northline Bikes (invented) ships a 20s ad. Cue sheet: (1) 'Open Road' music, stock library, licence file saved as NB_music_01.pdf, 0:00-0:20. (2) Chain whirr SFX, stock library, NB_sfx_02.pdf, 0:03-0:06. (3) Voice-over, recorded in-house by the team, no licence needed, release form signed. The producer can paste this table into the delivery email." },
        { type: "callout", tone: "warn", title: "Generated and found audio", text: "Do not assume that audio is safe because it was easy to get. For anything a client will publish, confirm the source, the licence and that your use is allowed. When unsure, replace it with a track you can document." },
        { type: "callout", tone: "tool", title: "Library and generator terms", text: "Each stock site and audio generator has its own licence tiers and rules, and they change. Read the current terms on the day you license, and save a copy with your project files." }
      ]
    },
    {
      id: "L5-3",
      title: "Sound design and delivery: layers, ducking, loudness, export",
      minutes: 30,
      blocks: [
        { type: "p", text: "A **soundscape** is built from layers. Each layer has a job, and the mix is the act of deciding which layer is in front at each moment. Beginners usually add too much; professionals decide what to leave out." },
        { type: "terms", items: [
          { term: "Ambience", def: "The continuous background sound of a place (room tone, wind, street). It makes shots feel like they belong to one space." },
          { term: "Foley", def: "Everyday sounds made or recorded to match on-screen action (footsteps, cloth, cup on saucer)." },
          { term: "SFX", def: "Designed or library sound effects: whooshes, hits, risers, UI sounds." },
          { term: "Dialogue / VO", def: "Spoken words. VO means voice-over: a voice that is not seen speaking. Always the priority layer." },
          { term: "Ducking", def: "Automatically or manually lowering music (or ambience) while someone speaks, then bringing it back." },
          { term: "Loudness (LUFS)", def: "A measure of how loud a piece sounds to people over its whole length. A target lets different videos play at similar volume." },
          { term: "Peak / clipping", def: "The loudest instant in the audio. If it goes over the maximum, the sound distorts (clips)." }
        ] },
        { type: "timeline", title: "A sound map for a 20s piece (fictional)", duration: 20,
          tracks: [
            { name: "Ambience", clips: [{ label: "Cafe room tone", start: 0, end: 20 }] },
            { name: "Foley / SFX", clips: [
              { label: "Cup set down", start: 3, end: 4 },
              { label: "Steam hiss", start: 6, end: 9 },
              { label: "Whoosh to logo", start: 15, end: 16.5 }
            ] },
            { name: "Music", clips: [{ label: "Warm piano bed", start: 0, end: 20 }] },
            { name: "VO", clips: [{ label: "Line 1", start: 5, end: 10 }, { label: "Line 2", start: 11, end: 15 }] }
          ] },
        { type: "p", text: "Read the map top to bottom at the 7 second mark: ambience under everything, steam hiss as detail, the first line of VO on top, music lowered under the voice. That is **ducking in practice**: music sits at a comfortable level alone, then drops by a few decibels whenever the VO is speaking." },
        { type: "p", text: "**Loudness explained simply.** Think of LUFS as the average volume a listener feels. The more negative the number, the quieter (-23 is quieter than -14). Platforms often adjust videos that are too loud or too quiet, so aim for the target they publish. A common target for many streaming and social platforms is around -14 LUFS, with true peak kept under about -1 dB — common targets, check the platform's current spec. Broadcast and some clients use different targets, so ask." },
        { type: "list", title: "Delivery specs to decide with the client", items: [
          "Aspect ratio: common targets are 16:9 horizontal, 9:16 vertical, 1:1 or 4:5 for feeds — check the platform's current spec",
          "Frame rate: keep the rate you shot or generated at where possible (often 24, 25, 30 fps); mixing rates causes stutter",
          "Resolution: match or slightly exceed the destination; do not upscale blindly and call it higher quality",
          "Codec and container: a widely supported video codec in an MP4 file is a common safe default for web and social; masters may use higher-quality formats",
          "Captions: burned-in (open) captions are part of the picture; sidecar files (such as SRT) let the platform show or hide them",
          "Safe zones: keep important text away from edges and from areas covered by platform buttons"
        ] },
        { type: "compare", title: "Master vs delivery file", left: { label: "Master", text: "Highest-quality export kept for the archive. Large file. Used to make other versions later." }, right: { label: "Delivery file", text: "Compressed for the destination (web, social, TV). Smaller file. Made from the master, never re-compressed from another delivery file." } },
        { type: "example", fictional: true, title: "Studio Kettle cafe: delivery sheet", text: "Studio Kettle (invented cafe) gets: Master_16x9_v05 (archive), Social_9x16_30s_v05 with burned-in captions, Social_9x16_15s_v05 and Bumper_9x16_6s_v05, plus a separate captions file for the website version. Audio checked at about -14 LUFS, with peaks under -1 dB, on the producer's headphones AND a phone speaker." },
        { type: "callout", tone: "tip", title: "The phone test", text: "Before delivery, watch every version on a phone, once with sound off (do the captions carry the message?) and once with sound on at normal volume (can you hear the voice?)." },
        { type: "callout", tone: "tool", title: "Export presets", text: "Editing and audio apps ship export presets and loudness meters whose names and defaults change between versions. Check your tool's current options and compare the result against the platform's published spec." }
      ]
    }
  ],

  exercises: [
    {
      id: "L5-E1",
      kind: "scenario",
      title: "The client wants one more change",
      minutes: 15,
      task: "Read the situation and choose the best next step. Read the feedback on every option, including the ones you did not pick.",
      output: "Your chosen option plus a one-sentence reason in your own words.",
      hints: [
        "Ask what protects the work you have already approved.",
        "Think about what you can undo later.",
        "A good producer keeps a record before changing anything."
      ],
      rubric: [
        { criterion: "Decision quality", developing: "Picks an option without weighing consequences", solid: "Picks the best option and names one reason", strong: "Picks the best option and explains the risk avoided by the others" },
        { criterion: "Use of versioning", developing: "Does not mention versions", solid: "Mentions saving a new version", strong: "Links the version, a change note and the client's approval" },
        { criterion: "Communication", developing: "No message to the client considered", solid: "Plans to confirm the change in writing", strong: "Plans a short written confirmation naming scope and effect on delivery" }
      ],
      required: true,
      situation: "(Fictional) Juniper & Co. tea approved v04 of the 30s film yesterday. Today the client emails: 'Can we swap the music for something more upbeat? Also the 15s and 6s are due tonight.' You have the master project open and three cutdowns half-built from v04.",
      options: [
        { text: "Overwrite the current project with the new music and rebuild all versions so nothing looks out of date.", correct: false, feedback: "Overwriting removes the approved v04. If the client dislikes the new music you cannot go back quickly." },
        { text: "Duplicate the project as v05, replace the music there, note the change, and confirm in writing that the 15s and 6s will follow the same v05 music.", correct: true, feedback: "Right. The approved version stays safe, the change is traceable, and the cutdowns stay consistent with the new direction." },
        { text: "Finish the cutdowns with the old music tonight and tell the client the music change can be done next week.", correct: false, feedback: "This makes the client wait, and you then create two sets of files that disagree. Check the intent first and keep the set consistent." },
        { text: "Pick a random upbeat track from your drive and swap it in without telling the client the source.", correct: false, feedback: "The source and licence are unknown, so you risk a copyright claim, and the client has not approved the track." }
      ]
    },
    {
      id: "L5-E2",
      kind: "task",
      title: "Plan a soundscape",
      minutes: 30,
      task: "(Fictional) Studio Kettle cafe wants a 20 second vertical ad: morning light, a barista pours a flat white, a customer smiles, the logo appears. Plan the soundscape layer by layer. For each field write what you would use, when it enters and leaves, and why. Keep it practical enough that another person could build it.",
      output: "A filled soundscape plan with six fields, ready to hand to an editor.",
      hints: [
        "Start with ambience: it carries the place. Then add only what the action needs.",
        "Decide where the voice (if any) sits and what music does underneath it.",
        "Write a source and licence note for every piece, even if the answer is 'recorded ourselves'.",
        "Mark the one moment that should be loudest and keep everything else lower."
      ],
      rubric: [
        { criterion: "Layer logic", developing: "Layers listed with no timing or purpose", solid: "Each layer has timing and a purpose", strong: "Layers support each other and one clear focus per moment is stated" },
        { criterion: "Mix thinking", developing: "No mention of levels or ducking", solid: "Mentions music lowering under voice", strong: "Names a loudness target as a check against the platform spec and a phone-speaker test" },
        { criterion: "Sourcing", developing: "Sources missing", solid: "Source named for each layer", strong: "Source, licence type and where the licence file is stored for each layer" }
      ],
      required: true,
      fields: ["Ambience", "Foley/SFX", "Music", "Dialogue/VO", "Mix notes", "Licence/source"]
    },
    {
      id: "L5-E3",
      kind: "critique",
      title: "Critique a rough cut",
      minutes: 25,
      task: "Read the description of the rough cut. List what an expert editor would flag, then compare your list with the model notes and read the revised version.",
      output: "Your own list of at least four issues, then a short note on what you missed.",
      hints: [
        "Check rhythm: are all the shots the same length?",
        "Check sound: what is competing with what?",
        "Check delivery: is the file right for where it will be seen?"
      ],
      rubric: [
        { criterion: "Observation", developing: "Names one or two obvious issues", solid: "Names four issues with specifics", strong: "Names issues and ranks them by impact on the viewer" },
        { criterion: "Reasoning", developing: "Says 'I do not like it'", solid: "Gives a reason for each issue", strong: "Gives a reason and a fix for each issue" },
        { criterion: "Comparison", developing: "Skips the model notes", solid: "Notes what was missed", strong: "Explains why the missed item matters and how to spot it next time" }
      ],
      required: false,
      before: "(Fictional) Northline Bikes 20s ad, rough cut v01. Every shot is exactly 2 seconds long, with a different flashy transition between each. The music is a loud track with vocals that plays at full volume the whole time, and the voice-over is mixed underneath it. The rider's jacket is red in shot 2 and orange in shot 5. The file is a 16:9 export, but it will be posted as a vertical story, with the logo at the very bottom edge. The captions are small white text over a bright sky.",
      modelNotes: [
        "Rhythm is flat: identical shot lengths feel mechanical. Vary lengths and let key shots breathe.",
        "Transitions are random and call attention to themselves; use cuts, with one planned effect at most.",
        "Music with vocals competes with the voice-over; the voice is the priority, so use an instrumental or duck the music well under it.",
        "Continuity: the jacket colour changes between shots. Re-pick the shot or regenerate it.",
        "Format mismatch: 16:9 for a vertical placement means a crop or black bars; re-frame for 9:16.",
        "The logo is in an unsafe zone where platform buttons or edges may cover it; move it inside the safe area.",
        "Captions have low contrast against the sky; add a background or move them."
      ],
      after: "v02: shot lengths vary from 1 to 5 seconds, with the best product shot held longest. All transitions are cuts except one dissolve into the end card. Music is an instrumental bed, ducked under the voice-over. The jacket shot in shot 5 is replaced with a matching one. The ad is re-framed for 9:16 with the logo and captions inside the safe area and captions on a soft dark box."
    }
  ],

  checkpoint: {
    criteria: ["Complete every lesson", "Complete required exercises", "Score 75%+ on the check"],
    passMark: 0.75,
    questions: [
      {
        q: "What is the main benefit of making a paper edit before the timeline?",
        options: [
          "It makes the final export smaller",
          "You can judge the story order and timing cheaply before spending time cutting",
          "It removes the need for music",
          "It lets you skip the review step"
        ],
        answer: 1,
        explain: "A paper edit lets you test the shape of the story in writing. Changing a list is quicker than re-cutting footage."
      },
      {
        q: "A client approved v04 and asks for a music change. What is the safest approach?",
        options: [
          "Save as v05 with a change note and keep v04 intact",
          "Overwrite v04 so there is only one file",
          "Wait until the client forgets the request",
          "Send both files with no explanation"
        ],
        answer: 0,
        explain: "A new version protects the approved work, records what changed, and lets you go back if needed."
      },
      {
        q: "Which statement about royalty-free music is correct?",
        options: [
          "It can be used anywhere without reading any terms",
          "It means the track is in the public domain",
          "It usually means no per-use fee, but the licence terms still decide what you may do",
          "It is always safe for paid advertising"
        ],
        answer: 2,
        explain: "Royalty-free describes the payment model, not the permission. The licence still sets limits on use."
      },
      {
        q: "What does ducking do?",
        options: [
          "Raises the music when someone speaks",
          "Removes background noise from the voice",
          "Lowers the music (or other layer) while the voice is speaking",
          "Converts the audio to a smaller file"
        ],
        answer: 2,
        explain: "Ducking keeps speech clear by lowering competing layers while it plays, then restoring them."
      },
      {
        q: "A common streaming loudness target is around -14 LUFS. How should you treat that number?",
        options: [
          "As a law that applies to every platform forever",
          "As irrelevant because platforms ignore loudness",
          "As a target for peak volume only",
          "As a common target to check against the destination platform's current spec"
        ],
        answer: 3,
        explain: "Targets differ by platform and change over time, so use common numbers as a starting point and verify the current spec."
      }
    ]
  },

  instructor: {
    notes: "Level 5 shifts students from making clips to finishing a piece. Keep returning to 'what is the decision and what is the reason?'. Many students will want to add effects and layers; praise restraint. Stress that licensing is a documented habit, not a feeling. When discussing loudness and specs, treat every number as a common target to verify. Keep tool talk short and optional.",
    activity: {
      title: "Paper edit and sound map swap",
      minutes: 40,
      steps: [
        "Give each pair a short (fictional) brief, for example an invented cafe or bike shop ad of 20 to 30 seconds.",
        "Each pair writes a shot list and a paper edit with timings (10 minutes).",
        "Pairs add a sound map: ambience, SFX, music, VO, with a source note for each (10 minutes).",
        "Swap plans with another pair. The reviewers mark where the plan is unclear, where layers compete and where a licence note is missing (10 minutes).",
        "Pairs revise and name a v02 with a one-line change note, then share one lesson learned with the class (10 minutes)."
      ]
    },
    discussion: [
      "When is it right to break continuity or use a flashy transition, and how would you justify it to a client?",
      "How would you handle a client who sends their own favourite track that you cannot confirm the licence for?",
      "What would you check on a delivery file before sending it, and why those things first?"
    ]
  }
});
