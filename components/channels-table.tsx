"use client"

export function ChannelsTable() {
  const channels = [
    {
      id: 1,
      name: "Flexible",
      icon: "📦",
      members: 4,
      budget: "L6m",
      completion: "68%",
      completionColor: "bg-purple-500",
    },
    {
      id: 2,
      name: "Target Achievers",
      icon: "🎯",
      members: 3,
      budget: "3m",
      completion: "18%",
      completionColor: "bg-blue-500",
    },
    {
      id: 3,
      name: "Instant Access",
      icon: "⚡",
      members: 2,
      budget: "L10m",
      completion: "100%",
      completionColor: "bg-green-500",
    },
  ]

  return (
    <div className="bg-card rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-6">Channels</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Channel</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Members</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Budget</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Completion</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((channel) => (
              <tr key={channel.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{channel.icon}</div>
                    <span className="font-medium text-foreground">{channel.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex -space-x-2">
                    {[...Array(channel.members)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-card"
                        title={`Member ${i + 1}`}
                      />
                    ))}
                  </div>
                </td>
                <td className="py-4 px-4 text-foreground">{channel.budget}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-xs">
                      <div className={`h-full ${channel.completionColor}`} style={{ width: channel.completion }} />
                    </div>
                    <span className="text-sm text-muted-foreground">{channel.completion}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button className="bg-primary text-white font-semibold py-2 px-6 rounded-full hover:bg-primary/90 transition-colors text-sm">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
