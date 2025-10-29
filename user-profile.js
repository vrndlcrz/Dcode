{
  const zeroPad = (num) => (num < 10 ? "0" + num : num);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = zeroPad(date.getMinutes());
    const seconds = zeroPad(date.getSeconds());
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${zeroPad(hours)}:${minutes}:${seconds} ${ampm}`;
  };

  const updateClock = () => {
    const clock = document.getElementById("clock");
    if (clock) clock.textContent = formatTime(new Date());
  };

  setInterval(updateClock, 1000);
  updateClock();

  const editBtn = document.getElementById("editProfile");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      alert("Edit Profile not implemented yet.");
    });
  }
}

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
