/**
 * CoreLink Networks - Main JavaScript
 * Enterprise-grade functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Navigation Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Toggle body scroll when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Set active navigation link based on current page
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      // Remove .html for comparison
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html') ||
          (currentPage === 'index.html' && linkHref === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  // Call the function
  setActiveNavLink();
  
  // Smooth scroll for anchor links (if any)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed navbar
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Formspree form submission with better UX
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const formStatus = document.getElementById('form-status');
          const submitBtn = this.querySelector('button[type="submit"]');
          const originalText = submitBtn.textContent;
          
          // Basic validation
          const requiredFields = this.querySelectorAll('[required]');
          let isValid = true;
          
          requiredFields.forEach(field => {
              if (!field.value.trim()) {
                  isValid = false;
                  field.style.borderColor = 'var(--color-error)';
              } else {
                  field.style.borderColor = '';
              }
          });
          
          if (!isValid) {
              formStatus.textContent = 'Please fill in all required fields.';
              formStatus.style.backgroundColor = 'var(--color-error)';
              formStatus.style.color = 'white';
              formStatus.style.display = 'block';
              return;
          }
          
          // Show loading state
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;
          formStatus.style.display = 'none';
          
          try {
              // Send to Formspree
              const formData = new FormData(this);
              const response = await fetch(this.action, {
                  method: 'POST',
                  body: formData,
                  headers: {
                      'Accept': 'application/json'
                  }
              });
              
              if (response.ok) {
                  // Success
                  formStatus.textContent = 'Thank you for your message. We will respond within 24 hours.';
                  formStatus.style.backgroundColor = 'var(--color-success)';
                  formStatus.style.color = 'white';
                  formStatus.style.display = 'block';
                  this.reset();
              } else {
                  throw new Error('Form submission failed');
              }
          } catch (error) {
              // Error
              formStatus.textContent = 'There was an error sending your message. Please try again or email us directly.';
              formStatus.style.backgroundColor = 'var(--color-error)';
              formStatus.style.color = 'white';
              formStatus.style.display = 'block';
          } finally {
              // Reset button
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
          }
      });
  }
  
  // Real-time form validation
  const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select');
  formInputs.forEach(input => {
    input.addEventListener('input', function() {
      if (this.value.trim()) {
        this.style.borderColor = '';
      }
    });
  });
  
  // Initialize any other components here as needed
  console.log('CoreLink Networks website initialized.');
});
// Professional Scroll Effects
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effects
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, section').forEach(el => {
    observer.observe(el);
});