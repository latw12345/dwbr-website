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
  grid.innerHTML = data.map(jd => {
    const partyClass = jd.party === 'Republican' ? 'party-r' : 'party-d';
    const voteRow = jd.vote
      ? `<div><div class="label-mono">Vote</div><div class="body-sm">${esc(jd.vote)}</div></div>`
      : '';
    return `
    <details class="jd-card">
      <summary class="jd-summary">
        <span class="jd-name">${esc(jd.name)}<span class="jd-year">${esc(jd.year)}</span></span>
        <span class="jd-toggle">+</span>
      </summary>
      <div class="jd-body">
        <div class="jd-detail">
          <div>
            <div class="label-mono">${esc(jd.role)}</div>
            <div class="body-sm jd-executive">
              ${esc(jd.executive)}<span class="party-badge ${partyClass}">${esc(jd.party)}</span>
            </div>
          </div>
          <div>
            <div class="label-mono">Signed</div>
            <div class="body-sm">${esc(jd.signed)}</div>
          </div>
          <div>
            <div class="label-mono">Bill</div>
            <div class="body-sm">${esc(jd.bill)}</div>
          </div>
          ${voteRow}
        </div>
        <div class="jd-note">${esc(jd.note)}</div>
      </div>
    </details>
  `;
  }).join('');
}

fetch('data/jurisdictions.json')
  .then(r => r.json())
  .then(renderJurisdictions)
  .catch(() => {
    const grid = document.getElementById('jurisdiction-grid');
    if (grid) grid.textContent = 'Could not load jurisdiction data.';
  });
