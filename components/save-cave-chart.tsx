export function SaveCaveChart() {
  // sample data (values in thousands, max 250)
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ]

  const flexible = [80, 100, 90, 110, 60, 70, 120, 95, 85, 105, 98, 110]
  const target = [60, 80, 70, 50, 90, 85, 75, 95, 70, 100, 120, 130]
  const weekly = [70, 90, 85, 95, 80, 95, 60, 75, 95, 85, 105, 100]

  const maxValue = 250 // corresponds to top of chart (250k)

  const valueToY = (v: number) => {
    // chart area maps values [0..maxValue] to y coords [260..20]
    const height = 240 // 260 - 20
    return 20 + (1 - v / maxValue) * height
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">SaveCave Insights</h2>

      {/* SVG Chart - Grouped Bar Chart */}
      <svg width="100%" height="300" viewBox="0 0 700 300" className="mb-4">
        {/* Grid lines */}
        {[0, 50, 100, 150, 200, 250].map((y) => (
          <line key={y} x1="60" y1={250 - y} x2="680" y2={250 - y} stroke="#e5e7eb" strokeWidth="1" />
        ))}

        {/* Y-axis */}
        <line x1="60" y1="20" x2="60" y2="260" stroke="#d1d5db" strokeWidth="2" />
        {/* X-axis */}
        <line x1="60" y1="260" x2="680" y2="260" stroke="#d1d5db" strokeWidth="2" />

        {/* Y-axis labels */}
        <text x="40" y="265" fontSize="12" fill="#9ca3af" textAnchor="end">
          0
        </text>
        <text x="40" y="215" fontSize="12" fill="#9ca3af" textAnchor="end">
          50k
        </text>
        <text x="40" y="165" fontSize="12" fill="#9ca3af" textAnchor="end">
          100k
        </text>
        <text x="40" y="115" fontSize="12" fill="#9ca3af" textAnchor="end">
          150k
        </text>
        <text x="40" y="65" fontSize="12" fill="#9ca3af" textAnchor="end">
          200k
        </text>
        <text x="40" y="25" fontSize="12" fill="#9ca3af" textAnchor="end">
          250k
        </text>

        {/* X-axis labels */}
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"].map((month, i) => (
          <text key={month} x={80 + i * 50} y="280" fontSize="12" fill="#9ca3af" textAnchor="middle">
            {month}
          </text>
        ))}

        {/* Grouped bars for each month (3 series) */}
        {months.map((m, i) => {
          const baseX = 80 + i * 50
          const groupWidth = 30
          const barWidth = 8
          const gap = 4

          const x1 = baseX - groupWidth / 2
          const bars = [
            { value: flexible[i], color: "#ef4444", offset: 0 },
            { value: target[i], color: "#10b981", offset: barWidth + gap },
            { value: weekly[i], color: "#a855f7", offset: 2 * (barWidth + gap) },
          ]

          return (
            <g key={m}>
              {bars.map((b, idx) => {
                const barHeight = 260 - valueToY(b.value)
                const x = x1 + b.offset
                const y = valueToY(b.value)
                return (
                  <rect
                    key={idx}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={b.color}
                    rx={2}
                  />
                )
              })}
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm text-muted-foreground">Flexible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-muted-foreground">Target Achievers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span className="text-sm text-muted-foreground">Flexible Weekly</span>
        </div>
      </div>
    </div>
  )
}
