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
