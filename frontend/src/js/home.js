// Home page functionality
export class HomePage {
  constructor() {
    this.isLoaded = false;
  }

  async loadContent() {
    try {
      // Load home page HTML content
      const response = await fetch('../src/components/home.html');
      if (!response.ok) {
        throw new Error(`Failed to load home content: ${response.status}`);
      }
      
      const homeHtml = await response.text();
      return homeHtml;
    } catch (error) {
      console.error('Error loading home content:', error);
      return this.getFallbackContent();
    }
  }

  getFallbackContent() {
    return `
      <div class="home-hero">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              <span class="brand-accent">AZ</span> Solutions
            </h1>
            <p class="hero-tagline">
              Transforming Ideas into Architectural Excellence
            </p>
            <p class="hero-subtitle">
              Where Innovation Meets Design • Creating Tomorrow's Spaces Today
            </p>
            <div class="hero-highlights">
              <div class="highlight-item">
                <i class="fas fa-lightbulb"></i>
                <span>Innovative Solutions</span>
              </div>
              <div class="highlight-item">
                <i class="fas fa-drafting-compass"></i>
                <span>Precision Engineering</span>
              </div>
              <div class="highlight-item">
                <i class="fas fa-handshake"></i>
                <span>Trusted Partnership</span>
              </div>
            </div>
          </div>
          <div class="hero-visual">
            <div class="floating-elements">
              <div class="floating-card card-1">
                <i class="fas fa-building"></i>
                <span>Architecture</span>
              </div>
              <div class="floating-card card-2">
                <i class="fas fa-cogs"></i>
                <span>Engineering</span>
              </div>
              <div class="floating-card card-3">
                <i class="fas fa-paint-brush"></i>
                <span>Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="home-features">
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-award"></i>
            </div>
            <h3>Excellence in Every Project</h3>
            <p>We deliver exceptional architectural solutions that exceed expectations and stand the test of time.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-users"></i>
            </div>
            <h3>Collaborative Approach</h3>
            <p>Working closely with clients to transform visions into reality through expert guidance and innovation.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-rocket"></i>
            </div>
            <h3>Future-Ready Solutions</h3>
            <p>Cutting-edge technology and sustainable practices for buildings that shape tomorrow's landscape.</p>
          </div>
        </div>
      </div>

      <div class="home-cta">
        <div class="cta-content">
          <h2>Ready to Start Your Project?</h2>
          <p>Let's bring your architectural vision to life with our expertise and passion for excellence.</p>
          <div class="cta-buttons">
            <button class="cta-button primary" onclick="window.location.hash='#portfolio/education'">
              <span>View Portfolio</span>
              <i class="fas fa-arrow-right"></i>
            </button>
            <button class="cta-button secondary" onclick="window.location.hash='#contact/contact-info'">
              <span>Get In Touch</span>
              <i class="fas fa-envelope"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  initializeInteractions() {
    // Add scroll animations
    this.observeElements();
    
    // Add floating card interactions
    this.initializeFloatingCards();
    
    // Initialize smooth scrolling for CTA buttons
    this.initializeCTAButtons();
  }

  observeElements() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all feature cards and floating cards
    const elementsToObserve = document.querySelectorAll('.feature-card, .floating-card, .hero-highlights');
    elementsToObserve.forEach(element => {
      observer.observe(element);
    });
  }

  initializeFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        // Pause animation on hover
        card.style.animationPlayState = 'paused';
      });
      
      card.addEventListener('mouseleave', () => {
        // Resume animation
        card.style.animationPlayState = 'running';
      });
      
      // Add click interaction
      card.addEventListener('click', () => {
        this.handleCardClick(card, index);
      });
    });
  }

  handleCardClick(card, index) {
    // Add a ripple effect
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
      card.style.transform = '';
    }, 150);
    
    // Different actions for different cards
    switch(index) {
      case 0: // Architecture
        window.location.hash = '#portfolio/education';
        break;
      case 1: // Engineering
        window.location.hash = '#projects/residential';
        break;
      case 2: // Design
        window.location.hash = '#about/vision';
        break;
    }
  }

  initializeCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // Add click animation
        button.style.transform = 'scale(0.98)';
        setTimeout(() => {
          button.style.transform = '';
        }, 100);
      });
    });
  }

  // Method to handle dynamic content updates
  updateContent() {
    if (window.i18n && window.i18n.updateDom) {
      window.i18n.updateDom();
    }
  }
}

// Export singleton instance
export const homePage = new HomePage();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    homePage.initializeInteractions();
  });
} else {
  homePage.initializeInteractions();
} 