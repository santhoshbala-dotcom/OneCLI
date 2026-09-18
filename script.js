let agents = [
  {
    name: "Customer Support Agent",
    type: "Support",
    status: true,
    tools: 2
  },
  {
    name: "Sales Agent",
    type: "Sales",
    status: true,
    tools: 3
  },
  {
    name: "Finance Agent",
    type: "Finance",
    status: true,
    tools: 2
  }
];

let activities = [
  {
    time: "10:42:18",
    agent: "Sales Agent",
    tool: "CRM",
    action: "customer.search",
    status: "ALLOWED"
  },
  {
    time: "10:43:02",
    agent: "Finance Agent",
    tool: "Payments",
    action: "payment.refund",
    status: "BLOCKED"
  },
  {
    time: "10:44:11",
    agent: "Customer Support Agent",
    tool: "Tickets",
    action: "ticket.create",
    status: "ALLOWED"
  },
  {
    time: "10:45:27",
    agent: "Sales Agent",
    tool: "CRM",
    action: "customer.delete",
    status: "BLOCKED"
  }
];

let alerts = [
  {
    title: "Unauthorized payment action",
    description: "Finance Agent attempted a restricted refund action.",
    severity: "high",
    time: "5 minutes ago"
  },
  {
    title: "Repeated denied requests",
    description: "Sales Agent generated multiple blocked requests.",
    severity: "high",
    time: "18 minutes ago"
  },
  {
    title: "API credential expiring",
    description: "CRM API credential requires rotation soon.",
    severity: "low",
    time: "1 hour ago"
  }
];

const tools = [
  {
    name: "CRM",
    description: "Customer relationship management",
    status: "Connected"
  },
  {
    name: "Email",
    description: "Business email service",
    status: "Connected"
  },
  {
    name: "Payments",
    description: "Payment processing system",
    status: "Restricted"
  },
  {
    name: "Support Tickets",
    description: "Customer support platform",
    status: "Connected"
  },
  {
    name: "Database",
    description: "Internal company database",
    status: "Connected"
  },
  {
    name: "Calendar",
    description: "Business calendar",
    status: "Connected"
  }
];


// PAGE NAVIGATION

function showPage(page, element) {

  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active-page");
  });

  document.getElementById(page).classList.add("active-page");

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
  });

  if (element) {
    element.classList.add("active");
  }

  const titles = {
    overview: "AI Security Control Center",
    agents: "AI Agents",
    permissions: "Permissions",
    apis: "APIs & Tools",
    activity: "Activity Logs",
    alerts: "Security Alerts"
  };

  document.getElementById("page-title").textContent = titles[page];
}


// TOAST

function toast(message) {

  const box = document.getElementById("toast");

  box.textContent = message;
  box.style.display = "block";

  setTimeout(() => {
    box.style.display = "none";
  }, 2500);
}


// AGENTS

function renderAgents() {

  const container = document.getElementById("agentCards");

  container.innerHTML = agents.map((agent, index) => `

    <div class="agent-card">

      <div class="agent-top">

        <div class="agent-icon">AI</div>

        <span class="badge ${agent.status ? "" : "off"}">
          ${agent.status ? "ACTIVE" : "DISABLED"}
        </span>

      </div>

      <h3>${agent.name}</h3>

      <p>${agent.type} Agent</p>

      <div class="agent-info">
        <strong>${agent.tools}</strong> connected tools
      </div>

      <div class="agent-actions">

        <button onclick="toggleAgent(${index})">
          ${agent.status ? "Disable" : "Enable"}
        </button>

        <button onclick="configureAgent('${agent.name}')">
          Configure
        </button>

      </div>

    </div>

  `).join("");

  updateStats();
}


function toggleAgent(index) {

  agents[index].status = !agents[index].status;

  toast(
    agents[index].name +
    (agents[index].status ? " enabled" : " disabled")
  );

  renderAgents();
  renderAgentStatus();
}


function configureAgent(name) {

  toast("Configuration panel for " + name);
}


function addAgent() {

  const name = prompt("Enter agent name:");

  if (!name) return;

  agents.push({
    name: name,
    type: "Custom",
    status: true,
    tools: 0
  });

  toast("Agent created");

  renderAgents();
  renderAgentStatus();
}


// AGENT STATUS

function renderAgentStatus() {

  const container = document.getElementById("agentStatus");

  container.innerHTML = agents.map(agent => `

    <div class="activity-row">

      <div class="activity-main">
        <strong>${agent.name}</strong>
        <span>${agent.type} Agent</span>
      </div>

      <div>
        ${agent.tools} tools
      </div>

      <div>
        <span class="${agent.status ? "allowed" : "blocked"}">
          ${agent.status ? "ACTIVE" : "DISABLED"}
        </span>
      </div>

      <div>
        <button onclick="configureAgent('${agent.name}')">
          Manage
        </button>
      </div>

    </div>

  `).join("");
}


// PERMISSIONS

function renderPermissions() {

  const table = document.getElementById("permissionTable");

  const rows = [
    ["Sales Agent", "CRM", true, true, true, false, false],
    ["Support Agent", "Tickets", true, true, true, false, false],
    ["Finance Agent", "Payments", true, false, false, false, true],
    ["Sales Agent", "Email", true, true, false, false, false]
  ];

  table.innerHTML = rows.map(row => `

    <tr>

      <td><strong>${row[0]}</strong></td>
      <td>${row[1]}</td>

      ${row.slice(2).map(value => `
        <td>
          <input
            type="checkbox"
            class="permission"
            ${value ? "checked" : ""}
            onchange="permissionChanged()"
          >
        </td>
      `).join("")}

    </tr>

  `).join("");
}


function permissionChanged() {

  toast("Permission updated and saved");
}


// APIS

function renderTools() {

  const container = document.getElementById("toolGrid");

  container.innerHTML = tools.map(tool => `

    <div class="tool-card">

      <div class="tool-top">

        <div class="tool-icon">API</div>

        <span class="badge ${tool.status === "Restricted" ? "off" : ""}">
          ${tool.status}
        </span>

      </div>

      <h3>${tool.name}</h3>

      <p>${tool.description}</p>

      <div class="agent-actions">
        <button onclick="manageTool('${tool.name}')">
          Manage
        </button>

        <button onclick="testTool('${tool.name}')">
          Test
        </button>
      </div>

    </div>

  `).join("");
}


function connectAPI() {

  const name = prompt("Enter business tool name:");

  if (!name) return;

  tools.push({
    name: name,
    description: "Custom business API",
    status: "Connected"
  });

  toast(name + " connected");

  renderTools();
}


function manageTool(name) {
  toast("Managing " + name);
}


function testTool(name) {
  toast(name + " connection test successful");
}


// ACTIVITY

function renderActivity() {

  const container = document.getElementById("activityTable");

  const search =
    document.getElementById("activitySearch").value.toLowerCase();

  const filter =
    document.getElementById("statusFilter").value;

  const filtered = activities.filter(item => {

    const text =
      `${item.agent} ${item.tool} ${item.action}`.toLowerCase();

    const matchesSearch = text.includes(search);

    const matchesStatus =
      filter === "ALL" || item.status === filter;

    return matchesSearch && matchesStatus;
  });

  container.innerHTML = filtered.map(item => `

    <div class="activity-row">

      <div class="activity-main">
        <strong>${item.agent}</strong>
        <span>${item.time}</span>
      </div>

      <div>
        ${item.tool}
      </div>

      <div>
        ${item.action}
      </div>

      <div class="${item.status === "ALLOWED" ? "allowed" : "blocked"}">
        ${item.status}
      </div>

    </div>

  `).join("");
}


function clearLogs() {

  activities = [];

  renderActivity();

  toast("Demo logs cleared");
}


// ALERTS

function renderAlerts() {

  const container = document.getElementById("alertList");

  container.innerHTML = alerts.map(alert => `

    <div class="alert ${alert.severity}">

      <div class="alert-title">

        <strong>
          ${alert.severity === "high" ? "🔴" : "🔵"}
          ${alert.title}
        </strong>

        <span class="alert-time">
          ${alert.time}
        </span>

      </div>

      <p>${alert.description}</p>

    </div>

  `).join("");

  renderRecentAlerts();
}


function generateAlert() {

  alerts.unshift({
    title: "Test security alert",
    description:
      "A simulated suspicious agent action was detected.",
    severity: "high",
    time: "Just now"
  });

  toast("Security alert generated");

  renderAlerts();
  updateStats();
}


function renderRecentAlerts() {

  const container =
    document.getElementById("recentAlerts");

  container.innerHTML =
    alerts.slice(0, 3).map(alert => `

      <div class="alert ${alert.severity}">

        <strong>${alert.title}</strong>

        <p>${alert.description}</p>

        <span class="alert-time">${alert.time}</span>

      </div>

    `).join("");
}


// RECENT ACTIVITY

function renderRecentActivity() {

  const container =
    document.getElementById("recentActivity");

  container.innerHTML =
    activities.slice(0, 4).map(item => `

      <div class="activity-row">

        <div class="activity-main">
          <strong>${item.agent}</strong>
          <span>${item.time}</span>
        </div>

        <div>${item.tool}</div>

        <div>${item.action}</div>

        <div class="${item.status === "ALLOWED" ? "allowed" : "blocked"}">
          ${item.status}
        </div>

      </div>

    `).join("");
}


// STATS

function updateStats() {

  document.getElementById("activeAgents").textContent =
    agents.filter(agent => agent.status).length;

  document.getElementById("alertCount").textContent =
    alerts.length;

  document.getElementById("blockedCount").textContent =
    activities.filter(item => item.status === "BLOCKED").length + 13;
}


// EMERGENCY STOP

function toggleKillSwitch() {

  const confirmation =
    confirm(
      "Emergency Stop will disable ALL AI agents. Continue?"
    );

  if (!confirmation) return;

  agents.forEach(agent => {
    agent.status = false;
  });

  renderAgents();
  renderAgentStatus();

  toast("ALL AI AGENTS HAVE BEEN DISABLED");
}


// INITIALIZE

renderAgents();
renderAgentStatus();
renderPermissions();
renderTools();
renderActivity();
renderAlerts();
renderRecentActivity();
updateStats();