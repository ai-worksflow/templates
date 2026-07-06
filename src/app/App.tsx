import { Activity, CreditCard, LayoutDashboard, Settings } from "lucide-react";
import { DashboardPage } from "../features/dashboard/DashboardPage";

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Activity", icon: Activity },
  { label: "Billing", icon: CreditCard },
  { label: "Settings", icon: Settings },
];

export function App() {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="brand">Forge UI</div>
        <nav className="nav-list" aria-label="Main navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} className="nav-item" type="button">
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
      <main className="app-main">
        <DashboardPage />
      </main>
    </div>
  );
}
