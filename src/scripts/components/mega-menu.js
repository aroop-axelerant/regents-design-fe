/**
 * MegaMenu — Full-screen 3-column navigation overlay.
 *
 * Desktop:
 *   - Primary links (Col 1) show their sub-nav panel (Col 2) on mouseenter / click.
 *   - Sub-nav links (Col 2) show their detail panel (Col 3) on mouseenter / click.
 *
 * Mobile (≤768px):
 *   - Col 2 grid column is hidden; JS inserts an inline panel wrapper directly
 *     after the active primary link inside Col 1.
 *   - Tapping a sub-nav link switches to "detail view": hides Col 1, shows
 *     Col 3 content, and reveals the Back button.
 */

export class MegaMenu {
  /** @param {HTMLElement} root — the `.mega-menu` element */
  constructor(root) {
    this.root = root;
    this.openBtn = document.getElementById('mega-menu-open');
    this.closeBtn = root.querySelector('.mega-menu__close');
    this.backBtn = root.querySelector('.mega-menu__back');
    this.plinks = Array.from(root.querySelectorAll('.mega-menu__plink'));
    this.slinks = Array.from(root.querySelectorAll('.mega-menu__slink'));
    this._inlinePanel = null;

    this._bindEvents();
    // Activate the first primary panel by default
    if (this.plinks.length) this._switchPanel(this.plinks[0], false);
  }

  // ── Public ─────────────────────────────────────────

  open() {
    this.root.classList.add('is-open');
    this.root.setAttribute('aria-hidden', 'false');
    this.openBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    this.closeBtn?.focus();
  }

  close() {
    this.root.classList.remove('is-open');
    this.root.setAttribute('aria-hidden', 'true');
    this.openBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    this.openBtn?.focus();
    // Reset mobile state
    if (this._isMobile()) {
      this._restoreInlinePanel();
      this.root.classList.remove('mega-menu--detail-view');
    }
  }

  // ── Private ────────────────────────────────────────

  _isMobile() {
    return window.innerWidth <= 768;
  }

  _bindEvents() {
    // Open button (hamburger)
    this.openBtn?.addEventListener('click', () => this.open());

    // Close button (× inside bar)
    this.closeBtn?.addEventListener('click', () => this.close());

    // Back button (mobile detail view)
    this.backBtn?.addEventListener('click', () => {
      this.root.classList.remove('mega-menu--detail-view');
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.root.classList.contains('is-open')) {
        this.close();
      }
    });

    // Primary links (Col 1)
    this.plinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        if (!this._isMobile()) this._switchPanel(link, false);
      });
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this._isMobile() ? this._switchPanelMobile(link) : this._switchPanel(link, true);
      });
    });

    // Sub-nav links (Col 2)
    this.slinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        if (!this._isMobile()) this._switchDetail(link, false);
      });
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this._isMobile() ? this._showDetailMobile(link) : this._switchDetail(link, true);
      });
    });
  }

  /**
   * Desktop: activate a primary panel (Col 2) by matching data-panel on the link
   * to data-panel-id on the panel elements.
   */
  _switchPanel(link, activateFirstSlink = false) {
    const targetId = link.dataset.panel;

    this.plinks.forEach((l) => l.classList.toggle('is-active', l === link));

    const panels = Array.from(this.root.querySelectorAll('.mega-menu__panel'));
    panels.forEach((p) => {
      p.classList.toggle('is-active', p.dataset.panelId === targetId);
    });

    // Also activate first sub-link + detail for the new panel
    if (activateFirstSlink) {
      const activePanel = panels.find((p) => p.dataset.panelId === targetId);
      const firstSlink = activePanel?.querySelector('.mega-menu__slink');
      if (firstSlink) this._switchDetail(firstSlink, false);
    }
  }

  /**
   * Mobile: toggle an inline panel wrapper directly after the clicked plink.
   */
  _switchPanelMobile(link) {
    const targetId = link.dataset.panel;
    const isAlreadyActive = link.classList.contains('is-active');

    // Remove existing inline panel
    this._restoreInlinePanel();

    if (isAlreadyActive) {
      // Toggle off — just deactivate
      this.plinks.forEach((l) => l.classList.remove('is-active'));
      return;
    }

    // Activate new link
    this.plinks.forEach((l) => l.classList.toggle('is-active', l === link));

    // Find the matching panel
    const panel = this.root.querySelector(`.mega-menu__panel[data-panel-id="${targetId}"]`);
    if (!panel) return;

    // Clone panel and wrap it
    const clone = panel.cloneNode(true);
    clone.classList.add('is-active');

    const wrapper = document.createElement('div');
    wrapper.className = 'mega-menu__inline-panel';
    wrapper.appendChild(clone);

    link.insertAdjacentElement('afterend', wrapper);
    this._inlinePanel = wrapper;

    // Bind slink clicks inside the inline panel
    wrapper.querySelectorAll('.mega-menu__slink').forEach((sl) => {
      sl.addEventListener('click', (e) => {
        e.preventDefault();
        this._showDetailMobile(sl);
      });
    });
  }

  _restoreInlinePanel() {
    if (this._inlinePanel) {
      this._inlinePanel.remove();
      this._inlinePanel = null;
    }
  }

  /**
   * Desktop: activate a detail panel (Col 3) matching data-detail on slink.
   */
  _switchDetail(link, activateLink = false) {
    const targetId = link.dataset.detail;

    if (activateLink) {
      this.slinks.forEach((l) => l.classList.toggle('is-active', l === link));
    }

    const details = Array.from(this.root.querySelectorAll('.mega-menu__detail'));
    details.forEach((d) => {
      d.classList.toggle('is-active', d.dataset.detailId === targetId);
    });
  }

  /**
   * Mobile: switch to detail-view, showing Col 3 content for the tapped slink.
   */
  _showDetailMobile(link) {
    const targetId = link.dataset.detail;

    const details = Array.from(this.root.querySelectorAll('.mega-menu__detail'));
    details.forEach((d) => {
      d.classList.toggle('is-active', d.dataset.detailId === targetId);
    });

    this.root.classList.add('mega-menu--detail-view');
  }
}
