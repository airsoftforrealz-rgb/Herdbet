const STARTING_CREDITS = 10000;

const matches = [
  { id: 1, event: "Marshall Prime Series", time: "Fri 7:00 PM", teamA: "Sentinels Red", teamB: "Haven Hunters", oddsA: 1.75, oddsB: 2.1 },
  { id: 2, event: "Marshall Prime Series", time: "Fri 8:30 PM", teamA: "Ascent Elite", teamB: "Eco Breakers", oddsA: 1.9, oddsB: 1.95 },
  { id: 3, event: "Valorant College Clash", time: "Sat 6:30 PM", teamA: "Spike Control", teamB: "Night Shift", oddsA: 2.2, oddsB: 1.66 }
];

const players = [
  { name: "RazeRex", team: "Sentinels Red", role: "Duelist", points: 112 },
  { name: "CipherLock", team: "Haven Hunters", role: "Sentinel", points: 97 },
  { name: "JettNova", team: "Ascent Elite", role: "Duelist", points: 121 },
  { name: "SovaLine", team: "Night Shift", role: "Initiator", points: 91 }
];

const defaultLeaders = [
  { name: "You", earnings: 0, wins: 0, losses: 0 },
  { name: "RushBobby", earnings: 620, wins: 11, losses: 6 },
  { name: "PlantMaster", earnings: 480, wins: 10, losses: 7 },
  { name: "EcoHero", earnings: 350, wins: 8, losses: 7 }
];

const saved = JSON.parse(localStorage.getItem("marshall-fantasy"));
const state = saved || {
  credits: STARTING_CREDITS,
  pending: [],
  history: [],
  leaders: defaultLeaders
};

const slip = [];
const $ = (id) => document.getElementById(id);

function currency(value) {
  return `$${Math.round(value).toLocaleString()}`;
}

function save() {
  localStorage.setItem("marshall-fantasy", JSON.stringify(state));
}

function renderTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      $(tab.dataset.tab).classList.add("active");
    });
  });
}

function renderMatches() {
  $("liveCount").textContent = matches.length;
  $("matchList").innerHTML = matches
    .map(
      (m) => `
      <article class="match-card">
        <div class="match-top"><strong>${m.event}</strong><span>${m.time}</span></div>
        <div class="teams">${m.teamA} vs ${m.teamB}</div>
        <div class="odds">
          <button data-pick='${JSON.stringify({ matchId: m.id, team: m.teamA, odds: m.oddsA })}'>${m.teamA} (${m.oddsA})</button>
          <button data-pick='${JSON.stringify({ matchId: m.id, team: m.teamB, odds: m.oddsB })}'>${m.teamB} (${m.oddsB})</button>
        </div>
      </article>
    `
    )
    .join("");
}

function renderPlayers() {
  $("playerList").innerHTML = players
    .map(
      (p) => `
      <article class="player-card">
        <strong>${p.name}</strong>
        <div>${p.team} · ${p.role}</div>
        <small>Projected Fantasy Points: ${p.points}</small>
      </article>
    `
    )
    .join("");
}

function addPick(pick) {
  const existing = slip.find((s) => s.matchId === pick.matchId);
  if (existing) Object.assign(existing, pick);
  else slip.push(pick);
  renderSlip();
}

function renderSlip() {
  $("slipCount").textContent = `${slip.length} picks`;
  $("slip").innerHTML = slip.length
    ? slip
        .map(
          (pick, i) => `<div class="ticket"><strong>${pick.team}</strong> @ ${pick.odds} <button class="btn" data-remove="${i}" type="button">Remove</button></div>`
        )
        .join("")
    : "<div class='ticket'>No picks selected yet.</div>";
}

function pendingStake() {
  return state.pending.reduce((sum, t) => sum + t.stake, 0);
}

function renderSummary() {
  const wins = state.history.filter((x) => x.status === "win").length;
  const losses = state.history.filter((x) => x.status === "loss").length;
  const earnings = state.credits - STARTING_CREDITS;

  $("credits").textContent = currency(state.credits);
  $("record").textContent = `${wins}W - ${losses}L`;
  $("earnings").textContent = currency(earnings);
  $("pendingCount").textContent = String(state.pending.length);

  const me = state.leaders.find((l) => l.name === "You");
  me.earnings = earnings;
  me.wins = wins;
  me.losses = losses;
  state.leaders.sort((a, b) => b.earnings - a.earnings);
  $("rank").textContent = `#${state.leaders.findIndex((l) => l.name === "You") + 1}`;
}

function renderLeaders() {
  $("leaderboard").innerHTML = state.leaders
    .map(
      (l, index) => `<div class="leader-row"><strong>#${index + 1} ${l.name}</strong><span>${currency(l.earnings)} · ${l.wins}-${l.losses}</span></div>`
    )
    .join("");
}

function renderHistory() {
  $("history").innerHTML = state.history.length
    ? state.history
        .slice()
        .reverse()
        .map(
          (h) => `<div class="ticket"><strong>${h.team}</strong> · stake ${currency(h.stake)} · return ${currency(h.payout)} <span class="${h.status}">${h.status.toUpperCase()}</span></div>`
        )
        .join("")
    : "<div class='ticket'>No settled tickets yet.</div>";
}

function placeBet(event) {
  event.preventDefault();
  const stake = Number($("stake").value);
  const available = state.credits - pendingStake();

  if (!slip.length) return alert("Select at least one team from Matchups.");
  if (stake < 50) return alert("Minimum stake is $50.");
  if (stake > available) return alert("Not enough available credits.");

  slip.forEach((pick) => state.pending.push({ ...pick, stake, id: Date.now() + Math.random() }));
  slip.length = 0;
  save();
  renderSlip();
  renderSummary();
}

function settleOne() {
  if (!state.pending.length) return alert("No pending tickets.");

  const idx = Math.floor(Math.random() * state.pending.length);
  const ticket = state.pending.splice(idx, 1)[0];
  const win = Math.random() > 0.5;
  const payout = win ? ticket.stake * ticket.odds : 0;

  state.credits += win ? payout - ticket.stake : -ticket.stake;
  state.history.push({ ...ticket, payout, status: win ? "win" : "loss" });

  state.leaders.forEach((row) => {
    if (row.name !== "You") row.earnings += Math.floor(Math.random() * 21) - 8;
  });

  save();
  renderSummary();
  renderLeaders();
  renderHistory();
}

$("matchList").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-pick]");
  if (!button) return;
  addPick(JSON.parse(button.dataset.pick));
});

$("slip").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-remove]");
  if (!button) return;
  slip.splice(Number(button.dataset.remove), 1);
  renderSlip();
});

$("betForm").addEventListener("submit", placeBet);
$("simulate").addEventListener("click", settleOne);
$("refreshLeaders").addEventListener("click", () => {
  state.leaders.forEach((row) => {
    if (row.name !== "You") row.earnings += Math.floor(Math.random() * 10) - 3;
  });
  save();
  renderSummary();
  renderLeaders();
});

renderTabs();
renderMatches();
renderPlayers();
renderSlip();
renderSummary();
renderLeaders();
renderHistory();
setInterval(() => {
  state.leaders.forEach((row) => {
    if (row.name !== "You") row.earnings += Math.floor(Math.random() * 8) - 3;
  });
  renderSummary();
  renderLeaders();
}, 7000);
