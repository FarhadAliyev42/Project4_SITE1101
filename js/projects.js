// Project data - Update with your actual project information
const projectsData = {
  // Homeworks
  hw1: {
    title: "Homework 1",
    type: "Homework",
    icon: "fa-calculator",
    teamMembers: "Farhad Aliyev (Individual)",
    description: "Introduction to Information Systems. This homework covered the fundamental concepts of information systems, including data processing, information flow, and basic system components.",
    technologies: ["Word", "PowerPoint", "Research"],
    videoUrl: "",
    reportUrl: "reports/homework1.pdf"
  },
  hw2: {
    title: "Homework 2",
    type: "Homework",
    icon: "fa-database",
    teamMembers: "Farhad Aliyev (Individual)",
    description: "Data Management homework focusing on database design, data modeling, and management principles. Included exercises on entity-relationship diagrams and normalization.",
    technologies: ["SQL", "Database Design", "ER Diagrams"],
    videoUrl: "",
    reportUrl: "reports/homework2.pdf"
  },
  hw3: {
    title: "Homework 3",
    type: "Homework",
    icon: "fa-network-wired",
    teamMembers: "Farhad Aliyev (Individual)",
    description: "System Analysis homework involving the analysis of information systems and business processes. Covered workflow analysis and system requirements gathering.",
    technologies: ["Analysis Tools", "Process Mapping", "Documentation"],
    videoUrl: "",
    reportUrl: "reports/homework3.pdf"
  },
  hw4: {
    title: "Homework 4",
    type: "Homework",
    icon: "fa-project-diagram",
    teamMembers: "Farhad Aliyev (Individual)",
    description: "System Design homework focused on designing and modeling information systems. Included system architecture design and component modeling.",
    technologies: ["UML", "System Design", "Modeling"],
    videoUrl: "",
    reportUrl: "reports/homework4.pdf"
  },
  
  // Projects
  proj1: {
    title: "Project 1",
    type: "Project",
    icon: "fa-laptop-code",
    teamMembers: "Team Members: Farhad Aliyev, [Teammate 1], [Teammate 2]",
    description: "Web Development Project - Building a responsive website with modern technologies. This project involved creating a full-featured web application using HTML, CSS, and JavaScript.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    videoUrl: "",
    reportUrl: "reports/project1.pdf"
  },
  proj2: {
    title: "Project 2",
    type: "Project",
    icon: "fa-mobile-alt",
    teamMembers: "Team Members: Farhad Aliyev, [Teammate 1], [Teammate 2]",
    description: "Mobile Application Development - Developing a cross-platform mobile application. Created a functional mobile app with user interface and data management.",
    technologies: ["Mobile Development", "UI/UX Design", "App Development"],
    videoUrl: "",
    reportUrl: "reports/project2.pdf"
  },
  proj3: {
    title: "Project 3",
    type: "Project",
    icon: "fa-cloud",
    teamMembers: "Team Members: Farhad Aliyev, [Teammate 1], [Teammate 2]",
    description: "Cloud Computing Project - Implementing cloud-based solutions and services. Explored cloud architecture, deployment models, and service management.",
    technologies: ["Cloud Services", "Cloud Architecture", "Deployment"],
    videoUrl: "",
    reportUrl: "reports/project3.pdf"
  },
  proj4: {
    title: "Project 4",
    type: "Project",
    icon: "fa-brain",
    teamMembers: "Team Members: Farhad Aliyev, [Teammate 1], [Teammate 2]",
    description: "AI/ML Project - Machine learning model development and deployment. Built and trained machine learning models for data analysis and prediction.",
    technologies: ["Python", "Machine Learning", "Data Analysis", "AI"],
    videoUrl: "",
    reportUrl: "reports/project4.pdf"
  }
};

// DOM Elements
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const projectCards = document.querySelectorAll('.project-card');

// Modal content elements
const modalTitle = document.querySelector('.modal-title');
const modalType = document.querySelector('.modal-type');
const modalIcon = document.querySelector('.modal-icon i');
const teamMembers = document.querySelector('.team-members');
const projectDescription = document.querySelector('.project-description');
const techTagsContainer = document.querySelector('.tech-tags');
const videoFrame = document.querySelector('.video-frame');
const reportLink = document.querySelector('.report-link');

// Open modal when card is clicked
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const projectId = card.dataset.project;
    const project = projectsData[projectId];
    
    if (project) {
      // Populate modal with project data
      modalTitle.textContent = project.title;
      modalType.textContent = project.type;
      modalIcon.className = `fas ${project.icon}`;
      teamMembers.textContent = project.teamMembers;
      projectDescription.textContent = project.description;
      
      // Set technologies
      techTagsContainer.innerHTML = project.technologies
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
      
      // Set video (if available)
      if (project.videoUrl) {
        videoFrame.src = project.videoUrl;
        videoFrame.parentElement.style.display = 'block';
      } else {
        videoFrame.parentElement.style.display = 'none';
      }
      
      // Set report link
      reportLink.href = project.reportUrl;
      
      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close modal
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  
  // Clear video when closing
  setTimeout(() => {
    videoFrame.src = '';
  }, 300);
}

modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});