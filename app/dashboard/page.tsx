"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { WalletsOverview } from "@/components/wallets-overview"
import { WealthRotationInsights } from "@/components/wealth-rotation-insights"
import { WalletRevenue } from "@/components/wallet-revenue"
import { SavingsRotationInsights } from "@/components/savings-rotation-insights"
import { InstanceAccessInsights } from "@/components/instance-access-insights"
import { TopWallets } from "@/components/top-wallets"
import { Notifications } from "@/components/notifications"
//import {Kyc} from "@/components/kyc"

export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden w-full md:w-auto">
        <Header />
        <main className="flex-1 overflow-auto p-3 sm:p-6">
          <div className="w-full space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>

            <WalletsOverview />

            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="lg:col-span-2">
                <WealthRotationInsights />
              </div>
            </div> */}

            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <TopWallets />
              <Notifications />
            </div> */}
          </div>
        </main>
      </div>
    </div>
  )
}
