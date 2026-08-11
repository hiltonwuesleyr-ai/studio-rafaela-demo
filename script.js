const loader = document.getElementById('siteLoader');
const nav = document.getElementById('siteNav');

window.addEventListener('load', () => {
  window.setTimeout(() => loader?.classList.add('is-hidden'), 650);
});

const syncNav = () => {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 72);
};

syncNav();
window.addEventListener('scroll', syncNav, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(el);
});

// Retrato oficial da seção Rafaela.
const portrait = document.querySelector('#rafaela .portrait');

if (portrait) {
  portrait.style.backgroundImage = 'none';
  portrait.style.overflow = 'hidden';
  portrait.style.filter = 'none';

  const img = document.createElement('img');
  img.src = 'media/rafaela-restaurada-1200.webp';
  img.alt = 'Rafaela Dalmolin';
  img.width = 1200;
  img.height = 1649;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.display = 'block';
  img.style.objectFit = 'cover';
  img.style.objectPosition = 'center';
  img.style.filter = 'none';

  portrait.replaceChildren(img);
}
