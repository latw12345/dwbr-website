const pages    = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-links a');
const validPages = ['home', 'us', 'seattle', 'wa'];

function showPage(id) {
  if (!validPages.includes(id)) return;
  pages.forEach(p => p.classList.remove('visible'));
  navLinks.forEach(a => a.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (target) target.classList.add('visible');
  navLinks.forEach(a => { if (a.dataset.page === id) a.classList.add('active'); });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

document.addEventListener('click', e => {
  const el = e.target.closest('[data-page]');
  if (!el) return;
  e.preventDefault();
  showPage(el.dataset.page);
});

// Source popover
const sourcePop     = document.getElementById('source-pop');
const sourcePopOrg  = document.getElementById('source-pop-org');
const sourcePopLink = document.getElementById('source-pop-link');
let activeSuper = null;

function openSourcePop(el) {
  sourcePopOrg.textContent  = el.dataset.sourceOrg;
  sourcePopLink.textContent = el.dataset.sourceUrl.replace(/^https?:\/\//, '');
  sourcePopLink.href        = el.dataset.sourceUrl;

  const POPOVER_W = 280;
  const rect = el.getBoundingClientRect();
  let left = rect.left;
  let top  = rect.bottom + 8;

  if (left + POPOVER_W > window.innerWidth - 12) left = window.innerWidth - POPOVER_W - 12;
  if (left < 12) left = 12;

  sourcePop.style.left = left + 'px';
  sourcePop.style.top  = top  + 'px';
  sourcePop.hidden = false;
  activeSuper = el;
}

function closeSourcePop() {
  sourcePop.hidden = true;
  activeSuper = null;
}

document.addEventListener('click', e => {
  const sup = e.target.closest('sup.fn');
  if (sup) {
    e.stopPropagation();
    activeSuper === sup ? closeSourcePop() : openSourcePop(sup);
    return;
  }
  if (!sourcePop.contains(e.target)) closeSourcePop();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSourcePop();
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('sup.fn')) {
    e.preventDefault();
    activeSuper === e.target ? closeSourcePop() : openSourcePop(e.target);
  }
});

window.addEventListener('message', e => {
  if (e.data?.type !== 'iframe-resize') return;
  const frame = Array.from(document.querySelectorAll('iframe'))
    .find(f => f.contentWindow === e.source);
  if (frame && e.data.height > 0) frame.style.height = e.data.height + 'px';
});
