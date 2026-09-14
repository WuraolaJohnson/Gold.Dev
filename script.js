// ==========================================================================
// Nav scroll state + scroll progress bar
// ==========================================================================
const nav = document.getElementById('nav');
const scrollProgress = document.getElementById('scrollProgress');

function onScroll() {
  const scrollY = window.scrollY;
  nav.classList.toggle('scrolled', scrollY > 40);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ==========================================================================
// Mobile menu toggle
// ==========================================================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.mobile-link, .mobile-cta').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ==========================================================================
// Section reveal on scroll (restrained: one fade-up per major section)
// ==========================================================================
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll(
    '.about-grid, .skills-grid, .project-featured, .project-row, .timeline, .approach-list, .contact-inner'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}

// ==========================================================================
// Footer year
// ==========================================================================
document.getElementById('year').textContent = new Date().getFullYear();

// Open only external website links in a new tab.
document.querySelectorAll('a').forEach((link) => {
  const href = link.getAttribute('href');
  let isExternal = false;

  try {
    const url = new URL(href, document.baseURI);
    isExternal = (url.protocol === 'http:' || url.protocol === 'https:')
      && url.origin !== window.location.origin;
  } catch {
    isExternal = false;
  }

  if (isExternal) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    link.removeAttribute('target');
    link.removeAttribute('rel');
  }
});

const skillDetails = {
  figma: [
    'Pixel-accurate design interpretation',
    'Clear visual hierarchy and spacing',
    'Reusable component planning',
    'Design handoff and collaboration'
  ],
  'html-css': [
    'Responsive layouts across breakpoints',
    'Semantic, accessible markup',
    'Clean, maintainable styles',
    'Cross-browser compatibility'
  ],
  react: [
    'Reusable interface components',
    'Structured, manageable UI state',
    'Interactive user experiences',
    'Scalable frontend architecture'
  ]
};

const skillButtons = document.querySelectorAll('.frame-chip[data-skill]');
const frameChecklist = document.getElementById('frameChecklist');

skillButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const details = skillDetails[button.dataset.skill];
    if (!details) return;

    skillButtons.forEach((skillButton) => {
      const isSelected = skillButton === button;
      skillButton.setAttribute('aria-pressed', isSelected);
    });

    frameChecklist.innerHTML = details
      .map((detail) => `<li><span class="check">✓</span> ${detail}</li>`)
      .join('');
  });
});
