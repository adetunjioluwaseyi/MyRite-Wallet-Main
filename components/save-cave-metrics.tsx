export function SaveCaveMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium opacity-90">Average wallet inflow</span>
          <div className="w-6 h-6 bg-blue-400 rounded flex items-center justify-center">
            <span className="text-xs">📊</span>
          </div>
        </div>
        <div className="text-3xl font-bold">27m</div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium opacity-90">No. Of Members</span>
          <div className="w-6 h-6 bg-blue-400 rounded flex items-center justify-center">
            <span className="text-xs">👥</span>
          </div>
        </div>
        <div className="text-3xl font-bold">1,200</div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium opacity-90">New Members</span>
          <div className="w-6 h-6 bg-blue-400 rounded flex items-center justify-center">
            <span className="text-xs">✨</span>
          </div>
        </div>
        <div className="text-3xl font-bold">500</div>
      </div>
    </div>
  )
}
