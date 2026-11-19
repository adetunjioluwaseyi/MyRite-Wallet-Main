import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

const notifications = [
  {
    id: 1,
    title: "New clients from daily wallets",
    time: "18 OCT 7:20 AM",
    color: "bg-blue-900",
  },
  {
    id: 2,
    title: "New clients from weekly wallets",
    time: "19 OCT 11:21 PM",
    color: "bg-red-900",
  },
  {
    id: 3,
    title: "Payments Approval for Flexible",
    time: "21 OCT 9:28 PM",
    color: "bg-blue-900",
  },
  {
    id: 4,
    title: "Payments Approval for Target Achievers",
    time: "30 OCT 3:52 PM",
    color: "bg-amber-900",
  },
]

export function Notifications() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex gap-3 pb-4 border-b border-border last:border-b-0">
            <div className={`${notification.color} w-3 h-3 rounded-sm flex-shrink-0 mt-1`}></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{notification.title}</p>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
