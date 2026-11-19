import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { InstantAccessMetrics } from "@/components/instant-access-metrics"
import { InstantAccessGroups } from "@/components/instant-access-groups"
import { InstantAccessChart } from "@/components/instant-access-chart"

export default function InstantAccessPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage="save-cave" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Instant Access</h1>
            <section id="overview">
              <InstantAccessMetrics />
            </section>
            <section id="groups">
              <InstantAccessGroups />
            </section>
            <section id="chart">
              <InstantAccessChart />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
