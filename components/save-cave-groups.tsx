import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

export function SaveCaveGroups() {
  const groups = [
    {
      id: 1,
      name: "Flexible Savings",
      icon: "📱",
      members: ["👤", "👤", "👤", "👤"],
      budget: "₦1m",
      completion: 65,
      memberCount: "30 items in group",
    },
    {
      id: 2,
      name: "Target Achievers",
      icon: "🎯",
      members: ["👤", "👤", "👤"],
      budget: "₦1m",
      completion: 19,
      memberCount: "25 items in group",
    },
    {
      id: 3,
      name: "Instant Access",
      icon: "⚡",
      members: ["👤", "👤"],
      budget: "₦10m",
      completion: 100,
      memberCount: "40 items in group",
    },
  ]

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">SaveCave Groups</h2>
        <span className="text-sm text-muted-foreground">30 items in group</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 font-semibold text-foreground text-sm">CHANNELS</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground text-sm">MEMBERS</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground text-sm">BUDGET</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground text-sm">COMPLETION</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-muted rounded flex items-center justify-center text-sm">
                      {group.icon}
                    </div>
                    <span className="font-medium text-foreground">{group.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-1">
                    {group.members.map((member, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-xs text-white"
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-foreground font-medium">{group.budget}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${group.completion}%` }} />
                    </div>
                    <span className="text-sm text-foreground font-medium w-12 text-right">{group.completion}%</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Link href={`/save-cave/${group.name.toLowerCase()}`} className="text-sm text-purple-600 hover:underline" > View </Link>
                  {/* <button className="text-sm text-white-200 bg-purple hover:underline">view</button> */}
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-transparent hover:bg-accent">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" sideOffset={4}>
                      <DropdownMenuItem>Flexible Savings</DropdownMenuItem>
                      <DropdownMenuItem>Target Achievers</DropdownMenuItem>
                      <DropdownMenuItem>Instant Access</DropdownMenuItem>
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
