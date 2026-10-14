/**
 * Nandini Patil - Portfolio JavaScript
 * Beginner-friendly, clean, and lightweight script for:
 * 1. Mobile menu toggle
 * 2. Active navigation link on scroll
 * 3. Project summary modal
 * 4. Contact form submission message
 * 5. Current year in footer
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollSpy();
  initProjectModal();
  initContactForm();
  setCurrentYear();
});

/* --------------------------------------------------
   1. Mobile Navigation Menu Toggle
-------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close the menu when a nav link is clicked
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------
   2. Active Navigation Link on Scroll
-------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* --------------------------------------------------
   3. Project Summary Modal
-------------------------------------------------- */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const openBtn = document.getElementById('view-details-btn');
  const closeBtn = document.getElementById('modal-close');
  const okBtn = document.getElementById('modal-ok-btn');

  if (!modal || !openBtn) return;

  const openModal = () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (okBtn) okBtn.addEventListener('click', closeModal);

  // Close when clicking the dark backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close with the Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------
   4. Contact Form Submission
-------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || !statusMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      statusMsg.className = 'form-message';
      statusMsg.style.display = 'block';
      statusMsg.style.color = '#f87171';
      statusMsg.textContent = 'Please fill out all fields.';
      return;
    }

    // Button feedback
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      statusMsg.className = 'form-message success';
      statusMsg.textContent = `Thank you, ${name}! Your message has been sent. I will get back to you soon.`;
      form.reset();

      setTimeout(() => {
        statusMsg.style.display = 'none';
      }, 5000);
    }, 600);
  });
}

/* --------------------------------------------------
   5. Auto-update Footer Year
-------------------------------------------------- */
function setCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
