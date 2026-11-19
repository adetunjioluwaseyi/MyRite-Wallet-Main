import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MonthlyWealthRotationMetrics } from "@/components/monthly-wealth-rotation-metrics"
import { MonthlyWealthRotationGroups } from "@/components/monthly-wealth-rotation-groups"
import { MonthlyWealthRotationChart } from "@/components/monthly-wealth-rotation-chart"

export default function MonthlyWealthRotationPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage="wealth-rotation" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Monthly Wealth Rotation</h1>
            <section id="overview">
              <MonthlyWealthRotationMetrics />
            </section>
            <section id="groups">
              <MonthlyWealthRotationGroups />
            </section>
            <section id="chart">
              <MonthlyWealthRotationChart />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
