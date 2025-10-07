// Dynamic Content Loader
(function() {
  let contentData = null;
  let currentLang = localStorage.getItem("lang") || "en";

  // Load content from JSON file
  async function loadContent() {
    try {
      const response = await fetch('content.json');
      contentData = await response.json();
      renderContent();
    } catch (error) {
      console.error('Error loading content:', error);
    }
  }

  // Render meetings dynamically
  function renderMeetings() {
    if (!contentData || !contentData.meetings) return;
    
    const container = document.querySelector('.meeting-info');
    if (!container) return;
    
    container.innerHTML = contentData.meetings.map(meeting => `
      <div class="meeting-item">
        <h3>${currentLang === 'bn' ? meeting.title_bn : meeting.title}</h3>
        <p><strong>${currentLang === 'bn' ? 'সময়:' : 'Time:'}</strong> ${currentLang === 'bn' ? meeting.time_bn : meeting.time}</p>
        <p>${currentLang === 'bn' ? meeting.description_bn : meeting.description}</p>
      </div>
    `).join('');
  }

  // Render events dynamically
  function renderEvents() {
    if (!contentData || !contentData.events) return;
    
    const container = document.querySelector('.events-grid');
    if (!container) return;
    
    container.innerHTML = contentData.events.map(event => `
      <div class="event-card">
        <div class="event-date">${currentLang === 'bn' ? event.date_bn : event.date}</div>
        <div class="event-details">
          <h3>${currentLang === 'bn' ? event.title_bn : event.title}</h3>
          <p>${currentLang === 'bn' ? event.description_bn : event.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Render gallery dynamically
  function renderGallery() {
    if (!contentData || !contentData.gallery) return;
    
    const container = document.querySelector('.gallery');
    if (!container) return;
    
    container.innerHTML = contentData.gallery.map(item => `
      <div class="gallery-item" style="background-image: url('${item.image}'); background-size: cover; background-position: center;">
        <span style="background: rgba(0,0,0,0.6); padding: 0.5rem 1rem; border-radius: 8px;">
          ${currentLang === 'bn' ? item.title_bn : item.title}
        </span>
      </div>
    `).join('');
  }

  // Update hero background
  function updateHero() {
    if (!contentData || !contentData.hero) return;
    
    const hero = document.querySelector('.hero');
    if (hero && contentData.hero.backgroundImage) {
      hero.style.backgroundImage = `linear-gradient(135deg, rgba(102,126,234,0.85) 0%, rgba(118,75,162,0.85) 100%), url('${contentData.hero.backgroundImage}')`;
    }
  }

  // Render all dynamic content
  function renderContent() {
    renderMeetings();
    renderEvents();
    renderGallery();
    updateHero();
    
    // Apply scroll animations to new elements
    applyScrollAnimations();
  }

  // Re-apply scroll animations for dynamically added elements
  function applyScrollAnimations() {
    const elements = document.querySelectorAll('.meeting-item, .event-card, .gallery-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Listen for language changes
  document.addEventListener('languageChanged', (e) => {
    currentLang = e.detail.lang;
    renderContent();
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContent);
  } else {
    loadContent();
  }

  // Expose reload function globally
  window.reloadContent = loadContent;
})();

// Update the existing language switcher to trigger content update
(function() {
  const originalSetup = window.addEventListener;
  document.addEventListener('DOMContentLoaded', function() {
    const langSelect = document.getElementById('lang');
    if (langSelect) {
      langSelect.addEventListener('change', function() {
        const event = new CustomEvent('languageChanged', { 
          detail: { lang: this.value } 
        });
        document.dispatchEvent(event);
      });
    }
  });
})();