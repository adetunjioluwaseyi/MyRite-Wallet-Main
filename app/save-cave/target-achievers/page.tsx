import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { TargetAchieversMetrics } from "@/components/target-achievers-metrics"
import { TargetAchieversGroups } from "@/components/target-achievers-groups"
import { TargetAchieversChart } from "@/components/target-achievers-chart"

export default function TargetAchieversPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage="save-cave" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Target Achievers</h1>
            <section id="overview">
              <TargetAchieversMetrics />
            </section>
            <section id="groups">
              <TargetAchieversGroups />
            </section>
            <section id="chart">
              <TargetAchieversChart />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
