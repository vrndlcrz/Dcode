// Clock functionality
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours.toString().padStart(2, "0");

  document.getElementById(
    "clock"
  ).textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

setInterval(updateClock, 1000);
updateClock();

// Burger menu functionality
const burgerMenu = document.getElementById("burgerMenu");
const sidebar = document.getElementById("sidebar");

burgerMenu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 1024) {
    if (!sidebar.contains(e.target) && !burgerMenu.contains(e.target)) {
      sidebar.classList.remove("active");
    }
  }
});

// Icon button functionality
document.getElementById("linkBtn").addEventListener("click", () => {
  const url = prompt("Enter URL:");
  if (url) {
    const textarea = document.getElementById("messageInput");
    textarea.value += (textarea.value ? "\n" : "") + url;
  }
});

document.getElementById("imageBtn").addEventListener("click", () => {
  document.getElementById("imageInput").click();
});

document.getElementById("videoBtn").addEventListener("click", () => {
  document.getElementById("videoInput").click();
});

// Form submission
document.getElementById("announcementForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("titleInput").value;
  const message = document.getElementById("messageInput").value;
  const sendTo = document.getElementById("sendToSelect").value;
  const dateTime = document.getElementById("dateTimeInput").value;
  const image = document.getElementById("imageInput").files[0];
  const video = document.getElementById("videoInput").files[0];

  if (title && message && sendTo && dateTime) {
    let alertMessage = "Announcement sent successfully!";

    if (image) alertMessage += "\nImage attached: " + image.name;
    if (video) alertMessage += "\nVideo attached: " + video.name;

    alert(alertMessage);
    // Reset form
    e.target.reset();
  }
});

// Preview files when selected
document.getElementById("imageInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    alert(
      "UPLOAD SUCCESSFUL\n\n" +
        "Image selected: " +
        file.name +
        "\nSize: " +
        (file.size / 1024).toFixed(2) +
        " KB"
    );
  }
});

document.getElementById("videoInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    alert(
      "Video selected: " +
        file.name +
        "\nSize: " +
        (file.size / 1024 / 1024).toFixed(2) +
        " MB"
    );
  }
});
