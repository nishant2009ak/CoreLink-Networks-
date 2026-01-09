document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  sections.forEach(sec => {
    sec.style.opacity = "0";
    sec.style.transition = "opacity 0.6s ease";
  });

  setTimeout(() => {
    sections.forEach(sec => {
      sec.style.opacity = "1";
    });
  }, 200);
});