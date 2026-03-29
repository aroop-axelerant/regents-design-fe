/**
 * Design System — Main Entry Point
 * Imports and initialises interactive components.
 */
import { Tabs } from './components/tabs.js';
import { Accordion } from './components/accordion.js';
import { Modal } from './components/modal.js';
import { Dropdown } from './components/dropdown.js';

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
});
