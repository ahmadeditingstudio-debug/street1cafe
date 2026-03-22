// ── ELEMENTS ──────────────────────────────────
const navbar         = document.getElementById('navbar');
const hamburger      = document.getElementById('hamburger');
const mobileMenu     = document.getElementById('mobileMenu');
const dropdownParent = document.querySelector('.has-dropdown');
const mobileSubToggle = document.querySelector('.has-mobile-sub > a');

// ── STICKY SCROLL ─────────────────────────────
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── HAMBURGER TOGGLE ──────────────────────────
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// ── CLOSE MOBILE ON LINK CLICK ────────────────
document.querySelectorAll('.mobile-links a:not(.has-sub-toggle), .mobile-cta a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── DESKTOP DROPDOWN ──────────────────────────
if (dropdownParent) {
  dropdownParent.addEventListener('mouseenter', () => dropdownParent.classList.add('open'));
  dropdownParent.addEventListener('mouseleave', () => dropdownParent.classList.remove('open'));
}

// ── MOBILE ACCORDION ──────────────────────────
if (mobileSubToggle) {
  mobileSubToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const parent = mobileSubToggle.closest('.has-mobile-sub');
    const sub    = parent.querySelector('.mobile-sub');
    const isOpen = parent.classList.toggle('sub-open');
    sub.classList.toggle('open', isOpen);
  });
}

// ── ACTIVE LINK ───────────────────────────────
document.querySelectorAll('.nav-links > li > a').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.nav-links > li > a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// ── CLOSE DROPDOWN ON OUTSIDE CLICK ──────────
document.addEventListener('click', (e) => {
  if (dropdownParent && !dropdownParent.contains(e.target)) {
    dropdownParent.classList.remove('open');
  }
});

// ── SCROLL REVEAL (menu header + cards) ───────
if ('IntersectionObserver' in window) {

  // Header elements — staggered, re-trigger every time
  const revealEls = document.querySelectorAll('.reveal');
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const idx = [...revealEls].indexOf(el);
        setTimeout(() => el.classList.add('revealed'), idx * 120);
      } else {
        entry.target.classList.remove('revealed');
      }
    });
  }, { threshold: 0.2 });

  revealEls.forEach(el => headerObserver.observe(el));

  // Cards — staggered, re-trigger every time
  const cards = document.querySelectorAll('.menu-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(36px)';
    card.style.transition = `opacity 0.7s ease ${i * 100}ms, transform 0.7s ease ${i * 100}ms, border-color 0.4s ease, box-shadow 0.4s ease`;
  });

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      } else {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(36px)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => cardObserver.observe(card));
}

// ── ABOUT SECTION REVEAL ─────────────────────
const aboutLeft  = document.querySelector('.about-left');
const aboutRight = document.querySelector('.about-right');
const aboutStats = document.querySelector('.about-stats');

function countUp(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    // Format 10000 as 10,000
    const display = target >= 1000
      ? Math.floor(current).toLocaleString()
      : Math.floor(current);
    el.textContent = display + suffix;
  }, step);
}

let statsCounted = false;

if ('IntersectionObserver' in window) {

  // Left + right columns
  const colObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      } else {
        entry.target.classList.remove('revealed');
      }
    });
  }, { threshold: 0.2 });

  if (aboutLeft)  colObserver.observe(aboutLeft);
  if (aboutRight) colObserver.observe(aboutRight);

  // Stats row — count up on enter, reset on leave
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutStats.classList.add('revealed');
        // Run countup every time section enters
        document.querySelectorAll('.stat-number').forEach(el => {
          el.textContent = '0';
          countUp(el);
        });
      } else {
        aboutStats.classList.remove('revealed');
      }
    });
  }, { threshold: 0.3 });

  if (aboutStats) statsObserver.observe(aboutStats);
}

// ── GALLERY SCROLL REVEAL ────────────────────
const galleryItems = document.querySelectorAll('.gallery-item');

if ('IntersectionObserver' in window && galleryItems.length) {
  galleryItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.7s ease ${i * 100}ms, transform 0.7s ease ${i * 100}ms, box-shadow 0.4s ease`;
  });

  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      } else {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(30px)';
      }
    });
  }, { threshold: 0.08 });

  galleryItems.forEach(item => galleryObserver.observe(item));
}

// ── TESTIMONIALS SCROLL REVEAL ───────────────
const tItems = document.querySelectorAll('.t-item');

if ('IntersectionObserver' in window && tItems.length) {
  tItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(32px)';
    item.style.transition = `opacity 0.7s ease ${i * 130}ms, transform 0.7s ease ${i * 130}ms, border-color 0.4s ease, box-shadow 0.4s ease`;
  });

  const tObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      } else {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(32px)';
      }
    });
  }, { threshold: 0.1 });

  tItems.forEach(item => tObserver.observe(item));
}

// ── CONTACT + FOOTER REVEAL ───────────────────
const contactLeft  = document.querySelector('.contact-reveal-left');
const contactRight = document.querySelector('.contact-reveal-right');
const footer       = document.querySelector('.footer-reveal');

if ('IntersectionObserver' in window) {
  const sideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      } else {
        entry.target.classList.remove('revealed');
      }
    });
  }, { threshold: 0.2 });

  if (contactLeft)  sideObserver.observe(contactLeft);
  if (contactRight) sideObserver.observe(contactRight);

  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('revealed', entry.isIntersecting);
    });
  }, { threshold: 0.15 });

  if (footer) footerObserver.observe(footer);
}

// ── CONTACT FORM (Formspree) ──────────────────
const contactForm  = document.getElementById('contactForm');
const submitBtn    = document.getElementById('submitBtn');
const formSuccess  = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // Success — hide form, show thank you
        contactForm.style.display = 'none';
        formSuccess.classList.add('visible');
      } else {
        // Error from Formspree
        submitBtn.textContent = 'Something went wrong. Try again.';
        submitBtn.disabled = false;
      }
    } catch (err) {
      submitBtn.textContent = 'Network error. Try again.';
      submitBtn.disabled = false;
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});