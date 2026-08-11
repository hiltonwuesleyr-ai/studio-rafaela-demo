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

// Personaliza a seção da Rafaela com a foto enviada para a demonstração.
const aboutSection = document.getElementById('rafaela');
const portrait = aboutSection?.querySelector('.portrait');
const aboutTitle = aboutSection?.querySelector('.about-copy h2');
const aboutParagraphs = aboutSection?.querySelectorAll('.about-copy > p');

if (aboutTitle) {
  aboutTitle.innerHTML = 'Muito além da estética.<br><em>Uma experiência com essência e arte.</em>';
}

if (aboutParagraphs?.[0]) {
  aboutParagraphs[0].textContent = 'Por trás de cada experiência está Rafaela Dalmolin, que construiu no Studio uma proposta onde técnica, cuidado e sensibilidade caminham juntos para valorizar a beleza de forma natural e personalizada.';
}

if (aboutParagraphs?.[1]) {
  aboutParagraphs[1].textContent = 'Seu perfil profissional destaca certificação internacional e o pioneirismo em Head Spa na região central do Rio Grande do Sul — diferenciais que reforçam uma busca constante por atualização e por uma experiência marcante em cada atendimento.';
}

const aboutStyle = document.createElement('style');
aboutStyle.textContent = `
  #rafaela .about-grid{grid-template-columns:minmax(330px,.88fr) minmax(0,1.12fr);gap:clamp(44px,6vw,92px)}
  #rafaela .portrait{width:min(100%,430px);height:620px;justify-self:center;background:#241a17;background-size:cover;background-position:center 18%;box-shadow:0 30px 70px rgba(0,0,0,.28);position:relative;overflow:hidden;filter:saturate(.94) contrast(1.02);transition:opacity .7s ease,transform .7s ease,filter .4s ease}
  #rafaela .portrait:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(17,12,10,.02),rgba(17,12,10,.15));pointer-events:none}
  #rafaela .portrait.rafaela-real-photo:hover{filter:saturate(1) contrast(1.03);transform:translateY(-4px)}
  #rafaela .about-copy{max-width:620px}
  #rafaela .about-copy h2{max-width:610px}
  @media(max-width:900px){#rafaela .about-grid{grid-template-columns:1fr;gap:42px}#rafaela .portrait{width:min(100%,430px);height:590px;justify-self:start}}
  @media(max-width:600px){#rafaela .portrait{width:100%;height:520px;background-position:center 16%}#rafaela .about-copy h2{font-size:44px}}
`;
document.head.appendChild(aboutStyle);

async function loadRafaelaPortrait() {
  if (!portrait) return;
  try {
    const parts = await Promise.all(
      Array.from({ length: 7 }, (_, i) => `media/rafaela-about-${String(i).padStart(2, '0')}.txt`)
        .map(async (url) => {
          const response = await fetch(url, { cache: 'force-cache' });
          if (!response.ok) throw new Error('Não foi possível carregar a imagem da Rafaela.');
          return (await response.text()).trim();
        })
    );
    portrait.style.backgroundImage = `url("data:image/jpeg;base64,${parts.join('')}")`;
    portrait.classList.add('rafaela-real-photo');
  } catch (error) {
    console.warn('Foto personalizada indisponível; mantendo imagem conceitual.', error);
  }
}

loadRafaelaPortrait();
