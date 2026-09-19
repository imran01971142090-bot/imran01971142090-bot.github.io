/**
 * ==========================================================================
 * MD IMRAN CHOWDHURY - PERSONAL PORTFOLIO SCRIPTS
 * Vanilla JavaScript (ES6+)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Dark / Light Mode Theme Toggle
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  // Check saved preference or fallback to system preference
  const savedTheme = localStorage.getItem('imran-portfolio-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon(true);
  } else {
    document.documentElement.removeAttribute('data-theme');
    updateThemeIcon(false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('imran-portfolio-theme', 'light');
        updateThemeIcon(false);
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('imran-portfolio-theme', 'dark');
        updateThemeIcon(true);
      }
    });
  }

  function updateThemeIcon(isDark) {
    if (!themeIcon) return;
    if (isDark) {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
      themeToggleBtn.setAttribute('title', 'Switch to light mode');
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
      themeToggleBtn.setAttribute('title', 'Switch to dark mode');
    }
  }

  // --------------------------------------------------------------------------
  // 2. Sticky Header with Scroll Detection
  // --------------------------------------------------------------------------
  const header = document.querySelector('.header');
  
  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // --------------------------------------------------------------------------
  // 3. Mobile Hamburger Navigation Menu
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    });

    // Close mobile menu when any nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          hamburgerBtn.classList.remove('active');
          navMenu.classList.remove('open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (navMenu.classList.contains('open') && 
          !navMenu.contains(event.target) && 
          !hamburgerBtn.contains(event.target)) {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Hero Typing Animation
  // --------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  
  if (typingElement) {
    const roles = [
      'Software Development',
      'DevOps & DevSecOps',
      'Cloud & Networking',
      'Cybersecurity Solutions',
      'IoT & Industrial Tech',
      'Practical Problem Solving'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      // If word complete, pause before deleting
      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 1800; // Pause at end of text
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 450; // Pause before typing next word
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // --------------------------------------------------------------------------
  // 5. Active Navigation Link on Scroll (Scrollspy)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120; // Offset for header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // --------------------------------------------------------------------------
  // 6. Scroll Reveal Animations (Intersection Observer)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // --------------------------------------------------------------------------
  // 7. Back-to-Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. Contact Form Validation (Client-Side Vanilla JS)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Fields
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      // Error containers
      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const subjectError = document.getElementById('subject-error');
      const messageError = document.getElementById('message-error');

      // Reset previous error states
      [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        if (input) input.classList.remove('error');
      });
      [nameError, emailError, subjectError, messageError].forEach(error => {
        if (error) {
          error.classList.remove('visible');
          error.textContent = '';
        }
      });

      // Name validation
      if (!nameInput.value.trim()) {
        showError(nameInput, nameError, 'Please enter your name.');
        isValid = false;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        showError(emailInput, emailError, 'Please enter your email address.');
        isValid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, emailError, 'Please enter a valid email address.');
        isValid = false;
      }

      // Subject validation
      if (!subjectInput.value.trim()) {
        showError(subjectInput, subjectError, 'Please enter a subject.');
        isValid = false;
      }

      // Message validation
      if (!messageInput.value.trim()) {
        showError(messageInput, messageError, 'Please enter your message.');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, messageError, 'Message must be at least 10 characters long.');
        isValid = false;
      }

      if (isValid) {
        // Display friendly success notification
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            <div>
              <strong>Message Demo Sent!</strong><br>
              Thank you, ${escapeHtml(nameInput.value.trim())}. Your message was validated successfully. 
              <em>(Note: This is a frontend demo form without a backend. For real inquiries, please reach out directly to the email address on the left.)</em>
            </div>
          `;
          formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset form inputs
        contactForm.reset();

        // Automatically hide success notification after 8 seconds
        setTimeout(() => {
          if (formStatus) {
            formStatus.className = 'form-status';
            formStatus.innerHTML = '';
          }
        }, 8000);
      } else {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.innerHTML = `
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>Please correct the highlighted errors before submitting.</span>
          `;
        }
      }
    });
  }

  function showError(input, errorElement, message) {
    if (input) input.classList.add('error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('visible');
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // --------------------------------------------------------------------------
  // 9. Current Year in Footer
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 10. Placeholder Button Interaction Notifications
  // --------------------------------------------------------------------------
  const placeholderLinks = document.querySelectorAll('a[data-placeholder="true"]');
  placeholderLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const actionName = link.getAttribute('data-action-name') || 'link';
      alert(`[Placeholder Link] This is a demo placeholder for ${actionName}. Replace this with your actual repository or deployment URL.`);
    });
  });
});
