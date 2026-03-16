/* ============================================
   Aeronex - Main JavaScript
   Handles navigation, form, smooth scroll,
   and general interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Initialize Lucide icons --- */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* --- Mobile menu toggle --- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      });
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      });
    });
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Contact form handling --- */
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      signupForm.innerHTML = `
        <div class="flex items-center justify-center gap-3 py-4 text-emerald-400">
          <i data-lucide="check-circle" class="w-5 h-5"></i>
          <span class="font-heading">Transmission received. We'll be in touch.</span>
        </div>
      `;
      if (window.lucide) {
        lucide.createIcons();
      }
    });
  }

  /* --- Navbar scroll effect --- */
  const navbar = document.getElementById('main-nav');
  if (navbar) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 100) {
        navbar.classList.add('shadow-lg');
      } else {
        navbar.classList.remove('shadow-lg');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* --- Year in footer --- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
