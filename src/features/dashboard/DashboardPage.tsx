import { ArrowUpRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { activityItems, getSeverityLabel } from "./dashboard-model";

export function DashboardPage() {
  return (
    <div className="page-stack">
      <header className="page-heading">
        <div>
          <p className="eyebrow">SaaS console</p>
          <h1>Workspace command center</h1>
          <p className="muted">Local component source designed for direct product customization.</p>
        </div>
        <Button>
          Open report
          <ArrowUpRight size={16} />
        </Button>
      </header>

      <section className="metric-grid">
        {["Active users", "Revenue", "Open alerts"].map((label, index) => (
          <Card key={label}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="metric-value">{["12,840", "$84.2K", "7"][index]}</p>
              <p className="muted">Updated in the last hour</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Activity feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="activity-list">
            {activityItems.map((item) => (
              <article key={item.id} className={`activity-item activity-${item.severity}`}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
                <span>{getSeverityLabel(item.severity)}</span>
              </article>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
