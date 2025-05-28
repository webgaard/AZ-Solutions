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
            <div class="hero-logo-container">
              <img src="assets/images/logo/AZ-light.png" alt="AZ Arch Logo" class="hero-logo light-logo">
              <img src="assets/images/logo/AZ-dark.png" alt="AZ Arch Logo" class="hero-logo dark-logo">
            </div>
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

      <!-- Additional Home Content Sections -->
      <div class="home-content-sections">
          <!-- Discover Section Preview -->
          <section class="home-section discover-preview">
              <div class="section-container">
                  <div class="section-header">
                      <h2>Discover Our World</h2>
                      <p>Explore our innovative projects and architectural portfolio</p>
                  </div>
                  <div class="section-content">
                      <div class="preview-cards">
                          <div class="preview-card">
                              <i class="fas fa-building-columns"></i>
                              <h3>Projects</h3>
                              <p>Cutting-edge architectural solutions</p>
                              <a href="#discover/projects" class="preview-link">Explore →</a>
                          </div>
                          <div class="preview-card">
                              <i class="fas fa-award"></i>
                              <h3>Achievements</h3>
                              <p>Recognition and awards</p>
                              <a href="#discover/achievements" class="preview-link">View →</a>
                          </div>
                          <div class="preview-card">
                              <i class="fas fa-history"></i>
                              <h3>Timeline</h3>
                              <p>Our journey through time</p>
                              <a href="#discover/timeline" class="preview-link">See →</a>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <!-- Blog Section Preview -->
          <section class="home-section blog-preview">
              <div class="section-container">
                  <div class="section-header">
                      <h2>Blog</h2>
                      <p>Latest insights and innovations in architecture and design</p>
                  </div>
                  <div class="section-content">
                      <div class="blog-highlights">
                          <div class="blog-card featured">
                              <div class="blog-meta">
                                  <span class="blog-category">Featured</span>
                                  <span class="blog-date">Dec 2024</span>
                              </div>
                              <h3>AI in Modern Architecture</h3>
                              <p>How artificial intelligence is revolutionizing architectural design...</p>
                              <a href="#blog/ai-architecture" class="blog-link">Read More →</a>
                          </div>
                          <div class="blog-card">
                              <div class="blog-meta">
                                  <span class="blog-category">Design</span>
                                  <span class="blog-date">Dec 2024</span>
                              </div>
                              <h3>Sustainable Design Trends</h3>
                              <p>Exploring eco-friendly architectural solutions...</p>
                              <a href="#blog/sustainable-design" class="blog-link">Read More →</a>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <!-- Join Us Section Preview -->
          <section class="home-section joinus-preview">
              <div class="section-container">
                  <div class="section-header">
                      <h2>Join Our Team</h2>
                      <p>Be part of our innovative architectural journey</p>
                  </div>
                  <div class="section-content">
                      <div class="join-options">
                          <div class="join-card">
                              <i class="fas fa-user-plus"></i>
                              <h3>Career Opportunities</h3>
                              <p>Explore exciting career paths with us</p>
                              <a href="#joinus/careers" class="join-link">Apply Now →</a>
                          </div>
                          <div class="join-card">
                              <i class="fas fa-handshake"></i>
                              <h3>Partnerships</h3>
                              <p>Collaborate with industry leaders</p>
                              <a href="#joinus/partnerships" class="join-link">Partner →</a>
                          </div>
                          <div class="join-card">
                              <i class="fas fa-envelope"></i>
                              <h3>Get in Touch</h3>
                              <p>Start a conversation with our team</p>
                              <a href="#joinus/contact" class="join-link">Contact →</a>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <!-- About Us Section Preview -->
          <section class="home-section aboutus-preview">
              <div class="section-container">
                  <div class="section-header">
                      <h2>About AZ Arch</h2>
                      <p>Learn about our vision, mission, and the team behind our success</p>
                  </div>
                  <div class="section-content">
                      <div class="about-grid">
                          <div class="about-card vision">
                              <i class="fas fa-eye"></i>
                              <h3>Our Vision</h3>
                              <p>Creating tomorrow's architectural landscape</p>
                              <a href="#aboutus/vision" class="about-link">Learn More →</a>
                          </div>
                          <div class="about-card mission">
                              <i class="fas fa-bullseye"></i>
                              <h3>Our Mission</h3>
                              <p>Delivering excellence in every project</p>
                              <a href="#aboutus/mission" class="about-link">Discover →</a>
                          </div>
                          <div class="about-card team">
                              <i class="fas fa-users"></i>
                              <h3>Our Team</h3>
                              <p>Meet the experts behind our innovations</p>
                              <a href="#aboutus/team" class="about-link">Meet Team →</a>
                          </div>
                          <div class="about-card history">
                              <i class="fas fa-clock"></i>
                              <h3>Our History</h3>
                              <p>Decades of architectural excellence</p>
                              <a href="#aboutus/history" class="about-link">Explore →</a>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <!-- Call to Action Section -->
          <section class="home-section cta-section">
              <div class="section-container">
                  <div class="cta-content">
                      <h2>Ready to Transform Your Vision?</h2>
                      <p>Let's collaborate to create extraordinary architectural solutions</p>
                      <div class="cta-buttons">
                          <a href="#joinus/contact" class="cta-primary">Start a Project</a>
                          <a href="#discover/projects" class="cta-secondary">View Portfolio</a>
                      </div>
                  </div>
              </div>
          </section>
      </div>

    `;
  }

  initializeInteractions() {
    // Add scroll animations
    this.observeElements();
    
    // Add floating card interactions
    this.initializeFloatingCards();
    
    // Initialize new section interactions
    this.initializePreviewCards();
    this.initializeBlogCards();
    this.initializeJoinCards();
    this.initializeAboutCards();
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

    // Observe floating cards and hero highlights
    const elementsToObserve = document.querySelectorAll('.floating-card, .hero-highlights');
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

  // Initialize preview cards interactions
  initializePreviewCards() {
    const previewCards = document.querySelectorAll('.preview-card');
    previewCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }

  // Initialize blog cards interactions
  initializeBlogCards() {
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-3px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }

  // Initialize join cards interactions
  initializeJoinCards() {
    const joinCards = document.querySelectorAll('.join-card');
    joinCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
      });
    });
  }

  // Initialize about cards interactions
  initializeAboutCards() {
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // Initialize CTA buttons interactions
  initializeCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
    ctaButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
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