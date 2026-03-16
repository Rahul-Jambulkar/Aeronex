/* ============================================
   Aeronex - GSAP Animations
   Scroll-triggered reveals, parallax effects,
   and interactive motion
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Register GSAP ScrollTrigger plugin --- */
  gsap.registerPlugin(ScrollTrigger);

  /* --- Hero section entrance animation --- */
  const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTimeline
    .from('#hero-badge', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.3
    })
    .from('#hero-title', {
      opacity: 0,
      y: 50,
      duration: 1,
    }, '-=0.4')
    .from('#hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
    }, '-=0.5')
    .from('#hero-buttons', {
      opacity: 0,
      y: 30,
      duration: 0.8,
    }, '-=0.4')
    .from('#hero-stats', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.3')
    .from('#hero-visual', {
      opacity: 0,
      scale: 0.85,
      duration: 1.2,
    }, '-=1');

  /* --- Scroll-triggered section reveals --- */
  const revealSections = document.querySelectorAll('.reveal-section');

  revealSections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out'
    });
  });

  /* --- Staggered card animations --- */
  const cardGroups = document.querySelectorAll('.card-stagger');

  cardGroups.forEach((group) => {
    const cards = group.children;
    gsap.from(cards, {
      scrollTrigger: {
        trigger: group,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  /* --- Parallax effect on hero glow elements --- */
  const glowElements = document.querySelectorAll('.hero-glow');

  glowElements.forEach((el, i) => {
    const speed = (i + 1) * 0.3;
    gsap.to(el, {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: speed * 150,
      opacity: 0,
      ease: 'none'
    });
  });

  /* --- Subtle parallax on section headings --- */
  document.querySelectorAll('.parallax-heading').forEach((heading) => {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: 'top 90%',
        end: 'top 40%',
        scrub: 1,
      },
      y: 30,
      ease: 'none'
    });
  });

  /* --- Technology section tech items stagger --- */
  const techItems = document.querySelectorAll('.tech-item');
  if (techItems.length > 0) {
    gsap.from(techItems, {
      scrollTrigger: {
        trigger: techItems[0].parentElement,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      x: -30,
      stagger: 0.2,
      duration: 0.7,
      ease: 'power2.out'
    });
  }

  /* --- Floating animation enhancement with GSAP --- */
  const floatingEls = document.querySelectorAll('.gsap-float');
  floatingEls.forEach((el, i) => {
    gsap.to(el, {
      y: -12,
      duration: 2 + i * 0.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  });

  /* --- Counter animation for stats --- */
  const statNumbers = document.querySelectorAll('.stat-counter');
  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(stat, {
          textContent: target,
          duration: 2,
          ease: 'power1.out',
          snap: { textContent: 1 },
          onUpdate: function () {
            stat.textContent = Math.round(parseFloat(stat.textContent));
          }
        });
      }
    });
  });

  /* --- Scroll indicator fade out --- */
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    gsap.to(scrollIndicator, {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=200',
        scrub: true,
      },
      opacity: 0,
      y: 20,
    });
  }
});
