/* Rendering helpers: escaping, lesson blocks and visual teaching aids. */
(function () {
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  /* Escape, then allow **bold** and *italic*. */
  function md(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\n]+?)\*/g, '$1<em>$2</em>');
  }

  const PART_COLOURS = ['subject', 'action', 'setting', 'style', 'light', 'camera', 'mood', 'format', 'constraints'];
  function partVar(label) {
    const k = String(label || '').toLowerCase().replace(/[^a-z]/g, '');
    const hit = PART_COLOURS.find(p => k.startsWith(p) || k.includes(p));
    return hit ? 'var(--pp-' + hit + ')' : 'var(--muted)';
  }
  const TRACK_COLOURS = ['var(--lv2)', 'var(--lv5)', 'var(--lv1)', 'var(--lv4)', 'var(--lv6)', 'var(--lv3)'];

  function block(b) {
    switch (b.type) {
      case 'p': return '<p>' + md(b.text) + '</p>';
      case 'terms':
        return '<section aria-label="Key terms"><h3>Key terms</h3><dl class="terms">' +
          (b.items || []).map(t => '<div><dt>' + esc(t.term) + '</dt><dd>' + md(t.def) + '</dd></div>').join('') + '</dl></section>';
      case 'list':
        return (b.title ? '<h3>' + esc(b.title) + '</h3>' : '') + '<ul>' + (b.items || []).map(i => '<li>' + md(i) + '</li>').join('') + '</ul>';
      case 'steps':
        return (b.title ? '<h3>' + esc(b.title) + '</h3>' : '') + '<ol>' + (b.items || []).map(i => '<li>' + md(i) + '</li>').join('') + '</ol>';
      case 'callout': {
        const tone = b.tone || 'tip';
        const tag = tone === 'tool' ? '<span class="badge badge--fiction">Tool-specific - check the current version</span>'
          : tone === 'warn' ? '<span class="badge badge--warn">Watch out</span>' : '<span class="badge badge--accent">Tip</span>';
        return '<aside class="callout callout--' + esc(tone) + '"><div class="callout__title">' + tag + ' ' + esc(b.title || '') + '</div><div>' + md(b.text) + '</div></aside>';
      }
      case 'flow': return flow(b.steps || [], b.highlight || [], b.title);
      case 'prompt': return promptBreakdown(b);
      case 'timeline': return timeline(b);
      case 'compare':
        return '<figure class="diagram" style="margin:0">' + (b.title ? '<figcaption class="diagram__title">' + esc(b.title) + '</figcaption>' : '') +
          '<div class="compare"><div class="compare__l"><h4>' + esc((b.left && b.left.label) || 'Before') + '</h4><div class="pre">' + md(b.left && b.left.text) + '</div></div>' +
          '<div class="compare__r"><h4>' + esc((b.right && b.right.label) || 'After') + '</h4><div class="pre">' + md(b.right && b.right.text) + '</div></div></div></figure>';
      case 'example':
        return '<div class="example">' + (b.fictional !== false ? '<span class="badge badge--fiction">Fictional teaching example</span>' : '') +
          '<h3 style="margin-top:8px">' + esc(b.title || 'Example') + '</h3><div class="pre">' + md(b.text) + '</div></div>';
      default: return b.text ? '<p>' + md(b.text) + '</p>' : '';
    }
  }

  function flow(steps, highlight, title) {
    return '<figure class="diagram" style="margin:0">' + (title ? '<figcaption class="diagram__title">' + esc(title) + '</figcaption>' : '') +
      '<ol class="flow">' + steps.map((s, i) => '<li><span class="' + (highlight.includes(i) ? 'hl' : '') + '">' + esc(s) + '</span></li>').join('') + '</ol></figure>';
  }

  function promptBreakdown(b) {
    const parts = b.parts || [];
    return '<figure class="diagram" style="margin:0"><figcaption class="diagram__title">' + esc(b.title || 'Prompt breakdown') + '</figcaption>' +
      '<p class="prompt-line">' + parts.map(p => '<mark style="--pc:' + partVar(p.label) + '">' + esc(p.text) + '</mark>').join(', ') + '</p>' +
      '<ul class="prompt-legend">' + parts.map(p => '<li style="--pc:' + partVar(p.label) + '"><strong>' + esc(p.label) + '</strong> - ' + esc(p.text) + '</li>').join('') + '</ul></figure>';
  }

  function timeline(b) {
    const d = Number(b.duration) || Math.max(1, ...(b.tracks || []).flatMap(t => (t.clips || []).map(c => c.end)));
    const ticks = 5;
    const ruler = Array.from({ length: ticks + 1 }, (_, i) => '<span>' + Math.round(d * i / ticks) + 's</span>').join('');
    const tracks = (b.tracks || []).map((t, ti) => {
      const col = TRACK_COLOURS[ti % TRACK_COLOURS.length];
      return '<div class="tl__track"><div class="tl__name">' + esc(t.name) + '</div><div class="tl__lane">' +
        (t.clips || []).map(c => {
          const left = Math.max(0, c.start / d * 100), width = Math.max(1.5, (c.end - c.start) / d * 100);
          return '<div class="tl__clip" style="--tc:' + col + ';left:' + left + '%;width:' + width + '%" title="' + esc(c.label + ' (' + c.start + '-' + c.end + 's)') + '">' + esc(c.label) + '</div>';
        }).join('') + '</div></div>';
    }).join('');
    const text = (b.tracks || []).map(t => '<li>' + esc(t.name) + ': ' + (t.clips || []).map(c => esc(c.label) + ' ' + c.start + '-' + c.end + 's').join('; ') + '</li>').join('');
    return '<figure class="diagram" style="margin:0"><figcaption class="diagram__title">' + esc(b.title || 'Timeline') + '</figcaption>' +
      '<div class="tl" aria-hidden="true"><div class="tl__inner"><div class="tl__ruler">' + ruler + '</div>' + tracks + '</div></div>' +
      '<ul class="sr-only">' + text + '</ul></figure>';
  }

  function rubricTable(rubric) {
    return '<div class="table-wrap"><table><thead><tr><th scope="col">Criterion</th><th scope="col">Developing</th><th scope="col">Solid</th><th scope="col">Strong</th></tr></thead><tbody>' +
      (rubric || []).map(r => '<tr><th scope="row">' + esc(r.criterion) + '</th><td>' + esc(r.developing) + '</td><td>' + esc(r.solid) + '</td><td>' + esc(r.strong) + '</td></tr>').join('') +
      '</tbody></table></div>';
  }

  window.R = { esc, md, block, flow, timeline, rubricTable, partVar };
})();
