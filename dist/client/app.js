const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const menuLabel = menuButton?.dataset.labelMenu;
const closeLabel = menuButton?.dataset.labelClose;

function setMenu(open) {
  mobileNav.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? closeLabel : menuLabel);
}

if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => setMenu(mobileNav.hidden));
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileNav.hidden) { setMenu(false); menuButton.focus(); }
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
}

// Static wa.me links work alone; this only fills in the prefilled message.
document.querySelectorAll('[data-message]').forEach(node => {
  if (!node.href.includes('wa.me')) return;
  node.href = 'https://wa.me/96170576915?text=' + encodeURIComponent(node.dataset.message);
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
