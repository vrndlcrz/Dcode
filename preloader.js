// Show preloader when page loads
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 800);
  }
});

// Show preloader when clicking links
document.addEventListener("click", function (e) {
  const link = e.target.closest("a");
  if (
    link &&
    link.href &&
    !link.href.startsWith("#") &&
    link.target !== "_blank"
  ) {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.remove("hidden");
    }
  }
});
