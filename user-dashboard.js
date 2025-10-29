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

// ============================================
// API Configuration - Update these with your backend URLs
// ============================================
const API_CONFIG = {
  BASE_URL: "http://localhost:3000/api", // Change to your backend URL
  ENDPOINTS: {
    PENDING_REQUESTS: "/requests/pending",
    COMPLETED_REQUESTS: "/requests/completed",
    STATISTICS: "/statistics",
    ANNOUNCEMENTS: "/announcements",
  },
};

// ============================================
// Utility Functions
// ============================================

/**
 * Fetch data from backend API
 * @param {string} endpoint - API endpoint
 * @returns {Promise} - API response data
 */
async function fetchFromAPI(endpoint) {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("[v0] API Fetch Error:", error);
    return null;
  }
}

/**
 * Create a request item element
 * @param {Object} request - Request data object
 * @returns {HTMLElement} - Request item element
 */
function createRequestElement(request) {
  const requestItem = document.createElement("div");
  requestItem.classList.add("request-item");
  requestItem.innerHTML = `
    <div class="request-border"></div>
    <div class="request-content">
      <h4>${request.type || "Request"}</h4>
      <p>${request.description || ""}</p>
      <div class="request-meta">
        <span class="request-date">📅 ${request.date || "N/A"}</span>
        <span class="request-time">⏰ ${request.time || "N/A"}</span>
      </div>
    </div>
  `;
  return requestItem;
}

// ============================================
// Load Pending Requests
// ============================================
async function loadPendingRequests() {
  const container = document.getElementById("pendingRequestsList");
  const loader = document.getElementById("pendingLoader");
  const emptyState = document.getElementById("pendingEmpty");

  loader.style.display = "block";
  container.innerHTML = "";

  const data = await fetchFromAPI(API_CONFIG.ENDPOINTS.PENDING_REQUESTS);

  loader.style.display = "none";

  if (data && data.requests && data.requests.length > 0) {
    emptyState.style.display = "none";
    data.requests.forEach((request) => {
      container.appendChild(createRequestElement(request));
    });
  } else {
    emptyState.style.display = "block";
  }
}

// ============================================
// Load Completed Requests
// ============================================
async function loadCompletedRequests() {
  const container = document.getElementById("completedRequestsList");
  const loader = document.getElementById("completedLoader");
  const emptyState = document.getElementById("completedEmpty");

  loader.style.display = "block";
  container.innerHTML = "";

  const data = await fetchFromAPI(API_CONFIG.ENDPOINTS.COMPLETED_REQUESTS);

  loader.style.display = "none";

  if (data && data.requests && data.requests.length > 0) {
    emptyState.style.display = "none";
    data.requests.forEach((request) => {
      container.appendChild(createRequestElement(request));
    });
  } else {
    emptyState.style.display = "block";
  }
}

// ============================================
// Load Statistics
// ============================================
async function loadStatistics() {
  const data = await fetchFromAPI(API_CONFIG.ENDPOINTS.STATISTICS);

  if (data && data.statistics) {
    document.getElementById("totalResidence").textContent =
      data.statistics.totalResidence || "0";
    document.getElementById("maleCount").textContent =
      data.statistics.maleCount || "0";
    document.getElementById("femaleCount").textContent =
      data.statistics.femaleCount || "0";
    document.getElementById("seniorsCount").textContent =
      data.statistics.seniorsCount || "0";
    document.getElementById("totalVoters").textContent =
      data.statistics.totalVoters || "0";
  }
}

// ============================================
// Load Announcements
// ============================================
async function loadAnnouncements() {
  const container = document.getElementById("announcementList");
  const stored = JSON.parse(localStorage.getItem("announcements")) || [];

  const announcements =
    stored.length > 0
      ? stored
      : [
          {
            title: "Dog Vaccination",
            content:
              "The Barangay Council informs all residents that there will be a FREE DOG VACCINATION program to help ensure the health and safety of our community.",
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
          {
            title: "Community Cleanup",
            content:
              "Join us for a community cleanup drive to keep our barangay clean and beautiful.",
            date: "30/09/2025",
            time: "6:00 AM - 12:00 PM",
            venue: "Barangay Hall",
          },
        ];

  announcements.reverse();

  announcements.forEach((a) => {
    const card = document.createElement("div");
    card.classList.add("announcement-card");
    card.innerHTML = `
      <h4>${a.title}</h4>
      <p>${a.content}</p>
      <div class="details">
        <span>📅 ${a.date}</span>
        <span>⏰ ${a.time}</span>
        <span>📍 ${a.venue}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// ============================================
// Live Clock
// ============================================
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", { hour12: true });
  document.getElementById("time").textContent = timeString;
}

// ============================================
// Initialize Dashboard
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Load all data
  loadPendingRequests();
  loadCompletedRequests();
  loadStatistics();
  loadAnnouncements();

  // Start live clock
  updateTime();
  setInterval(updateTime, 1000);

  // Setup navigation
  setupNavigation();

  // Optional: Refresh requests every 30 seconds
  setInterval(() => {
    loadPendingRequests();
    loadCompletedRequests();
  }, 30000);
});
