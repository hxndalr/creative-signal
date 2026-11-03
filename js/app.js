/* The Creative Signal: RS Hundal's AI Studio - app logic (hash router + views). No network access is used anywhere. */
(function () {
  const { esc, md } = R;
  const main = document.getElementById('main');
  const LEVELS = LU.levels.slice().sort((a, b) => a.num - b.num);
  const XP = { activity: 15, exercise: 25, checkpoint: 50 };
  const LIB_TYPES = { prompt: 'Prompt', reference: 'Reference', sound: 'Music / SFX research', idea: 'Project idea' };
  const ACTS = LU.activities || {};
  const TYPE_LABEL = { quick: 'Quick check', order: 'Put it in order', choose: 'Make the call', build: 'Build it', plan: 'Plan it', match: 'Match up', spot: 'Spot the problems' };
  const PROJECT_TONES = { product: 'sun', social: 'sky', brand: 'coral', story: 'lilac', motion: 'mint' };

  Store.load();

  /* ---------------- helpers ---------------- */
  const byId = {};
  LEVELS.forEach(l => {
    byId[l.id] = { type: 'level', level: l };
    l.lessons.forEach((x, i) => { byId[x.id] = { type: 'lesson', level: l, item: x, index: i }; });
    l.exercises.forEach((x, i) => { byId[x.id] = { type: 'exercise', level: l, item: x, index: i }; });
  });
  const ALL_LESSONS = LEVELS.flatMap(l => l.lessons);
  const P = () => Store.active();
  const fmtDate = iso => { try { return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }); } catch (e) { return ''; } };
  const initials = n => String(n).trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const lvVar = l => 'var(--lv' + l.num + ')';
  const val = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
  const pct = x => Math.round((x || 0) * 100) + '%';

  /* A lesson is complete only when its activity has been passed (demonstrated work). */
  function lessonPassed(p, lesson) {
    if (ACTS[lesson.id]) { const a = p.activities[lesson.id]; return !!(a && a.passed); }
    return !!p.lessons[lesson.id];
  }
  function exerciseScore(p, e) { const s = p.exercises[e.id]; return s && s.checks && s.checks.length ? Math.max(...s.checks.map(c => c.score)) : 0; }

  function levelStatus(p, l) {
    const lessonsDone = l.lessons.filter(x => lessonPassed(p, x)).length;
    const req = l.exercises.filter(e => e.required !== false);
    const reqDone = req.filter(e => p.exercises[e.id] && p.exercises[e.id].done).length;
    const exDone = l.exercises.filter(e => p.exercises[e.id] && p.exercises[e.id].done).length;
    const quiz = p.quizzes[l.id];
    const quizPassed = !!(quiz && quiz.passed);
    const checkpointOpen = lessonsDone === l.lessons.length;
    const complete = checkpointOpen && reqDone === req.length && quizPassed;
    const prev = LEVELS[LEVELS.indexOf(l) - 1];
    const unlocked = !prev || p.unlockAll || levelStatus(p, prev).complete;
    const parts = l.lessons.length + req.length + 1;
    const pc = Math.round(((lessonsDone + reqDone + (quizPassed ? 1 : 0)) / parts) * 100);
    return { lessonsDone, reqDone, reqTotal: req.length, exDone, quiz, quizPassed, checkpointOpen, complete, unlocked, pct: pc };
  }
  function xpOf(p) {
    let x = Object.values(p.activities || {}).filter(a => a.passed).length * XP.activity;
    x += Object.values(p.exercises).filter(e => e.done).length * XP.exercise;
    x += Object.values(p.quizzes).filter(q => q.passed).length * XP.checkpoint;
    return x;
  }
  const maxXp = LEVELS.reduce((s, l) => s + l.lessons.length * XP.activity + l.exercises.length * XP.exercise + XP.checkpoint, 0);
  function rankOf(p) {
    const done = LEVELS.filter(l => levelStatus(p, l).complete);
    return done.length ? done[done.length - 1] : null;
  }
  function nextStep(p) {
    for (const l of LEVELS) {
      const s = levelStatus(p, l);
      if (s.complete) continue;
      if (!s.unlocked) break;
      const lesson = l.lessons.find(x => !lessonPassed(p, x));
      if (lesson) return { href: '#/lesson/' + lesson.id, label: lesson.title, kind: ACTS[lesson.id] ? 'Lesson + ' + TYPE_LABEL[ACTS[lesson.id].type] : 'Lesson', level: l };
      const ex = l.exercises.find(e => e.required !== false && !(p.exercises[e.id] && p.exercises[e.id].done));
      if (ex) return { href: '#/exercise/' + ex.id, label: ex.title, kind: 'Practical', level: l };
      return { href: '#/checkpoint/' + l.id, label: 'Level ' + l.num + ' checkpoint', kind: 'Checkpoint', level: l };
    }
    return { href: '#/capstone', label: LU.capstone.title, kind: 'Capstone', level: LEVELS[LEVELS.length - 1] };
  }

  /* ---- Evidence-based skill ratings (defined thresholds; never set by reading alone) ---- */
  const SKILL_RULES = 'Practicing = at least one passed lesson challenge or completed practical for this skill. Confident = every lesson challenge that trains this skill passed with an average best score of 80%+, at least one completed practical with no "Developing" rubric rows, and a passed checkpoint in a level that trains this skill.';
  function skillEvidence(p, sid) {
    const acts = ALL_LESSONS.filter(x => ACTS[x.id] && ACTS[x.id].skill === sid);
    const passed = acts.filter(x => p.activities[x.id] && p.activities[x.id].passed);
    const avg = passed.length ? passed.reduce((s, x) => s + p.activities[x.id].best, 0) / passed.length : 0;
    const lvls = LEVELS.filter(l => l.skills.includes(sid));
    const exs = lvls.flatMap(l => l.exercises).filter(e => p.exercises[e.id] && p.exercises[e.id].done);
    const solid = exs.filter(e => { const r = Object.values(p.exercises[e.id].rubric || {}); return r.length && r.every(v => v >= 1); });
    const cp = lvls.some(l => p.quizzes[l.id] && p.quizzes[l.id].passed);
    const need = acts.length;
    let level = 0;
    if (passed.length || exs.length) level = 1;
    if (level && passed.length >= need && (!need || avg >= 0.8) && solid.length >= 1 && cp) level = 2;
    return { level, passed: passed.length, total: acts.length, need, avg, exDone: exs.length, solid: solid.length, cp };
  }

  /* Run a mutation, then announce any level completions/unlocks it caused. */
  function commit(fn, msg) {
    const p = P();
    const before = LEVELS.map(l => levelStatus(p, l).complete);
    const skillsBefore = LU.skills.map(s => skillEvidence(p, s.id).level);
    const ok = Store.update(fn);
    if (!ok) { toast('Could not save. This browser may be blocking local storage, or storage is full (large attachments use space).', 'error'); return false; }
    if (msg) toast(msg);
    LEVELS.forEach((l, i) => {
      if (!before[i] && levelStatus(p, l).complete) {
        const next = LEVELS[i + 1];
        toast('<strong>Level up!</strong>Level ' + l.num + ' - ' + esc(l.name) + ' complete.' + (next ? ' Unlocked: Level ' + next.num + ' - ' + esc(next.name) + '.' : ' The capstone is waiting.'), 'levelup', true);
      }
    });
    LU.skills.forEach((s, i) => {
      const now = skillEvidence(p, s.id).level;
      if (now > skillsBefore[i]) toast('<strong>Skill up</strong>' + esc(s.name) + ': ' + LU.skillLevels[now], 'skill', true);
    });
    return true;
  }

  function toast(text, kind, html) {
    const t = document.createElement('div');
    t.className = 'toast' + (kind ? ' toast--' + kind : '');
    if (html) t.innerHTML = text; else t.textContent = text;
    document.getElementById('toasts').appendChild(t);
    setTimeout(() => t.remove(), kind === 'levelup' || kind === 'skill' ? 6500 : 3500);
  }

  function download(name, text) {
    const blob = new Blob([text], { type: 'application/json' });
    /* An app installed on an iPhone/iPad home screen can't save downloads; offer the Share sheet (Save to Files) instead. */
    const PWA = window.PWA || {};
    if (PWA.isIOS && PWA.installed && navigator.canShare) {
      const file = new File([text], name, { type: 'application/json' });
      if (navigator.canShare({ files: [file] })) { navigator.share({ files: [file], title: name }).catch(() => {}); return; }
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  /* Modal dialog. buttons: [{label, value, primary, danger, check}] -> Promise<value|null> */
  function ask(title, bodyHtml, buttons) {
    const dlg = document.getElementById('dialog');
    dlg.innerHTML = '<h2 id="dialog-title">' + esc(title) + '</h2><div>' + bodyHtml + '</div><div class="row row--end" style="margin-top:20px">' +
      buttons.map((b, i) => '<button type="button" class="btn ' + (b.primary ? 'btn--primary' : b.danger ? 'btn--danger' : 'btn--ghost') + '" data-i="' + i + '">' + esc(b.label) + '</button>').join('') + '</div>';
    return new Promise(resolve => {
      const done = v => { dlg.close(); resolve(v); };
      dlg.querySelectorAll('button[data-i]').forEach(btn => btn.addEventListener('click', async () => {
        const b = buttons[+btn.dataset.i];
        if (b.check && !(await b.check(dlg))) return;
        done(b.value);
      }));
      dlg.addEventListener('cancel', () => resolve(null), { once: true });
      dlg.querySelectorAll('input').forEach(inp => inp.addEventListener('keydown', ev => {
        if (ev.key === 'Enter') { ev.preventDefault(); const last = dlg.querySelectorAll('button[data-i]'); last[last.length - 1].click(); }
      }));
      dlg.showModal();
      const first = dlg.querySelector('input, textarea') || dlg.querySelector('button[data-i]');
      if (first) first.focus();
    });
  }
  function closeDialog() { const d = document.getElementById('dialog'); if (d.open) d.close(); d.innerHTML = ''; }

  /* Attach a result from this computer. Images are shrunk to a small preview kept in local storage;
     other files are recorded by name only - the file itself stays where it is. The app never analyses them. */
  function attachFile(file) {
    return new Promise(resolve => {
      const base = { id: Store.uid('att'), name: file.name, type: file.type || 'file', size: file.size, at: new Date().toISOString() };
      if (!/^image\//.test(file.type)) return resolve(base);
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const s = Math.min(1, 720 / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve(Object.assign(base, { thumb: c.toDataURL('image/jpeg', 0.72) }));
      };
      img.onerror = () => { URL.revokeObjectURL(url); resolve(base); };
      img.src = url;
    });
  }
  function attachmentsHtml(list, act, owner) {
    if (!list || !list.length) return '';
    return '<ul class="attachments">' + list.map(a => '<li>' + (a.thumb ? '<img src="' + a.thumb + '" alt="Your attached image: ' + esc(a.name) + '">' : '<span class="file-chip" aria-hidden="true">' + esc((a.name.split('.').pop() || 'file').slice(0, 4).toUpperCase()) + '</span>') +
      '<span class="attachments__name">' + esc(a.name) + '</span>' + (act ? '<button type="button" class="link-btn" data-act="' + act + '" data-id="' + esc(owner) + '" data-att="' + a.id + '">Remove</button>' : '') + '</li>').join('') + '</ul>';
  }
  function attachField(id, owner) {
    return '<div class="field"><label for="' + id + '">Attach your result (optional)</label><span class="hint">Made something in another tool? Attach a screenshot or note the file. Images are saved as a small preview in this browser; other files are recorded by name only. The app does not analyse or judge media - your instructor does.</span>' +
      '<input type="file" id="' + id + '" data-owner="' + esc(owner) + '" accept="image/*,video/*,audio/*,.pdf,.txt"></div>';
  }

  /* Score ring + attempt history. */
  function ring(score, size, passed) {
    return '<span class="ring' + (passed ? ' ring--pass' : '') + '" style="--p:' + Math.round(score * 100) + ';--s:' + (size || 72) + 'px" role="img" aria-label="Score ' + pct(score) + '"><span>' + pct(score) + '</span></span>';
  }
  function history(attempts) {
    if (!attempts || !attempts.length) return '';
    const last = attempts[attempts.length - 1], first = attempts[0];
    const diff = Math.round((last.score - first.score) * 100);
    return '<div class="history"><span class="label-mono">Your attempts</span><ol class="history__bars">' + attempts.map((a, i) =>
      '<li title="Attempt ' + (i + 1) + ': ' + pct(a.score) + '"><span class="history__bar' + (a.passed ? ' is-pass' : '') + '" style="height:' + Math.max(6, a.score * 100) + '%"></span><span class="history__n">' + (i + 1) + '</span></li>').join('') + '</ol>' +
      '<p class="small">' + attempts.length + ' attempt' + (attempts.length > 1 ? 's' : '') + (attempts.length > 1 ? ' &middot; ' + (diff > 0 ? '<strong class="up">+' + diff + ' points</strong> since your first try' : diff === 0 ? 'same score as your first try' : diff + ' points vs your first try') : '') + '</p></div>';
  }
  function feedbackPanel(fb, passMark, attempts, label) {
    if (!fb) return '';
    return '<section class="feedback-panel' + (fb.passed ? ' is-pass' : '') + '" aria-labelledby="fb-h" tabindex="-1" id="feedback">' +
      '<div class="feedback-panel__head">' + ring(fb.score, 84, fb.passed) + '<div><p class="label-mono">' + esc(label || 'Feedback') + '</p><h2 id="fb-h">' + (fb.passed ? 'Passed - nice work.' : 'Not there yet - keep going.') + '</h2>' +
      '<p class="small muted">Pass mark ' + pct(passMark) + '. Automatic checks look for the ingredients in the criteria; different creative answers can pass.</p></div></div>' +
      '<div class="feedback-panel__cols"><div class="fb-col fb-col--good"><h3>What worked</h3>' + (fb.worked.length ? '<ul>' + fb.worked.map(w => '<li>' + md(w) + '</li>').join('') + '</ul>' : '<p class="small muted">Nothing yet - check the criteria above.</p>') + '</div>' +
      '<div class="fb-col fb-col--fix"><h3>To improve</h3>' + (fb.improve.length ? '<ul>' + fb.improve.map(w => '<li>' + md(w) + '</li>').join('') + '</ul>' : '<p class="small muted">Nothing flagged. Try pushing it further anyway.</p>') + '</div></div>' +
      history(attempts) + '</section>';
  }

  function themeButton() {
    const dark = document.documentElement.dataset.theme === 'dark';
    return '<button type="button" class="btn btn--sm btn--ghost" data-act="theme" aria-pressed="' + dark + '" aria-label="Dark theme">' + (dark ? '☽ Dark' : '☀ Light') + '</button>';
  }

  /* ---------------- chrome ---------------- */
  const NAV = [
    { href: '#/home', label: 'Studio home', ico: '▶' },
    { href: '#/levels', label: 'Levels', ico: '↗' },
    { href: '#/projects', label: 'Project paths', ico: '▦' },
    { href: '#/brief', label: 'Brief builder', ico: '✎' },
    { href: '#/library', label: 'Library', ico: '≡' },
    { href: '#/portfolio', label: 'Portfolio', ico: '▣' },
    { href: '#/progress', label: 'Progress', ico: '◔' },
    { group: 'Toolkit' },
    { href: '#/capstone', label: 'Capstone', ico: '★' },
    { href: '#/checklist', label: 'Delivery checklist', ico: '✓' },
    { href: '#/profile', label: 'Profile & backup', ico: '☺' }
  ];
  const ADMIN_NAV = [
    { href: '#/admin', label: 'Overview', ico: '▤' },
    { href: '#/admin/students', label: 'Students', ico: '☺' },
    { href: '#/admin/guide', label: 'Teaching guide', ico: '✎' },
    { href: '#/admin/backups', label: 'Backups & settings', ico: '⇅' }
  ];
  function renderChrome(route, sub, isAdminView) {
    const map = { lesson: '#/levels', exercise: '#/levels', checkpoint: '#/levels', level: '#/levels', project: '#/projects' };
    const nav = isAdminView ? ADMIN_NAV : NAV;
    const current = isAdminView ? '#/admin' + (sub ? '/' + (sub === 'student' ? 'students' : sub) : '') : (map[route] || '#/' + route);
    document.getElementById('nav-list').innerHTML = nav.map(n => n.group
      ? '<li class="sidenav__group" role="presentation">' + n.group + '</li>'
      : '<li><a href="' + n.href + '"' + (n.href === current ? ' aria-current="page"' : '') + '><span class="sidenav__ico" aria-hidden="true">' + n.ico + '</span>' + n.label + '</a></li>').join('');
    document.getElementById('sidenav').setAttribute('aria-label', isAdminView ? 'Admin' : 'Main');
    document.getElementById('sidenav-note').innerHTML = isAdminView ? 'Admin mode ends on <strong>Log out</strong>, reload, or 15 idle minutes.' : 'Progress is saved in <strong>this browser on this computer</strong> only.';
    const p = P();
    const themeBtn = themeButton();
    document.getElementById('topbar-right').innerHTML = isAdminView
      ? '<span class="admin-pill">Admin mode</span>' + themeBtn + '<button type="button" class="btn btn--sm btn--ink" data-act="admin-logout">Log out</button>'
      : themeBtn + (p ? '<a class="who" href="#/profile" title="Profile and backup"><span class="avatar" aria-hidden="true">' + esc(initials(p.name)) + '</span><span class="who__name">' + esc(p.name) + '</span><span class="sr-only">Signed in as ' + esc(p.name) + '. Profile and backup</span></a><button type="button" class="btn btn--sm btn--ghost" data-act="sign-out">Sign out</button>' : '');
    document.querySelector('.brand').setAttribute('href', isAdminView ? '#/admin' : '#/home');
  }

  /* ---------------- views ---------------- */
  const views = {};
  const RINGS = '<svg class="rings" viewBox="8 -6 116 92" fill="none" aria-hidden="true"><circle cx="54" cy="40" r="33" stroke="currentColor" stroke-width="1.5"/><circle cx="78" cy="40" r="33" stroke="currentColor" stroke-width="1.5"/></svg>';

  /* Opening hero */
  views.intro = () => '<section class="intro">' +
    '<div class="intro__rings" aria-hidden="true">' + RINGS + '</div>' +
    '<div class="intro__theme">' + themeButton() + '</div>' +
    '<img class="intro__wordmark" src="assets/brand/absolute-studios-logo-black.svg" alt="Absolute Studios">' +
    '<p class="kicker">Absolute Studios presents</p>' +
    '<h1 tabindex="-1" class="intro__title">The Creative <em>Signal</em></h1>' +
    '<p class="intro__sub">RS Hundal\'s AI Studio &middot; AI Video, Visuals &amp; Creative Production</p>' +
    '<p class="lead intro__lead">Learn by making. Seven levels of hands-on challenges with instant feedback, from your first prompt to directing a full production.</p>' +
    '<div class="row intro__cta"><a class="btn btn--primary btn--lg" href="#/login">Enter the studio →</a>' + installHtml(true) + '</div>' +
    '<ol class="intro__steps" aria-label="The workflow you will learn">' + LU.workflow.map((w, i) => '<li style="--i:' + i + '">' + esc(w) + '</li>').join('') + '</ol>' +
    '<p class="small muted intro__note">Works offline. Everything stays in this browser on this device. &middot; <a href="#/admin">Instructor sign-in</a></p></section>';

  /* Student sign-in / create profile (Admin is never listed here) */
  let loginSel = null;
  const fails = {};
  function pinInput(id, label, auto) {
    return '<div class="field"><label for="' + id + '">' + label + '</label><input type="password" id="' + id + '" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="' + (auto || 'off') + '" class="pin-input" required></div>';
  }
  views.login = () => {
    const list = Store.list();
    const sel = loginSel && Store.get(loginSel);
    const lock = sel && fails[sel.id] && fails[sel.id].until > Date.now() ? Math.ceil((fails[sel.id].until - Date.now()) / 1000) : 0;
    let signIn;
    if (sel && Store.hasPin(sel.id)) {
      signIn = '<form id="pin-form" data-id="' + sel.id + '"><div class="row" style="margin-bottom:14px"><span class="avatar avatar--lg" aria-hidden="true">' + esc(initials(sel.name)) + '</span><strong class="big-name">' + esc(sel.name) + '</strong></div>' +
        pinInput('pin-in', 'Enter your PIN', 'current-password') + '<p id="pin-err" role="alert" class="err">' + (lock ? 'Too many wrong tries. Wait ' + lock + ' seconds.' : '') + '</p>' +
        '<div class="row"><button class="btn btn--primary" type="submit"' + (lock ? ' disabled' : '') + '>Sign in</button><button type="button" class="btn btn--ghost" data-act="login-back">Not you?</button></div>' +
        '<p class="small muted" style="margin-top:12px">Forgot your PIN? Ask your instructor - they can set a new one for you.</p></form>';
    } else if (sel) {
      signIn = '<form id="setpin-form" data-id="' + sel.id + '"><p><strong>' + esc(sel.name) + '</strong> has no PIN yet. Choose one now (4-6 digits).</p>' +
        pinInput('sp-1', 'New PIN', 'new-password') + pinInput('sp-2', 'Repeat PIN', 'new-password') + '<p id="sp-err" role="alert" class="err"></p>' +
        '<div class="row"><button class="btn btn--primary" type="submit">Set PIN &amp; sign in</button><button type="button" class="btn btn--ghost" data-act="login-back">Back</button></div></form>';
    } else {
      signIn = list.length ? '<p class="muted small">Choose your profile, then enter your PIN.</p><ul class="people">' + list.map((p, i) =>
        '<li><button type="button" class="person" style="--tone:var(--lv' + (i % 7 + 1) + ')" data-act="login-pick" data-id="' + esc(p.id) + '"><span class="avatar avatar--lg" aria-hidden="true">' + esc(initials(p.name)) + '</span><span><strong>' + esc(p.name) + '</strong><span class="small muted"> ' +
        (rankOf(p) ? 'Level ' + rankOf(p).num + ' complete' : 'Just starting') + '</span></span></button></li>').join('') + '</ul>'
        : '<div class="empty"><strong>No profiles yet</strong>Create yours here, or restore a backup below.</div>';
    }
    return '<div class="login-head">' + RINGS + '<div><p class="kicker">The Creative Signal &middot; RS Hundal\'s AI Studio</p><h1 tabindex="-1">Who\'s in the studio?</h1></div></div>' +
      '<div class="split"><section class="pane pane--tint-sky" aria-labelledby="ret-h"><h2 id="ret-h">I already have a profile</h2>' + signIn + '</section>' +
      '<section class="pane pane--tint-sun" aria-labelledby="new-h"><h2 id="new-h">I\'m new here</h2><form id="create-form" novalidate>' +
      '<div class="field"><label for="new-name">Your name</label><span class="hint" id="new-name-hint">Shown on your profile on this computer. No email needed.</span>' +
      '<input id="new-name" type="text" autocomplete="off" maxlength="60" aria-describedby="new-name-hint" required></div>' +
      '<div class="pair">' + pinInput('new-pin', 'Choose a PIN (4-6 digits)', 'new-password') + pinInput('new-pin2', 'Repeat PIN', 'new-password') + '</div>' +
      '<p id="new-name-err" class="err" role="alert"></p><button class="btn btn--primary" type="submit">Create profile &amp; start</button></form></section></div>' +
      '<details class="disclosure"><summary>Restore a profile from a backup file</summary><div>' + importField() + '</div></details>' +
      '<p class="small" style="margin-top:20px"><a href="#/intro">← Opening page</a> &middot; <a href="#/admin">Instructor sign-in</a></p>' +
      privacyNote() + footer();
  };
  function importField() {
    return '<div class="field"><label for="import-file">Choose a backup file (.json)</label><span class="hint">Only files exported from this app work. A restored profile keeps its own PIN.</span>' +
      '<input type="file" id="import-file" accept="application/json,.json"></div><div id="import-msg" role="alert"></div>';
  }
  function privacyNote() {
    return '<aside class="note-band" aria-labelledby="priv-h"><h2 id="priv-h">Where your work is saved</h2>' +
      '<ul><li>Everything is stored <strong>in this web browser on this device</strong> (local storage). Nothing is uploaded or sent anywhere, and no account is needed.</li>' +
      '<li>Your <strong>PIN</strong> keeps classmates out of your profile. It is a privacy lock, not strong security: someone with access to this computer\'s browser profile or files could still read the data. Don\'t save anything private.</li>' +
      '<li>Your instructor can open any profile and reset any PIN.</li>' +
      '<li>Progress does <strong>not</strong> sync to other computers or browsers. Export a backup from Profile &amp; backup to move or protect it. Clearing browser data erases progress.</li></ul></aside>';
  }
  function footer() {
    return '<p class="footer-note">Branding: the Absolute Studios ring mark and wordmark (supplied files). All client briefs and examples are <strong>fictional teaching material</strong> unless stated otherwise. Activities are checked automatically on this computer - no AI service is used, and media you attach is never analysed by the app.</p>';
  }

  /* Studio home */
  views.home = p => {
    const n = nextStep(p);
    const xp = xpOf(p), rank = rankOf(p);
    const lit = LEVELS.map(l => levelStatus(p, l));
    const recent = ALL_LESSONS.filter(x => p.activities[x.id] && p.activities[x.id].attempts && p.activities[x.id].attempts.length)
      .map(x => ({ x, a: p.activities[x.id], at: p.activities[x.id].attempts[p.activities[x.id].attempts.length - 1].at }))
      .sort((a, b) => b.at.localeCompare(a.at)).slice(0, 4);
    const passedActs = Object.values(p.activities).filter(a => a.passed).length;
    return '<header class="studio-head"><p class="kicker">' + (rank ? 'Level ' + rank.num + ' complete &middot; ' + esc(rank.name) : 'Your studio') + '</p><h1 tabindex="-1">Hi ' + esc(p.name.split(' ')[0]) + ', ready to make something?</h1></header>' +
      '<section class="mission" style="--tone:' + lvVar(n.level) + '" aria-labelledby="mission-h"><div class="mission__text"><p class="label-mono">Next move &middot; ' + esc(n.kind) + ' &middot; Level ' + n.level.num + '</p>' +
      '<h2 id="mission-h">' + esc(n.label) + '</h2><a class="btn btn--primary btn--lg" href="' + n.href + '">Let\'s go →</a></div>' +
      '<div class="mission__art" aria-hidden="true">' + RINGS + '<span class="mission__num">' + n.level.num + '</span></div></section>' +
      '<section aria-labelledby="path-h" class="block"><div class="spread"><h2 id="path-h">Your path</h2><a href="#/levels" class="small">All levels →</a></div>' +
      '<ol class="mini-path">' + LEVELS.map((l, i) => '<li class="' + (lit[i].complete ? 'is-done' : lit[i].unlocked ? 'is-open' : 'is-locked') + '" style="--tone:' + lvVar(l) + '"><a href="#/level/' + l.id + '"><span class="mini-path__dot">' + (lit[i].complete ? '✓' : l.num) + '</span><span class="mini-path__name">' + esc(l.name) + '</span><span class="mini-path__pct">' + lit[i].pct + '%</span></a></li>').join('') + '</ol></section>' +
      '<section class="stats-line" aria-label="Your numbers"><div><span class="stat">' + xp + '</span><span class="stat__label">XP of ' + maxXp + '</span></div><div><span class="stat">' + passedActs + '<small>/' + ALL_LESSONS.length + '</small></span><span class="stat__label">activities passed</span></div>' +
      '<div><span class="stat">' + Object.values(p.exercises).filter(e => e.done).length + '</span><span class="stat__label">practicals done</span></div><div><span class="stat">' + LU.skills.filter(s => skillEvidence(p, s.id).level === 2).length + '</span><span class="stat__label">skills at Confident</span></div></section>' +
      '<div class="two-up"><section aria-labelledby="recent-h" class="block"><h2 id="recent-h">Recent feedback</h2>' + (recent.length ? '<ul class="rows">' + recent.map(r => {
        const last = r.a.attempts[r.a.attempts.length - 1];
        return '<li><a class="row-link" href="#/lesson/' + r.x.id + '">' + ring(last.score, 44, last.passed) + '<span><strong>' + esc(r.x.title) + '</strong><span class="small muted">' + r.a.attempts.length + ' attempt' + (r.a.attempts.length > 1 ? 's' : '') + (r.a.passed ? ' &middot; passed' : ' &middot; keep going') + '</span></span></a></li>';
      }).join('') + '</ul>' : '<div class="empty"><strong>No attempts yet</strong>Your first activity is one click away.</div>') + '</section>' +
      '<section aria-labelledby="tools-h" class="block"><h2 id="tools-h">Studio tools</h2><ul class="chips">' +
      [['#/brief/new', 'Write a brief', 'sun'], ['#/library', 'Save a prompt', 'sky'], ['#/portfolio', 'Add to portfolio', 'coral'], ['#/projects', 'Pick a project', 'lilac'], ['#/checklist', 'Delivery checklist', 'mint'], ['#/capstone', 'Capstone', 'pink']]
        .map(q => '<li><a class="chip chip--' + q[2] + '" href="' + q[0] + '">' + q[1] + '</a></li>').join('') + '</ul>' +
      '<h3 style="margin-top:24px">The workflow</h3>' + R.flow(LU.workflow, [], '') + '</section></div>' + footer();
  };

  views.levels = p => '<header class="page-head"><p class="kicker">Learning path</p><h1 tabindex="-1">Seven levels up</h1><p class="lead">Every lesson ends with a hands-on challenge. Pass the challenges to open the checkpoint; pass the checkpoint and the required practicals to level up.</p></header>' +
    '<ol class="path">' + LEVELS.map(l => {
      const s = levelStatus(p, l);
      const state = s.complete ? 'Complete' : s.unlocked ? s.pct + '% done' : 'Locked';
      return '<li class="path__stop ' + (s.complete ? 'is-done' : s.unlocked ? 'is-open' : 'is-locked') + '" style="--tone:' + lvVar(l) + '"><a href="#/level/' + l.id + '"><span class="path__node" aria-hidden="true">' + (s.complete ? '✓' : l.num) + '</span>' +
        '<span class="path__body"><span class="label-mono">Level ' + l.num + ' &middot; ' + state + '</span><span class="path__title">' + esc(l.name) + '</span><span class="path__tag">' + esc(l.tagline) + '</span>' +
        '<span class="bar" aria-hidden="true"><span style="width:' + s.pct + '%"></span></span></span></a></li>';
    }).join('') + '</ol>' +
    '<aside class="note-band"><h2>How levelling up works</h2><ol><li><strong>Learn, then do:</strong> each lesson is short and ends with a challenge. A lesson counts only when you pass its challenge.</li><li><strong>Practicals:</strong> complete the required practicals - auto-checked, then self-assessed with the rubric.</li><li><strong>Checkpoint:</strong> opens once every lesson challenge is passed. Score at least the pass mark (retries allowed).</li></ol><p class="small muted">Your instructor can unlock all levels for you.</p></aside>';

  views.level = (p, id) => {
    const l = LEVELS.find(x => x.id === id);
    if (!l) return notFound();
    const s = levelStatus(p, l);
    const prev = LEVELS[LEVELS.indexOf(l) - 1];
    const go = (href, html, cls) => s.unlocked ? '<a class="row-link ' + (cls || '') + '" href="' + href + '">' + html + '</a>' : '<div class="row-link is-disabled" aria-disabled="true">' + html + '</div>';
    const crit = [
      ['Pass every lesson challenge', s.lessonsDone + '/' + l.lessons.length, s.lessonsDone === l.lessons.length],
      ['Complete the required practicals', s.reqDone + '/' + s.reqTotal, s.reqDone === s.reqTotal],
      ['Pass the checkpoint (' + pct(l.checkpoint.passMark || .75) + '+)', s.quiz ? 'best ' + pct(s.quiz.best) : 'not taken', s.quizPassed]
    ];
    return '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/levels">Levels</a> / Level ' + l.num + '</nav>' +
      '<header class="level-band" style="--tone:' + lvVar(l) + '"><span class="level-band__num" aria-hidden="true">' + l.num + '</span><div><p class="label-mono">Level ' + l.num + '</p><h1 tabindex="-1">' + esc(l.name) + '</h1><p class="lead">' + md(l.summary) + '</p>' +
      '<p class="small">' + l.skills.map(sid => { const sk = LU.skills.find(k => k.id === sid); return sk ? '<span class="tag">' + esc(sk.name) + '</span>' : ''; }).join('') + '</p></div></header>' +
      (s.unlocked ? '' : '<div class="callout callout--warn"><div class="callout__title">Locked</div>Finish Level ' + prev.num + ' (' + esc(prev.name) + ') to unlock this level. You can preview what\'s inside.</div>') +
      '<div class="two-up"><section class="block"><h2>You will be able to</h2><ul class="ticks">' + l.outcomes.map(o => '<li>' + md(o) + '</li>').join('') + '</ul></section>' +
      '<section class="block"><h2>To level up</h2><ul class="criteria">' + crit.map(c => '<li class="' + (c[2] ? 'is-met' : '') + '"><span class="criteria__mark" aria-hidden="true">' + (c[2] ? '✓' : '') + '</span><span>' + c[0] + '<span class="small muted"> &middot; ' + c[1] + '</span><span class="sr-only">' + (c[2] ? ' - met' : ' - not yet') + '</span></span></li>').join('') + '</ul>' +
      '<span class="bar bar--lg" role="img" aria-label="Level ' + s.pct + '% complete"><span style="width:' + s.pct + '%;background:' + lvVar(l) + '"></span></span></section></div>' +
      '<section class="block"><h2>Lessons &amp; challenges</h2><ol class="timeline">' + l.lessons.map((x, i) => {
        const a = ACTS[x.id], st = p.activities[x.id], done = lessonPassed(p, x);
        return '<li class="' + (done ? 'is-done' : '') + '">' + go('#/lesson/' + x.id, '<span class="timeline__dot" aria-hidden="true">' + (done ? '✓' : i + 1) + '</span><span class="timeline__body"><strong>' + esc(x.title) + '</strong><span class="small muted">' +
          (a ? TYPE_LABEL[a.type] + ' &middot; ' + (a.minutes || 8) + ' min' : (x.minutes || 15) + ' min') + (st && st.attempts && st.attempts.length ? ' &middot; best ' + pct(st.best) + (done ? ' &middot; passed' : '') : '') + '</span></span>' + (st && st.attempts && st.attempts.length ? ring(st.best, 40, done) : '')) + '</li>';
      }).join('') + '</ol></section>' +
      '<section class="block"><h2>Practicals</h2><ul class="rows">' + l.exercises.map(e => { const d = p.exercises[e.id] && p.exercises[e.id].done; return '<li>' + go('#/exercise/' + e.id,
        '<span class="kind-dot kind-dot--' + e.kind + '" aria-hidden="true"></span><span><strong>' + esc(e.title) + '</strong><span class="small muted">' + kindLabel(e.kind) + ' &middot; ' + e.minutes + ' min &middot; ' + (e.required !== false ? 'Required' : 'Optional') + (d ? ' &middot; done ✓' : '') + '</span></span>') + '</li>'; }).join('') + '</ul></section>' +
      '<section class="block"><h2>Checkpoint</h2>' + (s.checkpointOpen && s.unlocked ? '<ul class="rows"><li>' + go('#/checkpoint/' + l.id, '<span class="kind-dot kind-dot--quiz" aria-hidden="true"></span><span><strong>Level ' + l.num + ' knowledge check</strong><span class="small muted">' + l.checkpoint.questions.length + ' questions' + (s.quiz ? ' &middot; best ' + pct(s.quiz.best) + ' (' + s.quiz.attempts + ' attempt' + (s.quiz.attempts > 1 ? 's' : '') + ')' : '') + '</span></span>') + '</li></ul>'
        : '<p class="muted">🔒 Opens when you have passed all ' + l.lessons.length + ' lesson challenges (' + s.lessonsDone + ' passed so far).</p>') + '</section>' +
      reflectBox('Reflect on Level ' + l.num, 'level-' + l.id);
  };

  function kindLabel(k) {
    return { prompt: 'Prompt challenge', scenario: 'Choose the next step', critique: 'Critique & revise', reference: 'Reference analysis', task: 'Practical task' }[k] || 'Practical';
  }
  function guardLocked(p, l) {
    const s = levelStatus(p, l);
    return s.unlocked ? '' : '<h1 tabindex="-1">Level ' + l.num + ' is locked</h1><div class="callout callout--warn"><div class="callout__title">This level is locked</div>Finish the previous level first. <a href="#/level/' + l.id + '">Back to level overview</a></div>';
  }

  /* Lesson = short explanation, then a hands-on activity with feedback and retries. */
  views.lesson = (p, id) => {
    const ref = byId[id];
    if (!ref || ref.type !== 'lesson') return notFound();
    const l = ref.level, x = ref.item;
    const locked = guardLocked(p, l);
    if (locked) return locked;
    const a = ACTS[x.id];
    const st = p.activities[x.id] || {};
    const prev = l.lessons[ref.index - 1], next = l.lessons[ref.index + 1];
    const done = lessonPassed(p, x);
    const isVisual = b => ['flow', 'prompt', 'timeline', 'compare'].includes(b.type);
    const firstP = x.blocks.find(b => b.type === 'p');
    const terms = x.blocks.find(b => b.type === 'terms');
    const visual = x.blocks.find(isVisual);
    const shown = [firstP, visual, terms].filter(Boolean);
    const rest = x.blocks.filter(b => !shown.includes(b));
    const last = st.attempts && st.attempts[st.attempts.length - 1];
    return '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/levels">Levels</a> / <a href="#/level/' + l.id + '">Level ' + l.num + ': ' + esc(l.name) + '</a> / Lesson ' + (ref.index + 1) + '</nav>' +
      '<header class="lesson-head" style="--tone:' + lvVar(l) + '"><p class="label-mono">Lesson ' + (ref.index + 1) + ' of ' + l.lessons.length + '</p><h1 tabindex="-1">' + esc(x.title) + '</h1>' +
      '<ol class="stepper" aria-label="Lesson steps"><li class="is-on"><a href="#learn">1 Learn <small>~3 min</small></a></li><li class="' + (a ? 'is-on' : '') + '"><a href="#do">2 Do <small>' + (a ? (a.minutes || 8) + ' min' : '') + '</small></a></li><li class="' + (last ? 'is-on' : '') + '"><a href="#feedback-anchor">3 Feedback</a></li>' + (done ? '<li class="is-done"><span>✓ Passed</span></li>' : '') + '</ol></header>' +
      '<section id="learn" class="learn" aria-labelledby="learn-h"><h2 id="learn-h" class="label-mono">The short version</h2><div class="learn__body">' + shown.map(R.block).join('') + '</div>' +
      (rest.length ? '<details class="disclosure"><summary>Go deeper (' + rest.length + ' more sections, examples and tool notes)</summary><div class="learn__body">' + rest.map(R.block).join('') + '</div></details>' : '') + '</section>' +
      (a ? '<section id="do" class="workspace" style="--tone:' + lvVar(l) + '" aria-labelledby="do-h"><div class="workspace__brief"><p class="label-mono">Your challenge &middot; ' + TYPE_LABEL[a.type] + '</p><h2 id="do-h">' + esc(a.title) + '</h2>' +
        '<dl class="brief-strip"><div><dt>Task</dt><dd>' + md(a.task) + '</dd></div><div><dt>Expected result</dt><dd>' + md(a.expected) + '</dd></div><div><dt>Time</dt><dd>' + (a.minutes || 8) + ' min</dd></div></dl>' +
        '<div class="assess"><span class="label-mono">How it\'s assessed &middot; pass mark ' + pct(a.passMark || 0.7) + '</span><ul>' + (a.criteria || []).map(c => '<li>' + md(c) + '</li>').join('') + '</ul></div></div>' +
        '<form id="activity" data-id="' + x.id + '" class="workspace__work" novalidate>' + ACT.render(a, x.id, st) +
        '<p id="act-err" class="err" role="alert"></p><div class="row"><button class="btn btn--primary" type="submit">' + (last ? 'Check again' : 'Check my work') + '</button>' +
        (a.type === 'order' || a.type === 'spot' || a.type === 'match' || a.type === 'quick' || a.type === 'choose' ? '<button type="button" class="btn btn--ghost" data-act="act-reset" data-id="' + x.id + '">Start over</button>' : '') + '</div></form></section>'
        : '<section class="workspace"><p>This lesson has no challenge yet.</p>' + (done ? '' : '<button type="button" class="btn btn--primary" data-act="lesson-done" data-id="' + x.id + '">Mark lesson complete</button>') + '</section>') +
      '<div id="feedback-anchor">' + (last ? feedbackPanel(last, a.passMark || 0.7, st.attempts, 'Feedback on attempt ' + st.attempts.length) : '') + '</div>' +
      '<nav class="pager" aria-label="Lesson navigation">' + (prev ? '<a class="btn btn--ghost" href="#/lesson/' + prev.id + '">← Previous lesson</a>' : '<span></span>') +
      (next ? '<a class="btn ' + (done ? 'btn--primary' : 'btn--ghost') + '" href="#/lesson/' + next.id + '">Next lesson →</a>' : '<a class="btn ' + (done ? 'btn--primary' : 'btn--ghost') + '" href="#/level/' + l.id + '">Back to level →</a>') + '</nav>';
  };

  /* Practical exercise: work area, automatic ingredient checks with feedback + retries, attachment, rubric self-assessment. */
  views.exercise = (p, id) => {
    const ref = byId[id];
    if (!ref || ref.type !== 'exercise') return notFound();
    const l = ref.level, e = ref.item;
    const locked = guardLocked(p, l);
    if (locked) return locked;
    const st = p.exercises[e.id] || { response: {}, rubric: {} };
    const r = st.response || {};
    const ta = (key, label, hint, rows) => '<div class="field"><label for="f-' + key + '">' + esc(label) + '</label>' + (hint ? '<span class="hint">' + esc(hint) + '</span>' : '') +
      '<textarea id="f-' + key + '" data-ex-field="' + esc(key) + '" rows="' + (rows || 4) + '">' + esc(r[key] || '') + '</textarea></div>';
    let body = '';
    if (e.kind === 'prompt') {
      body = (e.starter ? '<blockquote class="specimen"><span class="tag-fiction">Starting prompt (weak)</span><span class="mono">' + esc(e.starter) + '</span></blockquote>' : '') +
        ta('v1', 'Your prompt - version 1', 'Write it in full. Name the subject, action, setting, style, light, camera and format where relevant.', 5) +
        (e.checklist ? '<fieldset><legend>Self-check your prompt</legend>' + e.checklist.map((c, i) => '<label class="choice"><input type="checkbox" data-ex-check="' + i + '"' + (r.checks && r.checks[i] ? ' checked' : '') + '><span>' + esc(c) + '</span></label>').join('') + '</fieldset>' : '') +
        ta('v2', 'Revision - version 2', 'Change one or two things on purpose. Rewrite the prompt.', 5) +
        ta('why', 'What did you change and why?', 'If you tested it in a tool, what happened? What would you try next?', 3) +
        '<button type="button" class="btn btn--ghost btn--sm" data-act="ex-to-library" data-id="' + e.id + '">Save my latest prompt to Library</button>';
    } else if (e.kind === 'scenario') {
      const picked = r.picked;
      body = '<div class="scenario">' + md(e.situation) + '</div><fieldset><legend>What is the best next step?</legend>' +
        e.options.map((o, i) => {
          const isPicked = picked === i;
          return '<label class="choice' + (isPicked ? (o.correct ? ' is-right' : ' is-wrong') : '') + '"><input type="radio" name="scn" value="' + i + '" data-act="scenario-pick" data-id="' + e.id + '"' + (isPicked ? ' checked' : '') + '><span>' + md(o.text) + '</span></label>' +
            (isPicked ? '<div class="inline-fb ' + (o.correct ? 'is-good' : 'is-fix') + '" role="status"><strong>' + (o.correct ? 'Good call.' : 'Not the best move.') + '</strong> ' + md(o.feedback) + (o.correct ? '' : ' Try another option.') + '</div>' : '');
        }).join('') + '</fieldset>' + ta('note', 'Your reasoning (optional)', 'Why is that the right step? What would happen otherwise?', 3);
    } else if (e.kind === 'critique') {
      body = '<blockquote class="specimen"><span class="tag-fiction">The work to critique</span>' + md(e.before) + '</blockquote>' +
        ta('notes', 'Your critique notes', 'Name the issue, why it matters ("because..."), and a fix.', 5) +
        (r.revealed ? '<div class="reveal"><h3>Expert notes</h3><ul>' + e.modelNotes.map(n => '<li>' + md(n) + '</li>').join('') + '</ul><h3>A revised version</h3><div class="pre">' + md(e.after) + '</div><p class="small muted">Compare with your notes. What did you catch? What did you miss?</p></div>'
          : '<p><button type="button" class="btn btn--ghost btn--sm" data-act="ex-reveal" data-id="' + e.id + '">Reveal expert notes &amp; revision</button> <span class="small muted">Write your own notes first.</span></p>') +
        ta('revision', 'Your revised version', 'Rewrite or re-describe the work with your fixes applied.', 5);
    } else if (e.kind === 'reference') {
      body = '<div class="pair"><div class="field"><label for="f-refTitle">Reference (what is it?)</label><input type="text" id="f-refTitle" data-ex-field="refTitle" value="' + esc(r.refTitle || '') + '"></div>' +
        '<div class="field"><label for="f-refUrl">Link or location (optional)</label><span class="hint">The app does not fetch it.</span><input type="text" id="f-refUrl" data-ex-field="refUrl" value="' + esc(r.refUrl || '') + '"></div></div>' +
        (e.focus || []).map(f => ta('focus-' + f, f, '', 2)).join('') +
        ta('borrow', 'The principle I will borrow', 'Not the image itself - the idea behind it (e.g. "low side light to show texture").', 2) +
        ta('avoid', 'What I will NOT copy', 'Specific characters, compositions, logos, a living artist\'s signature style.', 2) +
        '<button type="button" class="btn btn--ghost btn--sm" data-act="ex-to-library" data-id="' + e.id + '">Save this analysis to Library</button>';
    } else {
      body = (e.fields || ['Your response']).map((f, i) => ta('field' + i, f, '', 3)).join('');
    }
    const checks = st.checks || [];
    const lastCheck = checks[checks.length - 1];
    const best = exerciseScore(p, e);
    const rubricDone = Object.keys(st.rubric || {}).length >= e.rubric.length;
    const rub = e.rubric.map((row, i) => '<div class="rubric-row"><p><strong>' + esc(row.criterion) + '</strong></p><div class="seg" role="radiogroup" aria-label="' + esc(row.criterion) + '">' +
      ['developing', 'solid', 'strong'].map((k, j) => '<label title="' + esc(row[k]) + '"><input type="radio" name="rub-' + i + '" value="' + j + '" data-act="ex-rubric" data-id="' + e.id + '" data-row="' + i + '"' + (st.rubric && st.rubric[i] === j ? ' checked' : '') + '><span>' + ['Developing', 'Solid', 'Strong'][j] + '</span></label>').join('') +
      '</div><p class="small muted">' + (st.rubric && st.rubric[i] != null ? esc(row[['developing', 'solid', 'strong'][st.rubric[i]]]) : 'Strong = ' + esc(row.strong)) + '</p></div>').join('');
    return '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/levels">Levels</a> / <a href="#/level/' + l.id + '">Level ' + l.num + ': ' + esc(l.name) + '</a> / Practical</nav>' +
      '<header class="lesson-head" style="--tone:' + lvVar(l) + '"><p class="label-mono">' + kindLabel(e.kind) + ' &middot; ' + (e.required !== false ? 'Required' : 'Optional') + ' practical</p><h1 tabindex="-1">' + esc(e.title) + '</h1>' +
      '<dl class="brief-strip"><div><dt>Task</dt><dd>' + md(e.task) + '</dd></div><div><dt>Expected output</dt><dd>' + md(e.output) + '</dd></div><div><dt>Time</dt><dd>' + e.minutes + ' min</dd></div></dl></header>' +
      (e.hints && e.hints.length ? '<details class="disclosure"><summary>Hints (' + e.hints.length + ')</summary><ul>' + e.hints.map(h => '<li>' + md(h) + '</li>').join('') + '</ul></details>' : '') +
      '<section class="workspace" style="--tone:' + lvVar(l) + '" aria-labelledby="work-h"><div class="spread"><h2 id="work-h">Your work</h2><span class="small muted" id="autosave" aria-live="polite">Saves as you type</span></div>' + body +
      attachmentsHtml(st.attachments, 'ex-att-remove', e.id) + attachField('ex-attach', e.id) +
      '<div class="row"><button type="button" class="btn btn--primary" data-act="ex-check" data-id="' + e.id + '">' + (lastCheck ? 'Check again' : 'Check my work') + '</button><span class="small muted">Automatic checks cover the ingredients; your rubric self-assessment and your instructor cover the craft.</span></div></section>' +
      '<div id="feedback-anchor">' + (lastCheck ? feedbackPanel(Object.assign({}, lastCheck, { passed: lastCheck.score >= 0.6 }), 0.6, checks.map(c => ({ score: c.score, passed: c.score >= 0.6 })), 'Automatic check ' + checks.length) : '') + '</div>' +
      '<section class="block" aria-labelledby="rub-h"><h2 id="rub-h">Rubric</h2>' + R.rubricTable(e.rubric) + '<h3 style="margin-top:20px">Self-assess</h3><p class="small muted">Be honest - this is for you and your instructor.</p>' + rub + '</section>' +
      '<div class="complete-bar"><ul class="criteria criteria--inline"><li class="' + (best >= 0.6 ? 'is-met' : '') + '"><span class="criteria__mark" aria-hidden="true">' + (best >= 0.6 ? '\u2713' : '') + '</span>Automatic check 60%+ (best ' + pct(best) + ')</li>' +
      '<li class="' + (rubricDone ? 'is-met' : '') + '"><span class="criteria__mark" aria-hidden="true">' + (rubricDone ? '\u2713' : '') + '</span>Rubric self-assessed</li></ul>' +
      (st.done ? '<span class="row"><span class="badge badge--ok">\u2713 Practical complete</span><button type="button" class="btn btn--sm btn--ghost" data-act="ex-undo" data-id="' + e.id + '">Reopen</button></span>'
        : '<button type="button" class="btn btn--primary" data-act="ex-done" data-id="' + e.id + '">Mark practical complete (+' + XP.exercise + ' XP)</button>') + '</div>' +
      '<p id="ex-error" role="alert" class="err"></p><p><a href="#/level/' + l.id + '">\u2190 Level overview</a></p>';
  };

  views.checkpoint = (p, id) => {
    const l = LEVELS.find(x => x.id === id);
    if (!l) return notFound();
    const locked = guardLocked(p, l);
    if (locked) return locked;
    const s = levelStatus(p, l);
    if (!s.checkpointOpen) return '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/levels">Levels</a> / <a href="#/level/' + l.id + '">Level ' + l.num + '</a> / Checkpoint</nav><h1 tabindex="-1">Checkpoint not open yet</h1>' +
      '<p class="lead">Pass every lesson challenge in Level ' + l.num + ' first (' + s.lessonsDone + ' of ' + l.lessons.length + ' passed).</p><p><a class="btn btn--primary" href="#/level/' + l.id + '">Back to the level</a></p>';
    const q = p.quizzes[l.id];
    const last = q && q.lastAnswers;
    const show = !!(q && q.showResults);
    const pass = l.checkpoint.passMark || .75;
    return '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/levels">Levels</a> / <a href="#/level/' + l.id + '">Level ' + l.num + '</a> / Checkpoint</nav>' +
      '<header class="lesson-head" style="--tone:' + lvVar(l) + '"><p class="label-mono">Checkpoint &middot; pass mark ' + pct(pass) + '</p><h1 tabindex="-1">Level ' + l.num + ' knowledge check</h1><ul class="ticks">' + l.checkpoint.criteria.map(c => '<li>' + md(c) + '</li>').join('') + '</ul></header>' +
      (show ? '<div class="result-band ' + (q.lastScore >= pass ? 'is-pass' : '') + '" role="status">' + ring(q.lastScore, 72, q.lastScore >= pass) + '<div><strong>' + (q.lastScore >= pass ? 'Passed!' : 'Not yet') + '</strong><p class="small">' + (q.lastScore >= pass ? 'Read the explanations below, then head back to the level.' : 'Read the explanations, review the lessons, and try again. Your best score is kept.') + '</p></div></div>' : '') +
      '<form id="quiz" class="quiz">' + l.checkpoint.questions.map((qq, i) => '<fieldset class="q"><legend><span class="q__n">' + (i + 1) + '</span>' + md(qq.q) + '</legend>' +
        qq.options.map((o, j) => {
          let cls = '';
          if (show && last) { if (j === qq.answer) cls = ' is-right'; else if (last[i] === j) cls = ' is-wrong'; }
          return '<label class="choice' + cls + '"><input type="radio" name="q' + i + '" value="' + j + '"' + (show && last && last[i] === j ? ' checked' : '') + ' required><span>' + md(o) + (show && j === qq.answer ? ' <span class="badge badge--ok">Answer</span>' : '') + '</span></label>';
        }).join('') +
        (show ? '<div class="inline-fb ' + (last[i] === qq.answer ? 'is-good' : 'is-fix') + '"><strong>' + (last[i] === qq.answer ? 'Correct.' : 'Not quite.') + '</strong> ' + md(qq.explain) + '</div>' : '') + '</fieldset>').join('') +
      '<p id="quiz-err" role="alert" class="err"></p><div class="row"><button class="btn btn--primary" type="submit">' + (show ? 'Submit again' : 'Check my answers') + '</button>' +
      (show ? '<button type="button" class="btn btn--ghost" data-act="quiz-reset" data-id="' + l.id + '">Clear answers</button>' : '') + '<a class="btn btn--ghost" href="#/level/' + l.id + '">Back to level</a></div></form>';
  };

  views.projects = p => '<header class="page-head"><p class="kicker">Choose a direction</p><h1 tabindex="-1">Project paths</h1><p class="lead">Pick a path to practise on. Each has a fictional sample brief and milestones that follow the full workflow.</p></header>' +
    '<div class="mosaic">' + LU.projects.map((pr, i) => {
      const done = Object.values(p.milestones[pr.id] || {}).filter(Boolean).length;
      return '<a class="tile tile--' + (PROJECT_TONES[pr.id] || 'sun') + (i === 0 ? ' tile--wide' : '') + '" href="#/project/' + pr.id + '"><span class="tile__icon" aria-hidden="true">' + pr.icon + '</span><h2>' + esc(pr.name) + '</h2>' +
        '<p>' + esc(pr.summary) + '</p><span class="bar" aria-hidden="true"><span style="width:' + (done / pr.milestones.length * 100) + '%"></span></span><span class="small">' + done + ' / ' + pr.milestones.length + ' milestones</span></a>';
    }).join('') + '</div>';

  views.project = (p, id) => {
    const pr = LU.projects.find(x => x.id === id);
    if (!pr) return notFound();
    const ms = p.milestones[pr.id] || {};
    const myBriefs = p.briefs.filter(b => b.project === pr.id);
    const tone = PROJECT_TONES[pr.id] || 'sun';
    return '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/projects">Project paths</a> / ' + esc(pr.name) + '</nav>' +
      '<header class="level-band level-band--' + tone + '"><span class="level-band__num" aria-hidden="true">' + pr.icon + '</span><div><p class="label-mono">Project path</p><h1 tabindex="-1">' + esc(pr.name) + '</h1><p class="lead">' + esc(pr.summary) + '</p></div></header>' +
      '<div class="two-up"><section class="sheet" aria-labelledby="sb-h"><span class="tag-fiction">Fictional sample brief</span><h2 id="sb-h">' + esc(pr.sample.title) + '</h2>' +
      '<dl class="brief-doc">' + LU.briefFields.filter(f => f.id !== 'title').map(f => '<div><dt>' + esc(f.label) + '</dt><dd>' + esc(pr.sample[f.id] || '') + '</dd></div>').join('') + '</dl>' +
      '<div class="row"><button type="button" class="btn btn--primary" data-act="brief-from-sample" data-id="' + pr.id + '">Copy into Brief builder</button><a class="btn btn--ghost" href="#/brief/new?project=' + pr.id + '">Write my own brief</a></div>' +
      (myBriefs.length ? '<p class="small">Your briefs on this path: ' + myBriefs.map(b => '<a href="#/brief/' + b.id + '">' + esc(b.fields.title || 'Untitled') + '</a>').join(', ') + '</p>' : '') + '</section>' +
      '<section class="block" aria-labelledby="ms-h"><h2 id="ms-h">Project board</h2><p class="small muted">Tick each milestone as you finish it.</p><ol class="board">' +
      pr.milestones.map((m, i) => '<li class="' + (ms[i] ? 'is-done' : '') + '"><label class="choice choice--plain"><input type="checkbox" data-act="milestone" data-id="' + pr.id + '" data-i="' + i + '"' + (ms[i] ? ' checked' : '') + '><span><span class="board__n">' + (i + 1) + '</span>' + esc(m) + '</span></label></li>').join('') + '</ol></section></div>' +
      reflectBox('Project reflection - ' + pr.name, 'project-' + pr.id);
  };

  views.brief = (p, id, query) => {
    if (!id) {
      return '<header class="page-head"><p class="kicker">Plan before you prompt</p><h1 tabindex="-1">Brief builder</h1><p class="lead">A good brief is the cheapest way to get better AI results. Answer the questions, save it, and come back to edit it as the project grows.</p></header>' +
        '<div class="row" style="margin-bottom:20px"><a class="btn btn--primary" href="#/brief/new">New blank brief</a><a class="btn btn--ghost" href="#/projects">Start from a project path</a></div>' +
        (p.briefs.length ? '<ul class="rows">' + p.briefs.slice().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map(b => {
          const pr = LU.projects.find(x => x.id === b.project);
          const filled = LU.briefFields.filter(f => (b.fields[f.id] || '').trim()).length;
          return '<li><a class="row-link" href="#/brief/' + b.id + '"><span class="kind-dot kind-dot--' + (pr ? PROJECT_TONES[pr.id] : 'sun') + '" aria-hidden="true"></span><span><strong>' + esc(b.fields.title || 'Untitled brief') + '</strong><span class="small muted">' + (pr ? esc(pr.name) + ' &middot; ' : '') + filled + '/' + LU.briefFields.length + ' sections &middot; updated ' + fmtDate(b.updatedAt) + '</span></span></a></li>';
        }).join('') + '</ul>' : '<div class="empty"><strong>No briefs yet</strong>Create a blank brief, or copy a fictional sample from a project path to practise with.</div>');
    }
    const isNew = id === 'new';
    const b = isNew ? { id: 'new', project: (query.get('project') || ''), fields: {} } : p.briefs.find(x => x.id === id);
    if (!b) return notFound();
    return '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/brief">Brief builder</a> / ' + (isNew ? 'New brief' : esc(b.fields.title || 'Untitled')) + '</nav>' +
      '<h1 tabindex="-1">' + (isNew ? 'New brief' : 'Edit brief') + '</h1>' +
      '<div class="brief-layout"><form id="brief-form" data-id="' + esc(b.id) + '" class="numbered"><div class="field"><label for="b-project">Project path</label><select id="b-project"><option value="">- None / my own -</option>' +
      LU.projects.map(pr => '<option value="' + pr.id + '"' + (b.project === pr.id ? ' selected' : '') + '>' + esc(pr.name) + '</option>').join('') + '</select></div>' +
      LU.briefFields.map((f, i) => '<div class="field numbered__q"><span class="numbered__n" aria-hidden="true">' + String(i + 1).padStart(2, '0') + '</span><label for="b-' + f.id + '">' + esc(f.label) + '</label><span class="hint" id="bh-' + f.id + '">' + esc(f.hint) + '</span>' +
        (f.short ? '<input type="text" id="b-' + f.id + '" data-brief="' + f.id + '" aria-describedby="bh-' + f.id + '" value="' + esc(b.fields[f.id] || '') + '">' : '<textarea id="b-' + f.id + '" data-brief="' + f.id + '" rows="3" aria-describedby="bh-' + f.id + '">' + esc(b.fields[f.id] || '') + '</textarea>') + '</div>').join('') +
      '<p id="brief-err" role="alert" class="err"></p><div class="row"><button class="btn btn--primary" type="submit">Save brief</button><a class="btn btn--ghost" href="#/brief">Back to briefs</a>' +
      (isNew ? '' : '<button type="button" class="btn btn--danger" data-act="brief-delete" data-id="' + b.id + '">Delete brief</button>') + '</div></form>' +
      '<aside class="brief-preview" aria-label="Live brief preview"><span class="label-mono">Live preview</span><div id="brief-preview">' + briefPreview(b.fields) + '</div>' +
      '<h3>Brief health check</h3><ul class="small ticks"><li>Could a stranger make the right thing from this brief alone?</li><li>Is there exactly <strong>one</strong> key message?</li><li>Are deliverables specific (length, ratio, versions)?</li><li>Have you named the rights and permissions you need?</li></ul></aside></div>';
  };
  function briefPreview(f) {
    return '<h2>' + esc(f.title || 'Untitled brief') + '</h2>' + LU.briefFields.filter(x => x.id !== 'title').map(x => '<p><span class="label-mono">' + esc(x.label) + '</span><br>' + (f[x.id] ? esc(f[x.id]) : '<span class="muted">-</span>') + '</p>').join('');
  }

  let libState = { q: '', type: '', tag: '', editing: null };
  views.library = p => {
    const tags = [...new Set(p.library.flatMap(i => i.tags || []))].sort();
    const ed = libState.editing ? p.library.find(i => i.id === libState.editing) : null;
    const it = ed || { type: 'prompt', title: '', url: '', body: '', tags: [], extra: {} };
    return '<header class="page-head"><p class="kicker">Your saved work</p><h1 tabindex="-1">Library</h1><p class="lead">Prompts, reference notes, music and SFX research, and project ideas - only you (on this computer) can see your library.</p></header>' +
      '<div class="toolbar"><div class="field"><label for="lib-q">Search</label><input type="search" id="lib-q" value="' + esc(libState.q) + '" placeholder="Search titles, notes and tags"></div>' +
      '<div class="field"><label for="lib-type">Type</label><select id="lib-type"><option value="">All types</option>' + Object.entries(LIB_TYPES).map(([k, v]) => '<option value="' + k + '"' + (libState.type === k ? ' selected' : '') + '>' + v + '</option>').join('') + '</select></div></div>' +
      (tags.length ? '<div class="tagbar" role="group" aria-label="Filter by tag">' + tags.map(t => '<button type="button" class="tag" data-act="lib-tag" data-id="' + esc(t) + '" aria-pressed="' + (libState.tag === t) + '">#' + esc(t) + '</button>').join('') + '</div>' : '') +
      '<details class="composer"' + (ed || !p.library.length ? ' open' : '') + '><summary>' + (ed ? 'Edit item' : '+ Add to library') + '</summary>' +
      '<form id="lib-form"><div class="pair"><div class="field"><label for="l-type">Type</label><select id="l-type">' +
      Object.entries(LIB_TYPES).map(([k, v]) => '<option value="' + k + '"' + (it.type === k ? ' selected' : '') + '>' + v + '</option>').join('') + '</select></div>' +
      '<div class="field"><label for="l-title">Title</label><input type="text" id="l-title" value="' + esc(it.title) + '" required></div></div>' +
      '<div class="field"><label for="l-body">Notes / prompt text</label><textarea id="l-body" rows="4">' + esc(it.body) + '</textarea></div>' +
      '<div class="field"><label for="l-url">Link or location (optional)</label><span class="hint">Paste a link or where the file lives. The app never visits or downloads it.</span><input type="text" id="l-url" value="' + esc(it.url || '') + '"></div>' +
      '<div class="trio" id="l-sound"' + (it.type === 'sound' ? '' : ' hidden') + '><div class="field"><label for="l-source">Source / library</label><input type="text" id="l-source" value="' + esc((it.extra || {}).source || '') + '"></div>' +
      '<div class="field"><label for="l-licence">Licence</label><input type="text" id="l-licence" value="' + esc((it.extra || {}).licence || '') + '"></div>' +
      '<div class="field"><label for="l-use">Mood / where it fits</label><input type="text" id="l-use" value="' + esc((it.extra || {}).use || '') + '"></div></div>' +
      '<div class="field"><label for="l-tags">Tags</label><span class="hint">Separate with commas, e.g. golden-hour, product, calm</span><input type="text" id="l-tags" value="' + esc((it.tags || []).join(', ')) + '"></div>' +
      '<p id="lib-err" role="alert" class="err"></p><div class="row"><button class="btn btn--primary" type="submit">' + (ed ? 'Save changes' : 'Save to library') + '</button>' + (ed ? '<button type="button" class="btn btn--ghost" data-act="lib-cancel">Cancel</button>' : '') + '</div></form></details>' +
      '<div id="lib-results">' + libResults(p) + '</div>';
  };
  function libResults(p) {
    const q = libState.q.toLowerCase();
    const items = p.library.filter(i => (!libState.type || i.type === libState.type) && (!libState.tag || (i.tags || []).includes(libState.tag)) &&
      (!q || [i.title, i.body, i.url, (i.tags || []).join(' '), Object.values(i.extra || {}).join(' ')].join(' ').toLowerCase().includes(q)))
      .sort((a, b) => b.at.localeCompare(a.at));
    if (!p.library.length) return '<div class="empty"><strong>Your library is empty</strong>Add a prompt, a reference, a sound note or an idea above. Practicals also have "Save to Library" buttons.</div>';
    if (!items.length) return '<div class="empty"><strong>No matches</strong>Try a different search word, type or tag.</div>';
    return '<p class="small muted" aria-live="polite">' + items.length + ' item' + (items.length > 1 ? 's' : '') + '</p><div class="masonry">' + items.map(i => '<article class="note note--' + i.type + '"><div class="spread"><span class="label-mono">' + LIB_TYPES[i.type] + '</span><span class="small muted">' + fmtDate(i.at) + '</span></div>' +
      '<h3>' + esc(i.title) + '</h3>' + (i.body ? '<p class="pre small' + (i.type === 'prompt' ? ' mono' : '') + '">' + esc(i.body) + '</p>' : '') +
      (i.type === 'sound' && i.extra ? '<p class="small muted">Source: ' + esc(i.extra.source || '-') + ' &middot; Licence: ' + esc(i.extra.licence || '-') + ' &middot; Use: ' + esc(i.extra.use || '-') + '</p>' : '') +
      (i.url ? '<p class="small" style="word-break:break-all">Link / location: ' + (/^https?:\/\//i.test(i.url) ? '<a href="' + esc(i.url) + '" target="_blank" rel="noopener noreferrer">' + esc(i.url) + '</a>' : esc(i.url)) + '</p>' : '') +
      '<p>' + (i.tags || []).map(t => '<span class="tag">#' + esc(t) + '</span>').join('') + '</p>' +
      '<div class="row"><button type="button" class="link-btn" data-act="lib-edit" data-id="' + i.id + '">Edit</button>' + (i.type === 'prompt' ? '<button type="button" class="link-btn" data-act="lib-copy" data-id="' + i.id + '">Copy text</button>' : '') +
      '<button type="button" class="link-btn link-btn--danger" data-act="lib-delete" data-id="' + i.id + '">Delete</button></div></article>').join('') + '</div>';
  }

  let pfEditing = null;
  let pfPending = [];
  views.portfolio = p => {
    const ed = pfEditing ? p.portfolio.find(x => x.id === pfEditing) : null;
    const it = ed || {};
    const pm = p.portfolioMilestones || {};
    const sr = p.reflections.find(r => r.key === 'showcase');
    const atts = (ed ? ed.attachments || [] : []).concat(pfPending);
    return '<header class="page-head"><p class="kicker">Show your process</p><h1 tabindex="-1">Portfolio</h1><p class="lead">Save selected work and tell the story of how you made it. Keep the full media files in a folder you control; attach a preview image here.</p></header>' +
      (p.portfolio.length ? '<div class="gallery">' + p.portfolio.map((x, i) => {
        const th = (x.attachments || []).find(a => a.thumb);
        return '<article class="piece' + (i % 3 === 0 ? ' piece--wide' : '') + '">' + (th ? '<img class="piece__img" src="' + th.thumb + '" alt="Preview of ' + esc(x.title) + '">' : '<div class="piece__img piece__img--empty" aria-hidden="true">' + RINGS + '</div>') +
          '<div class="piece__body"><div class="spread"><h3>' + esc(x.title) + '</h3>' + (x.showcase ? '<span class="badge badge--sun">\u2605 Showcase</span>' : '') + '</div>' +
          (x.link ? '<p class="small muted" style="word-break:break-all">' + esc(x.link) + '</p>' : '') +
          Object.keys(LU.portfolioPrompts).filter(k => x[k]).map(k => '<p class="small"><strong>' + k[0].toUpperCase() + k.slice(1) + ':</strong> ' + esc(x[k]) + '</p>').join('') +
          attachmentsHtml((x.attachments || []).filter(a => !a.thumb)) +
          '<div class="row"><button type="button" class="link-btn" data-act="pf-edit" data-id="' + x.id + '">Edit</button><button type="button" class="link-btn link-btn--danger" data-act="pf-delete" data-id="' + x.id + '">Delete</button></div></div></article>';
      }).join('') + '</div>' : '<div class="empty"><strong>No portfolio pieces yet</strong>Add your first piece below - even a work-in-progress from Level 1 counts.</div>') +
      '<details class="composer"' + (ed || !p.portfolio.length ? ' open' : '') + '><summary>' + (ed ? 'Edit portfolio piece' : '+ Add a portfolio piece') + '</summary>' +
      '<form id="pf-form"><div class="pair"><div class="field"><label for="pf-title">Title</label><input type="text" id="pf-title" value="' + esc(it.title || '') + '" required></div>' +
      '<div class="field"><label for="pf-link">Where is the full work?</label><span class="hint">A file path or link, e.g. D:\\Portfolio\\northline_v03.mp4</span><input type="text" id="pf-link" value="' + esc(it.link || '') + '"></div></div>' +
      '<div class="field"><label for="pf-brief">Related brief (optional)</label><select id="pf-brief"><option value="">- None -</option>' + p.briefs.map(b => '<option value="' + b.id + '"' + (it.brief === b.id ? ' selected' : '') + '>' + esc(b.fields.title || 'Untitled') + '</option>').join('') + '</select></div>' +
      Object.entries(LU.portfolioPrompts).map(([k, hint]) => '<div class="field"><label for="pf-' + k + '">' + k[0].toUpperCase() + k.slice(1) + '</label><span class="hint">' + esc(hint) + '</span><textarea id="pf-' + k + '" rows="3">' + esc(it[k] || '') + '</textarea></div>').join('') +
      attachmentsHtml(atts, 'pf-att-remove', ed ? ed.id : 'pending') + attachField('pf-attach', ed ? ed.id : 'pending') +
      '<label class="choice choice--plain"><input type="checkbox" id="pf-showcase"' + (it.showcase ? ' checked' : '') + '><span>Mark for showcase</span></label>' +
      '<p id="pf-err" role="alert" class="err"></p><div class="row"><button class="btn btn--primary" type="submit">' + (ed ? 'Save changes' : 'Add to portfolio') + '</button>' + (ed ? '<button type="button" class="btn btn--ghost" data-act="pf-cancel">Cancel</button>' : '') + '</div></form></details>' +
      '<div class="two-up"><section class="block" aria-labelledby="pm-h"><h2 id="pm-h">Portfolio milestones</h2>' + LU.portfolioMilestones.map(m => '<label class="choice choice--plain' + (pm[m.id] ? ' is-done' : '') + '"><input type="checkbox" data-act="pf-milestone" data-id="' + m.id + '"' + (pm[m.id] ? ' checked' : '') + '><span>' + esc(m.text) + '</span></label>').join('') + '</section>' +
      '<section class="block" aria-labelledby="sc-h"><h2 id="sc-h">' + esc(LU.showcase.title) + ' activity</h2><ol class="steps-list">' + LU.showcase.steps.map(s => '<li>' + esc(s) + '</li>').join('') + '</ol>' +
      '<p class="small"><strong>Peer feedback frame:</strong> ' + LU.showcase.feedbackFrame.map(esc).join(' &middot; ') + '</p></section></div>' +
      '<section class="note-band note-band--sun" aria-labelledby="fr-h"><h2 id="fr-h">Final showcase reflection</h2><label for="showcase-text">How has your process changed since Level 1?</label>' +
      '<textarea id="showcase-text" rows="5">' + esc(sr ? sr.text : '') + '</textarea><div class="row" style="margin-top:10px"><button type="button" class="btn btn--primary" data-act="showcase-save">Save reflection</button></div></section>';
  };

  function skillRow(p, sk, editable) {
    const ev = skillEvidence(p, sk.id);
    const self = p.skills[sk.id] || 0;
    const reqs = [
      [ev.total ? 'Challenges passed: ' + ev.passed + ' of ' + ev.total + (ev.passed ? ' (avg ' + pct(ev.avg) + ', 80% needed)' : '') : 'No lesson activities for this skill', !ev.need || (ev.passed >= ev.need && ev.avg >= 0.8)],
      ['Practical with no "Developing" rows: ' + ev.solid, ev.solid >= 1],
      ['Checkpoint passed in a level that trains it', ev.cp]
    ];
    return '<li class="skill skill--' + ev.level + '"><div class="skill__head"><div><strong>' + esc(sk.name) + '</strong><span class="small muted">' + esc(sk.desc) + '</span></div><span class="skill__level">' + LU.skillLevels[ev.level] + '</span></div>' +
      '<span class="skill__meter" aria-hidden="true">' + [1, 2].map(i => '<span class="' + (ev.level >= i ? 'on' : '') + '"></span>').join('') + '</span>' +
      '<ul class="criteria criteria--small">' + reqs.map(r => '<li class="' + (r[1] ? 'is-met' : '') + '"><span class="criteria__mark" aria-hidden="true">' + (r[1] ? '✓' : '') + '</span>' + r[0] + '</li>').join('') + '</ul>' +
      (editable ? '<div class="skill__self"><span class="small">Your own view:</span><div class="seg seg--sm" role="radiogroup" aria-label="Your own view of ' + esc(sk.name) + '">' + LU.skillLevels.map((n, j) => '<label><input type="radio" name="sk-' + sk.id + '" value="' + j + '" data-act="skill" data-id="' + sk.id + '"' + (self === j ? ' checked' : '') + '><span>' + n + '</span></label>').join('') + '</div></div>'
        : '<p class="small muted">Self-rating: ' + LU.skillLevels[self] + '</p>') + '</li>';
  }

  views.progress = p => {
    const ex = LEVELS.flatMap(l => l.exercises.map(e => ({ l, e, s: p.exercises[e.id] }))).filter(x => x.s && x.s.done);
    const tried = ALL_LESSONS.filter(x => p.activities[x.id] && p.activities[x.id].attempts && p.activities[x.id].attempts.length);
    return '<header class="page-head"><p class="kicker">Your growth</p><h1 tabindex="-1">Progress</h1><p class="lead">Everything here is earned by doing: passed challenges, completed practicals and checkpoints. Reading alone never counts.</p></header>' +
      '<div class="xp-band"><span class="stat">' + xpOf(p) + '</span><span class="bar bar--lg" role="img" aria-label="' + Math.round(xpOf(p) / maxXp * 100) + '% of all XP"><span style="width:' + (xpOf(p) / maxXp * 100) + '%"></span></span><span class="small muted">of ' + maxXp + ' XP &middot; challenges ' + XP.activity + ', practicals ' + XP.exercise + ', checkpoints ' + XP.checkpoint + '</span></div>' +
      '<section class="block"><h2>Levels</h2><div class="table-wrap"><table><thead><tr><th scope="col">Level</th><th scope="col">Challenges passed</th><th scope="col">Practicals</th><th scope="col">Checkpoint</th><th scope="col">Status</th></tr></thead><tbody>' +
      LEVELS.map(l => { const s = levelStatus(p, l); return '<tr><th scope="row"><a href="#/level/' + l.id + '"><span class="dot" style="background:' + lvVar(l) + '"></span>' + l.num + '. ' + esc(l.name) + '</a></th><td>' + s.lessonsDone + '/' + l.lessons.length + '</td><td>' + s.exDone + '/' + l.exercises.length + '</td><td>' + (s.quiz ? pct(s.quiz.best) : s.checkpointOpen ? 'open' : 'locked') + '</td><td>' + (s.complete ? '<span class="badge badge--ok">Complete</span>' : s.unlocked ? s.pct + '%' : 'Locked') + '</td></tr>'; }).join('') +
      '</tbody></table></div></section>' +
      '<section class="block"><h2>Skills - based on demonstrated work</h2><p class="small muted">' + esc(SKILL_RULES) + ' Your own view is kept separately for reflection.</p><ul class="skills">' + LU.skills.map(sk => skillRow(p, sk, true)).join('') + '</ul></section>' +
      '<section class="block"><h2>Challenge attempts</h2>' + (tried.length ? '<ul class="rows">' + tried.map(x => { const a = p.activities[x.id]; return '<li><a class="row-link" href="#/lesson/' + x.id + '">' + ring(a.best, 44, a.passed) + '<span><strong>' + esc(x.title) + '</strong><span class="small muted">' + a.attempts.length + ' attempt' + (a.attempts.length > 1 ? 's' : '') + ' &middot; ' + a.attempts.map(t => pct(t.score)).join(' → ') + '</span></span></a></li>'; }).join('') + '</ul>' : '<div class="empty"><strong>No attempts yet</strong>Open any lesson and try its challenge.</div>') + '</section>' +
      '<section class="block"><h2>Completed practicals</h2>' + (ex.length ? '<ul class="rows">' + ex.map(x => '<li><a class="row-link" href="#/exercise/' + x.e.id + '"><span class="kind-dot kind-dot--' + x.e.kind + '" aria-hidden="true"></span><span><strong>' + esc(x.e.title) + '</strong><span class="small muted">Level ' + x.l.num + ' &middot; check ' + pct(exerciseScore(p, x.e)) + ' &middot; self-assessed: ' + rubricSummary(x.s) + '</span></span></a></li>').join('') + '</ul>' : '<div class="empty"><strong>Nothing yet</strong>Complete a practical in Level 1 to see it here.</div>') + '</section>' +
      '<section class="block"><h2>Reflections</h2>' + reflectBox('Add a reflection', 'general') +
      (p.reflections.length ? '<ul class="rows rows--text">' + p.reflections.slice().reverse().map(r => '<li><span class="small muted">' + esc(r.prompt || r.key) + ' &middot; ' + fmtDate(r.at) + '</span><p class="pre">' + esc(r.text) + '</p></li>').join('') + '</ul>' : '') + '</section>';
  };
  function rubricSummary(s) {
    const vals = Object.values(s.rubric || {});
    if (!vals.length) return 'not rated';
    const c = [0, 0, 0]; vals.forEach(v => c[v]++);
    return ['Developing', 'Solid', 'Strong'].map((n, i) => c[i] ? c[i] + ' ' + n : '').filter(Boolean).join(', ');
  }
  function reflectBox(title, key) {
    const prompt = LU.reflectionPrompts[(key.length) % LU.reflectionPrompts.length];
    return '<section class="reflect" aria-labelledby="rf-' + esc(key) + '"><h2 id="rf-' + esc(key) + '">' + esc(title) + '</h2>' +
      '<label for="rt-' + esc(key) + '">' + esc(prompt) + '</label><textarea id="rt-' + esc(key) + '" rows="3"></textarea>' +
      '<div class="row" style="margin-top:10px"><button type="button" class="btn btn--ghost" data-act="reflect" data-id="' + esc(key) + '" data-prompt="' + esc(prompt) + '">Save reflection</button></div></section>';
  }

  views.capstone = p => {
    const c = LU.capstone, cs = p.capstone;
    const done = c.milestones.filter(m => cs.milestones[m.id]).length;
    const allLevels = LEVELS.every(l => levelStatus(p, l).complete);
    return '<header class="level-band level-band--pink"><span class="level-band__num" aria-hidden="true">★</span><div><p class="label-mono">Bring it all together</p><h1 tabindex="-1">' + esc(c.title) + '</h1><p class="lead">' + esc(c.intro) + '</p></div></header>' +
      (allLevels ? '' : '<div class="callout"><div class="callout__title">Recommended after Level 7</div>You can start planning now, but the capstone works best once you have finished all seven levels.</div>') +
      '<div class="two-up"><section class="sheet"><h2>Capstone brief</h2><ol class="steps-list">' + c.brief.map(b => '<li>' + esc(b) + '</li>').join('') + '</ol>' +
      '<div class="row"><a class="btn btn--ghost btn--sm" href="#/projects">Choose a project path</a><a class="btn btn--ghost btn--sm" href="#/brief/new">Write the brief</a><a class="btn btn--ghost btn--sm" href="#/checklist">Delivery checklist</a></div></section>' +
      '<section class="block"><h2>Production timeline <span class="small muted">' + done + '/' + c.milestones.length + '</span></h2><span class="bar" aria-hidden="true"><span style="width:' + (done / c.milestones.length * 100) + '%"></span></span><ol class="timeline timeline--check">' +
      c.milestones.map(m => '<li class="' + (cs.milestones[m.id] ? 'is-done' : '') + '"><label class="choice choice--plain"><input type="checkbox" data-act="cap-milestone" data-id="' + m.id + '"' + (cs.milestones[m.id] ? ' checked' : '') + '><span><span class="label-mono">' + esc(m.stage) + '</span> ' + esc(m.text) + '</span></label></li>').join('') + '</ol></section></div>' +
      '<section class="block"><h2>Assessment rubric</h2>' + R.rubricTable(c.rubric) +
      '<h3 style="margin-top:20px">Self-assessment</h3>' + c.rubric.map((r, i) => '<div class="spread rubric-line"><strong>' + esc(r.criterion) + '</strong><div class="seg" role="radiogroup" aria-label="' + esc(r.criterion) + '">' +
        ['Developing', 'Solid', 'Strong'].map((n, j) => '<label><input type="radio" name="cr-' + i + '" value="' + j + '" data-act="cap-rubric" data-id="' + i + '"' + (cs.rubric[i] === j ? ' checked' : '') + '><span>' + n + '</span></label>').join('') + '</div></div>').join('') + '</section>' +
      '<section class="reflect"><h2>Production notes</h2><label for="cap-notes">Decisions, links to files, feedback received</label><textarea id="cap-notes" rows="6">' + esc(cs.notes || '') + '</textarea>' +
      '<div class="row" style="margin-top:10px"><button type="button" class="btn btn--primary" data-act="cap-notes">Save notes</button></div></section>';
  };

  views.checklist = p => {
    const all = LU.checklist.flatMap(g => g.items);
    const done = all.filter(i => p.checklist[i.id]).length;
    return '<header class="page-head"><p class="kicker">Before you hand anything over</p><h1 tabindex="-1">File &amp; delivery checklist</h1><p class="lead">Organisation, filenames, usage rights, music licensing, credits, formats and exports. Tick every line before delivery.</p></header>' +
      '<div class="xp-band"><span class="stat">' + done + '<small>/' + all.length + '</small></span><span class="bar bar--lg" aria-hidden="true"><span style="width:' + (done / all.length * 100) + '%"></span></span><button type="button" class="btn btn--sm btn--ghost" data-act="checklist-reset">Clear all (new project)</button></div>' +
      '<div class="check-columns">' + LU.checklist.map((g, gi) => '<fieldset class="check-group" style="--tone:var(--lv' + (gi % 7 + 1) + ')"><legend>' + esc(g.group) + '</legend>' + g.items.map(i => '<label class="choice choice--plain' + (p.checklist[i.id] ? ' is-done' : '') + '"><input type="checkbox" data-act="checklist" data-id="' + i.id + '"' + (p.checklist[i.id] ? ' checked' : '') + '><span>' + esc(i.text) + '</span></label>').join('') + '</fieldset>').join('') + '</div>' +
      '<div class="callout callout--tool"><div class="callout__title"><span class="badge badge--info">Tool-specific - check the current version</span> Terms change</div>AI tools, stock libraries and platforms update their terms and export specs often. Re-check them for every project and note the date you checked next to the licence.</div>';
  };

  /* How to install / where to get the app, matched to the device in use (js/pwa.js sets window.PWA). */
  function installHtml(compact) {
    const PWA = window.PWA || {};
    if (PWA.installed) return compact ? '' : '<p class="small muted">This app is installed on this device. It works offline and checks for course updates by itself.</p>';
    if (PWA.canPrompt) return '<button type="button" class="btn ' + (compact ? 'btn--ghost btn--lg' : 'btn--primary') + '" data-act="install-app">Install the app</button>';
    if (compact) return '';
    if (!PWA.served) return '<p class="small muted">You opened the app from a folder on this computer (offline copy). It works fully, but it can only be installed as an app from its web address. See <a href="LEARNER-GUIDE.html" target="_blank" rel="noopener">the learner guide</a>.</p>';
    if (PWA.isIOS) return '<ol class="install-steps small"><li>Open this page in <strong>Safari</strong>.</li><li>Tap <strong>Share</strong> (the square with an arrow).</li><li>Tap <strong>Add to Home Screen</strong>, then <strong>Add</strong>.</li></ol>';
    if (PWA.isFirefox) return '<p class="small muted">Firefox can&rsquo;t install apps on most computers. Keep using it here, or open this address in Chrome or Edge and choose <em>Install</em>. See <a href="LEARNER-GUIDE.html" target="_blank" rel="noopener">the learner guide</a>.</p>';
    return '<p class="small muted">Use your browser menu: <strong>Install app</strong> (Chrome/Edge on a computer) or <strong>Add to Home screen / Install app</strong> (Android). See <a href="LEARNER-GUIDE.html" target="_blank" rel="noopener">the learner guide</a>.</p>';
  }

  views.profile = p => '<header class="page-head"><p class="kicker">Your profile</p><h1 tabindex="-1">Profile &amp; backup</h1></header>' +
    '<div class="profile-band"><span class="avatar avatar--xl" aria-hidden="true">' + esc(initials(p.name)) + '</span><div><strong class="big-name">' + esc(p.name) + '</strong><p class="small muted">Signed in &middot; created ' + fmtDate(p.createdAt) + ' &middot; ' + xpOf(p) + ' XP</p>' +
    '<div class="row"><button type="button" class="btn btn--primary" data-act="export-me">Export my backup</button><button type="button" class="btn btn--ghost" data-act="change-pin">Change my PIN</button><button type="button" class="btn btn--ghost" data-act="sign-out">Sign out / switch student</button></div></div></div>' +
    '<section class="block"><h2>How to back up and restore</h2><ol class="steps-list"><li><strong>Back up:</strong> click <em>Export my backup</em>. A <code>.json</code> file downloads (usually to Downloads). Move it somewhere only you use.</li>' +
    '<li><strong>Restore or move to another computer:</strong> open the app there, go to the sign-in page and use <em>Restore a profile from a backup file</em>. Your PIN comes with it.</li>' +
    '<li>A backup is a snapshot - export again at the end of each session.</li><li>The backup file is plain text and <strong>not encrypted</strong>. Your PIN is stored hashed, but your work and preview images are readable by anyone with the file.</li></ol></section>' +
    '<section class="block"><h2>Install the app &amp; use other devices</h2>' + installHtml(false) +
    '<p class="small muted">Progress is saved separately on each device and in each browser. To carry on somewhere else, export your backup here and restore it on the other device.</p></section>' +
    '<section class="block danger-zone"><h2>Delete my profile</h2><p class="small muted">Permanently removes all your progress from this browser. Export a backup first if you might need it.</p><button type="button" class="btn btn--danger" data-act="delete-me">Delete my profile</button></section>' +
    privacyNote();

  /* ---------------- Admin (only rendered after authentication) ---------------- */
  let insSel = null, insLevel = null;
  function adminGate() {
    if (!Store.hasAdmin()) {
      return '<div class="gate-card"><div class="login-head">' + RINGS + '<div><p class="kicker">For instructors</p><h1 tabindex="-1">Set up the admin PIN</h1></div></div>' +
        '<p>Choose an admin PIN (4-6 digits). There is no default. You will need it every time you open the admin area - after a reload, after 15 idle minutes, and after any student signs in.</p>' +
        '<form id="admin-setup">' + pinInput('ad-1', 'New admin PIN') + pinInput('ad-2', 'Repeat admin PIN') + '<p id="ad-err" class="err" role="alert"></p><button class="btn btn--primary" type="submit">Save admin PIN</button></form>' +
        '<p class="small muted">The admin PIN is a privacy barrier for a shared classroom computer, not strong security: someone with access to this computer\'s browser profile or files could still read the stored data.</p>' +
        '<p class="small"><a href="#/login">← Back to student sign-in</a></p></div>';
    }
    return '<div class="gate-card"><div class="login-head">' + RINGS + '<div><p class="kicker">For instructors</p><h1 tabindex="-1">Instructor sign-in</h1></div></div>' +
      '<p class="small muted">Signing in here signs out any student currently using this browser.</p><form id="admin-login">' + pinInput('ad-in', 'Admin PIN', 'current-password') +
      '<p id="ad-err" class="err" role="alert"></p><button class="btn btn--primary" type="submit">Sign in</button></form>' +
      '<p class="small"><a href="#/login">← Back to student sign-in</a></p></div>';
  }
  function adminHead(title, kicker) {
    return '<header class="admin-head"><div><p class="kicker">' + esc(kicker || 'Admin') + '</p><h1 tabindex="-1">' + esc(title) + '</h1></div><button type="button" class="btn btn--ink" data-act="admin-logout">Log out of admin</button></header>';
  }
  function studentTable(list) {
    return '<div class="table-wrap"><table class="dense"><thead><tr><th scope="col">Student</th><th scope="col">Levels</th><th scope="col">Challenges</th><th scope="col">Practicals</th><th scope="col">Avg. checkpoint</th><th scope="col">Confident skills</th><th scope="col">Capstone</th><th scope="col">Last active</th><th scope="col"><span class="sr-only">Actions</span></th></tr></thead><tbody>' +
      list.map(s => {
        const q = Object.values(s.quizzes).map(x => x.best);
        return '<tr><th scope="row">' + esc(s.name) + '</th><td>' + LEVELS.filter(l => levelStatus(s, l).complete).length + '/' + LEVELS.length + '</td><td>' + Object.values(s.activities || {}).filter(a => a.passed).length + '/' + ALL_LESSONS.length + '</td><td>' +
          Object.values(s.exercises).filter(e => e.done).length + '/' + LEVELS.reduce((a, l) => a + l.exercises.length, 0) + '</td><td>' + (q.length ? pct(q.reduce((a, b) => a + b, 0) / q.length) : '-') + '</td><td>' + LU.skills.filter(k => skillEvidence(s, k.id).level === 2).length + '/' + LU.skills.length + '</td><td>' +
          Object.values(s.capstone.milestones).filter(Boolean).length + '/' + LU.capstone.milestones.length + '</td><td>' + fmtDate(s.updatedAt) + '</td><td><a class="link-btn" href="#/admin/student/' + s.id + '">Review</a></td></tr>';
      }).join('') + '</tbody></table></div>';
  }
  views.admin = (p, sub, query, arg) => {
    if (!Store.isAdmin()) return adminGate();
    const list = Store.list();
    if (sub === 'student') {
      const s = Store.get(arg);
      if (!s) return adminHead('Student not found') + '<p><a href="#/admin/students">Back to students</a></p>';
      return adminHead(s.name, 'Admin · student review') + studentDetail(s);
    }
    if (sub === 'students') {
      return adminHead('Students') + (list.length ? '<ul class="rows rows--admin">' + list.map(s => '<li><span class="avatar" aria-hidden="true">' + esc(initials(s.name)) + '</span><span class="grow"><strong>' + esc(s.name) + '</strong><span class="small muted">' + (Store.hasPin(s.id) ? 'PIN set' : 'No PIN yet') + ' &middot; ' + xpOf(s) + ' XP &middot; last active ' + fmtDate(s.updatedAt) + '</span></span>' +
        '<span class="row"><a class="btn btn--sm btn--ghost" href="#/admin/student/' + s.id + '">Review</a><button type="button" class="btn btn--sm btn--ghost" data-act="admin-reset-pin" data-id="' + s.id + '">Reset PIN</button><button type="button" class="btn btn--sm btn--ghost" data-act="admin-open" data-id="' + s.id + '">Open as student</button>' +
        '<button type="button" class="btn btn--sm btn--ghost" data-act="export-one" data-id="' + s.id + '">Export</button><button type="button" class="btn btn--sm btn--danger" data-act="delete-profile" data-id="' + s.id + '">Delete</button></span></li>').join('') + '</ul>'
        : '<div class="empty"><strong>No student profiles yet</strong>Students create profiles on the sign-in page, or import backups in Backups &amp; settings.</div>');
    }
    if (sub === 'guide') {
      const lvl = LEVELS.find(l => l.id === insLevel) || LEVELS[0];
      return adminHead('Teaching guide') + '<div class="field" style="max-width:360px"><label for="ins-level">Level</label><select id="ins-level">' + LEVELS.map(l => '<option value="' + l.id + '"' + (l === lvl ? ' selected' : '') + '>Level ' + l.num + ': ' + esc(l.name) + '</option>').join('') + '</select></div>' +
        (lvl.instructor ? '<div class="two-up"><section class="block"><h2>Instructor notes</h2><p>' + md(lvl.instructor.notes) + '</p><h3>Group discussion prompts</h3><ul>' + lvl.instructor.discussion.map(d => '<li>' + md(d) + '</li>').join('') + '</ul></section>' +
          '<section class="sheet"><h2>Class activity: ' + esc(lvl.instructor.activity.title) + '</h2><p class="small muted">' + lvl.instructor.activity.minutes + ' min</p><ol class="steps-list">' + lvl.instructor.activity.steps.map(s => '<li>' + md(s) + '</li>').join('') + '</ol></section></div>' : '') +
        '<section class="block"><h2>Lesson challenges</h2><div class="table-wrap"><table class="dense"><thead><tr><th scope="col">Lesson</th><th scope="col">Challenge</th><th scope="col">Skill</th><th scope="col">Pass mark</th><th scope="col">Criteria</th></tr></thead><tbody>' +
        lvl.lessons.map(x => { const a = ACTS[x.id]; return a ? '<tr><th scope="row">' + esc(x.title) + '</th><td>' + esc(a.title) + '<br><span class="small muted">' + TYPE_LABEL[a.type] + '</span></td><td>' + esc((LU.skills.find(k => k.id === a.skill) || {}).name || a.skill) + '</td><td>' + pct(a.passMark || 0.7) + '</td><td>' + (a.criteria || []).map(esc).join('<br>') + '</td></tr>' : ''; }).join('') + '</tbody></table></div></section>' +
        '<section class="block"><h2>Practical rubrics</h2>' + lvl.exercises.map(e => '<details class="disclosure"><summary>' + esc(e.title) + ' <span class="muted small">(' + kindLabel(e.kind) + ')</span></summary>' + R.rubricTable(e.rubric) +
          (e.kind === 'scenario' ? '<p class="small"><strong>Answer key:</strong> ' + md((e.options.find(o => o.correct) || {}).text) + '</p>' : '') + '</details>').join('') + '</section>' +
        '<section class="block"><h2>Checkpoint answer key</h2><ol>' + lvl.checkpoint.questions.map(q => '<li><strong>' + md(q.options[q.answer]) + '</strong> <span class="muted small">- ' + md(q.explain) + '</span></li>').join('') + '</ol></section>' +
        '<div class="two-up"><section class="block"><h2>Suggested 80-minute session</h2><ul>' + LU.instructorGeneral.session.map(s => '<li>' + esc(s) + '</li>').join('') + '</ul></section>' +
        '<section class="block"><h2>Notes</h2><ul>' + LU.instructorGeneral.notes.map(s => '<li>' + esc(s) + '</li>').join('') + '</ul></section></div>' +
        '<section class="block"><h2>Capstone rubric</h2>' + R.rubricTable(LU.capstone.rubric) + '</section>';
    }
    if (sub === 'backups') {
      return adminHead('Backups & settings') + '<section class="block"><h2>Export</h2><div class="row"><button type="button" class="btn btn--primary" data-act="export-all">Export all profiles (one file)</button></div></section>' +
        '<section class="block"><h2>Import backups</h2>' + importField() + '</section>' +
        '<section class="block"><h2>Admin PIN</h2><p class="small muted">A privacy barrier for a shared computer, not strong security. Admin mode ends on Log out, reload, 15 idle minutes, or when a student signs in.</p><div class="row"><button type="button" class="btn btn--ghost" data-act="admin-change-pin">Change admin PIN</button></div></section>';
    }
    const totals = { students: list.length, active: list.filter(s => Date.now() - new Date(s.updatedAt) < 7 * 864e5).length,
      challenges: list.reduce((a, s) => a + Object.values(s.activities || {}).filter(x => x.passed).length, 0), levels: list.reduce((a, s) => a + LEVELS.filter(l => levelStatus(s, l).complete).length, 0) };
    const hardest = ALL_LESSONS.filter(x => ACTS[x.id]).map(x => {
      const tries = list.map(s => s.activities && s.activities[x.id]).filter(a => a && a.attempts && a.attempts.length);
      return { x, n: tries.length, avgAttempts: tries.length ? tries.reduce((a, t) => a + t.attempts.length, 0) / tries.length : 0, passRate: tries.length ? tries.filter(t => t.passed).length / tries.length : 0 };
    }).filter(h => h.n).sort((a, b) => b.avgAttempts - a.avgAttempts).slice(0, 5);
    return adminHead('Instructor overview') +
      '<div class="callout callout--warn"><div class="callout__title">Privacy barrier, not strong security</div>The admin PIN keeps students out of this area on a shared computer, but anyone with access to this computer\'s browser profile or files could still read the stored data. Only profiles in <strong>this</strong> browser appear.</div>' +
      '<section class="stats-line" aria-label="Class numbers"><div><span class="stat">' + totals.students + '</span><span class="stat__label">students</span></div><div><span class="stat">' + totals.active + '</span><span class="stat__label">active this week</span></div><div><span class="stat">' + totals.challenges + '</span><span class="stat__label">challenges passed</span></div><div><span class="stat">' + totals.levels + '</span><span class="stat__label">levels completed</span></div></section>' +
      '<section class="block"><h2>Class progress</h2>' + (list.length ? studentTable(list) : '<div class="empty"><strong>No student profiles</strong>Students create profiles on the sign-in page.</div>') + '</section>' +
      '<section class="block"><h2>Challenges needing most retries</h2>' + (hardest.length ? '<div class="table-wrap"><table class="dense"><thead><tr><th scope="col">Lesson challenge</th><th scope="col">Students tried</th><th scope="col">Avg. attempts</th><th scope="col">Pass rate</th></tr></thead><tbody>' +
        hardest.map(h => '<tr><th scope="row">' + esc(ACTS[h.x.id].title) + '<br><span class="small muted">' + esc(h.x.title) + '</span></th><td>' + h.n + '</td><td>' + h.avgAttempts.toFixed(1) + '</td><td>' + pct(h.passRate) + '</td></tr>').join('') + '</tbody></table></div>' : '<p class="muted">No attempts yet.</p>') + '</section>';
  };

  function studentDetail(s) {
    const crit = LEVELS.flatMap(l => l.exercises.filter(e => e.kind === 'critique').map(e => ({ e, r: (s.exercises[e.id] || {}).response || {} }))).filter(x => x.r.notes || x.r.revision);
    const none = '<p class="muted small">None yet.</p>';
    const tried = ALL_LESSONS.filter(x => s.activities && s.activities[x.id] && s.activities[x.id].attempts && s.activities[x.id].attempts.length);
    const atts = LEVELS.flatMap(l => l.exercises).filter(e => s.exercises[e.id] && s.exercises[e.id].attachments && s.exercises[e.id].attachments.length);
    return '<div class="row" style="margin-bottom:16px"><label class="choice choice--plain"><input type="checkbox" data-act="ins-unlock" data-id="' + s.id + '"' + (s.unlockAll ? ' checked' : '') + '><span>Unlock all levels for this student</span></label>' +
      '<button type="button" class="btn btn--sm btn--ghost" data-act="admin-reset-pin" data-id="' + s.id + '">Reset PIN</button><button type="button" class="btn btn--sm btn--ghost" data-act="export-one" data-id="' + s.id + '">Export</button></div>' +
      '<p class="small muted">Created ' + fmtDate(s.createdAt) + ' &middot; ' + xpOf(s) + ' XP &middot; ' + LEVELS.filter(l => levelStatus(s, l).complete).length + ' levels complete</p>' +
      '<section class="block"><h2>Skills (evidence-based)</h2><ul class="skills skills--compact">' + LU.skills.map(k => skillRow(s, k, false)).join('') + '</ul></section>' +
      '<section class="block"><h2>Challenge attempts</h2>' + (tried.length ? '<div class="table-wrap"><table class="dense"><thead><tr><th scope="col">Lesson</th><th scope="col">Attempts</th><th scope="col">Scores</th><th scope="col">Status</th></tr></thead><tbody>' +
        tried.map(x => { const a = s.activities[x.id]; return '<tr><th scope="row">' + esc(x.title) + '</th><td>' + a.attempts.length + '</td><td>' + a.attempts.map(t => pct(t.score)).join(' → ') + '</td><td>' + (a.passed ? 'Passed' : 'Not yet') + '</td></tr>'; }).join('') + '</tbody></table></div>' : none) + '</section>' +
      '<section class="block"><h2>Checkpoints</h2><ul class="small">' + (LEVELS.filter(l => s.quizzes[l.id]).map(l => '<li>Level ' + l.num + ': best ' + pct(s.quizzes[l.id].best) + ' (' + s.quizzes[l.id].attempts + ' attempts)' + (s.quizzes[l.id].passed ? ' - passed' : '') + '</li>').join('') || '<li class="muted">None yet.</li>') + '</ul></section>' +
      '<div class="two-up"><section class="block"><h2>Briefs</h2>' + (s.briefs.length ? '<ul class="small">' + s.briefs.map(b => '<li><strong>' + esc(b.fields.title || 'Untitled') + '</strong> - ' + esc(b.fields.message || '') + '</li>').join('') + '</ul>' : none) + '</section>' +
      '<section class="block"><h2>Portfolio</h2>' + (s.portfolio.length ? '<ul class="small">' + s.portfolio.map(x => '<li><strong>' + esc(x.title) + '</strong>' + (x.showcase ? ' ★' : '') + ' - ' + esc(x.learning || x.process || '') + '</li>').join('') + '</ul>' : none) + '</section></div>' +
      '<section class="block"><h2>Critique notes</h2>' + (crit.length ? crit.map(x => '<div class="quote-block"><span class="small muted">' + esc(x.e.title) + '</span><p class="pre small">' + esc(x.r.notes || '') + '</p>' + (x.r.revision ? '<p class="pre small muted"><strong>Revision:</strong> ' + esc(x.r.revision) + '</p>' : '') + '</div>').join('') : none) + '</section>' +
      '<section class="block"><h2>Attached results</h2>' + (atts.length ? atts.map(e => '<p class="small"><strong>' + esc(e.title) + '</strong></p>' + attachmentsHtml(s.exercises[e.id].attachments)).join('') : none) + '</section>' +
      '<section class="block"><h2>Reflections</h2>' + (s.reflections.length ? s.reflections.map(r => '<div class="quote-block"><span class="small muted">' + esc(r.prompt || r.key) + ' &middot; ' + fmtDate(r.at) + '</span><p class="pre small">' + esc(r.text) + '</p></div>').join('') : none) + '</section>' +
      '<section class="block"><h2>Capstone self-assessment</h2><ul class="small">' + LU.capstone.rubric.map((r, i) => '<li>' + esc(r.criterion) + ': <strong>' + (s.capstone.rubric[i] != null ? ['Developing', 'Solid', 'Strong'][s.capstone.rubric[i]] : '-') + '</strong></li>').join('') + '</ul>' + (s.capstone.notes ? '<p class="pre small">' + esc(s.capstone.notes) + '</p>' : '') + '</section>' +
      '<section class="block"><h2>Library</h2><p class="small">' + s.library.length + ' items (' + Object.entries(LIB_TYPES).map(([k, v]) => s.library.filter(i => i.type === k).length + ' ' + v.toLowerCase()).join(', ') + ')</p></section>';
  }

  function notFound() { return '<h1 tabindex="-1">Not found</h1><p>That page doesn\'t exist. <a href="#/home">Go home</a>.</p>'; }

  /* ---------------- router ---------------- */
  function parse() {
    const h = location.hash.replace(/^#\/?/, '');
    const [path, qs] = h.split('?');
    return { parts: path.split('/').filter(Boolean), query: new URLSearchParams(qs || '') };
  }
  function render(keepFocus) {
    const { parts, query } = parse();
    const p = P();
    let route = parts[0] || (p ? 'home' : 'intro');
    if (route === 'instructor') { location.replace('#/admin'); return; }
    const open = ['intro', 'login', 'admin'];
    if (!p && !open.includes(route)) { location.replace('#/intro'); return; }
    if (p && route === 'login') { location.replace('#/home'); return; }
    const isAdminRoute = route === 'admin';
    const adminView = isAdminRoute && Store.isAdmin();
    if (adminView) Store.touchAdmin();
    document.body.classList.toggle('gate', !adminView && (!p || route === 'intro' || isAdminRoute));
    document.body.classList.toggle('is-intro', route === 'intro');
    document.body.classList.toggle('is-admin', adminView);
    const focusKey = keepFocus && document.activeElement && (document.activeElement.id || (document.activeElement.dataset.act ? document.activeElement.dataset.act + '|' + (document.activeElement.dataset.id || '') + '|' + (document.activeElement.value || '') : null));
    renderChrome(route, parts[1], adminView);
    const view = views[route];
    main.innerHTML = view ? view(p, parts[1], query, parts[2]) : notFound();
    const h1 = main.querySelector('h1');
    const appName = 'The Creative Signal';
    document.title = h1 && h1.textContent !== appName ? h1.textContent + ' - ' + appName : appName;
    if (keepFocus && focusKey) {
      let el = document.getElementById(focusKey);
      if (!el && focusKey.includes('|')) { const [a, i, v] = focusKey.split('|'); el = [...main.querySelectorAll('[data-act="' + a + '"]')].find(e => (e.dataset.id || '') === i && (e.value || '') === v); }
      if (el) el.focus();
    } else if (!keepFocus) {
      window.scrollTo(0, 0);
      if (h1) h1.focus({ preventScroll: true }); else main.focus();
    }
    if (p && !keepFocus && !open.includes(route)) Store.update(x => { x.lastRoute = location.hash; });
    closeNav();
  }
  const rerender = () => render(true);

  /* ---------------- actions ---------------- */
  function pinFields(fields) {
    return fields.map(f => '<div class="field"><label for="' + f[0] + '">' + f[1] + '</label><input type="password" id="' + f[0] + '" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="off" class="pin-input"></div>').join('') +
      '<p id="dlg-err" class="err" role="alert"></p>';
  }
  function newPinOk(root, a, b, errEl) {
    const v1 = root.querySelector('#' + a).value, v2 = root.querySelector('#' + b).value;
    const e = Store.pinError(v1) || (v1 !== v2 ? 'The two PINs don\'t match.' : '');
    if (errEl) errEl.textContent = e;
    if (e) root.querySelector('#' + a).focus();
    return !e;
  }
  function fileName(name) {
    return 'levelup-backup_' + String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '_' + new Date().toISOString().slice(0, 10) + '.json';
  }
  function saveEx(id, fn, msg) {
    return commit(p => {
      const s = p.exercises[id] = p.exercises[id] || { response: {}, rubric: {}, done: false };
      s.response = s.response || {}; s.rubric = s.rubric || {};
      fn(s);
      s.updatedAt = new Date().toISOString();
    }, msg);
  }
  function saveDraft(lid) {
    const a = ACTS[lid], form = document.getElementById('activity');
    if (!a || !form || !P()) return;
    const ans = ACT.collect(a, form);
    Store.update(p => { const st = p.activities[lid] = p.activities[lid] || { attempts: [], best: 0, passed: false }; st.draft = ans; });
  }

  /* Admin log out: hide admin content immediately and return to student sign-in. */
  function adminLogout(msg) {
    Store.adminSignOut();
    insSel = null;
    closeDialog();
    main.innerHTML = '';
    if (msg) toast(msg);
    if (location.hash === '#/login') render(); else location.replace('#/login');
  }

  const actions = {
    theme() {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('rsh-levelup.theme', next); } catch (e) { /* convenience only */ }
      rerender();
    },
    'login-pick'(el) { loginSel = el.dataset.id; render(); const i = document.getElementById('pin-in') || document.getElementById('sp-1'); if (i) i.focus(); },
    'login-back'() { loginSel = null; render(); },
    'sign-out'() { Store.signOut(); loginSel = null; libState.editing = null; pfEditing = null; pfPending = []; toast('Signed out.'); location.hash = '#/login'; },
    'admin-logout'() { adminLogout('Logged out of admin.'); },
    async 'change-pin'() {
      const p = P();
      const ok = await ask('Change my PIN', pinFields([['cp-old', 'Current PIN'], ['cp-1', 'New PIN (4-6 digits)'], ['cp-2', 'Repeat new PIN']]),
        [{ label: 'Cancel', value: false }, { label: 'Save new PIN', value: true, primary: true, check: async d => {
          const err = d.querySelector('#dlg-err');
          if (!(await Store.checkPin(p.id, d.querySelector('#cp-old').value))) { err.textContent = 'Your current PIN is not right.'; return false; }
          return newPinOk(d, 'cp-1', 'cp-2', err);
        } }]);
      if (!ok) return;
      await Store.setPin(p.id, document.getElementById('cp-1').value);
      toast('PIN changed.');
    },
    async 'delete-me'() {
      const p = P();
      const ok = await ask('Delete your profile?', '<p>This permanently removes <strong>all</strong> your progress from this browser.</p>' + pinFields([['dm-pin', 'Enter your PIN to confirm']]),
        [{ label: 'Cancel', value: false }, { label: 'Delete my profile', value: true, danger: true, check: async d => {
          const good = await Store.checkPin(p.id, d.querySelector('#dm-pin').value);
          if (!good) d.querySelector('#dlg-err').textContent = 'That PIN is not right.';
          return good;
        } }]);
      if (!ok) return;
      Store.remove(p.id);
      toast('Profile deleted.');
      location.hash = '#/login';
    },
    async 'admin-reset-pin'(el) {
      if (!Store.isAdmin()) return adminLogout('Admin session ended. Sign in again.');
      const s = Store.get(el.dataset.id);
      const ok = await ask('Set a new PIN for ' + s.name, '<p class="small muted">Admin override: the old PIN stops working straight away. Tell the student their new PIN privately.</p>' + pinFields([['ar-1', 'New PIN (4-6 digits)'], ['ar-2', 'Repeat new PIN']]),
        [{ label: 'Cancel', value: false }, { label: 'Set new PIN', value: true, primary: true, check: d => newPinOk(d, 'ar-1', 'ar-2', d.querySelector('#dlg-err')) }]);
      if (!ok || !Store.isAdmin()) return;
      await Store.setPin(s.id, document.getElementById('ar-1').value);
      delete fails[s.id];
      toast('New PIN set for ' + s.name + '.');
      rerender();
    },
    'admin-open'(el) {
      if (!Store.isAdmin()) return adminLogout('Admin session ended. Sign in again.');
      const s = Store.get(el.dataset.id);
      Store.setActive(s.id); // switching to a student profile ends admin mode
      toast('Admin mode ended. Opened ' + s.name + '\'s profile.');
      location.hash = '#/home';
    },
    async 'admin-change-pin'() {
      if (!Store.isAdmin()) return adminLogout('Admin session ended. Sign in again.');
      const ok = await ask('Change the admin PIN', pinFields([['ac-1', 'New admin PIN (4-6 digits)'], ['ac-2', 'Repeat admin PIN']]),
        [{ label: 'Cancel', value: false }, { label: 'Save', value: true, primary: true, check: d => newPinOk(d, 'ac-1', 'ac-2', d.querySelector('#dlg-err')) }]);
      if (!ok || !Store.isAdmin()) return;
      await Store.setAdminPin(document.getElementById('ac-1').value);
      toast('Admin PIN changed.');
    },
    'lesson-done'(el) { commit(p => { p.lessons[el.dataset.id] = new Date().toISOString(); }, 'Lesson complete.'); rerender(); },
    'act-move'(el) {
      const sorter = document.getElementById('sorter');
      const order = sorter.dataset.order.split(',').map(Number);
      const i = +el.dataset.id, j = i + (+el.dataset.dir);
      if (j < 0 || j >= order.length) return;
      [order[i], order[j]] = [order[j], order[i]];
      sorter.dataset.order = order.join(',');
      const lid = parse().parts[1];
      saveDraft(lid);
      rerender();
      const btn = main.querySelector('[data-act="act-move"][data-id="' + j + '"][data-dir="' + el.dataset.dir + '"]') || main.querySelector('[data-act="act-move"][data-id="' + j + '"]');
      if (btn) btn.focus();
    },
    'act-reset'(el) { commit(p => { if (p.activities[el.dataset.id]) delete p.activities[el.dataset.id].draft; }); rerender(); },
    'ex-reveal'(el) { saveEx(el.dataset.id, s => { s.response.revealed = true; }); rerender(); },
    'ex-rubric'(el) { saveEx(el.dataset.id, s => { s.rubric[el.dataset.row] = +el.value; }); rerender(); },
    'scenario-pick'(el) {
      const e = byId[el.dataset.id].item;
      const i = +el.value;
      saveEx(e.id, s => { s.response.picked = i; if (e.options[i].correct) s.response.solved = true; s.response.tries = (s.response.tries || 0) + 1; });
      rerender();
    },
    'ex-check'(el) {
      const e = byId[el.dataset.id].item;
      const r = ((P().exercises[e.id]) || {}).response || {};
      const fb = ACT.exerciseCheck(e, r);
      saveEx(e.id, s => { s.checks = (s.checks || []).concat({ at: new Date().toISOString(), score: Math.round(fb.score * 100) / 100, worked: fb.worked, improve: fb.improve }).slice(-12); }, 'Checked: ' + pct(fb.score));
      render(true);
      const f = document.getElementById('feedback'); if (f) { f.scrollIntoView({ behavior: 'smooth', block: 'start' }); f.focus({ preventScroll: true }); }
    },
    'ex-done'(el) {
      const e = byId[el.dataset.id].item;
      const p = P();
      const s = p.exercises[e.id] || { response: {}, rubric: {} };
      const err = document.getElementById('ex-error');
      if (exerciseScore(p, e) < 0.6) { err.textContent = 'Run "Check my work" and reach at least 60% on the automatic check first.'; return; }
      if (Object.keys(s.rubric || {}).length < e.rubric.length) { err.textContent = 'Self-assess every rubric row (Developing / Solid / Strong) first.'; return; }
      saveEx(e.id, x => { x.done = true; x.doneAt = new Date().toISOString(); }, 'Practical complete. +' + XP.exercise + ' XP');
      render(true);
    },
    'ex-undo'(el) { saveEx(el.dataset.id, x => { x.done = false; }); rerender(); },
    'ex-att-remove'(el) { saveEx(el.dataset.id, x => { x.attachments = (x.attachments || []).filter(a => a.id !== el.dataset.att); }, 'Attachment removed.'); rerender(); },
    'pf-att-remove'(el) {
      if (el.dataset.id === 'pending') { pfPending = pfPending.filter(a => a.id !== el.dataset.att); rerender(); return; }
      if (pfPending.some(a => a.id === el.dataset.att)) { pfPending = pfPending.filter(a => a.id !== el.dataset.att); rerender(); return; }
      commit(p => { const x = p.portfolio.find(y => y.id === el.dataset.id); if (x) x.attachments = (x.attachments || []).filter(a => a.id !== el.dataset.att); }, 'Attachment removed.');
      rerender();
    },
    'ex-to-library'(el) {
      const e = byId[el.dataset.id].item;
      const r = ((P().exercises[e.id]) || {}).response || {};
      let item;
      if (e.kind === 'prompt') {
        const text = (r.v2 || r.v1 || '').trim();
        if (!text) { toast('Write a prompt first.', 'error'); return; }
        item = { type: 'prompt', title: e.title + (r.v2 ? ' (v2)' : ' (v1)'), body: text + (r.why ? '\n\nNotes: ' + r.why : ''), tags: ['exercise', byId[e.id].level.id.toLowerCase()] };
      } else {
        const body = (e.focus || []).map(f => r['focus-' + f] ? f + ': ' + r['focus-' + f] : '').concat([r.borrow ? 'Borrow: ' + r.borrow : '', r.avoid ? 'Avoid: ' + r.avoid : '']).filter(Boolean).join('\n');
        if (!body && !r.refTitle) { toast('Fill in the analysis first.', 'error'); return; }
        item = { type: 'reference', title: r.refTitle || e.title, url: r.refUrl || '', body, tags: ['exercise', 'reference'] };
      }
      commit(p => p.library.push(Object.assign({ id: Store.uid('lib'), at: new Date().toISOString(), extra: {}, url: '' }, item)), 'Saved to your Library.');
    },
    milestone(el) { commit(p => { const m = p.milestones[el.dataset.id] = p.milestones[el.dataset.id] || {}; m[el.dataset.i] = el.checked; }, el.checked ? 'Milestone done.' : null); rerender(); },
    'brief-from-sample'(el) {
      const pr = LU.projects.find(x => x.id === el.dataset.id);
      const id = Store.uid('brief');
      commit(p => p.briefs.push({ id, project: pr.id, fields: Object.assign({}, pr.sample, { title: pr.sample.title }), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }), 'Sample brief copied. Edit it to make it yours.');
      location.hash = '#/brief/' + id;
    },
    async 'brief-delete'(el) {
      const ok = await ask('Delete this brief?', '<p>This cannot be undone.</p>', [{ label: 'Cancel', value: false }, { label: 'Delete brief', value: true, danger: true }]);
      if (!ok) return;
      commit(p => { p.briefs = p.briefs.filter(b => b.id !== el.dataset.id); }, 'Brief deleted.');
      location.hash = '#/brief';
    },
    'lib-tag'(el) { libState.tag = libState.tag === el.dataset.id ? '' : el.dataset.id; rerender(); },
    'lib-edit'(el) { libState.editing = el.dataset.id; render(); document.getElementById('l-title').focus(); },
    'lib-cancel'() { libState.editing = null; rerender(); },
    async 'lib-delete'(el) {
      const it = P().library.find(i => i.id === el.dataset.id);
      const ok = await ask('Delete "' + it.title + '"?', '<p>This removes it from your library.</p>', [{ label: 'Cancel', value: false }, { label: 'Delete', value: true, danger: true }]);
      if (!ok) return;
      commit(p => { p.library = p.library.filter(i => i.id !== el.dataset.id); }, 'Deleted from library.');
      rerender();
    },
    'lib-copy'(el) {
      const it = P().library.find(i => i.id === el.dataset.id);
      if (navigator.clipboard) navigator.clipboard.writeText(it.body).then(() => toast('Copied to clipboard.'), () => toast('Could not copy - select the text and press Ctrl+C.', 'error'));
      else toast('Select the text and press Ctrl+C to copy.', 'error');
    },
    'pf-milestone'(el) { commit(p => { p.portfolioMilestones[el.dataset.id] = el.checked; }, el.checked ? 'Portfolio milestone reached!' : null); rerender(); },
    'pf-edit'(el) { pfEditing = el.dataset.id; pfPending = []; render(); document.getElementById('pf-title').focus(); },
    'pf-cancel'() { pfEditing = null; pfPending = []; rerender(); },
    async 'pf-delete'(el) {
      const ok = await ask('Delete this portfolio piece?', '<p>Only the notes and preview here are removed - your media files are not touched.</p>', [{ label: 'Cancel', value: false }, { label: 'Delete', value: true, danger: true }]);
      if (!ok) return;
      commit(p => { p.portfolio = p.portfolio.filter(x => x.id !== el.dataset.id); }, 'Portfolio piece deleted.');
      rerender();
    },
    'showcase-save'() {
      const text = val('showcase-text');
      if (!text) { toast('Write your reflection first.', 'error'); return; }
      commit(p => { const r = p.reflections.find(x => x.key === 'showcase'); if (r) { r.text = text; r.at = new Date().toISOString(); } else p.reflections.push({ id: Store.uid('ref'), key: 'showcase', prompt: 'Showcase: how has my process changed?', text, at: new Date().toISOString() }); }, 'Showcase reflection saved.');
    },
    reflect(el) {
      const ta = document.getElementById('rt-' + el.dataset.id);
      const text = ta.value.trim();
      if (!text) { toast('Write something first.', 'error'); ta.focus(); return; }
      commit(p => p.reflections.push({ id: Store.uid('ref'), key: el.dataset.id, prompt: el.dataset.prompt, text, at: new Date().toISOString() }), 'Reflection saved.');
      ta.value = '';
      if (parse().parts[0] === 'progress') rerender();
    },
    skill(el) { commit(p => { p.skills[el.dataset.id] = +el.value; }, 'Your own view saved. (Official ratings come from demonstrated work.)'); rerender(); },
    'cap-milestone'(el) { commit(p => { p.capstone.milestones[el.dataset.id] = el.checked; }, el.checked ? 'Capstone milestone done!' : null); rerender(); },
    'cap-rubric'(el) { commit(p => { p.capstone.rubric[el.dataset.id] = +el.value; }); rerender(); },
    'cap-notes'() { commit(p => { p.capstone.notes = val('cap-notes'); }, 'Capstone notes saved.'); },
    checklist(el) { commit(p => { p.checklist[el.dataset.id] = el.checked; }); rerender(); },
    async 'checklist-reset'() {
      const ok = await ask('Clear the checklist?', '<p>All ticks will be removed so you can start a new project.</p>', [{ label: 'Cancel', value: false }, { label: 'Clear', value: true, danger: true }]);
      if (ok) { commit(p => { p.checklist = {}; }, 'Checklist cleared.'); rerender(); }
    },
    'quiz-reset'(el) { commit(p => { if (p.quizzes[el.dataset.id]) p.quizzes[el.dataset.id].showResults = false; }); render(); },
    'ins-unlock'(el) {
      if (!Store.isAdmin()) return adminLogout('Admin session ended. Sign in again.');
      const s = Store.get(el.dataset.id);
      s.unlockAll = el.checked; Store.save();
      toast(el.checked ? 'All levels unlocked for ' + s.name + '.' : 'Normal level locking restored for ' + s.name + '.');
      rerender();
    },
    'install-app'() { if (window.PWA) window.PWA.prompt().then(ok => { if (ok) toast('Installing. Find "Creative Signal" with your other apps.'); render(); }); },
    'export-me'() { const p = P(); download(fileName(p.name), Store.exportData([p.id])); toast('Backup downloaded. Keep the file somewhere safe.'); },
    'export-one'(el) { if (!Store.isAdmin()) return adminLogout('Admin session ended. Sign in again.'); const s = Store.get(el.dataset.id); download(fileName(s.name), Store.exportData([s.id])); toast('Backup of ' + s.name + ' downloaded.'); },
    'export-all'() { if (!Store.isAdmin()) return adminLogout('Admin session ended. Sign in again.'); download(fileName('all-profiles'), Store.exportData()); toast('Backup of all profiles downloaded.'); },
    async 'delete-profile'(el) {
      if (!Store.isAdmin()) return adminLogout('Admin session ended. Sign in again.');
      const s = Store.get(el.dataset.id);
      const ok = await ask('Delete ' + s.name + '\'s profile?', '<p>This permanently removes all of their progress from this browser. Export a backup first if you might need it.</p>' +
        '<label for="del-confirm">Type the name <strong>' + esc(s.name) + '</strong> to confirm</label><input type="text" id="del-confirm" autocomplete="off"><p id="del-err" role="alert" class="err"></p>',
        [{ label: 'Cancel', value: false }, { label: 'Delete profile', value: true, danger: true, check: d => { const okName = d.querySelector('#del-confirm').value.trim().toLowerCase() === s.name.toLowerCase(); if (!okName) d.querySelector('#del-err').textContent = 'The name doesn\'t match.'; return okName; } }]);
      if (!ok || !Store.isAdmin()) return;
      Store.remove(s.id);
      if (insSel === s.id) insSel = null;
      toast('Profile deleted.');
      if (parse().parts[1] === 'student') location.hash = '#/admin/students'; else render();
    }
  };

  /* ---------------- events ---------------- */
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el || el.tagName === 'INPUT') return;
    const fn = actions[el.dataset.act];
    if (fn) { e.preventDefault(); fn(el); }
  });
  document.addEventListener('pwa-change', () => { const r = parse().parts[0] || (P() ? 'home' : 'intro'); if (r === 'intro' || r === 'profile') render(true); });
  main.addEventListener('change', async e => {
    const el = e.target;
    if (el.matches('input[data-act]')) { const fn = actions[el.dataset.act]; if (fn) fn(el); return; }
    if (el.id === 'lib-type') { libState.type = el.value; document.getElementById('lib-results').innerHTML = libResults(P()); }
    if (el.id === 'l-type') document.getElementById('l-sound').hidden = el.value !== 'sound';
    if (el.id === 'ins-level') { insLevel = el.value; rerender(); }
    if (el.id === 'import-file') handleImport(el);
    if (el.closest('#activity')) saveDraft(parse().parts[1]);
    if (el.matches('[data-ex-check]')) {
      const id = parse().parts[1];
      saveEx(id, s => { s.response.checks = s.response.checks || {}; s.response.checks[el.dataset.exCheck] = el.checked; });
    }
    if ((el.id === 'ex-attach' || el.id === 'pf-attach') && el.files && el.files[0]) {
      const att = await attachFile(el.files[0]);
      if (el.id === 'ex-attach') {
        if (saveEx(el.dataset.owner, s => { s.attachments = (s.attachments || []).concat(att).slice(-4); }, 'Attached: ' + att.name)) rerender();
      } else if (el.dataset.owner !== 'pending' && pfEditing) {
        if (commit(p => { const x = p.portfolio.find(y => y.id === pfEditing); x.attachments = (x.attachments || []).concat(att).slice(-6); }, 'Attached: ' + att.name)) rerender();
      } else { pfPending.push(att); rerender(); toast('Attached - it is saved when you add the piece.'); }
    }
  });
  let t, dt;
  main.addEventListener('input', e => {
    const el = e.target;
    if (el.id === 'lib-q') { libState.q = el.value; document.getElementById('lib-results').innerHTML = libResults(P()); }
    if (el.dataset.brief) { const f = {}; main.querySelectorAll('[data-brief]').forEach(x => { f[x.dataset.brief] = x.value; }); document.getElementById('brief-preview').innerHTML = briefPreview(f); }
    if (el.closest('#activity')) {
      if (el.dataset.slot) { const asm = document.getElementById('assembled'); if (asm) asm.textContent = [...main.querySelectorAll('[data-slot]')].map(x => x.value.trim()).filter(Boolean).join(', ') || 'Your result builds up here as you type.'; }
      clearTimeout(dt); dt = setTimeout(() => saveDraft(parse().parts[1]), 400);
    }
    if (el.dataset.exField) {
      const id = parse().parts[1];
      const ind = document.getElementById('autosave');
      if (ind) ind.textContent = 'Saving...';
      clearTimeout(t);
      t = setTimeout(() => {
        const fields = {};
        main.querySelectorAll('[data-ex-field]').forEach(x => { fields[x.dataset.exField] = x.value; });
        saveEx(id, s => { Object.assign(s.response, fields); });
        if (ind) ind.textContent = 'Saved ✓';
      }, 400);
    }
  });
  main.addEventListener('submit', async e => {
    e.preventDefault();
    const f = e.target;
    if (f.id === 'activity') {
      const lid = f.dataset.id, a = ACTS[lid];
      const ans = ACT.collect(a, f);
      const msg = ACT.incomplete(a, ans);
      if (msg) { document.getElementById('act-err').textContent = msg; return; }
      const g = ACT.grade(a, ans);
      commit(p => {
        const st = p.activities[lid] = p.activities[lid] || { attempts: [], best: 0, passed: false };
        st.draft = ans;
        st.attempts = (st.attempts || []).concat({ at: new Date().toISOString(), score: g.score, passed: g.passed, worked: g.worked, improve: g.improve, answer: ans }).slice(-10);
        st.best = Math.max(st.best || 0, g.score);
        if (g.passed && !st.passed) { st.passed = true; st.passedAt = new Date().toISOString(); }
      }, g.passed ? 'Passed with ' + pct(g.score) + '!' : 'Scored ' + pct(g.score) + ' - read the feedback and try again.');
      render(true);
      const fbEl = document.getElementById('feedback'); if (fbEl) { fbEl.scrollIntoView({ behavior: 'smooth', block: 'start' }); fbEl.focus({ preventScroll: true }); }
    } else if (f.id === 'create-form') {
      const err = document.getElementById('new-name-err');
      if (val('new-pin') !== val('new-pin2')) { err.textContent = 'The two PINs don\'t match.'; document.getElementById('new-pin').focus(); return; }
      try {
        await Store.create(val('new-name'), val('new-pin'));
        toast('Profile created. Welcome to The Creative Signal!');
        location.hash = '#/home';
      } catch (ex) {
        err.textContent = ex.message;
        document.getElementById(/PIN/.test(ex.message) ? 'new-pin' : 'new-name').focus();
      }
    } else if (f.id === 'pin-form') {
      const id = f.dataset.id, err = document.getElementById('pin-err'), input = document.getElementById('pin-in');
      const fl = fails[id] = fails[id] || { n: 0, until: 0 };
      if (fl.until > Date.now()) return;
      if (await Store.checkPin(id, input.value)) {
        delete fails[id];
        loginSel = null;
        Store.setActive(id);
        const p = P();
        toast('Welcome back, ' + p.name + '.');
        const target = p.lastRoute && !/^#\/(intro|login|instructor|admin)/.test(p.lastRoute) ? p.lastRoute : '#/home';
        if (location.hash === target) render(); else location.hash = target;
      } else {
        fl.n++;
        if (fl.n >= 5) { fl.until = Date.now() + 60000; fl.n = 0; err.textContent = 'Too many wrong tries. Wait 60 seconds, or ask your instructor to reset your PIN.'; setTimeout(() => { if (loginSel === id) render(); }, 60500); }
        else err.textContent = 'That PIN is not right. ' + (5 - fl.n) + ' tries left before a short pause.';
        input.value = ''; input.focus();
      }
    } else if (f.id === 'setpin-form') {
      if (!newPinOk(f, 'sp-1', 'sp-2', document.getElementById('sp-err'))) return;
      await Store.setPin(f.dataset.id, val('sp-1'));
      loginSel = null;
      Store.setActive(f.dataset.id);
      toast('PIN saved. Welcome!');
      location.hash = '#/home';
    } else if (f.id === 'admin-setup') {
      if (!newPinOk(f, 'ad-1', 'ad-2', document.getElementById('ad-err'))) return;
      await Store.setAdminPin(val('ad-1'));
      toast('Admin PIN saved. You are signed in as admin.');
      render();
    } else if (f.id === 'admin-login') {
      if (await Store.adminSignIn(val('ad-in'))) { toast('Signed in as admin.'); render(); }
      else { document.getElementById('ad-err').textContent = 'That admin PIN is not right.'; const i = document.getElementById('ad-in'); i.value = ''; i.focus(); }
    } else if (f.id === 'quiz') {
      const l = LEVELS.find(x => x.id === parse().parts[1]);
      const answers = l.checkpoint.questions.map((q, i) => { const c = f.querySelector('input[name="q' + i + '"]:checked'); return c ? +c.value : null; });
      const missing = answers.map((a, i) => a == null ? i + 1 : null).filter(Boolean);
      if (missing.length) { document.getElementById('quiz-err').textContent = 'Answer every question first (missing: ' + missing.join(', ') + ').'; f.querySelector('input[name="q' + (missing[0] - 1) + '"]').focus(); return; }
      const score = answers.filter((a, i) => a === l.checkpoint.questions[i].answer).length / answers.length;
      const pass = score >= (l.checkpoint.passMark || .75);
      commit(p => {
        const q = p.quizzes[l.id] = p.quizzes[l.id] || { best: 0, attempts: 0, passed: false };
        q.attempts++; q.best = Math.max(q.best, score); q.passed = q.passed || pass;
        q.lastScore = score; q.lastAnswers = answers; q.showResults = true;
      }, pass ? 'Checkpoint passed with ' + pct(score) + '!' : 'Score: ' + pct(score) + '. Review and try again.');
      render();
    } else if (f.id === 'brief-form') {
      const fields = {};
      LU.briefFields.forEach(x => { fields[x.id] = val('b-' + x.id); });
      if (!fields.title) { document.getElementById('brief-err').textContent = 'Give the brief a project name.'; document.getElementById('b-title').focus(); return; }
      const now = new Date().toISOString();
      let id = f.dataset.id;
      commit(p => {
        if (id === 'new') { id = Store.uid('brief'); p.briefs.push({ id, project: val('b-project'), fields, createdAt: now, updatedAt: now }); }
        else { const b = p.briefs.find(x => x.id === id); b.fields = fields; b.project = val('b-project'); b.updatedAt = now; }
      }, 'Brief saved.');
      if (location.hash !== '#/brief/' + id) location.hash = '#/brief/' + id; else rerender();
    } else if (f.id === 'lib-form') {
      const title = val('l-title');
      if (!title) { document.getElementById('lib-err').textContent = 'Give the item a title.'; document.getElementById('l-title').focus(); return; }
      const item = { type: val('l-type'), title, body: val('l-body'), url: val('l-url'), tags: val('l-tags').split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
        extra: { source: val('l-source'), licence: val('l-licence'), use: val('l-use') } };
      const editing = libState.editing;
      commit(p => {
        if (editing) Object.assign(p.library.find(i => i.id === editing), item);
        else p.library.push(Object.assign({ id: Store.uid('lib'), at: new Date().toISOString() }, item));
      }, editing ? 'Library item updated.' : 'Saved to your Library.');
      libState.editing = null;
      render();
    } else if (f.id === 'pf-form') {
      const title = val('pf-title');
      if (!title) { document.getElementById('pf-err').textContent = 'Give the piece a title.'; document.getElementById('pf-title').focus(); return; }
      const item = { title, link: val('pf-link'), brief: val('pf-brief'), showcase: document.getElementById('pf-showcase').checked };
      Object.keys(LU.portfolioPrompts).forEach(k => { item[k] = val('pf-' + k); });
      const editing = pfEditing, pending = pfPending;
      commit(p => {
        if (editing) { const x = p.portfolio.find(y => y.id === editing); Object.assign(x, item); x.attachments = (x.attachments || []).concat(pending); }
        else p.portfolio.push(Object.assign({ id: Store.uid('pf'), at: new Date().toISOString(), attachments: pending }, item));
      }, editing ? 'Portfolio piece updated.' : 'Added to your portfolio.');
      pfEditing = null; pfPending = [];
      render();
    }
  });

  function handleImport(input) {
    const file = input.files && input.files[0];
    if (!file) return;
    const show = (text, ok) => { const msg = document.getElementById('import-msg'); if (msg) msg.innerHTML = '<div class="callout ' + (ok ? '' : 'callout--warn') + '"><div class="callout__title">' + (ok ? 'Restored' : 'Could not import this file') + '</div>' + esc(text) + '</div>'; };
    if (file.size > 20 * 1024 * 1024) { show('That file is too large to be a backup from this app.'); input.value = ''; return; }
    const reader = new FileReader();
    reader.onerror = () => show('The file could not be read. Try choosing it again.');
    reader.onload = async () => {
      let profiles;
      try { profiles = Store.parseBackup(String(reader.result)); } catch (err) { show(err.message); input.value = ''; return; }
      const clashes = Store.clashes(profiles);
      let mode = 'replace';
      if (clashes.length) {
        const admin = Store.isAdmin();
        mode = await ask('Some profiles already exist', '<p>These profiles are already on this computer: <strong>' + clashes.map(esc).join(', ') + '</strong>.</p>' +
          (admin ? '<p>Replace them with the versions in the backup, or keep both?</p>' : '<p>You can import them as separate copies. Only an instructor can replace an existing profile.</p>'),
          admin ? [{ label: 'Cancel', value: null }, { label: 'Keep both', value: 'copy' }, { label: 'Replace', value: 'replace', primary: true }]
            : [{ label: 'Cancel', value: null }, { label: 'Import as a copy', value: 'copy', primary: true }]);
        if (!mode) { input.value = ''; return; }
        if (mode === 'replace' && !Store.isAdmin()) mode = 'copy';
      }
      const r = Store.importProfiles(profiles, mode);
      input.value = '';
      render();
      show('Imported ' + profiles.length + ' profile(s): ' + r.added + ' new, ' + r.replaced + ' replaced, ' + r.copied + ' kept as copies.', true);
      toast('Backup restored.');
    };
    reader.readAsText(file);
  }

  /* Mobile nav */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('sidenav');
  function closeNav() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (open) { const a = nav.querySelector('a'); if (a) a.focus(); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { closeNav(); toggle.focus(); } });

  /* Admin session guards: idle expiry, activity keep-alive, and no restore from the back/forward cache. */
  ['click', 'keydown'].forEach(ev => document.addEventListener(ev, () => Store.touchAdmin(), true));
  setInterval(() => { if (document.body.classList.contains('is-admin') && !Store.isAdmin()) adminLogout('Admin session expired after 15 idle minutes. Sign in again.'); }, 15000);
  window.addEventListener('pageshow', e => { if (e.persisted) { Store.adminSignOut(); render(); } });
  window.addEventListener('pagehide', () => { Store.adminSignOut(); });

  /* Boot */
  try { const th = localStorage.getItem('rsh-levelup.theme'); if (th === 'dark') document.documentElement.dataset.theme = 'dark'; } catch (e) { /* ignore */ }
  window.addEventListener('hashchange', () => render(false));
  if (!Store.available) {
    main.innerHTML = '<h1 tabindex="-1">Storage is blocked</h1><p>This browser is not allowing the app to save progress (this can happen in private/incognito windows or with strict privacy settings). Open the app in a normal window of Edge, Chrome or Firefox.</p>';
  } else {
    render(false);
  }
})();
