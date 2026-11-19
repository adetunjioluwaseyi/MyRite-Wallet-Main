import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { WealthRotationMetrics } from "@/components/wealth-rotation-metrics"
import { WealthRotationGroups } from "@/components/wealth-rotation-groups"
import { WealthRotationChart } from "@/components/wealth-rotation-chart"

export default function WealthRotationOverviewPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage="wealth-rotation" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Wealth Rotation Overview</h1>
            <section id="overview">
              <WealthRotationMetrics />
            </section>
            <section id="groups">
              <WealthRotationGroups />
            </section>
            <section id="chart">
              <WealthRotationChart />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
