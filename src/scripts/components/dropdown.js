/**
 * Dropdown Component
 * Handles toggle open/close with click-outside detection.
 */
export class Dropdown {
  constructor(el) {
    this.el = el;
    this.trigger = el.querySelector('.dropdown__trigger');
    this.menu = el.querySelector('.dropdown__menu');
    this.isOpen = false;
    this.init();
  }

  init() {
    if (this.trigger) {
      this.trigger.addEventListener('click', () => this.toggle());
    }

    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.el.contains(e.target)) {
        this.close();
      }
    });

    this.el.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.el.classList.add('dropdown--open');
    this.trigger.setAttribute('aria-expanded', 'true');
    if (this.menu) this.menu.hidden = false;
  }

  close() {
    this.isOpen = false;
    this.el.classList.remove('dropdown--open');
    this.trigger.setAttribute('aria-expanded', 'false');
    if (this.menu) this.menu.hidden = true;
  }
}
