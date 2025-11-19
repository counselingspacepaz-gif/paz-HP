// main.js (Safe UTF-8, ASCII-only comments)
// Purpose: accessibility skip-link, hamburger menu toggle, escape/outer-click close

document.addEventListener('DOMContentLoaded', () => {
  // 1) Skip-link: move focus to target content
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = (skipLink.getAttribute('href') || '').replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.setAttribute('tabindex', '-1'); // make focusable
        targetElement.focus();
        targetElement.removeAttribute('tabindex');    // clean up
      }
    });
  }

  // 2) Hamburger menu toggle (ARIA & classes)
  const menuToggle = document.getElementById('menu-toggle');
  const mainMenu   = document.getElementById('main-menu');
  const siteHeader = document.querySelector('.site-header');

  if (menuToggle && mainMenu && siteHeader) {
    // ensure ARIA default state exists
    if (!menuToggle.getAttribute('aria-expanded')) {
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    const openMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'true');
      mainMenu.classList.add('is-open');
      siteHeader.classList.add('menu-active');
    };

    const closeMenu = (returnFocus = true) => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainMenu.classList.remove('is-open');
      siteHeader.classList.remove('menu-active');
      if (returnFocus) menuToggle.focus();
    };

    // toggle by button
    menuToggle.addEventListener('click', () => {
      const isExpanded = (menuToggle.getAttribute('aria-expanded') || 'false') === 'true';
      if (isExpanded) {
        // closing without forcing focus back (matches common UX)
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    // 3) close when clicking outside
    document.addEventListener('click', (e) => {
      if (
        mainMenu.classList.contains('is-open') &&
        !mainMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // 4) close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }
});
