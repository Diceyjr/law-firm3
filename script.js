/* script.js */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // === NAV TOGGLE === //
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navDrawer = document.querySelector('.nav-drawer');
  const body = document.body;

  const toggleMenu = () => {
    mobileToggle.classList.toggle('active');
    navDrawer.classList.toggle('active');
    // Prevent body scroll when menu is open
    if (navDrawer.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  };

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close drawer when clicking a link
  const drawerLinks = document.querySelectorAll('.drawer-link');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navDrawer.classList.contains('active')) toggleMenu();
    });
  });

  // Close drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (navDrawer.classList.contains('active') && !navDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
      toggleMenu();
    }
  });

  // === NAVBAR SCROLL BEHAVIOR === //
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }

    // Scroll to top button visibility
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Run once on load in case page starts scrolled
  handleScroll();

  // === ACTIVE LINK DETECTION === //
  const currentPath = window.location.pathname;
  // Get all nav/drawer links
  const allLinks = document.querySelectorAll('.nav-link, .drawer-link');
  
  allLinks.forEach(link => {
    const linkPath = link.getAttribute('href').replace('./', '/');
    // Basic detection: checks if path ends with the link target
    if (currentPath === linkPath || (currentPath === '/' && link.getAttribute('href') === './index.html')) {
        link.classList.add(link.classList.contains('nav-link') ? 'nav-link--active' : 'drawer-link--active');
    }
  });

  // === SCROLL TO TOP === //
  const scrollTopBtn = document.querySelector('.scroll-top');
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // === CONTACT FORM VALIDATION === //
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const formData = new FormData(contactForm);
      const fields = ['name', 'email', 'subject', 'message'];

      fields.forEach(field => {
        const input = contactForm.querySelector(`[name="${field}"]`);
        const value = formData.get(field);
        const errorDisplay = input.nextElementSibling;

        // Reset
        input.style.borderColor = '';
        if (errorDisplay) errorDisplay.style.display = 'none';

        if (!value || (field === 'subject' && value === "")) {
          isValid = false;
          input.style.borderColor = 'red';
          if (errorDisplay) errorDisplay.style.display = 'block';
        } else if (field === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            isValid = false;
            input.style.borderColor = 'red';
            if (errorDisplay) {
              errorDisplay.innerText = 'Please enter a valid email address.';
              errorDisplay.style.display = 'block';
            }
          }
        }
      });

      if (isValid) {
        // Success state
        contactForm.innerHTML = `
          <div class="success-message">
            <h3>Message Sent Successfully</h3>
            <p>Thank you for contacting Ibukun Ade & Associates. One of our representatives will be in touch with you shortly.</p>
          </div>
        `;
      }
    });
  }
});
