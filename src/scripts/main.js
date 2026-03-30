/**
 * Design System — Main Entry Point
 * Imports and initialises interactive components.
 */
import { Tabs } from './components/tabs.js';
import { Accordion } from './components/accordion.js';
import { Modal } from './components/modal.js';
import { Dropdown } from './components/dropdown.js';
import { MegaMenu } from './components/mega-menu.js';

// Import styles
import '../styles/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Tabs
  document.querySelectorAll('.tabs').forEach((el) => new Tabs(el));

  // Initialize Accordions
  document.querySelectorAll('.accordion').forEach((el) => new Accordion(el));

  // Initialize Modals
  document.querySelectorAll('.modal').forEach((el) => new Modal(el));

  // Initialize Dropdowns
  document.querySelectorAll('.dropdown').forEach((el) => new Dropdown(el));

  // Initialize Mega Menu
  const megaMenuEl = document.querySelector('.mega-menu');
  if (megaMenuEl) new MegaMenu(megaMenuEl);

  // ── Mobile navigation ──────────────────────────
  const hamburger = document.getElementById('docs-hamburger');
  const mobileMenu = document.getElementById('docs-mobile-menu');
  const closeBtn = document.getElementById('docs-mobile-close');

  if (hamburger && mobileMenu && closeBtn) {
    const openMenu = () => {
      mobileMenu.classList.add('docs__mobile-menu--open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    const closeMenu = () => {
      mobileMenu.classList.remove('docs__mobile-menu--open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburger.focus();
    };

    hamburger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('docs__mobile-menu--open')) {
        closeMenu();
      }
    });

    // Close when a nav link is tapped (navigating away)
    mobileMenu.querySelectorAll('.docs__nav-link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }
});
