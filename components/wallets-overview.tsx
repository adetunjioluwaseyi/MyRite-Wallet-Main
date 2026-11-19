"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

type DashboardData = {
  customerSize: string
  walletBalance: string
  groupSize: string
  flexSize: string
  flexSavings: string
  targetSize: string
  targetSavings: string
  instantSize: string
  instantSavings: string
}

type Stat = {
  label: string
  value: string
  icon: string
  bgColor: string
  iconBg: string
}

const formatCount = (value: string) => Number(value).toLocaleString()

const formatAmount = (value: string) =>
  `₦${Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

const getStats = (data: DashboardData): Stat[] => [
  { label: "All Customers", value: formatCount(data.customerSize), icon: "👤", bgColor: "bg-orange-100", iconBg: "bg-orange-500" },
  { label: "All Groups", value: formatCount(data.groupSize), icon: "✓", bgColor: "bg-green-100", iconBg: "bg-green-500" },
  { label: "Wallet Balance", value: formatAmount(data.walletBalance), icon: "📊", bgColor: "bg-red-100", iconBg: "bg-red-500" },
  { label: "Flexible Savings", value: formatAmount(data.flexSavings), icon: "📊", bgColor: "bg-purple-100", iconBg: "bg-purple-500" },
  { label: "Flexible Wallets", value: formatCount(data.flexSize), icon: "👤", bgColor: "bg-red-100", iconBg: "bg-red-500" },
  { label: "Target Achievers", value: formatCount(data.targetSize), icon: "👤", bgColor: "bg-orange-100", iconBg: "bg-orange-500" },
  { label: "Target Savings", value: formatAmount(data.targetSavings), icon: "📊", bgColor: "bg-green-100", iconBg: "bg-green-500" },
  { label: "Instant Access Wallets", value: formatCount(data.instantSize), icon: "👤", bgColor: "bg-red-100", iconBg: "bg-red-500" },
  { label: "Instant Access Savings", value: formatAmount(data.instantSavings), icon: "📊", bgColor: "bg-purple-100", iconBg: "bg-purple-500" },
]

export function WalletsOverview() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await fetch("/api/dashboard", { headers: { Accept: "application/json" } })
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`)

        setDashboardData((await response.json()) as DashboardData)
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Unable to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const stats = dashboardData ? getStats(dashboardData) : []

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Wallets Overview</h2>
          <p className="text-sm text-muted-foreground">Wallet Summary</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading dashboard summary...</p>}
      {error && <p className="text-sm text-destructive">Unable to load dashboard summary: {error}</p>}

      {!loading && !error && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.bgColor} rounded-lg p-4`}>
            <div className={`${stat.iconBg} w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-sm font-medium text-foreground mb-1">{stat.label}</p>
          </div>
        ))}
      </div>}
    </Card>
  )
}
