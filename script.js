// Scroll animation
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar-nav a");
const backToTop = document.querySelector(".back-to-top");

const reveal = () => {
  const trigger = window.innerHeight * 0.8;
  
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) {
      sec.classList.add("visible");
    }
  });
  
  // Back to top button visibility
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
  
  // Active nav link
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", reveal);
reveal();

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    
    window.scrollTo({
      top: targetSection.offsetTop - 20,
      behavior: "smooth"
    });
  });
});

// Back to top functionality
backToTop.addEventListener("click", e => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Theme switcher
const themeCheckbox = document.getElementById("theme-checkbox");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Set initial theme based on system preference
if (prefersDarkScheme.matches) {
  document.body.classList.add("dark-theme");
  themeCheckbox.checked = true;
}

themeCheckbox.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
  
  // Save theme preference to localStorage
  const isDark = document.body.classList.contains("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeCheckbox.checked = true;
} else if (savedTheme === "light") {
  document.body.classList.remove("dark-theme");
  themeCheckbox.checked = false;
}

// Form submission
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");
const formError = document.getElementById("form-error");

contactForm.addEventListener("submit", e => {
  e.preventDefault();
  
  // Simple form validation
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  
  if (!name || !email || !message) {
    formError.style.display = "block";
    formSuccess.style.display = "none";
    return;
  }
  
  // In a real implementation, you would send the form data to a server here
  // For demonstration, we'll simulate a successful submission
  
  // Simulate API call
  setTimeout(() => {
    formSuccess.style.display = "block";
    formError.style.display = "none";
    contactForm.reset();
    
  // Hide success message after 5 seconds
    setTimeout(() => {
      formSuccess.style.display = "none";
    }, 5000);
  }, 1000);
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    // Filter projects
    projectCards.forEach(card => {
      if (filterValue === 'all') {
        card.style.display = 'flex';
      } else {
        const categories = card.getAttribute('data-category').split(' ');
        if (categories.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
});

// Animate skill bars on scroll
const skillItems = document.querySelectorAll('.skill-item');

const animateSkills = () => {
  skillItems.forEach(item => {
    const top = item.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (top < windowHeight - 100) {
      item.classList.add('animated');
    }
  });
};

window.addEventListener('scroll', animateSkills);
animateSkills(); // Run once on page load

// Make project cards focusable for keyboard navigation
document.querySelectorAll('.project-card').forEach(card => {
  card.setAttribute('tabindex', '0');
});