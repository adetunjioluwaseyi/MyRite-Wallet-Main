export function WealthRotationMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-purple-950 to-purple-900 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Average wallet inflow</p>
            <p className="text-3xl font-bold">271m</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-lg">📊</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">No. Of Members</p>
            <p className="text-3xl font-bold">1,000</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-lg">👥</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">New Members</p>
            <p className="text-3xl font-bold">405</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-lg">✨</span>
          </div>
        </div>
      </div>
    </div>
  )
}
