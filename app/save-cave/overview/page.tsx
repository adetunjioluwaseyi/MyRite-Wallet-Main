"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { SaveCaveMetrics } from "@/components/save-cave-metrics"
import { SaveCaveGroups } from "@/components/save-cave-groups"
import { SaveCaveChart } from "@/components/save-cave-chart"

export default function SaveCavePage() {
  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <section id="overview">
            <SaveCaveMetrics />
          </section>

          <div className="grid grid-cols-1 gap-6 mt-8">
            <section id="groups">
              <SaveCaveGroups />
            </section>
            <section id="chart">
              <SaveCaveChart />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
