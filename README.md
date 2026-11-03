# The Creative Signal: RS Hundal's AI Studio

**AI Video, Visuals & Creative Production: the Level Up programme.** A local training app that takes
students from complete beginner to creative producer across this workflow:
Brief → Research → Concept → Prompt → Generation → Selection → Editing → Sound → Polish → Delivery → Review.

Presented in **Absolute Studios** branding: the two-ring mark and wordmark from the supplied logo files, Archivo × Space Mono, and ink / bone / signal red. There's no account and no internet needed. Learners can install it as an app on their own computer, phone or tablet (see **Portable version** below).

## First run
1. The app opens on the **opening hero page**. **Enter the studio** goes to student sign-in.
2. **Students** create a profile with their name and a **4–6 digit PIN** they choose. On return they pick their name and enter the PIN.
   After 5 wrong tries the profile pauses for 60 seconds.
3. **Instructors** use the small **Instructor sign-in** link on the opening page or the sign-in page. It never appears in student navigation or in the profile list.
   On the first visit you choose an **admin PIN**. There is no default.
4. **Admin mode** has its own navigation (Overview, Students, Teaching guide, Backups & settings) and a **Log out** button on every admin page.
   Admin mode ends, and the PIN is needed again, on: Log out, reloading or closing the page, 15 idle minutes, a student signing in, or "Open as student".
   The admin unlock is kept only in memory, never in storage, so browser history and the back button cannot reopen it.
5. Forgotten admin PIN: there is no recovery screen. Clearing the browser's site data resets it, but that also deletes all profiles, so export them first.

## How learning works
- Every lesson is **short** ("the short version", with an optional "Go deeper"), followed by a **hands-on challenge**:
  build a prompt, plan a soundscape, order a storyboard, choose a concept and justify it, match terms, or spot the problems in a piece of work.
- Each challenge shows its **task, expected result, assessment criteria and pass mark**. After every attempt the student sees a score,
  **what worked** and **what to improve**, plus a history of attempts so they can see whether they improved. Retries are unlimited.
- Checking is **automatic and local** (no AI service). Open-ended answers are checked for the ingredients the criteria ask for
  (concrete detail, a reason tied to the brief, a constraint, a licence note), so different creative answers can pass.
  Media students attach is stored as a small preview and is **never analysed** by the app.
- A lesson counts only when its challenge is **passed**. A level's **checkpoint opens only after every lesson challenge is passed**.
- **Practicals** need an automatic check score of 60%+ **and** a rubric self-assessment before they can be marked complete.
- **Skill ratings are evidence-based**. Practicing means at least one passed challenge or completed practical for that skill.
  Confident means: every lesson challenge that trains the skill is passed with an average best score of 80%+, one practical has no "Developing" rubric rows,
  and a checkpoint is passed in a level that trains the skill. Students can still record their own view separately.
- Challenge content lives in `content/activities-a.js` and `content/activities-b.js`. The format is in `docs/ACTIVITY-SCHEMA.md`.

## Start the app

**Option A (simplest):** double-click `index.html`. It opens in your default browser (Edge, Chrome or Firefox).

**Option B (local server, needs Python):** double-click `start.cmd`. This serves the app at http://localhost:5178.

> Always open the app the **same way, in the same browser**. Progress saved under Option A (file) does not
> appear under Option B (localhost), and progress in Edge does not appear in Chrome. Each one keeps its own storage.

## Where progress is stored

- Everything is saved in the browser's **local storage on this computer**. Nothing is uploaded, synced or sent anywhere.
- PINs are stored **hashed** (salted SHA-256), never as plain text. A PIN is a **privacy lock between classmates, not strong security**:
  someone with technical access to the browser's stored data could still read the progress itself.
- Signing in lasts for the browser session. Closing the browser signs the student (and the admin) out.
- Clearing browser data (cookies / site data) **erases progress**. Private or incognito windows don't keep it.

## Back up and restore

1. Students: go to **Profile / Backup** and click **Export my backup**. Instructors: use **Export** or **Export all profiles** in the admin area. A `.json` file downloads.
2. Keep that file somewhere private. It is plain text and is **not encrypted**. The PIN inside it is hashed.
3. To restore it, or to move it to another computer: open the app there, go to the sign-in page, open **Restore a profile from a backup file**
   (or use **Import backups** under Admin → Backups & settings), and choose the file. The profile keeps its PIN. If the profile already exists, a student can only import it as a copy.
   An instructor signed in to the admin area can choose **Replace**.
4. A backup is a snapshot. Export again at the end of every session.

Invalid files are rejected with a clear message. This includes non-JSON files, JSON from another app, damaged profiles and newer versions.

## What's inside

| Area | Where |
|---|---|
| Home / Continue, XP, workflow | `js/app.js` → `views.home` |
| 7 levels (lessons, exercises, checkpoints, instructor notes) | `content/level1.js` … `level7.js` |
| Skills, project paths, brief fields, delivery checklist, capstone, portfolio, showcase | `content/core.js` |
| Profiles, local storage, export/import | `js/store.js` |
| Lesson blocks and diagrams (workflow, prompt breakdown, timeline/sound map, before/after) | `js/render.js` |
| Absolute Studios look, watermark, opening hero | `css/styles.css`: tokens at the top, Absolute layer at the bottom; logos in `assets/brand/` |
| Opening hero, sign-in, PINs, admin area | `js/app.js` → `views.intro`, `views.login`, `views.admin`; `js/store.js` |
| Lesson challenges and local grading | `js/activities.js`, `content/activities-a.js`, `content/activities-b.js` |

To edit or add content, see `docs/CONTENT-SCHEMA.md`.

## Personalising it

- **Branding:** the logo files are in `assets/brand/` and are used unaltered. The ring mark is recoloured through `currentColor` for the header, the watermark and the hero.
  Colours and gradients are tokens at the top of `css/styles.css`. Fonts (Archivo, Space Mono; SIL Open Font License) are bundled in `assets/fonts/`.
- **Examples:** every brief and example is **fictional** teaching material, using brands such as "Juniper & Co.", "Northline Bikes"
  and "Studio Kettle café". Swap in real, approved projects by editing `content/core.js` and the level files.
- **Tool notes:** blue "Tool-specific" callouts are the only places that refer to particular tools. Review them each term.

## Portable version (install on learners' own devices)

The same files are delivered in two ways. Learner instructions are in `LEARNER-GUIDE.html` (bundled in the app and the zip).

| Way | Devices | Notes |
|---|---|---|
| **Installable web app (PWA)** from the GitHub Pages address | Windows, macOS, Linux, ChromeOS (Chrome/Edge; Safari 17+ "Add to Dock"), Android (Chrome), iPhone/iPad (Safari "Add to Home Screen") | Needs HTTPS. Works offline after the first visit. Updates itself and shows "Update ready". |
| **Offline zip** `release/Creative-Signal-offline-v<version>.zip` | Any desktop browser | Unzip, double-click `index.html`. Can't be installed and doesn't auto-update. Not suitable for phones. |

Progress is stored per device, per browser and per address (Pages URL, zip copy and localhost are separate). Learners move between them with Export/Import. The admin area is per device too: to review learners, collect their backup `.json` files and import them under Admin → Backups & settings.

### Build commands (Node 18+, no npm install needed)
- `npm run build` creates `dist/`, the deployable site. It copies only app files, stamps a content-hashed version into the `?v=` URLs and `sw.js`, and writes the offline precache list.
- `npm run release` does the same plus creating `release/Creative-Signal-offline-v<version>.zip`.
- `npm run serve` builds, then serves `dist/` at http://localhost:5178 for testing install and offline mode.
- `python tools/make-icons.py` regenerates `assets/brand/icons/` from `assets/brand/app-icon-1024.png` (needs Pillow). Only needed if the icon changes.

`dist/` and `release/` are build output and git-ignored. Edit the source files, never `dist/`. The manual `?v=N` bump is no longer needed for hosted builds.

### Publish / update the hosted app (GitHub Pages)
1. One-time setup: create a **public** GitHub repository, push this folder to its `main` branch, then open Settings → Pages → Source: **GitHub Actions**.
2. `.github/workflows/pages.yml` builds and deploys on every push to `main`. The address is `https://<user>.github.io/<repo>/`.
3. To ship an update: edit the content, bump `version` in `package.json` (optional, the content hash changes anyway), commit and push. Learners get the update the next time they open the app online. The service worker checks on launch and every hour.
4. For a new offline zip: `npm run release` and share the zip (Drive, email, LMS).

### What is (and isn't) in the package
- No passwords, PINs, API keys or machine paths are built in. Every device starts empty: learners create their own PIN, and the instructor sets the admin PIN on first use of each device.
- Left out of `dist/`: `desktop.ini`, `app-icon.ico`, `start.cmd`, `docs/`, `tools/`, `.github/`.

### Costs
Free: GitHub Pages on a public repo, GitHub Actions, Node, the PWA itself. Could cost money: GitHub Pages from a **private** repo (needs GitHub Pro), a custom domain, or code-signing (only relevant if native installers are ever added; not used now).

### Platform limits
- iPhone/iPad: no install prompt (manual Share → Add to Home Screen). Safari can evict website data that hasn't been used for weeks if it isn't installed. File export from the installed app uses the Share sheet.
- Firefox desktop: no app install on most systems. It works fine as a normal tab.
- The installed app needs one online visit to download the course. After that it runs fully offline.
