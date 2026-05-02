// ── Typewriter effect on hero tagline ──
window.addEventListener('DOMContentLoaded', function () {
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    const fullText = tagline.textContent.trim();
    tagline.textContent = '';
    tagline.classList.add('typing');
    let i = 0;
    function typeChar() {
      if (i < fullText.length) {
        tagline.textContent += fullText[i++];
        setTimeout(typeChar, 52);
      } else {
        setTimeout(() => tagline.classList.remove('typing'), 1400);
      }
    }
    setTimeout(typeChar, 600);
  }

  // ── Animated counters for hero stats ──
  function animateCounter(el, target, suffix) {
    let current = 0;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (suffix || '');
      if (current >= target) clearInterval(timer);
    }, 35);
  }

  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    el.textContent = '0' + suffix;
    setTimeout(() => animateCounter(el, target, suffix), 900);
  });

  // ── Scroll-reveal for cards ──
  const revealTargets = document.querySelectorAll(
    '.about-card, .project-card, .homework-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((el, i) => {
      el.classList.add('reveal-ready');
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
      observer.observe(el);
    });
  }
});

// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});
// Highlight active nav link on scroll
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});
// Animate modal close
function closeModalWithAnimation(projectId) {
  const modal = document.getElementById(projectId + '-modal');
  if (modal) {
    const content = modal.querySelector('.modal-content');
    if (content) {
      content.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        content.style.animation = 'slideIn 0.3s ease'; // Reset for next open
      }, 280);
    } else {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }
}

// Update openModal to reset animation
function openModal(projectId) {
  const modal = document.getElementById(projectId + '-modal');
  if (modal) {
    const content = modal.querySelector('.modal-content');
    if (content) {
      content.style.animation = 'slideIn 0.3s ease';
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

// Close modal with Escape key
window.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(function(modal) {
      if (modal.style.display === 'block') {
        const id = modal.id.replace('-modal', '');
        closeModalWithAnimation(id);
      }
    });
  }
});

// ── Gallery Lightbox ──
let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(item) {
  const grid = item.closest('.gallery-grid');
  const items = Array.from(grid.querySelectorAll('.gallery-item'));
  lightboxImages = items.map(el => ({
    src: el.querySelector('img').src,
    alt: el.querySelector('img').alt
  }));
  lightboxIndex = items.indexOf(item);
  updateLightboxImage();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = 'hidden'; // keep modal scroll locked
}

function changeLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  document.getElementById('lightbox-img').src = lightboxImages[lightboxIndex].src;
  document.getElementById('lightbox-img').alt = lightboxImages[lightboxIndex].alt;
  document.getElementById('lightbox-counter').textContent =
    (lightboxIndex + 1) + ' / ' + lightboxImages.length;
}

function galleryItemError(img) {
  const item = img.closest('.gallery-item');
  item.style.display = 'none';
  const grid = item.closest('.gallery-grid');
  const visible = grid.querySelectorAll('.gallery-item:not([style*="none"])').length;
  if (visible === 0 && !grid.querySelector('.gallery-empty')) {
    const msg = document.createElement('p');
    msg.className = 'gallery-empty';
    msg.textContent = 'No photos added yet. Drop images into the matching images/project folder.';
    grid.appendChild(msg);
  }
}

window.addEventListener('keydown', function(e) {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') changeLightbox(-1);
  if (e.key === 'ArrowRight') changeLightbox(1);
  if (e.key === 'Escape') { closeLightbox(); e.stopImmediatePropagation(); }
});

// Patch all close triggers to use animation
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.modal-close').forEach(function(btn) {
    btn.addEventListener('click', function() {
      let modal = btn.closest('.modal');
      if (modal) {
        const id = modal.id.replace('-modal', '');
        closeModalWithAnimation(id);
      }
    });
  });

  // Also patch click outside
  document.querySelectorAll('.modal').forEach(function(modal) {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        const id = modal.id.replace('-modal', '');
        closeModalWithAnimation(id);
      }
    });
  });
});
