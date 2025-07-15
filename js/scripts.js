// Fade-in animation on scroll
function revealOnScroll() {
  const elements = document.querySelectorAll('section, .card, .timeline-item');
  const windowHeight = window.innerHeight;
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// AJAX Contact Form Submission
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    // Placeholder: Replace with your backend endpoint
    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      if (response.ok) {
        alert('Message sent successfully!');
        contactForm.reset();
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (err) {
      alert('An error occurred. Please try again later.');
    }
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  });
}

// Scrollspy for active navbar link
const sections = ['home', 'about', 'projects', 'experience', 'testimonials', 'contact'];
const navLinks = {};
sections.forEach(id => {
  navLinks[id] = document.querySelector(`.navbar-nav .nav-link[href="#${id}"]`);
});
const observerOptions = { threshold: 0.5 };
const observer = new window.IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      sections.forEach(id => navLinks[id]?.classList.remove('active'));
      navLinks[entry.target.id]?.classList.add('active');
    }
  });
}, observerOptions);
sections.forEach(id => {
  const section = document.getElementById(id);
  if (section) observer.observe(section);
});

// Project filtering and show more functionality
const projectCards = Array.from(document.querySelectorAll('.project-card-item'));
const showMoreBtn = document.getElementById('show-more-projects');
const filterBtns = document.querySelectorAll('.project-filter');
let currentFilter = 'all';
let showingAll = false;

function updateProjectVisibility() {
  let visibleCount = 0;
  projectCards.forEach((card, idx) => {
    const tech = card.getAttribute('data-tech');
    const matches = currentFilter === 'all' || tech === currentFilter;
    if (matches && (showingAll || visibleCount < 6)) {
      card.classList.remove('d-none');
      visibleCount++;
    } else {
      card.classList.add('d-none');
    }
  });
  if (showingAll || projectCards.filter(card => (currentFilter === 'all' || card.getAttribute('data-tech') === currentFilter)).length <= 6) {
    showMoreBtn.style.display = 'none';
  } else {
    showMoreBtn.style.display = '';
  }
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    showingAll = false;
    updateProjectVisibility();
  });
});

if (showMoreBtn) {
  showMoreBtn.addEventListener('click', function() {
    showingAll = true;
    updateProjectVisibility();
  });
}

window.addEventListener('DOMContentLoaded', updateProjectVisibility); 