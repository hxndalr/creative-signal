window.LU = window.LU || {};
LU.levels = LU.levels || [];
LU.levels.push({
  id: "L6",
  num: 6,
  name: "Brand Builder",
  tagline: "Make the look and voice repeatable, for you and for a team.",
  summary: "One good image is luck; fifty images that feel like one brand is a system. This level teaches you to write a brand bible with clear visual and verbal rules, turn those rules into reusable prompt templates, and keep results consistent across different generators and different people.",
  outcomes: [
    "Explain what a brand bible is and what belongs in it",
    "Write visual rules (colour, type, composition, motion, image style) specific enough to test",
    "Define voice and tone with do and don't examples",
    "Build a reusable prompt template with locked and variable parts",
    "Keep a team consistent across tools and manage versions of the bible"
  ],
  skills: ["brand", "prompting", "direction"],

  lessons: [
    {
      id: "L6-1",
      title: "What a brand bible is, and the visual rules inside it",
      minutes: 25,
      blocks: [
        { type: "p", text: "A **brand bible** (also called brand guidelines or a style guide) is a short document that says how a brand looks, sounds and behaves, so that anyone can produce work that feels like it came from the same place. It is not decoration. It is a **decision record**: the choices have been made once, so nobody has to make them again on every project." },
        { type: "terms", items: [
          { term: "Brand bible", def: "The shared rulebook for a brand's look, voice and usage, with examples." },
          { term: "Palette", def: "The fixed set of colours the brand uses, with a role for each (primary, accent, background, text)." },
          { term: "Typography", def: "The choice of typefaces and how they are used (headline, body, caption, sizes, spacing)." },
          { term: "Composition", def: "How things are arranged in the frame: where the subject sits, how much empty space, which angles." },
          { term: "Image style", def: "The consistent look of pictures: lighting, lens feel, grain, colour grade, subject treatment." },
          { term: "Motion language", def: "How things move: speed, easing (gentle start and stop or sharp), types of transition, camera behaviour." }
        ] },
        { type: "flow", title: "Where the brand bible fits", steps: ["Brief", "Research", "Concept", "Prompt", "Generation", "Selection", "Editing", "Sound", "Polish", "Delivery", "Review"], highlight: [1, 2, 3] },
        { type: "p", text: "Good rules are **testable**. 'Warm and friendly' is a mood, not a rule. 'Soft window light from the left, warm whites, no hard shadows, subject at the lower third with at least a third of the frame empty' is a rule that two people can check the same way. For each visual area, write a rule, give a reason and show a pass example and a fail example." },
        { type: "compare", title: "Vague vs testable visual rule", left: { label: "Vague", text: "Use natural, calm colours and a clean look." }, right: { label: "Testable", text: "Backgrounds are warm off-white. Accent colour is deep green, used for under 10 percent of the frame. Never pure black; use charcoal. Plenty of empty space around the subject." } },
        { type: "list", title: "What a visual section usually covers", items: [
          "Colour: palette with roles, proportions, and what to avoid",
          "Type: headline and body faces, case, spacing, minimum sizes for small screens",
          "Composition: framing, angles, negative space, safe zones",
          "Image style: light, lens feel, grade, texture, subject treatment",
          "Motion: pace, easing, preferred transitions, camera movement",
          "Logo use: clear space, minimum size, placement, never-do list"
        ] },
        { type: "example", fictional: true, title: "Juniper & Co. tea: visual rules (excerpt)", text: "Juniper & Co. (invented tea brand). Colour: warm off-white background, deep green accent under 10 percent, charcoal text, never pure black. Image style: soft window light from camera left, shallow depth of field, ceramic and linen textures, one hero object per frame. Composition: subject on the lower third, a third of the frame empty for text. Motion: slow, gentle starts and stops; steam and light are the only fast things on screen. Why: the brand sells calm, so nothing should rush." },
        { type: "callout", tone: "tip", title: "Include the reason", text: "A rule with a reason can be applied to situations the bible did not predict. 'Calm, so nothing rushes' lets a new designer decide whether a whip-pan transition fits." },
        { type: "callout", tone: "tool", title: "Fonts and generators", text: "Which fonts are available, and how well a given image or video generator follows colour and type instructions, changes by tool and version. Test your rules in the tool you use and note the result in the bible." }
      ]
    },
    {
      id: "L6-2",
      title: "Voice, tone and reusable prompt templates",
      minutes: 30,
      blocks: [
        { type: "p", text: "A brand also has a **voice**: the personality of its words, which stays the same. **Tone** is how that voice adjusts to the moment (a thank-you note is warmer than an error message). Voice covers captions, scripts, titles and voice-over. Write it as pairs of traits and limits, then show examples." },
        { type: "terms", items: [
          { term: "Voice", def: "The consistent personality of how the brand writes and speaks." },
          { term: "Tone", def: "The mood adjustment for a specific situation or audience." },
          { term: "Do / Don't pair", def: "A short example of right and wrong wording side by side." },
          { term: "Prompt template", def: "A prompt with fixed (locked) parts that carry the brand, and slots (variable parts) that change per job." },
          { term: "Locked part", def: "Text copied unchanged every time because it carries the brand rules." },
          { term: "Variable part", def: "A slot filled in for each new image or clip, such as subject, action or setting." }
        ] },
        { type: "compare", title: "A do / don't pair for voice", left: { label: "Don't", text: "'HUGE SALE!!! Don't miss our AMAZING teas!!!'" }, right: { label: "Do", text: "'Your afternoon, slowed down. Three new teas, steeped for you.'" } },
        { type: "p", text: "Now turn the rules into something people can use under time pressure: a **reusable prompt template**. Separate what must never change from what changes. The locked part holds style, light, palette and constraints. The variable part holds the subject and action. This is how a team of five can produce images that look like one person made them." },
        { type: "prompt", title: "Template: locked parts (fictional Juniper & Co.)", parts: [
          { label: "Style", text: "[LOCKED] calm editorial still life, ceramic and linen textures, muted warm palette with a deep green accent" },
          { label: "Light", text: "[LOCKED] soft window light from camera left, gentle shadows, no harsh highlights" },
          { label: "Camera", text: "[LOCKED] 50mm feel, shallow depth of field, subject on the lower third, a third of the frame empty" },
          { label: "Constraints", text: "[LOCKED] no text in image, no people's faces, no pure black, no clutter" }
        ] },
        { type: "prompt", title: "Template: variable slots", parts: [
          { label: "Subject", text: "[VARIABLE] {object, for example a glazed teapot}" },
          { label: "Action", text: "[VARIABLE] {what is happening, for example steam rising slowly}" },
          { label: "Setting", text: "[VARIABLE] {place, for example a pale oak table by a window}" },
          { label: "Mood", text: "[VARIABLE] {one word from the approved list: quiet, welcoming, unhurried}" }
        ] },
        { type: "list", title: "Make the template safe to use", items: [
          "Mark locked and variable parts clearly, so nobody edits the wrong one",
          "Limit variable slots to what really changes (3 to 5 slots)",
          "Give an approved word list for slots like mood so words do not drift",
          "Include one good and one bad output for the template as visual examples",
          "Record the date, version and which tool it was tested in"
        ] },
        { type: "example", fictional: true, title: "Same template, three jobs", text: "The Juniper & Co. team fills the slots three ways: (1) glazed teapot, steam rising, oak table; (2) open tin of leaves, hand scooping, linen cloth; (3) cup on a saucer, rain on the window behind. Because the locked part is identical, the three images sit together on the website without looking like they came from different people. (Invented team, for teaching.)" },
        { type: "callout", tone: "tool", title: "Prompt syntax differs", text: "Some generators support reference images, style codes, negative prompts or seeds, and others do not. Keep the template in plain language first, then add tool-specific options in a separate note that can be updated when the tool changes." }
      ]
    },
    {
      id: "L6-3",
      title: "Consistency across tools and people, and versioning the bible",
      minutes: 25,
      blocks: [
        { type: "p", text: "Different generators interpret the same words differently. Different people interpret the same rule differently. Consistency comes from three habits: **reference sets**, **checks**, and **version control**." },
        { type: "terms", items: [
          { term: "Reference set", def: "A small folder of approved images and clips that show the brand done right (and a few that show it done wrong)." },
          { term: "Consistency check", def: "A short list of yes/no questions used on every output before it is accepted." },
          { term: "Drift", def: "Slow, unnoticed change in the look as many people and tools each make small adjustments." },
          { term: "Change log", def: "A dated list of what changed in each version of the bible and why." },
          { term: "Owner", def: "The one named person who approves changes to the bible." }
        ] },
        { type: "list", title: "A consistency check (use on every output)", items: [
          "Palette: are the colours inside the approved range?",
          "Light: does the light direction and softness match the rules?",
          "Composition: is the subject placement and empty space right?",
          "Constraints: none of the 'never' items appear (extra text, wrong logo, off-brand props)?",
          "Compare with the reference set: does it sit comfortably next to the approved examples?"
        ] },
        { type: "p", text: "When you move a template to another generator, **test before you trust it**. Run the same slots in both tools, put the results next to the reference set, and write down what had to change in the wording to get the same result. Then keep one 'translation note' per tool. Do not assume that one template works everywhere." },
        { type: "timeline", title: "Bible version history (fictional, in weeks)", duration: 12,
          tracks: [
            { name: "Bible versions", clips: [
              { label: "v1.0 launch", start: 0, end: 4 },
              { label: "v1.1 add motion rules", start: 4, end: 8 },
              { label: "v2.0 new accent colour", start: 8, end: 12 }
            ] },
            { name: "Reviews", clips: [
              { label: "Team test", start: 2, end: 3 },
              { label: "Owner review", start: 6, end: 7 },
              { label: "Client sign-off", start: 10, end: 11 }
            ] }
          ] },
        { type: "p", text: "**Versioning the bible.** Use numbers with meaning: small additions are v1.1, v1.2; a change that makes old work look wrong (a new accent colour) is v2.0. Keep every old version, write a change log, name an owner, and tell everyone when a new version replaces the old. Old work is not wrong; it just belongs to an earlier version." },
        { type: "compare", title: "Handling a request that breaks a rule", left: { label: "Weak", text: "A team member quietly adds a neon colour to one post because it looked good. Two weeks later others copy it." }, right: { label: "Strong", text: "The team member proposes the colour to the owner with an example. The owner tests it, and if approved it goes into v1.2 with a reason and a change log entry." } },
        { type: "example", fictional: true, title: "Northline Bikes: two tools, one look", text: "Northline Bikes (invented) uses one image generator for stills and another for short clips. The stills template says 'overcast morning light, desaturated greens'. In the clip tool, that wording produced night-time results, so the translation note reads: 'In the clip tool use flat grey sky, early morning, low contrast.' Both outputs now pass the same consistency check. (Invented brand, for teaching.)" },
        { type: "callout", tone: "warn", title: "Do not copy a real brand", text: "A brand bible describes your client's own identity. Do not build one by imitating another company's logo, characters or distinctive look, and do not use a real person's likeness without permission." },
        { type: "callout", tone: "tool", title: "Shared libraries", text: "Teams often keep the bible, templates and reference sets in a shared drive or design tool. Features and names change, so note where the 'source of truth' lives, and update that note if you move it." }
      ]
    }
  ],

  exercises: [
    {
      id: "L6-E1",
      kind: "prompt",
      title: "Build a reusable brand prompt template",
      minutes: 30,
      task: "(Fictional) Studio Kettle cafe wants product images that always feel the same: cosy, bright mornings, wood and ceramic, a mustard-yellow accent. Rewrite the weak starter into a reusable template. Label the LOCKED parts and the VARIABLE slots, and add one approved word list for a slot.",
      output: "A template with at least four locked parts, three to five variable slots with examples, and an approved word list.",
      hints: [
        "Ask: what must be identical every time? That is the locked part.",
        "Ask: what changes between jobs? That is a slot. Keep the number of slots small.",
        "Write constraints as things to avoid (extra text, clutter, harsh shadows).",
        "Add a version and date line at the end."
      ],
      rubric: [
        { criterion: "Locked vs variable", developing: "Parts are mixed together", solid: "Locked and variable are clearly marked", strong: "Locked parts carry every brand rule and slots are limited and well-named" },
        { criterion: "Specificity", developing: "Uses mood words only", solid: "Light, palette and composition are specific", strong: "Rules are testable by another person and include constraints" },
        { criterion: "Usability", developing: "Another person could not use it", solid: "Another person could fill the slots", strong: "Includes an approved word list, a version line and a note for tool differences" }
      ],
      required: true,
      starter: "Make a nice picture of our cafe's coffee that looks cosy and on brand.",
      checklist: [
        "Names the subject as a variable slot",
        "States the light direction and softness as a locked part",
        "Names the palette with the accent colour and its proportion",
        "Sets composition and empty space rules",
        "Lists constraints (what must never appear)",
        "Includes an approved word list for at least one slot",
        "Has a version and date"
      ]
    },
    {
      id: "L6-E2",
      kind: "scenario",
      title: "Output that almost fits the brand",
      minutes: 15,
      task: "Read the situation and choose the best next step. Read the feedback on every option.",
      output: "Your chosen option and a one-sentence reason in your own words.",
      hints: [
        "Decide whether this is a one-off problem or a problem with the template or the bible.",
        "Think about who owns changes to the bible.",
        "Look for the option that fixes the cause, not only the symptom."
      ],
      rubric: [
        { criterion: "Diagnosis", developing: "Treats it as a one-off", solid: "Spots a possible template or rule gap", strong: "Separates one-off error, template gap and bible gap, and says which applies" },
        { criterion: "Process", developing: "Edits rules without telling anyone", solid: "Goes through the owner", strong: "Proposes a test, a change log entry and a version number" },
        { criterion: "Consistency", developing: "Ignores existing work", solid: "Considers existing images", strong: "Plans how to treat old work against the new version" }
      ],
      required: true,
      situation: "(Fictional) Three team members use the Juniper & Co. template. Outputs from one person keep coming out with a cooler, bluish tone, while the other two look warm. The template text is identical. The bible says 'warm whites'. A launch post is due this afternoon.",
      options: [
        { text: "Tell the person to just colour-correct their images by eye and move on.", correct: false, feedback: "This may rescue today's post, but without a measured target each person will 'correct' differently and drift will continue." },
        { text: "Compare their settings and tool version with the others, test the template side by side, and if the tool differs, add a translation note and a measurable colour check to the bible for the owner to approve.", correct: true, feedback: "Right. You are looking for the cause, making it testable, and routing the change through the owner so the whole team benefits." },
        { text: "Add 'very very warm' to the template for everyone.", correct: false, feedback: "This changes the template for the two people who were fine, and vague emphasis does not make the rule testable." },
        { text: "Remove the colour rule from the bible, since it is not being followed.", correct: false, feedback: "A rule that is hard to follow needs better wording, tests or tooling, not deletion." }
      ]
    },
    {
      id: "L6-E3",
      kind: "reference",
      title: "Reverse-engineer a visual style into rules",
      minutes: 30,
      task: "Choose one piece of advertising or film imagery you are allowed to study (it can be a real one; this is analysis only). Do not copy it. Describe its visual system as if you were writing the rules of a brand bible, one note for each focus area.",
      output: "A one-page set of testable rules, with one 'pass' and one 'fail' example described in words.",
      hints: [
        "Write rules another person could check with yes/no.",
        "Look for what repeats across many frames, not what appears once.",
        "Describe light direction, colour proportions and where the subject sits.",
        "Note one thing the style never does."
      ],
      rubric: [
        { criterion: "Observation", developing: "General impressions only", solid: "Specific observations in each area", strong: "Observations are measurable and based on repetition" },
        { criterion: "Rule writing", developing: "Rules are opinions", solid: "Rules are testable", strong: "Rules include a reason and a pass and fail example" },
        { criterion: "Originality", developing: "Describes how to copy the piece", solid: "Describes principles", strong: "Turns the principles into rules for an invented brand without copying" }
      ],
      required: false,
      focus: ["Colour", "Typography", "Composition", "Light and image style", "Movement", "Voice and tone", "Never-do list"]
    }
  ],

  checkpoint: {
    criteria: ["Complete every lesson", "Complete required exercises", "Score 75%+ on the check"],
    passMark: 0.75,
    questions: [
      {
        q: "Which is the best description of a brand bible?",
        options: [
          "A logo file with a few colours",
          "A shared record of decisions on look, voice and usage, with examples",
          "A list of prompts that always work in every tool",
          "A legal contract between a brand and a client"
        ],
        answer: 1,
        explain: "The bible records design and voice decisions so people can produce consistent work without re-deciding each time."
      },
      {
        q: "Which visual rule is the most testable?",
        options: [
          "Keep it clean and friendly",
          "Use natural colours",
          "Accent colour is deep green, under 10 percent of the frame; background is warm off-white",
          "Make it feel premium"
        ],
        answer: 2,
        explain: "A rule is testable when two different people can check it and agree. Specific colours and proportions allow that."
      },
      {
        q: "In a prompt template, which parts should be LOCKED?",
        options: [
          "The subject and action of each image",
          "Only the first word",
          "Nothing, since every prompt should be unique",
          "The style, light, palette and constraints that carry the brand"
        ],
        answer: 3,
        explain: "Locked parts carry the brand and stay identical. Subject and action change per job, so they are variable slots."
      },
      {
        q: "You move a template to a different generator and the look changes. What is the best response?",
        options: [
          "Test side by side against the reference set and write a translation note for that tool",
          "Assume the new tool is wrong and stop using it",
          "Delete the brand colours from the template",
          "Ask each team member to fix images however they like"
        ],
        answer: 0,
        explain: "Tools interpret prompts differently, so test, compare and document the changes needed for each tool."
      },
      {
        q: "A new accent colour makes earlier work look outdated. How should the bible version change?",
        options: [
          "Keep v1.0 and quietly edit the text",
          "Delete all earlier versions",
          "Use v1.0.1 because it is only one colour",
          "Raise it to v2.0 with a change log entry, and keep v1.x archived"
        ],
        answer: 3,
        explain: "A change that affects how old work looks is a major version. Keep history and a change log so people know which version applies."
      }
    ]
  },

  instructor: {
    notes: "Level 6 is where students stop making single images and start writing systems. Push for testable rules, with a reason for each. Expect students to write mood words; ask 'how would a stranger check that?'. Keep all examples invented and remind students to analyse real brands for principles only, never copy a logo or a likeness. Tool details belong in notes that can be updated.",
    activity: {
      title: "Mini brand bible sprint",
      minutes: 45,
      steps: [
        "Teams of three receive a fictional one-line client (for example an invented bike shop or tea brand).",
        "Each team writes a one-page bible: palette with roles, image style, composition, motion, voice with two do/don't pairs (15 minutes).",
        "Turn it into a prompt template with locked parts and three variable slots (10 minutes).",
        "Each team member fills the slots for a different shot, then the team lines up the results against the consistency check (10 minutes).",
        "Teams swap bibles and templates and mark any rule that was not testable. Revise and name the new version, with a change log line (10 minutes)."
      ]
    },
    discussion: [
      "Where is the line between a helpful rule and a rule that kills creativity?",
      "How would you handle a team member who believes a rule is wrong and has a good example?",
      "What should happen to old work when the bible changes to v2.0?"
    ]
  }
});
