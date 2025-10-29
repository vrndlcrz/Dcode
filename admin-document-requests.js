function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  const timeString = `${displayHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
  document.getElementById("clock").textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

// Sidebar toggle
const burgerMenu = document.getElementById("burgerMenu");
const sidebar = document.getElementById("sidebar");

burgerMenu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    if (!sidebar.contains(e.target) && !burgerMenu.contains(e.target)) {
      sidebar.classList.remove("active");
    }
  }
});

// Modal functions
function viewRequest(requestId) {
  document.getElementById("viewModal").style.display = "block";
}

function closeModal() {
  document.getElementById("viewModal").style.display = "none";
}

function updateStatus(requestId, newStatus) {
  alert(`Request ${requestId} status updated to: ${newStatus}`);
  // Here you would typically make an API call to update the status
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("viewModal");
  if (event.target === modal) {
    closeModal();
  }
};

// Search functionality
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const documentFilter = document.getElementById("documentFilter");

searchInput.addEventListener("input", filterTable);
statusFilter.addEventListener("change", filterTable);
documentFilter.addEventListener("change", filterTable);

function filterTable() {
  const searchTerm = searchInput.value.toLowerCase();
  const status = statusFilter.value;
  const docType = documentFilter.value;
  const rows = document.querySelectorAll("#requestsTableBody tr");

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    const rowStatus = row
      .querySelector(".status-badge")
      .className.split("status-")[1];
    const rowDocType = row.cells[3].textContent.toLowerCase();

    const matchesSearch = text.includes(searchTerm);
    const matchesStatus = status === "all" || rowStatus === status;
    const matchesDocType =
      docType === "all" || rowDocType.includes(docType.toLowerCase());

    if (matchesSearch && matchesStatus && matchesDocType) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}
