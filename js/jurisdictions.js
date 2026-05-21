function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderJurisdictions(data) {
  const grid = document.getElementById('jurisdiction-grid');
  if (!grid) return;
  grid.innerHTML = data.map(jd => `
    <details class="jd-card">
      <summary class="jd-summary">
        <span class="jd-name">${esc(jd.name)}<span class="jd-year">${esc(jd.year)}</span></span>
        <span class="jd-toggle">+</span>
      </summary>
      <div class="jd-body">
        <div class="jd-detail">
          <div>
            <div class="label-mono">Coverage</div>
            <div class="body-sm">${esc(jd.coverage)}</div>
          </div>
          <div>
            <div class="label-mono">Key provisions</div>
            <div class="body-sm">${esc(jd.provisions)}</div>
          </div>
        </div>
        <div class="jd-note">${esc(jd.note)}</div>
      </div>
    </details>
  `).join('');
}

fetch('data/jurisdictions.json')
  .then(r => r.json())
  .then(renderJurisdictions)
  .catch(() => {
    const grid = document.getElementById('jurisdiction-grid');
    if (grid) grid.textContent = 'Could not load jurisdiction data.';
  });
