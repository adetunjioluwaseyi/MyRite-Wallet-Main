export function TargetAchieversMetrics({ totalBalance = 0 }: { totalBalance?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-green-950 to-green-900 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Target Inflow</p>
            <p className="text-3xl font-bold">
              {Number(totalBalance).toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-lg">🎯</span>
          </div>
        </div>
      </div>
    </div>
  )
}
