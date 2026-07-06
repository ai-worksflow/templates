import { gameStats, getCompletionLabel } from "../features/dashboard/dashboard-model";

export function renderApp(root: HTMLElement) {
  root.innerHTML = `
    <main class="app-shell">
      <aside class="app-sidebar">
        <div class="brand">Web Portal</div>
        <button class="nav-item" type="button">Home</button>
        <button class="nav-item" type="button">Inventory</button>
        <button class="nav-item" type="button">Leaderboard</button>
      </aside>
      <section class="app-main">
        <header class="page-heading">
          <div>
            <p class="eyebrow">Vanilla TypeScript</p>
            <h1>Player portal</h1>
            <p>Framework-light UI using Shoelace Web Components.</p>
          </div>
          <sl-button variant="primary" id="refresh-button">Refresh status</sl-button>
        </header>

        <section class="metric-grid">
          ${gameStats
            .map(
              (stat) => `
                <sl-card class="metric-card">
                  <h2 slot="header">${stat.label}</h2>
                  <p class="metric-value">${stat.value}</p>
                  <sl-progress-bar value="${stat.completion}"></sl-progress-bar>
                  <sl-badge variant="${stat.completion >= 75 ? "success" : "warning"}">${getCompletionLabel(stat.completion)}</sl-badge>
                </sl-card>
              `,
            )
            .join("")}
        </section>

        <sl-tab-group>
          <sl-tab slot="nav" panel="events">Events</sl-tab>
          <sl-tab slot="nav" panel="profile">Profile</sl-tab>
          <sl-tab-panel name="events">
            <sl-alert open variant="primary">Realtime events can be wired through src/shared/api after fork.</sl-alert>
          </sl-tab-panel>
          <sl-tab-panel name="profile">Profile modules should be added under src/features.</sl-tab-panel>
        </sl-tab-group>
      </section>
    </main>
  `;

  root.querySelector("#refresh-button")?.addEventListener("click", () => {
    root.querySelector("sl-alert")?.setAttribute("variant", "success");
  });
}
