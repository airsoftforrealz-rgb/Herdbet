# Marshall Esports Betting (Valorant)

Single-page Valorant fantasy-style betting dashboard inspired by NFL fantasy layout patterns (tabs, cards, leaderboard, matchups).
Single-page demo betting site built for a Marshall-themed esports project.

## Stack
- HTML
- CSS
- JavaScript (SPA behavior)
- Java (sample odds engine class for backend extension)

## Features
- Valorant-focused match board with moneyline picks
- Fake-money wallet and stake validation
- Bet slip with multiple picks
- Simulated match settlement and bankroll updates
- Local bet history persistence (`localStorage`)
- Tab-based fantasy dashboard (Overview, Matchups, Players, Leaders, Bets)
- NFL fantasy-inspired card layout for matchup and player browsing
- Live fake-credit leaderboard updates with earnings tracking
- Left-side operator dropdown for branding controls and bet settlement
- Custom bracket builder with winner recording
- Auto-refreshing leaderboard based on earnings

## Get the project files
If you do not already have the `Herdbet` folder, use one of these options:

1. **Download ZIP from GitHub**
   - Open the repository page.
   - Click **Code** → **Download ZIP**.
   - Extract the ZIP to any folder on your computer.

2. **Clone with Git**
   ```bash
   git clone <your-repo-url> Herdbet
   cd Herdbet
   ```

## Run locally
Open `index.html` directly in a browser, or serve with a static server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

If you had an old tab open, hard refresh with `Ctrl+F5` to load the newest JS/CSS.

## Windows 11 quick start
In PowerShell from inside the `Herdbet` folder:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080` in Chrome/Edge.

## Publish this project to your GitHub
If GitHub is not showing updates, your local folder may not be connected to a remote repository yet.

### 1) Create an empty GitHub repository
- In GitHub, click **New repository**.
- Name it (for example, `Herdbet`).
- Do **not** initialize with README/gitignore/license.

### 2) Connect local repo to GitHub
Run in your project terminal:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
```

If `origin` already exists, update it:

```bash
git remote set-url origin https://github.com/<your-username>/<your-repo>.git
```

### 3) Push your branch
Current branch in this environment is `work`.

```bash
git push -u origin work
```

If you want the default branch to be `main` instead:

```bash
git branch -M main
git push -u origin main
```

## Troubleshooting
- **localhost refused to connect**
  - Make sure the server command is still running in terminal.
  - Try another port:
    ```bash
    python -m http.server 5500
    ```
    then open `http://localhost:5500`.
- **`python` command not found on Windows**
  - Install Python from `python.org` and check **Add Python to PATH** during install.
  - Reopen PowerShell and run `python --version`.
- **GitHub shows no changes**
  - Verify remote: `git remote -v`
  - Verify branch: `git branch --show-current`
  - Push the same branch shown by the branch command.

> This project uses virtual currency only and is for demonstration/education.
