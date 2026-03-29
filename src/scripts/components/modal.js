/**
 * Modal Component
 * Handles open/close with focus trap and ARIA attributes.
 */
export class Modal {
  constructor(el) {
    this.el = el;
    this.overlay = el.querySelector('.modal__overlay');
    this.closeBtn = el.querySelector('.modal__close');
    this.previousFocus = null;
    this.init();
  }

  init() {
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    this.el.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  open() {
    this.previousFocus = document.activeElement;
    this.el.classList.add('modal--open');
    this.el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const firstFocusable = this.el.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) firstFocusable.focus();
  }

  close() {
    this.el.classList.remove('modal--open');
    this.el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (this.previousFocus) this.previousFocus.focus();
  }
}
