"use client"

import { Card } from "@/components/ui/card"

export function InstanceAccessInsights() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"]
  const data = [120, 140, 160, 150, 180, 170, 200]
  const maxValue = 220

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Instance Access Insights</h2>
      <div className="w-full h-80 flex items-end justify-between gap-1 px-4">
        <svg viewBox="0 0 700 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          <line x1="40" y1="250" x2="680" y2="250" stroke="#e0e1e2" strokeWidth="1" />
          <line x1="40" y1="200" x2="680" y2="200" stroke="#e0e1e2" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="40" y1="150" x2="680" y2="150" stroke="#e0e1e2" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="40" y1="100" x2="680" y2="100" stroke="#e0e1e2" strokeWidth="1" strokeDasharray="3,3" />

          {/* Bars with alternating colors */}
          {months.map((month, i) => {
            const x = 60 + i * 90
            const height = (data[i] / maxValue) * 200
            const colors = ["#ffa412", "#3cd856", "#00e096"]
            const color = colors[i % 3]
            return (
              <g key={i}>
                <rect x={x - 12} y={250 - height} width="24" height={height} fill={color} />
                <text x={x} y="280" textAnchor="middle" fontSize="12" fill="#737791">
                  {month}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </Card>
  )
}
