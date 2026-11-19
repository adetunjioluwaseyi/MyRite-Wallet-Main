"use client"

import { Card } from "@/components/ui/card"

export function WealthRotationInsights() {
  const data = [
    { month: "Jan", dailyGroup: 70, weeklyGroup: 50, monthlyGroup: 30 },
    { month: "Mar", dailyGroup: 170, weeklyGroup: 150, monthlyGroup: 130 },
    { month: "May", dailyGroup: 200, weeklyGroup: 180, monthlyGroup: 160 },
    { month: "Jul", dailyGroup: 250, weeklyGroup: 230, monthlyGroup: 210 },
    { month: "Sept", dailyGroup: 230, weeklyGroup: 210, monthlyGroup: 190 },
    { month: "Nov", dailyGroup: 170, weeklyGroup: 150, monthlyGroup: 130 },
    { month: "Dec", dailyGroup: 120, weeklyGroup: 100, monthlyGroup: 80 },
  ]

  const chartHeight = 300
  const chartWidth = 1200
  const padding = 60
  const barWidth = 30
  const groupWidth = barWidth * 3 + 10 // 3 bars per group with 5px spacing between bars
  
  const maxValue = 300
  const minValue = 0

  const getX = (index: number, barIndex: number) => 
    padding + (index * (groupWidth + 40)) + (barIndex * (barWidth + 5))
  const getY = (value: number) => 
    chartHeight - padding - ((value - minValue) / (maxValue - minValue)) * (chartHeight - padding * 2)
  const getHeight = (value: number) => 
    ((value - minValue) / (maxValue - minValue)) * (chartHeight - padding * 2)

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Wealth Rotation Insights</h2>
      <div className="w-full h-80 flex items-end justify-between gap-2 px-4">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {[0, 100, 200, 300].map((value) => (
            <g key={value}>
              <line
                x1={padding}
                y1={getY(value)}
                x2={chartWidth - padding}
                y2={getY(value)}
                stroke="#e0e1e2"
                strokeWidth="1"
                strokeDasharray={value === 0 ? "" : "3,3"}
              />
              <text
                x={padding - 10}
                y={getY(value) + 4}
                fontSize="12"
                textAnchor="end"
                fill="#737791"
              >
                {value}
              </text>
            </g>
          ))}

          {/* Bars and Labels */}
          {data.map((d, index) => (
            <g key={`group-${index}`}>
              {/* X-axis label */}
              <text
                x={getX(index, 1)}
                y={chartHeight - padding + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#737791"
              >
                {d.month}
              </text>

              {/* Bars */}
              <rect
                x={getX(index, 0)}
                y={getY(d.dailyGroup)}
                width={barWidth}
                height={getHeight(d.dailyGroup)}
                fill="#800080"
              />
              <rect
                x={getX(index, 1)}
                y={getY(d.weeklyGroup)}
                width={barWidth}
                height={getHeight(d.weeklyGroup)}
                fill="#ff947a"
              />
              <rect
                x={getX(index, 2)}
                y={getY(d.monthlyGroup)}
                width={barWidth}
                height={getHeight(d.monthlyGroup)}
                fill="#3cd856"
              />
            </g>
          ))}
        </svg>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#800080" }}></div>
          <span className="text-sm text-muted-foreground">Daily Group</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff947a" }}></div>
          <span className="text-sm text-muted-foreground">Weekly Group</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3cd856" }}></div>
          <span className="text-sm text-muted-foreground">Monthly Group</span>
        </div>
      </div>
    </Card>
  )
}
