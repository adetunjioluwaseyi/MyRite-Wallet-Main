"use client"

import { Card } from "@/components/ui/card"

export function WalletRevenue() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const wealthData = [12, 14, 22, 8, 10, 12, 16]
  const savingsData = [10, 12, 8, 14, 8, 10, 8]
  const maxValue = 25

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Wallet Revenue</h2>
      <div className="w-full h-80 flex items-end justify-between gap-1 px-4">
        <svg viewBox="0 0 900 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          <line x1="40" y1="250" x2="880" y2="250" stroke="#e0e1e2" strokeWidth="1" />
          <line x1="40" y1="200" x2="880" y2="200" stroke="#e0e1e2" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="40" y1="150" x2="880" y2="150" stroke="#e0e1e2" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="40" y1="100" x2="880" y2="100" stroke="#e0e1e2" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="40" y1="50" x2="880" y2="50" stroke="#e0e1e2" strokeWidth="1" strokeDasharray="3,3" />

          {/* Bars */}
          {days.map((day, i) => {
            const x = 60 + i * 110
            const wealthHeight = (wealthData[i] / maxValue) * 200
            const savingsHeight = (savingsData[i] / maxValue) * 200
            return (
              <g key={i}>
                <rect x={x - 15} y={250 - wealthHeight} width="20" height={wealthHeight} fill="#0095ff" />
                <rect x={x + 10} y={250 - savingsHeight} width="20" height={savingsHeight} fill="#00e096" />
                <text x={x} y="280" textAnchor="middle" fontSize="12" fill="#737791">
                  {day.slice(0, 3)}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3" style={{ backgroundColor: "#0095ff" }}></div>
          <span className="text-sm text-muted-foreground">Wealth otatis</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3" style={{ backgroundColor: "#00e096" }}></div>
          <span className="text-sm text-muted-foreground">Savings Rotati</span>
        </div>
      </div>
    </Card>
  )
}
