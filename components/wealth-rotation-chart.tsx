export function WealthRotationChart() {
  const data = [
    { month: "Jan", dailyGroup: 250, weeklyGroup: 200, monthlyGroup: 150 },
    { month: "Feb", dailyGroup: 300, weeklyGroup: 220, monthlyGroup: 180 },
    { month: "Mar", dailyGroup: 280, weeklyGroup: 240, monthlyGroup: 200 },
    { month: "Apr", dailyGroup: 350, weeklyGroup: 300, monthlyGroup: 220 },
    { month: "May", dailyGroup: 320, weeklyGroup: 280, monthlyGroup: 240 },
    { month: "Jun", dailyGroup: 380, weeklyGroup: 320, monthlyGroup: 260 },
    { month: "Jul", dailyGroup: 400, weeklyGroup: 350, monthlyGroup: 280 },
    { month: "Aug", dailyGroup: 360, weeklyGroup: 330, monthlyGroup: 300 },
    { month: "Sept", dailyGroup: 390, weeklyGroup: 360, monthlyGroup: 320 },
    { month: "Oct", dailyGroup: 350, weeklyGroup: 340, monthlyGroup: 300 },
    { month: "Nov", dailyGroup: 320, weeklyGroup: 310, monthlyGroup: 280 },
    { month: "Dec", dailyGroup: 280, weeklyGroup: 260, monthlyGroup: 240 },
  ]

  const chartHeight = 300
  const chartWidth = 1000
  const padding = 60
  const graphWidth = chartWidth - padding * 2
  const graphHeight = chartHeight - padding * 2

  const maxValue = 400
  const minValue = 0

  const barWidth = 20
  const groupWidth = barWidth * 3 + 10 // 3 bars per group with 5px spacing between bars
  const getX = (index: number, barIndex: number) => 
    padding + (index * (groupWidth + 20)) + (barIndex * (barWidth + 5))
  const getY = (value: number) => 
    chartHeight - padding - ((value - minValue) / (maxValue - minValue)) * graphHeight
  const getHeight = (value: number) => 
    ((value - minValue) / (maxValue - minValue)) * graphHeight

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Wealth Rotation Insights</h2>

      <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="mb-6">
        {/* Grid lines */}
        {[0, 100, 200, 300, 400].map((value) => (
          <g key={value}>
            <line
              x1={padding}
              y1={getY(value)}
              x2={chartWidth - padding}
              y2={getY(value)}
              stroke="var(--color-border)"
              strokeDasharray="4"
              strokeWidth="1"
            />
            <text
              x={padding - 10}
              y={getY(value) + 4}
              fontSize="12"
              textAnchor="end"
              fill="var(--color-muted-foreground)"
            >
              {value}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {data.map((d, index) => (
          <text
            key={d.month}
            x={getX(index, 1)}
            y={chartHeight - padding + 20}
            fontSize="12"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
          >
            {d.month}
          </text>
        ))}

        {/* Bars */}
        {data.map((d, index) => (
          <g key={`bars-${index}`}>
            {/* Daily Group Bar */}
            <rect
              x={getX(index, 0)}
              y={getY(d.dailyGroup)}
              width={barWidth}
              height={getHeight(d.dailyGroup)}
              fill="#D946EF"
            />
            {/* Weekly Group Bar */}
            <rect
              x={getX(index, 1)}
              y={getY(d.weeklyGroup)}
              width={barWidth}
              height={getHeight(d.weeklyGroup)}
              fill="#F97316"
            />
            {/* Monthly Group Bar */}
            <rect
              x={getX(index, 2)}
              y={getY(d.monthlyGroup)}
              width={barWidth}
              height={getHeight(d.monthlyGroup)}
              fill="#22C55E"
            />
          </g>
        ))}
      </svg>

      <div className="flex gap-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#D946EF]" />
          <span className="text-sm text-muted-foreground">Daily Group</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F97316]" />
          <span className="text-sm text-muted-foreground">Weekly Group</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
          <span className="text-sm text-muted-foreground">Monthly Group</span>
        </div>
      </div>
    </div>
  )
}
