// helper functions
function createChart(id, type, labels, data, backgroundColor, options = {}) {
  return new Chart(document.getElementById(id), {
    type,
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderColor: options.borderColor || undefined,
          label: options.label || "",
          fill: options.fill || false,
          tension: options.tension || 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: options.padding || 20 },
      plugins: {
        legend: { display: options.legend ?? false },
        tooltip: { enabled: options.tooltip ?? true },
        datalabels: {
          display: options.showDataLabels ?? true,
          color: options.labelColor || "white",
          font: { weight: "bold", size: options.labelSize || 14 },
          formatter: options.labelFormatter || ((v) => v),
          anchor: options.anchor || undefined,
          align: options.align || undefined,
        },
      },
      scales: options.scales || undefined,
      cutout: options.cutout || undefined,
    },
    plugins: [ChartDataLabels],
  });
}

// Charts

// Demographics
createChart(
  "demographicsChart",
  "pie",
  ["Total Residents", "Male", "Female", "Seniors", "Total Voters"],
  [151, 74, 78, 52, 102],
  ["#001D39", "#0A4174", "#49769F", "#4E8EA2", "#6EA2B3"],
  {
    labelFormatter: (value, ctx) => {
      const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
      return ((value / total) * 100).toFixed(1) + " %";
    },
  }
);

// Document Requests
createChart(
  "documentChart",
  "bar",
  ["Clearance", "Certificate", "Indigency"],
  [45, 22, 48],
  ["#001D39", "#0A4174", "#49769F", "#4E8EA2"],
  {
    labelColor: "#21205d",
    labelSize: 12,
    anchor: "end",
    align: "top",
    scales: {
      y: { display: true, beginAtZero: true },
      x: {
        ticks: {
          autoSkip: false,
          color: "#21205d",
          font: { size: 12, weight: "normal" },
          padding: 10,
        },
        grid: {
          display: false,
        },
      },
    },
  }
);

// Pending Applications
createChart(
  "pendingChart",
  "doughnut",
  ["Pending", "In Progress"],
  [25, 15],
  ["#001D39", "#49769F"],
  {
    labelSize: 16,
    cutout: "30%",
  }
);

// Cancelled Requests
createChart(
  "cancelledChart",
  "bar",
  ["Jan", "Feb", "Mar", "Apr"],
  [5, 3, 7, 4],
  ["#0A4174", "#001D39", "#49769F"],
  {
    labelColor: "#21205d",
    labelSize: 12,
    anchor: "end",
    align: "top",
    scales: {
      y: { display: true, beginAtZero: true },
      x: {
        ticks: { font: { size: 12 } },
        grid: { display: false },
      },
    },
  }
);

// Completed Requests
createChart(
  "completedChart",
  "line",
  ["January", "February", "March", "April"],
  [30, 45, 38, 52],
  ["rgba(10, 65, 116, 0.1)"],
  {
    borderColor: "#0A4174",
    fill: true,
    tension: 0.3,
    showDataLabels: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { font: { size: 10 } },
      },
      x: {
        ticks: { font: { size: 10 } },
      },
    },
  }
);
