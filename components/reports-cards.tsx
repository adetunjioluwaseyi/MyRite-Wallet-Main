"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const cards = [
  { id: 1, label: "Wealth Rotation", icon: "📊", color: "from-purple-600 to-purple-700" },
  { id: 2, label: "SaveCave", icon: "💡", color: "from-purple-500 to-purple-600" },
  { id: 3, label: "USERS", icon: "👥", color: "from-purple-600 to-purple-700" },
  { id: 4, label: "Reports", icon: "📈", color: "from-purple-500 to-purple-600" },
  { id: 5, label: "More", icon: "✨", color: "from-purple-600 to-purple-700" },
]

export function ReportsCards() {
  return (
    <div className="flex items-center justify-between mb-8 gap-4">
      <div className="flex gap-4 flex-1 overflow-x-auto pb-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`flex-shrink-0 w-32 h-24 rounded-2xl bg-gradient-to-br ${card.color} flex flex-col items-center justify-center text-white cursor-pointer hover:shadow-lg transition-shadow`}
          >
            <div className="text-2xl mb-1">{card.icon}</div>
            <p className="text-xs font-semibold text-center px-2">{card.label}</p>
          </div>
        ))}
      </div>
      <Button className="flex-shrink-0 border border-foreground text-foreground bg-transparent hover:bg-muted gap-2">
        <Download className="w-4 h-4" />
        Export
      </Button>
    </div>
  )
}
