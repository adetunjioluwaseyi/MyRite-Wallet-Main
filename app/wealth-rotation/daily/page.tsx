import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import DailyWealthRotationMetrics from "@/components/daily-wealth-rotation-metrics";
import DailyWealthRotationGroups from "@/components/daily-wealth-rotation-groups";
import DailyWealthRotationChart from "@/components/daily-wealth-rotation-chart";

export default function DailyWealthRotationPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage="wealth-rotation" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground">
              Daily Wealth Rotation
            </h1>
            <section id="overview">
              <DailyWealthRotationMetrics />
            </section>
            <section id="groups">
              <DailyWealthRotationGroups />
            </section>
            <section id="chart">
              <DailyWealthRotationChart />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
