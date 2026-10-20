/**
 * Multimedia-Service Steffen Kirchner - Modern Redesign 2026
 * Interactive features, Diagnosis Estimator, Modal controllers, Theme toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light)
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'dark'); // default dark tech aesthetic

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    if (theme === 'light') {
      themeToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`;
      themeToggle.title = 'Zu dunklem Modus wechseln';
    } else {
      themeToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
      themeToggle.title = 'Zu hellem Modus wechseln';
    }
  }

  // 2. Mobile Menu Navigation
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // 3. Interactive Quick Diagnosis / Estimator
  const diagDevice = document.getElementById('diag-device');
  const diagChips = document.querySelectorAll('.chip-btn');
  const diagSpeed = document.getElementById('diag-speed');
  const resultTime = document.getElementById('diag-result-time');
  const resultService = document.getElementById('diag-result-service');
  const diagSubmitBtn = document.getElementById('diag-submit-btn');

  let selectedIssue = 'hardware';

  diagChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      diagChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedIssue = chip.getAttribute('data-issue');
      calculateDiagnosis();
    });
  });

  if (diagDevice) diagDevice.addEventListener('change', calculateDiagnosis);
  if (diagSpeed) diagSpeed.addEventListener('change', calculateDiagnosis);

  function calculateDiagnosis() {
    let speed = diagSpeed ? diagSpeed.value : 'express';
    let timeText = 'Ø 24–48 Std. Werkstatt-Durchlauf';
    let serviceText = 'Vor-Ort Diagnose & Bauteil-Prüfung';

    if (speed === 'express') {
      timeText = '⚡ Express: Bevorzugte Bearbeitung binnen 24–48h';
    } else if (speed === 'vor-ort') {
      timeText = '🚗 Flexibler Vor-Ort Termin im Eichsfeld';
    } else {
      timeText = '📦 Standard Werkstatt-Prüfung (~2-3 Werktage)';
    }

    switch (selectedIssue) {
      case 'hardware':
        serviceText = 'Komponentenprüfung (Mainboard, Netzteil, RAM, Kühlung)';
        break;
      case 'virus':
        serviceText = 'Bereinigung, Windows-Neuinstallation & Schutzkonzept';
        break;
      case 'upgrade':
        serviceText = 'Performance-Upgrade (M.2 NVMe SSD, RAM, GPU)';
        break;
      case 'network':
        serviceText = 'WLAN-Mesh, Routerkonfiguration & Heimvernetzung';
        break;
      case 'backup':
        serviceText = 'Sicherheits-Backup, USV-Schutz oder Notfall-Rettung';
        break;
      case 'multimedia':
        serviceText = 'Video/Audio Schnittsystem & Medien-Digitalisierung';
        break;
    }

    if (resultTime) resultTime.textContent = timeText;
    if (resultService) resultService.textContent = serviceText;
  }

  // Hook up button to transfer to main contact form
  if (diagSubmitBtn) {
    diagSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const formServiceSelect = document.getElementById('form-service');
      const formMessage = document.getElementById('form-message');
      const contactSection = document.getElementById('kontakt');

      if (formServiceSelect) {
        if (selectedIssue === 'hardware' || selectedIssue === 'virus') formServiceSelect.value = 'reparatur';
        else if (selectedIssue === 'upgrade') formServiceSelect.value = 'wunsch-pc';
        else if (selectedIssue === 'network') formServiceSelect.value = 'netzwerk';
        else if (selectedIssue === 'backup') formServiceSelect.value = 'backup';
        else if (selectedIssue === 'multimedia') formServiceSelect.value = 'multimedia';
      }

      if (formMessage) {
        const deviceName = diagDevice ? diagDevice.options[diagDevice.selectedIndex].text : 'PC/Gerät';
        formMessage.value = `Guten Tag Herr Kirchner,\n\nich interessiere mich für folgenden Service:\n- Gerät: ${deviceName}\n- Anliegen: ${resultService ? resultService.textContent : selectedIssue}\n- Zeitrahmen: ${resultTime ? resultTime.textContent : 'Schnellstmöglich'}\n\nBitte um Rückruf für eine kurze Vorab-Absprache.`;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // highlight form briefly
        const formBox = document.querySelector('.contact-wrapper');
        if (formBox) {
          formBox.style.outline = '2px solid #38bdf8';
          setTimeout(() => { formBox.style.outline = 'none'; }, 2000);
        }
      }
    });
  }

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active', !isActive);
      });
    }
  });

  // 5. Generic Modal System (Impressum, Datenschutz, Demo Highlights, Quick Booking)
  window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // Close when clicking overlay backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Close button trigger
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-overlay');
      if (parentModal) {
        parentModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // 6. Interactive Contact Form Submission Demo
  const contactForm = document.getElementById('main-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value || 'Kunde';
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg> Wird gesendet...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `✓ Anfrage erfolgreich übermittelt!`;
        submitBtn.classList.add('btn-emerald');

        // Show Toast / Banner
        showToast(`Danke, ${name}! Ihre Anfrage wurde für diese Live-Demo erfolgreich simuliert. Herr Steffen Kirchner erhält Ihre Nachricht.`);

        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.classList.remove('btn-emerald');
        }, 4000);
      }, 900);
    });
  }

  // Toast Functionality
  function showToast(message) {
    let toast = document.getElementById('demo-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'demo-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 90px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: #065f46;
        color: #ecfdf5;
        border: 1px solid #10b981;
        padding: 0.9rem 1.5rem;
        border-radius: 9999px;
        font-size: 0.9rem;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 3000;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        text-align: center;
        max-width: 90vw;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 4500);
  }

  // 7. Dynamic Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
