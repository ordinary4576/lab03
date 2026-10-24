# DevOps CI/CD Lab Suite: Angular GitHub Pages Deployment

Automated Continuous Integration (CI) and Continuous Deployment (CD) pipeline for Angular deployed directly to GitHub Pages via GitHub Actions.

- **GitHub Repository:** [https://github.com/ordinary4576/lab03](https://github.com/ordinary4576/lab03)
- **Live Published Website:** [https://ordinary4576.github.io/lab03/](https://ordinary4576.github.io/lab03/)
- **Primary Deployment Branch:** `main`
- **Base HREF Path:** `/lab03/`

---

## 🚀 CI/CD Architecture Overview

```
Code Modification (VS Code)
           ↓
Git Commit & Push (origin main)
           ↓
[CI Validation Job]
  • actions/checkout@v4
  • actions/setup-node@v4 (Node.js 22 LTS with npm cache)
  • npm ci
  • npm run lint (Prettier formatting check)
  • npm run test:ci (Automated unit tests via Vitest)
  • npm run build:prod (Angular build with --base-href /lab03/)
  • Generate 404.html fallback for client-side routing
  • actions/upload-pages-artifact@v3 (Upload dist/lab03/browser)
           ↓ (Only on pushes to main when CI passes)
[CD Deployment Job]
  • actions/deploy-pages@v4
           ↓
Live Published Angular Web Application at https://ordinary4576.github.io/lab03/
```

### CI vs CD in this Project
- **Continuous Integration (CI):** Automates quality assurance. Runs on all pushes and pull requests targeting `main`. Executes `npm ci`, code linting, automated unit tests, and production compilation to prevent broken code from merging.
- **Continuous Deployment (CD):** Automates release delivery. Runs **only** on direct pushes to `main` when CI succeeds. Deploys the built artifact (`dist/lab03/browser`) to GitHub Pages edge network. Pull requests are never deployed.

---

## 🛠️ Local Development Commands

All commands can be executed in the project root:

| Command | Description |
|---|---|
| `npm start` | Starts the Angular local dev server at `http://localhost:4200/` |
| `npm test` | Runs unit tests interactively via Vitest |
| `npm run test:ci` | Runs unit tests non-interactively in headless CI mode |
| `npm run lint` | Validates code formatting across TypeScript, HTML, and CSS |
| `npm run build:prod` | Compiles production Angular bundle with base-href `/lab03/` and generates `404.html` |
| `npm ci` | Cleanly installs exact dependencies from `package-lock.json` |

---

## 🎯 Live Lab Demonstration Instructions

Follow these exact steps during your instructor evaluation:

### 1. Open Target File in VS Code
Open file:
```
src/app/pages/dashboard/dashboard.html
```

### 2. Make a Visible UI Modification
Locate lines 15–18:
```html
<!-- 🎯 PRIMARY DEMO TARGET TO EDIT: Change this version string during lab demonstration -->
<span id="lab-demonstration-badge" class="demo-pill-highlight">
  🚀 Lab Demo Target: Release v1.0.0 — Production Ready
</span>
```
Change to:
```html
<span id="lab-demonstration-badge" class="demo-pill-highlight">
  🚀 Lab Demo Target: Release v1.1.0 — Live CI/CD Verified by Areej!
</span>
```
Save the file (`Ctrl + S`).

### 3. Stage, Commit, and Push Changes
Open terminal in `C:\Users\hp\lab03` and run:
```bash
git status
git add src/app/pages/dashboard/dashboard.html
git commit -m "demo: update live demonstration banner to v1.1.0"
git push origin main
```

### 4. Monitor GitHub Actions CI/CD Pipeline
1. Open [https://github.com/ordinary4576/lab03/actions](https://github.com/ordinary4576/lab03/actions)
2. Click on the latest workflow run: `demo: update live demonstration banner to v1.1.0`
3. Observe the two jobs:
   - `Build & Validate (CI)`: Checkout → npm ci → lint → test:ci → build:prod → upload-pages-artifact.
   - `Deploy to GitHub Pages (CD)`: Publish to GitHub Pages.
4. Wait for both jobs to show green checkmarks (typically ~45 seconds).

### 5. Verify the Live Website
Navigate to [https://ordinary4576.github.io/lab03/](https://ordinary4576.github.io/lab03/) and verify that the updated banner text is visible.
*(If cached by your browser, perform a hard refresh with `Ctrl + Shift + R`).*

---

## ⚙️ Manual GitHub Pages Setting (One-Time Setup)

To allow GitHub Actions to deploy to GitHub Pages:
1. Go to repository **Settings** tab on GitHub: `https://github.com/ordinary4576/lab03/settings/pages`
2. Under **Build and deployment** → **Source**, change the dropdown from *"Deploy from a branch"* to **"GitHub Actions"**.
3. Save changes.
