// Events storage
let events = [
  {
    id: 1,
    title: "Dog Vaccination",
    date: "2025-01-01",
    startTime: "08:00",
    endTime: "10:00",
  },
  {
    id: 2,
    title: "Community Meeting",
    date: "2025-01-05",
    startTime: "14:00",
    endTime: "16:00",
  },
  {
    id: 3,
    title: "Medical Mission",
    date: "2025-01-12",
    startTime: "09:00",
    endTime: "15:00",
  },
];

let nextEventId = 4;

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

// Burger Menu
const burgerMenu = document.getElementById("burgerMenu");
const sidebar = document.getElementById("sidebar");

burgerMenu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !burgerMenu.contains(e.target)) {
    sidebar.classList.remove("active");
  }
});

// Modal functionality
const modal = document.getElementById("eventModal");
const addEventBtn = document.getElementById("addEventBtn");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const eventForm = document.getElementById("eventForm");

addEventBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  modal.classList.add("show");
  eventForm.reset();
  // Set default date to today
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  document.getElementById("eventDate").value = `${year}-${month}-${day}`;
});

closeModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("show");
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("show");
});

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

// Form submission
eventForm.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();

  console.log("Form submitted!");

  const title = document.getElementById("eventTitle").value.trim();
  const date = document.getElementById("eventDate").value;
  const startTime = document.getElementById("eventStartTime").value;
  const endTime = document.getElementById("eventEndTime").value;

  console.log("Form values:", { title, date, startTime, endTime });

  // Validation
  if (!title || !date || !startTime || !endTime) {
    alert("Please fill in all fields");
    return;
  }

  const newEvent = {
    id: nextEventId++,
    title: title,
    date: date,
    startTime: startTime,
    endTime: endTime,
  };

  console.log("Creating event:", newEvent);

  events.push(newEvent);
  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  renderEvents();
  renderCalendar();
  modal.classList.remove("show");
  eventForm.reset();

  alert("Event created successfully!");
});

// Also add a direct click handler to the submit button
const submitBtn = document.querySelector(".btn-submit");
if (submitBtn) {
  submitBtn.addEventListener("click", function (e) {
    console.log("Submit button clicked");
    const form = document.getElementById("eventForm");
    if (form.checkValidity()) {
      // Form is valid, submit manually
      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      form.dispatchEvent(submitEvent);
    } else {
      // Show validation messages
      form.reportValidity();
    }
  });
}

// Delete event
function deleteEvent(eventId) {
  if (confirm("Are you sure you want to delete this event?")) {
    events = events.filter((event) => event.id !== eventId);
    renderEvents();
    renderCalendar();
    alert("Event deleted successfully!");
  }
}

// Make deleteEvent globally accessible
window.deleteEvent = deleteEvent;

// Format time to 12-hour format
function formatTime(time24) {
  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes}${ampm}`;
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// Render events list
function renderEvents() {
  const eventsList = document.getElementById("eventsList");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter upcoming events
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date + "T00:00:00");
    return eventDate >= today;
  });

  if (upcomingEvents.length === 0) {
    eventsList.innerHTML =
      '<div class="no-events">No upcoming events scheduled</div>';
    return;
  }

  eventsList.innerHTML = upcomingEvents
    .map(
      (event) => `
        <div class="event-item">
          <button class="delete-event-btn" onclick="deleteEvent(${
            event.id
          })">×</button>
          <div class="event-date">${formatDate(event.date)}</div>
          <div class="event-title">${event.title}</div>
          <div class="event-time">(${formatTime(
            event.startTime
          )} - ${formatTime(event.endTime)})</div>
        </div>
      `
    )
    .join("");
}

// Calendar functionality
let currentDate = new Date();

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  document.getElementById(
    "monthYear"
  ).textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDates = document.getElementById("calendarDates");
  calendarDates.innerHTML = "";

  // Previous month's trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const dateDiv = document.createElement("div");
    dateDiv.className = "calendar-date other-month";
    dateDiv.textContent = daysInPrevMonth - i;
    calendarDates.appendChild(dateDiv);
  }

  // Current month's days
  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const dateDiv = document.createElement("div");
    dateDiv.className = "calendar-date";

    if (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    ) {
      dateDiv.classList.add("today");
    }

    // Check if this date has events
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const hasEvent = events.some((event) => event.date === dateString);
    if (hasEvent) {
      dateDiv.classList.add("has-event");
    }

    dateDiv.textContent = day;
    calendarDates.appendChild(dateDiv);
  }

  // Next month's leading days
  const totalCells = calendarDates.children.length;
  const remainingCells = 42 - totalCells;
  for (let day = 1; day <= remainingCells; day++) {
    const dateDiv = document.createElement("div");
    dateDiv.className = "calendar-date other-month";
    dateDiv.textContent = day;
    calendarDates.appendChild(dateDiv);
  }
}

document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Initial render
renderCalendar();
renderEvents();
