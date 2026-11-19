"use client"

import { BarChart3, TrendingUp, ShoppingCart, FileText, Send, Bell, LogOut, LayoutDashboard, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"

export function Sidebar({ currentPage }: { currentPage?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const isDashboard = pathname === "/"
  const isWealthRotation = pathname.includes("wealth-rotation")

  return (
    <aside className="w-64 bg-card border-r border-border p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <img 
          src="/logo.png" 
          alt="MyRite Wallet Logo" 
          className="h-10 w-auto"
        />
      </div>

      <nav className="space-y-2 flex-1">
        <a
          href="/dashboard"
          className={`w-full justify-start gap-3 rounded-full flex items-center px-4 py-2 transition-colors ${
            isDashboard
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </a>

        <div className="space-y-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={`w-full justify-between flex items-center px-4 py-2 transition-colors rounded-lg cursor-pointer ${
                  isWealthRotation
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5" />
                  <span>Wealth Rotation</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start" sideOffset={8}>
              <DropdownMenuItem onClick={() => window.location.href = '/wealth-rotation'}>
                Overview
              </DropdownMenuItem>
              <DropdownMenuItem>Daily Savings</DropdownMenuItem>
                      <DropdownMenuItem>Weekly Savings</DropdownMenuItem>
                      <DropdownMenuItem>Monthly Savings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={`w-full justify-between flex items-center px-4 py-2 transition-colors rounded-lg cursor-pointer ${
                  pathname.includes("save-cave")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5" />
                  <span>SaveCave</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start" sideOffset={8}>
              <DropdownMenuItem onClick={() => window.location.href = '/save-cave'}>
                Overview
              </DropdownMenuItem>
              <DropdownMenuItem>Flexible Savings</DropdownMenuItem>
                      <DropdownMenuItem>Target Achievers</DropdownMenuItem>
                      <DropdownMenuItem>Instant Access</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
            <ShoppingCart className="w-5 h-5" />
            <span>Savings Rotation</span>
          </Button>
        </div> */}

        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
          <FileText className="w-5 h-5" />
          <span>View Wallets</span>
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
          <BarChart3 className="w-5 h-5" />
          <span>Payment Approvals</span>
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
          <Send className="w-5 h-5" />
          <span>Send Messages</span>
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </Button>

        {/* Added Reports link to sidebar navigation */}
        <div className="space-y-1">
          <a
            href="/reports"
            className={`w-full justify-start gap-3 flex items-center px-4 py-2 transition-colors rounded-lg ${
              pathname.includes("reports")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Reports</span>
          </a>
        </div>

        
      </nav>

      <Button
        variant="ghost"
        className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
        onClick={() => router.push('/')}
      >
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </Button>
    </aside>
  )
}
