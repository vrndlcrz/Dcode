function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", { hour12: true });
  document.getElementById("time").textContent = timeString;
}
setInterval(updateTime, 1000);
updateTime();

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("announcementList");
  const stored = JSON.parse(localStorage.getItem("announcements")) || [];

  const announcements =
    stored.length > 0
      ? stored
      : [
          {
            title: "Dog Vaccination",
            content:
              "The Barangay Council informs all residents that there will be a FREE DOG VACCINATION program to help ensure the health and safety of our community. All dog owners are encouraged to bring their pets for vaccination. Please ensure that your dogs are properly leashed or caged for everyone’s safety.",
            date: "24/09/2025",
            time: "8:00 AM - 10:00 AM",
            venue: "Front of Barangay",
          },
          {
            title: "Basketball Form",
            content:
              "The Barangay Council invites all interested players and teams to join our upcoming Barangay Basketball League!",
            date: "27/09/2025",
            time: "8:00 AM - 5:00 PM",
            venue: "Barangay Court",
          },
        ];

  // Show latest announcements at the top
  announcements.reverse();

  // Display announcements
  announcements.forEach((a) => {
    const card = document.createElement("div");
    card.classList.add("announcement-card");
    card.innerHTML = `
      <h4>${a.title}</h4>
      <p>${a.content}</p>
      <div class="details">
        <span>🗓 Date: ${a.date}</span>
        <span>⏰ Time: ${a.time}</span>
        <span>📍 Venue: ${a.venue}</span>
      </div>
    `;
    container.appendChild(card);
  });

  // Live clock at top right
  function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", { hour12: true });
    document.getElementById("time").textContent = timeString;
  }

  updateTime(); // set immediately
  setInterval(updateTime, 1000); // update every second
});

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
