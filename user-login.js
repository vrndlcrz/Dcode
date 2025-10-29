const scrollArrow = document.getElementById("scrollArrow");

scrollArrow.addEventListener("click", function () {
  window.scrollBy({
    top: window.innerHeight,
    behavior: "smooth",
  });
});

// Hide arrow on large screens
function toggleArrow() {
  if (window.innerWidth >= 1024) {
    scrollArrow.style.display = "none";
  } else {
    scrollArrow.style.display = "flex";
  }
}

window.addEventListener("resize", toggleArrow);
toggleArrow();
