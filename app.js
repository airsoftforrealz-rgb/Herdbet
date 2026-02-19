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
const STARTING_BALANCE = 10000;

const matches = [
  { id: 1, event: "Marshall Invitational", time: "Today 7:00 PM", teamA: "Phoenix Unit", teamB: "Spike Syndicate", oddsA: 1.72, oddsB: 2.08 },
  { id: 2, event: "Marshall Invitational", time: "Today 8:30 PM", teamA: "Radiant Rush", teamB: "Eco Fraggers", oddsA: 1.95, oddsB: 1.86 },
  { id: 3, event: "Campus Valorant Cup", time: "Today 9:15 PM", teamA: "Ares Academy", teamB: "Night Market", oddsA: 2.2, oddsB: 1.65 }
];

const DEFAULT_LEADERBOARD = [
  { name: "You", earnings: 0, wins: 0, bets: 0 },
  { name: "GreenWave", earnings: 520, wins: 9, bets: 15 },
  { name: "HerdKing", earnings: 340, wins: 6, bets: 12 },
  { name: "PlantDefuser", earnings: 120, wins: 4, bets: 9 }
];

const appState = JSON.parse(localStorage.getItem("marshall-betting")) || {
  bankroll: STARTING_BALANCE,
  pending: [],
  history: [],
  branding: { title: "Marshall Esports Betting", tagline: "VALORANT · FAKE MONEY LEAGUE" },
  brackets: [],
  leaderboard: DEFAULT_LEADERBOARD
const appState = JSON.parse(localStorage.getItem("marshall-betting")) || {
  bankroll: STARTING_BALANCE,
  pending: [],
  history: []
};

const nodes = {
  matchList: document.getElementById("matchList"),
  slipItems: document.getElementById("slipItems"),
  slipCount: document.getElementById("slipCount"),
  historyList: document.getElementById("historyList"),
  balance: document.getElementById("balance"),
  walletTotal: document.getElementById("walletTotal"),
  walletPending: document.getElementById("walletPending"),
  walletAvailable: document.getElementById("walletAvailable"),
  stake: document.getElementById("stake"),
  siteTitle: document.getElementById("siteTitle"),
  siteTagline: document.getElementById("siteTagline"),
  siteTitleInput: document.getElementById("siteTitleInput"),
  taglineInput: document.getElementById("taglineInput"),
  bracketList: document.getElementById("bracketList"),
  teamAInput: document.getElementById("teamAInput"),
  teamBInput: document.getElementById("teamBInput"),
  leaderboardList: document.getElementById("leaderboardList")
  stake: document.getElementById("stake")
};

const currentSlip = [];

function currency(value) {
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function saveState() {
  localStorage.setItem("marshall-betting", JSON.stringify(appState));
}

function renderMatches() {
  nodes.matchList.innerHTML = matches
    .map(
      (match) => `
      <article class="match">
        <div class="match-head">
          <strong>${match.event}</strong>
          <span>${match.time}</span>
        </div>
        <div class="teams">
          <span>${match.teamA}</span><span>vs</span><span>${match.teamB}</span>
        </div>
        <div class="odds-row">
          <button data-pick='${JSON.stringify({ matchId: match.id, team: match.teamA, odds: match.oddsA })}'>${match.teamA} (${match.oddsA})</button>
          <button data-pick='${JSON.stringify({ matchId: match.id, team: match.teamB, odds: match.oddsB })}'>${match.teamB} (${match.oddsB})</button>
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
function renderSlip() {
  nodes.slipItems.innerHTML = currentSlip.length
    ? currentSlip
        .map(
          (pick, index) => `
          <div class="ticket">
            <p><strong>${pick.team}</strong> @ ${pick.odds}</p>
            <button type="button" class="btn subtle" data-remove="${index}">Remove</button>
          </div>`
        )
        .join("")
    : "<p>No picks yet. Choose a team from live matches.</p>";

  nodes.slipCount.textContent = `${currentSlip.length} picks`;
}

function pendingTotal() {
  return appState.pending.reduce((sum, bet) => sum + bet.stake, 0);
}

function renderWallet() {
  const pending = pendingTotal();
  const available = Math.max(0, appState.bankroll - pending);

  nodes.balance.textContent = currency(available);
  nodes.walletTotal.textContent = currency(appState.bankroll);
  nodes.walletPending.textContent = currency(pending);
  nodes.walletAvailable.textContent = currency(available);
}

function renderHistory() {
  nodes.historyList.innerHTML = appState.history.length
    ? appState.history
        .slice()
        .reverse()
        .map(
          (entry) => `
        <div class="history-item">
          <p><strong>${entry.team}</strong> @ ${entry.odds}</p>
          <p>Stake: ${currency(entry.stake)} · Return: ${currency(entry.payout)}</p>
          <p class="${entry.status}">${entry.status.toUpperCase()}</p>
        </div>
      `
        )
        .join("")
    : "<p>No settled bets yet.</p>";
}

function renderBranding() {
  nodes.siteTitle.textContent = appState.branding.title;
  nodes.siteTagline.textContent = appState.branding.tagline;
  nodes.siteTitleInput.value = appState.branding.title;
  nodes.taglineInput.value = appState.branding.tagline;
}

function renderBrackets() {
  nodes.bracketList.innerHTML = appState.brackets.length
    ? appState.brackets
        .map(
          (pair, index) => `<div class="matchup"><span>${pair.a} vs ${pair.b}</span><button data-bracket-win="${index}" data-team="${pair.a}">${pair.a}</button><button data-bracket-win="${index}" data-team="${pair.b}">${pair.b}</button></div>`
        )
        .join("")
    : "<p>No bracket matches yet. Add from operator panel.</p>";
}

function updateLeaderboardFromHistory() {
  const me = appState.leaderboard.find((row) => row.name === "You");
  const wins = appState.history.filter((entry) => entry.status === "win");
  me.wins = wins.length;
  me.bets = appState.history.length;
  me.earnings = Math.round(appState.bankroll - STARTING_BALANCE);

  appState.leaderboard.forEach((row) => {
    if (row.name !== "You") {
      row.earnings += Math.floor(Math.random() * 15) - 4;
    }
  });

  appState.leaderboard.sort((a, b) => b.earnings - a.earnings);
}

function renderLeaderboard() {
  updateLeaderboardFromHistory();
  nodes.leaderboardList.innerHTML = appState.leaderboard
    .map(
      (row, index) => `<div class="leader"><strong>#${index + 1} ${row.name}</strong><span>${currency(row.earnings)} (${row.wins}/${row.bets})</span></div>`
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
function addPick(pick) {
  const already = currentSlip.find((item) => item.matchId === pick.matchId);
  if (already) Object.assign(already, pick);
  else currentSlip.push(pick);
function addPick(pick) {
  const already = currentSlip.find((item) => item.matchId === pick.matchId);
  if (already) {
    Object.assign(already, pick);
  } else {
    currentSlip.push(pick);
  }
  renderSlip();
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
  const stake = Number(nodes.stake.value);
  const available = appState.bankroll - pendingTotal();

  if (!currentSlip.length) return alert("Select at least one team.");
  if (stake < 50) return alert("Minimum stake is $50.");
  if (stake > available) return alert("Insufficient available balance.");

  currentSlip.forEach((pick) => {
    appState.pending.push({ ...pick, stake, placedAt: Date.now() });
  });

  currentSlip.length = 0;
  saveState();
  renderSlip();
  renderWallet();
}

function settleBet(betIndex = null) {
  if (!appState.pending.length) return alert("No pending bets to settle.");

  const index = betIndex == null ? Math.floor(Math.random() * appState.pending.length) : betIndex;
  const bet = appState.pending.splice(index, 1)[0];
  const didWin = Math.random() > 0.5;
  const payout = didWin ? bet.stake * bet.odds : 0;

  appState.bankroll += didWin ? payout - bet.stake : -bet.stake;
function settleRandomBet() {
  if (!appState.pending.length) {
    alert("No pending bets to settle.");
    return;
  }

  const selectedIndex = Math.floor(Math.random() * appState.pending.length);
  const bet = appState.pending.splice(selectedIndex, 1)[0];
  const didWin = Math.random() > 0.5;
  const payout = didWin ? bet.stake * bet.odds : 0;

  if (didWin) appState.bankroll += payout - bet.stake;
  else appState.bankroll -= bet.stake;

  appState.history.push({ ...bet, payout, status: didWin ? "win" : "loss", settledAt: Date.now() });

  saveState();
  renderWallet();
  renderHistory();
  renderLeaderboard();
}

function settleTopEarner() {
  if (!appState.pending.length) return alert("No pending bets to settle.");
  const topIndex = appState.pending.reduce((best, bet, i, arr) => (bet.stake * bet.odds > arr[best].stake * arr[best].odds ? i : best), 0);
  settleBet(topIndex);
}

function clearHistory() {
  appState.history = [];
  saveState();
  renderHistory();
  renderLeaderboard();
}

function updateBranding() {
  appState.branding.title = nodes.siteTitleInput.value.trim() || "Marshall Esports Betting";
  appState.branding.tagline = nodes.taglineInput.value.trim() || "VALORANT · FAKE MONEY LEAGUE";
  renderBranding();
  saveState();
}

function addBracketMatch() {
  const a = nodes.teamAInput.value.trim();
  const b = nodes.teamBInput.value.trim();
  if (!a || !b) return alert("Enter both teams for a custom bracket match.");
  appState.brackets.push({ a, b, winner: null });
  nodes.teamAInput.value = "";
  nodes.teamBInput.value = "";
  saveState();
  renderBrackets();
}

function resetApp() {
  localStorage.removeItem("marshall-betting");
  location.reload();
}

nodes.matchList.addEventListener("click", (event) => {
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
nodes.slipItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-remove]");
  if (!button) return;
  currentSlip.splice(Number(button.dataset.remove), 1);
  renderSlip();
});

nodes.bracketList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-bracket-win]");
  if (!button) return;
  const matchup = appState.brackets[Number(button.dataset.bracketWin)];
  matchup.winner = button.dataset.team;
  alert(`Winner recorded: ${matchup.winner}`);
  saveState();
  renderBrackets();
});

document.getElementById("betForm").addEventListener("submit", placeBet);
document.getElementById("simulateRound").addEventListener("click", () => settleBet());
document.getElementById("clearHistory").addEventListener("click", clearHistory);
document.getElementById("addBracketMatch").addEventListener("click", addBracketMatch);
document.getElementById("settleTopEarner").addEventListener("click", settleTopEarner);
document.getElementById("resetApp").addEventListener("click", resetApp);
document.getElementById("operatorToggle").addEventListener("click", () => {
  document.getElementById("operatorPanel").classList.toggle("open");
});
nodes.siteTitleInput.addEventListener("input", updateBranding);
nodes.taglineInput.addEventListener("input", updateBranding);
document.getElementById("betForm").addEventListener("submit", placeBet);
document.getElementById("simulateRound").addEventListener("click", settleRandomBet);
document.getElementById("clearHistory").addEventListener("click", clearHistory);

renderMatches();
renderSlip();
renderWallet();
renderHistory();
renderBranding();
renderBrackets();
renderLeaderboard();
setInterval(renderLeaderboard, 6000);
