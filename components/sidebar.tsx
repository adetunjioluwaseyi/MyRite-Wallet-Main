"use client"

import { useState } from "react"
import {
  TrendingUp,
  FileText,
  Bell,
  LayoutDashboard,
  Users,
  ChevronDown,
  LogOut,
  Gift,
} from "lucide-react"
import { usePathname } from "next/navigation"

export function Sidebar({ currentPage }: { currentPage?: string }) {
  const pathname = usePathname()
  // Track only one expanded item at a time
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const isDashboard = pathname === "/dashboard"

  const toggleExpand = (item: string) => {
    setExpandedItem((prev) => (prev === item ? null : item))
  }

  const isExpanded = (item: string) => expandedItem === item

  return (
    <aside className="hidden md:flex w-64 bg-card border-r border-border p-6 flex-col h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <img src="/logo.png" alt="MyRite Wallet Logo" className="h-10 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1 overflow-y-auto">
        {/* Dashboard */}
        <a
          href="/dashboard"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            isDashboard
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </a>

        {/* Wealth Rotation Dropdown */}
        <div>
          <button
            onClick={() => toggleExpand("wealth-rotation")}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-sm ${
              pathname.includes("wealth-rotation")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <span className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Wealth Rotation</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isExpanded("wealth-rotation") ? "rotate-180" : ""
              }`}
            />
          </button>

          {isExpanded("wealth-rotation") && (
            <div className="space-y-1 mt-1 ml-2 pl-3 border-l border-muted">
              <a href="/wealth-rotation/overview" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                Overview
              </a>
              <a href="/wealth-rotation/daily" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                Daily Group
              </a>
              <a href="/wealth-rotation/weekly" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                Weekly Group
              </a>
              <a href="/wealth-rotation/monthly" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                Monthly Group
              </a>
            </div>
          )}
        </div>

        {/* SaveCave Dropdown */}
        <div>
          <button
            onClick={() => toggleExpand("save-cave")}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-sm ${
              pathname.includes("save-cave")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <span className="flex items-center gap-3">
              <Gift className="w-5 h-5" />
              <span className="font-medium">SaveCave</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isExpanded("save-cave") ? "rotate-180" : ""
              }`}
            />
          </button>

          {isExpanded("save-cave") && (
            <div className="space-y-1 mt-1 ml-2 pl-3 border-l border-muted">
              <a href="/save-cave/overview" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                Overview
              </a>
              <a href="/save-cave/flexible-savings" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                Flexible Savings
              </a>
              <a href="/save-cave/target-achievers" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                Target Achievers
              </a>
              <a href="/save-cave/instant-access" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                Instant Access
              </a>
            </div>
          )}
        </div>

        {/* Other Links */}
        {/* <a
          href="/view-wallets"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("view-wallets")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">View Wallets</span>
        </a> */}

        {/* view wallet Dropdown */}
        <div>
          <button
            onClick={() => toggleExpand("view-wallets")}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-sm ${
              pathname.includes("view-wallets")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <span className="flex items-center gap-3">
              <Gift className="w-5 h-5" />
              <span className="font-medium">User Managment</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isExpanded("view-wallets") ? "rotate-180" : ""
              }`}
            />
          </button>

          {isExpanded("view-wallets") && (
            <div className="space-y-1 mt-1 ml-2 pl-3 border-l border-muted">
              <a href="/view-wallets" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                Device Activation
              </a>
              <a href="/customer" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                All Customers
              </a>
              <a href="/group" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                All Groups
              </a>
              <a href="/tags" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                All Tags
              </a>
              {/* <a href="/save-cave/target-achievers" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                Target Achievers
              </a>
              <a href="/save-cave/instant-access" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                Instant Access
              </a> */}
            </div>
          )}
        </div>

        
         {/* <a
          href="/payment-approval"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("payment-approval")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="font-medium">View Payment</span>
        </a>  */}

        <div>
          <button
            onClick={() => toggleExpand("payment-approval")}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-sm ${
              pathname.includes("payment-approval")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <span className="flex items-center gap-3">
              <Gift className="w-5 h-5" />
              <span className="font-medium">payment</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isExpanded("payment-approval") ? "rotate-180" : ""
              }`}
            />
          </button>

          {isExpanded("payment-approval") && (
            <div className="space-y-1 mt-1 ml-2 pl-3 border-l border-muted">
              <a href="/payment-approval" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                All Ajo
              </a>
              <a href="/seerbit" className="text-xs block px-2 py-1 rounded hover:bg-muted">
               Seerbit Transactions 
              </a>
              <a href="/view-withdraw" className="text-xs block px-2 py-1 rounded hover:bg-muted">
               view withdrawals
              </a>
              <a href="/update-withdrawl" className="text-xs block px-2 py-1 rounded hover:bg-muted">
               update withdrawals
              </a>
              {/* <a href="/group" className="text-xs block px-2 py-1 rounded hover:bg-muted">
                All Groups
              </a> */}
              
              
            </div>
          )}
        </div>

        <a
          href="/add-to-group"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("add-to-group")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">Add to Group</span>
        </a>

        <a
          href="/assign-pack-number"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("assign-pack-number")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">Assign Pack Number</span>
        </a>

        {/* <a
          href="/assign-user-to-group"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("assign-user-to-group")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">Assign User to Group</span>
        </a> */}

          <a
            href="/admin/groups/create"
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
              pathname === "/admin/groups/create"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Create Group</span>
          </a>

        {/* <a
          href="/reports"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("reports")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="font-medium">Reports</span>
        </a> */}

        <a
          href="/admin-edit"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("admin-edit")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">Profile</span>
        </a>

        {/* <button
  onClick={() => toggleExpand("notifications")}
  className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-sm ${
    pathname === "/notifications" || pathname === "/notifications-group"
      ? "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:text-foreground hover:bg-muted"
  }`}
>
  <span className="flex items-center gap-3">
    <Gift className="w-5 h-5" />
    <span className="font-medium">notifications</span>
  </span>
  <ChevronDown
    className={`w-4 h-4 transition-transform ${
      isExpanded("notifications") ? "rotate-180" : ""
    }`}
  />
</button>

{isExpanded("notifications") && (
  <div className="space-y-1 mt-1 ml-2 pl-3 border-l border-muted">
    <a
      href="/notifications"
      className={`text-xs block px-2 py-1 rounded hover:bg-muted ${
        pathname === "/notifications" ? "bg-primary text-primary-foreground" : ""
      }`}
    >
      All Notifications
    </a>
    <a
      href="/notifications-group"
      className={`text-xs block px-2 py-1 rounded hover:bg-muted ${
        pathname === "/notifications-group" ? "bg-primary text-primary-foreground" : ""
      }`}
    >
      Group Notifications
    </a>
  </div>
)} */}


        <a
          href="/notifications"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("notifications")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Bell className="w-5 h-5" />
          <span className="font-medium">Notifications</span>
        </a>

        <a
          href="/kyc"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("kyc")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Bell className="w-5 h-5" />
          <span className="font-medium">KYC</span>
        </a>

        <a
          href="/manual-posting"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("manual-posting")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Bell className="w-5 h-5" />
          <span className="font-medium">Manual Funding</span>
        </a>
      </nav>

      {/* Sign Out */}
      <a
        href="/"
        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Sign Out</span>
      </a>
    </aside>
  )
}
