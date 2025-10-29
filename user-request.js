// Clock
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
  document.getElementById("clock").textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

const burgerMenu = document.getElementById("burgerMenu");
const sidebar = document.querySelector(".sidebar");

burgerMenu.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

// Close sidebar when clicking on a link
const sidebarLinks = document.querySelectorAll(".sidebar li a");
sidebarLinks.forEach((link) => {
  link.addEventListener("click", function () {
    sidebar.classList.remove("active");
  });
});

// Close sidebar when clicking outside
document.addEventListener("click", function (event) {
  if (
    !event.target.closest(".sidebar") &&
    !event.target.closest(".burger-menu")
  ) {
    sidebar.classList.remove("active");
  }
});

function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  const dropdownBox = dropdown.previousElementSibling;
  const icon = dropdownBox.querySelector(".drop-down.icon");

  // Toggle the dropdown content
  dropdown.classList.toggle("show");

  // Toggle the icon rotation
  icon.classList.toggle("rotate");

  // Toggle active state on the dropdown box (for blue header effect)
  dropdownBox.classList.toggle("active");
}

// Optional: Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(function (dropdown) {
    const content = dropdown.nextElementSibling;
    const icon = dropdown.querySelector(".drop-down.icon");

    if (!dropdown.contains(event.target) && !content.contains(event.target)) {
      if (content.classList.contains("show")) {
        content.classList.remove("show");
        icon.classList.remove("rotate");
        dropdown.classList.remove("active");
      }
    }
  });
});
