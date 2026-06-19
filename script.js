// Intersection Observer for reveal animations
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Active Navigation Link
function updateActiveNav() {
  const sections = document.querySelectorAll('section, [id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// FAQ Toggle Function
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  // Close all other FAQs
  document.querySelectorAll('.faq-question.open').forEach(q => {
    q.classList.remove('open');
    q.setAttribute('aria-expanded', 'false');
    q.nextElementSibling.classList.remove('open');
  });

  // Open clicked if it was closed
  if (!isOpen) {
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    answer.classList.add('open');
  }
}

// Form Submit Handler with validation and Web3Forms integration
async function handleSubmit(e) {
  e.preventDefault(); // Prevent page reload

  const form = e.target;
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const btn = form.querySelector('.submit-btn');

  // Basic validation
  if (!nameInput.value.trim()) {
    nameInput.focus();
    return false;
  }

  if (emailInput.value && !emailInput.value.includes('@')) {
    emailInput.focus();
    return false;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Prepare form data for Web3Forms
  const formData = new FormData(form);

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#28ca42';
      btn.style.boxShadow = '0 4px 12px rgba(40,202,66,0.3)';
      form.reset();
    } else {
      btn.textContent = '❌ Error Sending';
      btn.style.background = '#ff5f57';
    }
  } catch (error) {
    btn.textContent = '❌ Error Sending';
    btn.style.background = '#ff5f57';
  }

  // Reset button state after a delay
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    btn.style.boxShadow = '';
    btn.disabled = false;
  }, 4000);
}

// Nav Scrolled State
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Stats Counter Animation
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const speed = 150;
          const inc = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 15);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  counterObs.observe(statsBar);
}

// Initialize Lucide Icons
lucide.createIcons();

// Service Tabs Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const serviceCards = document.querySelectorAll('.service-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-tab');

    serviceCards.forEach(card => {
      if (card.getAttribute('data-category') === category) {
        card.style.display = 'block';
        card.style.animation = 'none';
        card.offsetHeight; // trigger reflow
        card.style.animation = `slideUpFade 0.5s ease forwards calc(var(--delay) * 0.07s)`;
      } else {
        card.style.display = 'none';
        card.style.animation = 'none';
      }
    });
  });
});

// Clickable Service Cards Navigation & Selection
serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const serviceName = card.querySelector('.service-name').textContent.trim();
    const select = document.getElementById('service');
    if (select) {
      let matched = false;
      const cleanCardText = serviceName.toLowerCase().replace(/[^a-z0-9]/g, '');

      for (let i = 0; i < select.options.length; i++) {
        const option = select.options[i];
        const cleanOptText = option.textContent.toLowerCase().replace(/[^a-z0-9]/g, '');

        if (cleanOptText.includes(cleanCardText) || cleanCardText.includes(cleanOptText)) {
          select.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched) {
        select.value = "";
      }
    }

    // Smooth scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Floating Action Button (FAB) Menu Toggle Logic
const fsTrigger = document.getElementById('fsTrigger');
const floatingSocials = document.getElementById('floatingSocials');

if (fsTrigger && floatingSocials) {
  fsTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    floatingSocials.classList.toggle('active');
  });

  // Close menu when clicking outside the FAB component
  document.addEventListener('click', (e) => {
    if (!floatingSocials.contains(e.target)) {
      floatingSocials.classList.remove('active');
    }
  });
}


