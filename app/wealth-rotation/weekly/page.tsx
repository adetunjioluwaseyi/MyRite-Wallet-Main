import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { WeeklyWealthRotationMetrics } from "@/components/weekly-wealth-rotation-metrics"
import { WeeklyWealthRotationGroups } from "@/components/weekly-wealth-rotation-groups"
import { WeeklyWealthRotationChart } from "@/components/weekly-wealth-rotation-chart"

export default function WeeklyWealthRotationPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage="wealth-rotation" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Weekly Wealth Rotation</h1>
            <section id="overview">
              <WeeklyWealthRotationMetrics />
            </section>
            <section id="groups">
              <WeeklyWealthRotationGroups />
            </section>
            <section id="chart">
              <WeeklyWealthRotationChart />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
