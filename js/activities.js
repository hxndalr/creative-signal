/* Hands-on activity engine. Everything is graded locally and deterministically: no AI service is used.
   For open creative work the checks look for the ingredients a rubric asks for, not one "right" answer. */
(function () {
  const { esc, md } = R;
  const words = s => String(s || '').trim().split(/\s+/).filter(Boolean).length;
  const lc = s => String(s || '').toLowerCase();

  /* Stable shuffle so the same student sees the same starting order until they reset. */
  function shuffle(arr, seed) {
    const a = arr.slice();
    let h = 2166136261;
    for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
    for (let i = a.length - 1; i > 0; i--) {
      h = Math.imul(h ^ (h >>> 13), 1103515245) >>> 0;
      const j = h % (i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    if (a.length > 1 && a.every((x, i) => x === arr[i])) a.push(a.shift()); // never start already solved
    return a;
  }

  /* ---------- generic text checks (used by build/plan activities and practical exercises) ---------- */
  function runCheck(c, fields) {
    const text = c.field === '*' || !c.field ? Object.values(fields).join(' \n ') : (fields[c.field] || '');
    const t = lc(text);
    switch (c.kind) {
      case 'minWords': return words(text) >= (c.n || 1);
      case 'contains': return (c.words || []).some(w => t.includes(lc(w)));
      case 'notContains': return t.trim().length > 0 && !(c.words || []).some(w => new RegExp('\\b' + lc(w).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(t));
      case 'regex': try { return new RegExp(c.pattern, 'i').test(text); } catch (e) { return false; }
      case 'differs': return lc(fields[c.field]).trim() !== lc(fields[c.other]).trim() && words(fields[c.field]) > 0;
      default: return false;
    }
  }
  function textFeedback(checks, fields) {
    const worked = [], improve = [];
    let pass = 0;
    checks.forEach(c => {
      const ok = runCheck(c, fields);
      if (ok) { pass++; worked.push(c.worked || c.label); } else improve.push(c.improve || c.label);
    });
    return { score: checks.length ? pass / checks.length : 0, worked, improve, passed: pass, total: checks.length };
  }
  function slotChecks(slots) {
    return (slots || []).map(s => ({ field: s.id, kind: 'minWords', n: s.minWords || 1, label: s.label + ' is filled in',
      worked: s.label + ': filled in with enough detail.', improve: s.label + ': add more detail (at least ' + (s.minWords || 1) + ' words). ' + (s.hint || '') }));
  }

  /* ---------- grading per activity type ---------- */
  function grade(a, ans) {
    const worked = [], improve = [];
    let score = 0;
    if (a.type === 'quick') {
      let right = 0;
      a.questions.forEach((q, i) => {
        if (ans.q && ans.q[i] === q.answer) { right++; worked.push('Q' + (i + 1) + ': ' + q.explain); }
        else improve.push('Q' + (i + 1) + ': ' + q.explain);
      });
      score = right / a.questions.length;
    } else if (a.type === 'order') {
      const got = ans.order || [];
      let right = 0;
      a.items.forEach((it, i) => {
        if (got[i] === i) right++;
        else improve.push('"' + it.text + '" belongs at position ' + (i + 1) + '. ' + (it.why || ''));
      });
      if (right) worked.push(right + ' of ' + a.items.length + ' steps are in the right place.');
      score = right / a.items.length;
    } else if (a.type === 'match') {
      let right = 0;
      a.pairs.forEach((p, i) => {
        if (ans.m && ans.m[i] === i) { right++; worked.push(p.left + ' → ' + p.right); }
        else improve.push(p.left + ' should match: "' + p.right + '".');
      });
      score = right / a.pairs.length;
    } else if (a.type === 'spot') {
      const real = a.items.filter(x => x.real).length;
      let tp = 0, fp = 0;
      a.items.forEach((it, i) => {
        const ticked = !!(ans.s && ans.s[i]);
        if (it.real && ticked) { tp++; worked.push('Spotted: ' + it.text + '. ' + (it.explain || '')); }
        else if (it.real && !ticked) improve.push('Missed: ' + it.text + '. ' + (it.explain || ''));
        else if (!it.real && ticked) { fp++; improve.push('Not really a problem: ' + it.text + '. ' + (it.explain || '')); }
      });
      score = Math.max(0, (tp - fp) / (real || 1));
    } else if (a.type === 'choose') {
      const opt = a.options[ans.choice];
      if (!opt) { improve.push('Choose an option first.'); }
      else if (opt.ok) { score += 0.6; worked.push(opt.feedback); }
      else improve.push(opt.feedback);
      const reason = ans.reason || '';
      const enough = words(reason) >= (a.reasonMin || 12);
      const keyed = !(a.reasonKeywords && a.reasonKeywords.length) || a.reasonKeywords.some(k => lc(reason).includes(lc(k)));
      if (enough && keyed) { score += 0.4; worked.push('Your reason is specific and connects to the brief.'); }
      else if (!enough) improve.push('Explain your reasoning in at least ' + (a.reasonMin || 12) + ' words.');
      else improve.push('Connect your reason to the brief. Mention at least one of: ' + a.reasonKeywords.join(', ') + '.');
    } else if (a.type === 'build' || a.type === 'plan') {
      const slots = textFeedback(slotChecks(a.slots), ans.f || {});
      const rules = textFeedback(a.checks || [], ans.f || {});
      const total = slots.total + rules.total;
      score = total ? (slots.passed + rules.passed) / total : 0;
      if (slots.passed === slots.total) worked.push('All ' + slots.total + ' parts are filled in with enough detail.');
      else if (slots.passed) worked.push(slots.passed + ' of ' + slots.total + ' parts have enough detail.');
      worked.push(...rules.worked);
      improve.push(...slots.improve, ...rules.improve);
    }
    score = Math.round(score * 100) / 100;
    return { score, passed: score >= (a.passMark || 0.7), worked, improve };
  }

  /* ---------- rendering ---------- */
  function render(a, lid, st) {
    const draft = (st && st.draft) || {};
    let body = '';
    if (a.type === 'quick') {
      body = a.questions.map((q, i) => '<fieldset class="q"><legend>' + md(q.q) + '</legend>' + q.options.map((o, j) =>
        '<label class="choice"><input type="radio" name="aq' + i + '" value="' + j + '"' + (draft.q && draft.q[i] === j ? ' checked' : '') + '><span>' + md(o) + '</span></label>').join('') + '</fieldset>').join('');
    } else if (a.type === 'order') {
      const order = draft.order && draft.order.length === a.items.length ? draft.order : shuffle(a.items.map((_, i) => i), lid);
      body = '<p class="small muted">Use the arrow buttons to move each card. Number 1 comes first.</p><ol class="sorter" id="sorter" data-order="' + order.join(',') + '">' +
        order.map((idx, pos) => '<li class="sorter__item"><span class="sorter__n" aria-hidden="true">' + (pos + 1) + '</span><span class="sorter__t">' + md(a.items[idx].text) + '</span>' +
          '<span class="sorter__btns"><button type="button" class="icon-btn" data-act="act-move" data-id="' + pos + '" data-dir="-1" aria-label="Move up: ' + esc(a.items[idx].text) + '"' + (pos === 0 ? ' disabled' : '') + '>↑</button>' +
          '<button type="button" class="icon-btn" data-act="act-move" data-id="' + pos + '" data-dir="1" aria-label="Move down: ' + esc(a.items[idx].text) + '"' + (pos === order.length - 1 ? ' disabled' : '') + '>↓</button></span></li>').join('') + '</ol>';
    } else if (a.type === 'match') {
      const rights = shuffle(a.pairs.map((_, i) => i), lid + 'm');
      body = '<div class="matcher">' + a.pairs.map((p, i) => '<div class="matcher__row"><label for="am' + i + '">' + md(p.left) + '</label><select id="am' + i + '" data-match="' + i + '"><option value="">Choose...</option>' +
        rights.map(r => '<option value="' + r + '"' + (draft.m && draft.m[i] === r ? ' selected' : '') + '>' + esc(a.pairs[r].right) + '</option>').join('') + '</select></div>').join('') + '</div>';
    } else if (a.type === 'spot') {
      body = '<blockquote class="specimen"><span class="tag-fiction">The work (fictional)</span>' + md(a.work) + '</blockquote><fieldset><legend>Tick every real problem you can find</legend>' +
        a.items.map((it, i) => '<label class="choice"><input type="checkbox" data-spot="' + i + '"' + (draft.s && draft.s[i] ? ' checked' : '') + '><span>' + md(it.text) + '</span></label>').join('') + '</fieldset>';
    } else if (a.type === 'choose') {
      body = '<div class="scenario">' + md(a.scenario) + '</div><fieldset><legend>Your choice</legend>' + a.options.map((o, i) =>
        '<label class="choice"><input type="radio" name="ach" value="' + i + '"' + (draft.choice === i ? ' checked' : '') + '><span>' + md(o.text) + '</span></label>').join('') + '</fieldset>' +
        '<div class="field"><label for="a-reason">Why? Connect your choice to the brief</label><span class="hint">At least ' + (a.reasonMin || 12) + ' words.</span><textarea id="a-reason" rows="3" data-draft="reason">' + esc(draft.reason || '') + '</textarea></div>';
    } else if (a.type === 'build' || a.type === 'plan') {
      const f = draft.f || {};
      body = '<div class="slots' + (a.type === 'build' ? ' slots--build' : '') + '">' + a.slots.map(s => '<div class="field slot"><label for="as-' + esc(s.id) + '">' + esc(s.label) + '</label>' + (s.hint ? '<span class="hint">' + esc(s.hint) + '</span>' : '') +
        '<textarea id="as-' + esc(s.id) + '" rows="2" data-slot="' + esc(s.id) + '">' + esc(f[s.id] || '') + '</textarea></div>').join('') + '</div>' +
        (a.type === 'build' ? '<div class="assembled" aria-live="polite"><span class="label-mono">Assembled</span><p id="assembled">' + esc(Object.values(f).filter(Boolean).join(', ') || 'Your result builds up here as you type.') + '</p></div>' : '');
    }
    return body;
  }

  /* Read the current answer out of the DOM. */
  function collect(a, root) {
    const ans = {};
    if (a.type === 'quick') ans.q = a.questions.map((_, i) => { const c = root.querySelector('input[name="aq' + i + '"]:checked'); return c ? +c.value : null; });
    if (a.type === 'order') ans.order = root.querySelector('#sorter').dataset.order.split(',').map(Number);
    if (a.type === 'match') ans.m = a.pairs.map((_, i) => { const v = root.querySelector('[data-match="' + i + '"]').value; return v === '' ? null : +v; });
    if (a.type === 'spot') ans.s = a.items.map((_, i) => root.querySelector('[data-spot="' + i + '"]').checked);
    if (a.type === 'choose') { const c = root.querySelector('input[name="ach"]:checked'); ans.choice = c ? +c.value : null; ans.reason = root.querySelector('#a-reason').value; }
    if (a.type === 'build' || a.type === 'plan') { ans.f = {}; root.querySelectorAll('[data-slot]').forEach(t => { ans.f[t.dataset.slot] = t.value; }); }
    return ans;
  }
  function incomplete(a, ans) {
    if (a.type === 'quick' && ans.q.some(v => v == null)) return 'Answer every question first.';
    if (a.type === 'match' && ans.m.some(v => v == null)) return 'Match every item first.';
    if (a.type === 'choose' && ans.choice == null) return 'Pick an option first.';
    if ((a.type === 'build' || a.type === 'plan') && !Object.values(ans.f).some(v => v.trim())) return 'Fill in at least one box first.';
    return '';
  }

  /* ---------- practical exercises: automatic ingredient checks ---------- */
  const VAGUE = ['beautiful', 'amazing', 'nice', 'stunning', 'awesome', 'cool', 'epic', 'good'];
  const STOP = new Set('about above after again against because before being below between could doesn during either every from have having into itself more most other over same should some such than that their them then there these they this those through under until very what when where which while with would your'.split(' '));
  function exerciseCheck(e, r) {
    r = r || {};
    let checks = [];
    const f = Object.assign({}, r);
    if (e.kind === 'prompt') {
      f.final = r.v2 || r.v1 || '';
      checks = [
        { field: 'v1', kind: 'minWords', n: 12, label: 'Version 1 is a full prompt', worked: 'Version 1 is a complete prompt.', improve: 'Write version 1 as a full prompt of at least 12 words.' },
        { field: 'final', kind: 'notContains', words: VAGUE, label: 'No vague praise words', worked: 'You described what you want instead of praising it.', improve: 'Swap words like "beautiful" or "amazing" for what you actually want to see.' },
        { field: 'final', kind: 'regex', pattern: '(light|lit|glow|shadow|sun|lamp|window|dusk|dawn|golden|neon|backlit|soft)', label: 'Lighting is described', worked: 'Lighting is named.', improve: 'Describe the light: where it comes from and how hard or soft it is.' },
        { field: 'final', kind: 'regex', pattern: '(close-up|close up|wide|medium|shot|angle|lens|mm|overhead|eye level|low angle|tracking|pan|dolly|macro|aerial)', label: 'Camera or framing is described', worked: 'Framing is clear.', improve: 'Add framing: shot size, angle or lens.' },
        { field: 'final', kind: 'regex', pattern: '(\\bno\\b|avoid|without|exclude|don\'t)', label: 'States what to avoid', worked: 'You set a constraint.', improve: 'Add one constraint, e.g. "no text, no logos".' },
        { field: 'v2', kind: 'differs', other: 'v1', label: 'Version 2 changes something', worked: 'You revised the prompt.', improve: 'Write a version 2 that changes one or two things on purpose.' },
        { field: 'why', kind: 'minWords', n: 8, label: 'You explained the change', worked: 'You explained your revision.', improve: 'Say what you changed and why (at least 8 words).' }
      ];
    } else if (e.kind === 'critique') {
      const keys = [...new Set(lc((e.modelNotes || []).join(' ')).match(/[a-z]{6,}/g) || [])].filter(w => !STOP.has(w));
      const notes = lc(r.notes);
      const hits = keys.filter(k => notes.includes(k.slice(0, 6))).length;
      checks = [
        { field: 'notes', kind: 'minWords', n: 25, label: 'Critique notes are developed', worked: 'Your notes are detailed.', improve: 'Write at least 25 words: the issue, why it matters, and a fix.' },
        { field: 'notes', kind: 'regex', pattern: '(because|so that|which means|this makes|so the)', label: 'Notes explain why', worked: 'You explain why each issue matters.', improve: 'Use "because..." to say why each issue matters.' },
        { field: 'revision', kind: 'minWords', n: 20, label: 'A revised version is written', worked: 'You wrote a revised version.', improve: 'Rewrite the work with your fixes applied (at least 20 words).' }
      ];
      const fb = textFeedback(checks, f);
      const overlapOk = hits >= 2;
      (overlapOk ? fb.worked : fb.improve).push(overlapOk ? 'Your notes share several key ideas with the expert notes (word-overlap check only).' : 'Compare your notes with the expert notes. The automatic check found little overlap in key ideas.');
      fb.score = (fb.passed + (overlapOk ? 1 : 0)) / (fb.total + 1);
      return fb;
    } else if (e.kind === 'reference') {
      checks = [{ field: 'refTitle', kind: 'minWords', n: 2, label: 'Reference identified', worked: 'The reference is named.', improve: 'Name the reference you analysed.' }]
        .concat((e.focus || []).map(x => ({ field: 'focus-' + x, kind: 'minWords', n: 4, label: x + ' analysed', worked: x + ': analysed.', improve: x + ': write at least 4 words on what you notice.' })))
        .concat([{ field: 'borrow', kind: 'minWords', n: 5, label: 'Principle to borrow', worked: 'You named a principle to borrow, not a copy.', improve: 'Name the principle you will borrow (at least 5 words).' },
          { field: 'avoid', kind: 'minWords', n: 4, label: 'What not to copy', worked: 'You set a clear line on copying.', improve: 'Say what you will NOT copy.' }]);
    } else if (e.kind === 'task') {
      checks = (e.fields || ['Your response']).map((x, i) => ({ field: 'field' + i, kind: 'minWords', n: 5, label: x, worked: x + ': answered.', improve: x + ': write at least 5 words.' }));
    } else if (e.kind === 'scenario') {
      return { score: r.solved ? 1 : 0, worked: r.solved ? ['You found the best next step.'] : [], improve: r.solved ? [] : ['Pick the best next step above.'], passed: r.solved ? 1 : 0, total: 1 };
    }
    return textFeedback(checks, f);
  }

  window.ACT = { grade, render, collect, incomplete, exerciseCheck, words };
})();
