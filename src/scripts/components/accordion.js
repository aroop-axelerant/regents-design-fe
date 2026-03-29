/**
 * Accordion Component
 * Handles expand/collapse with animation and ARIA attributes.
 */
export class Accordion {
  constructor(el) {
    this.el = el;
    this.items = [...el.querySelectorAll('.accordion__item')];
    this.init();
  }

  init() {
    this.items.forEach((item) => {
      const trigger = item.querySelector('.accordion__trigger');
      if (trigger) {
        trigger.addEventListener('click', () => this.toggle(item));
      }
    });
  }

  toggle(item) {
    const isOpen = item.classList.contains('accordion__item--open');

    // Close all if not already handling it
    if (!this.el.dataset.multiOpen) {
      this.items.forEach((i) => {
        i.classList.remove('accordion__item--open');
        const content = i.querySelector('.accordion__content');
        if (content) content.style.maxHeight = null;
        const trigger = i.querySelector('.accordion__trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }

    if (!isOpen) {
      item.classList.add('accordion__item--open');
      const content = item.querySelector('.accordion__content');
      if (content) content.style.maxHeight = content.scrollHeight + 'px';
      const trigger = item.querySelector('.accordion__trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
    }
  }
}
