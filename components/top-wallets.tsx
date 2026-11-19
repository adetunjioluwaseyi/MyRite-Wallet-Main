import { Card } from "@/components/ui/card"

const wallets = [
  { id: "01", name: "Target Achievers", popularity: 45, color: "#0095ff" },
  { id: "02", name: "Monthly", popularity: 29, color: "#00e096" },
  { id: "03", name: "Daily", popularity: 18, color: "#800080" },
  { id: "04", name: "Instance Access", popularity: 25, color: "#ffa412" },
]

export function TopWallets() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Top Wallets</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4 text-sm text-muted-foreground font-medium mb-4">
          <div>#</div>
          <div>Name</div>
          <div>Popularity</div>
          <div>Sales</div>
        </div>
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className="grid grid-cols-4 gap-4 items-center py-3 border-b border-border last:border-b-0"
          >
            <div className="font-medium text-foreground">{wallet.id}</div>
            <div className="text-foreground">{wallet.name}</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${wallet.popularity}%`, backgroundColor: wallet.color }}
                ></div>
              </div>
            </div>
            <div className="text-sm font-medium text-foreground border border-border rounded-full px-3 py-1 text-center">
              {wallet.popularity}%
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
