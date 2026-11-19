import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

export function WealthRotationGroups() {
  const groups = [
    {
      id: 1,
      name: "Daily",
      members: 4,
      budget: "14k",
      completion: 60,
      icon: "📅",
    },
    {
      id: 2,
      name: "Weekly",
      members: 3,
      budget: "9k",
      completion: 18,
      icon: "📆",
    },
    {
      id: 3,
      name: "Monthly",
      members: 2,
      budget: "310k",
      completion: 100,
      icon: "📊",
    },
  ]

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Wealth Rotation Groups</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">GROUP</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">MEMBERS</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">BUDGET</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">COMPLETION</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{group.icon}</span>
                    <span className="font-medium text-foreground">{group.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex -space-x-2">
                    {Array.from({ length: group.members }).map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-card flex items-center justify-center text-xs text-white font-bold"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-4 text-foreground font-medium">{group.budget}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-xs">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                        style={{ width: `${group.completion}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground min-w-fit">{group.completion}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Link href={`/wealth-rotation/${group.name.toLowerCase()}`} className="text-sm text-purple-600 hover:underline" > View </Link>

                  {/* <button className="text-sm text-white-200 bg-purple hover:underline">view</button> */}
                  
                  {/* <DropdownMenu>
                     <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-transparent hover:bg-accent">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger> 
                    <DropdownMenuContent align="center" sideOffset={4}>
                      <DropdownMenuItem>Daily Savings</DropdownMenuItem>
                      <DropdownMenuItem>Weekly Savings</DropdownMenuItem>
                      <DropdownMenuItem>Monthly Savings</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete Group</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
