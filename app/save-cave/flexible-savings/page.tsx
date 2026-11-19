import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { FlexibleSavingsMetrics } from "@/components/flexible-savings-metrics"
import { FlexibleSavingsGroups } from "@/components/flexible-savings-groups"
import { FlexibleSavingsChart } from "@/components/flexible-savings-chart"

export default function FlexibleSavingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage="save-cave" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Flexible Savings</h1>
            <section id="overview">
              <FlexibleSavingsMetrics />
            </section>
            <section id="groups">
              <FlexibleSavingsGroups />
            </section>
            <section id="chart">
              <FlexibleSavingsChart />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
