/**
 * Tabs Component
 * Handles tab switching with keyboard navigation and ARIA attributes.
 */
export class Tabs {
  constructor(el) {
    this.el = el;
    this.triggers = [...el.querySelectorAll('.tabs__trigger')];
    this.panels = [...el.querySelectorAll('.tabs__panel')];
    this.init();
  }

  init() {
    this.triggers.forEach((trigger, index) => {
      trigger.addEventListener('click', () => this.activate(index));
      trigger.addEventListener('keydown', (e) => this.handleKeydown(e, index));
    });

    // Activate first tab by default
    if (this.triggers.length > 0) {
      this.activate(0);
    }
  }

  activate(index) {
    this.triggers.forEach((t, i) => {
      t.setAttribute('aria-selected', i === index ? 'true' : 'false');
      t.setAttribute('tabindex', i === index ? '0' : '-1');
      t.classList.toggle('tabs__trigger--active', i === index);
    });

    this.panels.forEach((p, i) => {
      p.hidden = i !== index;
    });
  }

  handleKeydown(e, currentIndex) {
    let newIndex;

    switch (e.key) {
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % this.triggers.length;
        break;
      case 'ArrowLeft':
        newIndex = (currentIndex - 1 + this.triggers.length) % this.triggers.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = this.triggers.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    this.triggers[newIndex].focus();
    this.activate(newIndex);
  }
}
