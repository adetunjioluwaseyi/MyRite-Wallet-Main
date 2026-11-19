"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ReportsCards } from "@/components/reports-cards"
import { ReportsFilters } from "@/components/reports-filters"
import { ReportsTable } from "@/components/reports-table"

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8">Reports</h1>

            {/* Quick Action Cards */}
            <ReportsCards />

            {/* Filters Section */}
            <ReportsFilters />

            {/* Data Table */}
            <ReportsTable />
          </div>
        </main>
      </div>
    </div>
  )
}
