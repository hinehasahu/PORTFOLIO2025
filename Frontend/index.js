// Mobile navbar toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Contact form (no real backend yet)
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Message sent! (In actual app, this would call your backend API)");
  form.reset();
});
