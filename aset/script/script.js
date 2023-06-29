const humburgerInput = document.querySelector(".hamburger-input");
const navbar = document.querySelector(".navbar");
humburgerInput.addEventListener("click", () => {
  navbar.classList.toggle("toggle");
});
