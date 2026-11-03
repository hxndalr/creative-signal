window.LU = window.LU || {};
LU.levels = LU.levels || [];
LU.levels.push({
  id: "L7",
  num: 7,
  name: "Creative Director",
  tagline: "Lead the whole project, from brief to review.",
  summary: "A creative director does not make every asset. They turn a brief into a clear direction, run the workflow as a production, give and take critique, manage revision rounds, present the work, and close the project with a review. This level is about judgment, communication and responsibility.",
  outcomes: [
    "Turn a brief into creative direction: concept routes, a treatment and a mood statement",
    "Run the full workflow as a production with a schedule, milestones and approvals",
    "Give and receive critique that improves the work and keeps the team working well",
    "Manage revision rounds and present work to a client with clear reasoning",
    "Deliver the final files and run a post-project review that changes the next project"
  ],
  skills: ["direction", "critique", "responsible"],

  lessons: [
    {
      id: "L7-1",
      title: "From brief to creative direction",
      minutes: 25,
      blocks: [
        { type: "p", text: "A brief tells you the problem. **Creative direction** is your answer, expressed clearly enough that a team can make hundreds of small decisions without asking you each time. Before you present anything, you narrow the open field into a few distinct **routes**, then recommend one." },
        { type: "terms", items: [
          { term: "Brief", def: "The client's description of the goal, audience, message, constraints, deadline and budget." },
          { term: "Concept route", def: "One complete, distinct idea for answering the brief, explained in a few lines. Routes differ in idea, not only in colour." },
          { term: "Treatment", def: "A written description of how the piece will look, sound and move, with references. It is the plan the team and the client both sign off." },
          { term: "Mood statement", def: "One or two sentences capturing the feeling the work must create, used as a test for every decision." },
          { term: "Reference board", def: "A small set of images and clips that show the direction. Used to discuss, never to copy." }
        ] },
        { type: "flow", title: "Direction in the workflow", steps: ["Brief", "Research", "Concept", "Prompt", "Generation", "Selection", "Editing", "Sound", "Polish", "Delivery", "Review"], highlight: [0, 1, 2] },
        { type: "steps", title: "From brief to direction", items: [
          "Restate the brief in your own words (goal, audience, one message, constraints) and check it with the client.",
          "Research: audience, category, competitors, and what has already been done. Note what to avoid.",
          "Develop three distinct routes. If two routes feel alike, replace one.",
          "Test each route against the brief: does it serve the goal, fit the budget, and can it be made in the time?",
          "Recommend one route and say why. Keep another as a fallback.",
          "Write the treatment and the mood statement for the chosen route."
        ] },
        { type: "compare", title: "A weak and a strong mood statement", left: { label: "Weak", text: "Modern, premium, fresh and exciting." }, right: { label: "Strong", text: "The quiet minute before the day starts: warm, unhurried, a little bit private." } },
        { type: "p", text: "A mood statement works when you can use it to **say no**. If a proposed shot is loud and busy, the strong statement above tells you at once that it does not belong. The weak one lets everything in." },
        { type: "example", fictional: true, title: "Northline Bikes: three routes", text: "Brief (invented): a 30s film to launch a commuter bike for people who are tired of traffic. Route A, 'The Long Way Home': a rider chooses the scenic route and arrives happier. Route B, 'Beat the Clock': a split screen race between a car in traffic and the bike. Route C, 'City Hush': the soundscape of a city slowing down as the rider glides through. Recommendation: Route A, because it carries the emotional benefit, is achievable with the budget, and avoids a direct comparison that might need legal review. Route C is kept as a fallback. Mood statement: 'Unrushed freedom, golden light, the city on your side.'" },
        { type: "callout", tone: "tip", title: "Routes are not options of polish", text: "Three versions of the same idea in different colours are not three routes. If the client can only choose a colour, you have not given them a creative choice." },
        { type: "callout", tone: "tool", title: "Boards and decks", text: "Teams use many different apps for reference boards and treatments. Pick whatever your team can all open and comment on, and check its current sharing and permission settings before you share client material." }
      ]
    },
    {
      id: "L7-2",
      title: "Running the workflow as a production",
      minutes: 30,
      blocks: [
        { type: "p", text: "A creative director is partly a producer. Good ideas fail when the schedule, approvals and responsibilities are vague. Your job is to make sure each stage has an **owner, a deadline, a deliverable and an approval**." },
        { type: "terms", items: [
          { term: "Milestone", def: "A checkpoint with a defined deliverable, such as 'treatment approved' or 'rough cut delivered'." },
          { term: "Approval gate", def: "A point where the client or lead must say yes before work continues. It stops expensive rework." },
          { term: "Buffer", def: "Planned spare time for the things that always go wrong: slow generations, reshoots, late feedback." },
          { term: "Dependency", def: "A task that cannot start until another one finishes (you cannot grade until the edit is locked)." },
          { term: "Scope", def: "What is included in the project. Changes beyond it need a conversation about time and cost." }
        ] },
        { type: "timeline", title: "A 4 week production plan (fictional, days)", duration: 28,
          tracks: [
            { name: "Direction", clips: [
              { label: "Brief + research", start: 0, end: 4 },
              { label: "Routes + treatment", start: 4, end: 8 },
              { label: "Approval 1", start: 8, end: 9 }
            ] },
            { name: "Making", clips: [
              { label: "Prompts + generation", start: 9, end: 16 },
              { label: "Selection + rough cut", start: 16, end: 20 },
              { label: "Approval 2", start: 20, end: 21 }
            ] },
            { name: "Finishing", clips: [
              { label: "Sound + polish", start: 21, end: 25 },
              { label: "Delivery + review", start: 25, end: 28 }
            ] }
          ] },
        { type: "p", text: "Notice where the **approval gates** sit: after direction and after the rough cut, before the expensive finishing work. It is far cheaper to change a treatment than a graded, mixed film. Also notice that the plan has no empty buffer between the stages here, which is a risk you would flag; real plans keep a few spare days for slow generations and late feedback." },
        { type: "list", title: "What a production sheet tracks", items: [
          "Every deliverable with format, length and due date",
          "An owner for each task, and who approves it",
          "Version and status of each asset (draft, in review, approved)",
          "Licences and sources for music, fonts, footage and reference",
          "Consent and release records for any real person or location shown",
          "The decision log: what was decided, by whom, and when"
        ] },
        { type: "callout", tone: "warn", title: "Responsible production", text: "Be honest with clients about how work is made, including where generated content is used, and follow any disclosure rule that applies to the platform or the client. Do not create content that misleads viewers about real people, real events or product claims. When unsure, ask for guidance before you publish." },
        { type: "compare", title: "Handling a change in scope", left: { label: "Weak", text: "Say yes to everything and absorb the extra work. The schedule slips and the team burns out." }, right: { label: "Strong", text: "Say 'we can do that; it adds two days and one more approval. Shall we move the delivery date or drop the 6s cutdown?'" } },
        { type: "example", fictional: true, title: "Studio Kettle: a slipping schedule", text: "Studio Kettle (invented cafe) approves the treatment, then adds a request for a 9:16 version and an extra seasonal shot. The producer lists the effect: two more days of generation and selection, one extra approval, and a longer delivery checklist. The director offers two options: move delivery by three days, or keep the date and deliver the vertical cutdown a week later. The client chooses the second. The decision is recorded in the log." },
        { type: "callout", tone: "tool", title: "Planning tools", text: "Spreadsheets, boards and calendars all work for production tracking. Choose what the team will actually keep up to date, and check how its permissions work before you add client information." }
      ]
    },
    {
      id: "L7-3",
      title: "Critique, revisions, presenting and closing the project",
      minutes: 30,
      blocks: [
        { type: "p", text: "Critique is how work improves; it is not a verdict on a person. The skill is to **describe what you see, say what it does to the viewer, and tie it to the goal**, then suggest a direction (not always a fix)." },
        { type: "terms", items: [
          { term: "Critique", def: "A structured discussion of work against its goals." },
          { term: "Revision round", def: "One cycle of feedback and changes. A project plan states how many are included." },
          { term: "Consolidated feedback", def: "One merged, de-duplicated list of changes from all reviewers, with conflicts resolved before the team starts work." },
          { term: "Post-project review", def: "A short meeting after delivery to record what worked, what did not and what changes next time." }
        ] },
        { type: "compare", title: "Useful vs unhelpful critique", left: { label: "Unhelpful", text: "'I do not like it. Make it pop.'" }, right: { label: "Useful", text: "'The end card appears so quickly that the product name is hard to read (observation). Viewers may not remember the brand (effect). Hold it for two more seconds (direction).'" } },
        { type: "list", title: "Receiving critique well", items: [
          "Listen to the whole thing before you respond",
          "Ask what the feedback is trying to achieve, not only what to change",
          "Separate the problem from the suggested solution; the problem is usually right, the fix may not be",
          "Write it down and confirm it back",
          "Do not defend by explaining what you meant; fix what the viewer saw"
        ] },
        { type: "steps", title: "Managing a revision round", items: [
          "Collect all feedback in one place by an agreed date.",
          "Consolidate: merge duplicates, flag conflicts, and ask the client to resolve them (one voice).",
          "Estimate effect on time and scope, and confirm the plan in writing.",
          "Make changes as a new version with a change note.",
          "Send with a short list of what changed and what did not, and why."
        ] },
        { type: "p", text: "**Presenting to a client.** Lead with the brief and the goal, not with the files. Show the recommended route first, explain the reasons, and show what you ruled out and why. Say clearly what you need from them (an approval, a choice, an answer). Present work that is finished enough to judge, and tell them honestly what is still rough." },
        { type: "flow", title: "Closing the loop", steps: ["Final approval", "Final delivery", "Archive masters and licences", "Post-project review", "Update bible and templates"], highlight: [3, 4] },
        { type: "example", fictional: true, title: "Juniper & Co.: a post-project review", text: "After delivery, the Juniper & Co. (invented) team meets for 30 minutes. What worked: the three-route presentation made approval quick. What did not: music was chosen after the edit, which cost a day of re-cutting. Change for next time: shortlist music during the treatment stage. Action: add this step to the production checklist and note it in the bible's change log." },
        { type: "callout", tone: "tip", title: "Close the project properly", text: "Archive the masters, project files, licences and the decision log in one folder. Six months later, when the client asks for a new cutdown, you will be glad you did." },
        { type: "callout", tone: "tool", title: "Review and presentation tools", text: "Many apps offer time-coded comments and shareable review links. Features and privacy settings change, so check them before sending unreleased work to a client." }
      ]
    }
  ],

  exercises: [
    {
      id: "L7-E1",
      kind: "scenario",
      title: "Two reviewers, two opposite notes",
      minutes: 15,
      task: "Read the situation and choose the best next step. Read the feedback for every option.",
      output: "Your chosen option and a one-sentence reason in your own words.",
      hints: [
        "Who owns the final decision for the client?",
        "A conflict should be resolved before work starts, not after.",
        "Think about the schedule and the number of rounds."
      ],
      rubric: [
        { criterion: "Judgment", developing: "Picks the easiest path", solid: "Picks a path that protects the work and schedule", strong: "Picks a path and names the risk avoided by each rejected option" },
        { criterion: "Communication", developing: "No message planned", solid: "Plans a written reply", strong: "Plans a reply that states the conflict neutrally and asks for one decision" },
        { criterion: "Process", developing: "Starts changes immediately", solid: "Consolidates feedback first", strong: "Consolidates, estimates impact and logs the decision" }
      ],
      required: true,
      situation: "(Fictional) Round 1 feedback on the Studio Kettle 30s film arrives from two people. The marketing lead writes: 'Make it faster and cut the slow opening.' The owner writes: 'I love the slow opening, please keep it, and slow the rest down too.' Round 2 is the last included round and delivery is in five days.",
      options: [
        { text: "Do the marketing lead's changes, because they probably handle the budget.", correct: false, feedback: "You are guessing at authority. If the owner sees a version that removes what they love, you may burn your last round." },
        { text: "Make two complete versions, one for each reviewer, and send both.", correct: false, feedback: "This doubles the work and hands the decision back to the client with no recommendation, and it uses time you do not have." },
        { text: "Send a short neutral note listing the two opposite requests, give your recommendation tied to the goal, and ask the client to confirm one direction before you start the revision.", correct: true, feedback: "Right. You have consolidated the feedback, resolved the conflict at the source, and protected the final round." },
        { text: "Average the two notes and slightly speed up the film.", correct: false, feedback: "A compromise nobody asked for may satisfy neither person, and you will not know until the last round is spent." }
      ]
    },
    {
      id: "L7-E2",
      kind: "task",
      title: "Write the creative direction",
      minutes: 40,
      task: "(Fictional) Juniper & Co. tea wants a 30s film for a new evening blend, targeted at people who work late and want to switch off. Budget is small and the deadline is four weeks. Write the creative direction: three distinct routes, your recommendation with reasons, a mood statement and the key risks.",
      output: "A one-page direction document a client could read in five minutes.",
      hints: [
        "Make routes different in idea, not only in colour or style.",
        "Test each route against the budget and timeline before you recommend one.",
        "Make your mood statement something you can use to say no to a shot.",
        "List one honest risk, such as time, licensing or an unclear claim, and how you will handle it."
      ],
      rubric: [
        { criterion: "Route distinctness", developing: "Routes are small variations", solid: "Routes are different ideas", strong: "Routes are different ideas, each tested against goal, budget and time" },
        { criterion: "Recommendation", developing: "No reasons given", solid: "Reasons tied to the brief", strong: "Reasons tied to the brief with a fallback and the risk of the choice" },
        { criterion: "Mood statement", developing: "A list of adjectives", solid: "One clear feeling", strong: "A statement that can be used as a test to accept or reject shots" }
      ],
      required: true,
      fields: ["Brief in my own words", "Route A", "Route B", "Route C", "Recommendation and reasons", "Mood statement", "Risks and how to handle them"]
    },
    {
      id: "L7-E3",
      kind: "critique",
      title: "Critique the project plan",
      minutes: 25,
      task: "Read the description of the production plan. List what an experienced creative director would flag, then compare with the model notes and read the revised version.",
      output: "Your own list of at least four issues, and one thing you would change first.",
      hints: [
        "Look for missing approval gates.",
        "Look for risks that nobody owns.",
        "Check the schedule for buffer and for dependencies."
      ],
      rubric: [
        { criterion: "Spotting risks", developing: "Names one or two issues", solid: "Names four issues", strong: "Names issues and ranks them by cost if they go wrong" },
        { criterion: "Reasoning", developing: "Says 'it feels risky'", solid: "Gives a reason for each issue", strong: "Gives a reason and a fix for each issue" },
        { criterion: "Prioritising", developing: "No order", solid: "Names a first change", strong: "Explains why that change comes first" }
      ],
      required: false,
      before: "(Fictional) The plan for a Northline Bikes 30s film: Week 1, concept and generation. Week 2, edit, sound and colour at the same time. Week 3, the client sees the finished film for the first time. Week 4, final delivery. There is one client contact and no named approver. Music will be 'found later'. There is no slack, and the client has asked for the vertical and horizontal versions plus a 6s cutdown, but those are not in the schedule.",
      modelNotes: [
        "No approval gate after the concept; the client first sees work when it is finished, so any misunderstanding is expensive.",
        "Editing, sound and colour at the same time: colour and mix depend on a locked edit, so they will be redone.",
        "No named approver; feedback may arrive from several people and conflict.",
        "Music left to 'later' risks a licensing problem and re-cutting; shortlist during the treatment stage.",
        "No buffer; slow generations or late feedback will break the date.",
        "Deliverables are missing from the plan; the vertical, horizontal and 6s versions need time and approvals.",
        "No record of sources and licences."
      ],
      after: "Revised plan: Week 1, brief, research, three routes, treatment and approval 1 by a named approver. Week 2, generation and selection, rough cut and approval 2. Week 3, locked edit, then sound and colour in sequence, with licensed music shortlisted in Week 1 and the cue sheet kept up to date. Week 4 has two days of buffer, then delivery of the 16:9, 9:16 and 6s versions with archive and review. All deliverables are listed with owners and dates."
    }
  ],

  checkpoint: {
    criteria: ["Complete every lesson", "Complete required exercises", "Score 75%+ on the check"],
    passMark: 0.75,
    questions: [
      {
        q: "What makes three concept routes truly different?",
        options: [
          "Each uses a different colour palette",
          "Each uses a different font",
          "Each is a different idea for answering the brief",
          "Each has a different length"
        ],
        answer: 2,
        explain: "Routes should differ in idea. Variations in surface style give the client no real creative choice."
      },
      {
        q: "Why place approval gates before expensive stages such as colour and final mix?",
        options: [
          "Changing direction is far cheaper before finishing work than after",
          "Clients prefer waiting",
          "It removes the need for a review at the end",
          "It makes the files smaller"
        ],
        answer: 0,
        explain: "Gates catch misunderstandings early, when changing course costs little."
      },
      {
        q: "Which note is the most useful critique?",
        options: [
          "Make it pop",
          "I do not like the ending",
          "It feels off",
          "The end card is on screen for one second, so the brand name is hard to read; hold it for two more seconds"
        ],
        answer: 3,
        explain: "It states the observation, the effect on the viewer and a direction, and ties to the goal of brand recall."
      },
      {
        q: "Two reviewers give opposite feedback. What should you do first?",
        options: [
          "Start with whichever came first",
          "Send a neutral note listing the conflict with your recommendation and ask the client to confirm one direction",
          "Make both versions and let them choose",
          "Ignore both and follow your own taste"
        ],
        answer: 1,
        explain: "Resolve conflicts before work starts so the revision round is not wasted."
      },
      {
        q: "What is the main purpose of a post-project review?",
        options: [
          "To assign blame",
          "To make the client feel better",
          "To record what worked, what did not and what will change next time, then update the process",
          "To delete old files"
        ],
        answer: 2,
        explain: "A review turns experience into a change in the checklist, templates or bible so the next project improves."
      }
    ]
  },

  instructor: {
    notes: "Level 7 tests judgment, communication and honesty more than technique. Ask students to explain their reasons aloud. Role-play critique in small groups, and coach the language: observation, effect, direction. Reinforce responsible practice: be honest about how the work is made, keep records of licences and consent, and follow disclosure rules for the platform or client. All client examples are invented.",
    activity: {
      title: "Mock client presentation and critique",
      minutes: 50,
      steps: [
        "Give teams a fictional brief and a 15 minute window to write three routes and a recommendation (use the L7-E2 structure).",
        "Each team presents for 3 minutes to another team playing the client, leading with the brief and the recommended route.",
        "The client team gives critique in the form observation, effect, direction, and includes one deliberately conflicting note.",
        "The presenting team writes a consolidated feedback list and a short reply asking the client to resolve the conflict (10 minutes).",
        "Hold a 5 minute mini post-project review: one thing that worked, one thing to change, one action for the next project."
      ]
    },
    discussion: [
      "How do you decide when to push back on a client's note and when to follow it?",
      "What would you tell a client about how a piece was made, and when would you need to tell them?",
      "Which approval gate matters most in your own projects, and what has it saved you from?"
    ]
  }
});
