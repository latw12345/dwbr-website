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
