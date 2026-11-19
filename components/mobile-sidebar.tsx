"use client"

import { useState } from "react"
import {
  TrendingUp,
  Gift,
  LayoutDashboard,
  Menu,
  X,
  LogOut,
  Users,
  Bell,
  FileText,
  ChevronDown,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function MobileSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const isDashboard = pathname === "/dashboard"

  const toggleExpand = (item: string) => {
    setExpandedItem((prev) => (prev === item ? null : item))
  }

  const isExpanded = (item: string) => expandedItem === item

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeMenu}
          ></div>

          {/* Sidebar */}
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border p-4 flex flex-col h-screen overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <img
                src="/logo.png"
                alt="MyRite Wallet Logo"
                className="h-10 w-auto"
              />
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
              {/* Dashboard */}
              <a
                href="/dashboard"
                onClick={closeMenu}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
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
                </button>

                {isExpanded("wealth-rotation") && (
                  <div className="space-y-1 mt-1 ml-2 pl-3 border-l border-muted text-xs">
                    <a
                      href="/wealth-rotation/overview"
                      onClick={closeMenu}
                      className="block px-2 py-1 rounded hover:bg-muted text-muted-foreground"
                    >
                      Overview
                    </a>
                    <a
                      href="/wealth-rotation/daily"
                      onClick={closeMenu}
                      className="block px-2 py-1 rounded hover:bg-muted text-muted-foreground"
                    >
                      Daily Group
                    </a>
                    <a
                      href="/wealth-rotation/weekly"
                      onClick={closeMenu}
                      className="block px-2 py-1 rounded hover:bg-muted text-muted-foreground"
                    >
                      Weekly Group
                    </a>
                    <a
                      href="/wealth-rotation/monthly"
                      onClick={closeMenu}
                      className="block px-2 py-1 rounded hover:bg-muted text-muted-foreground"
                    >
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
                </button>

                {isExpanded("save-cave") && (
                  <div className="space-y-1 mt-1 ml-2 pl-3 border-l border-muted text-xs">
                    <a
                      href="/save-cave/overview"
                      onClick={closeMenu}
                      className="block px-2 py-1 rounded hover:bg-muted text-muted-foreground"
                    >
                      Overview
                    </a>
                    <a
                      href="/save-cave/flexible-savings"
                      onClick={closeMenu}
                      className="block px-2 py-1 rounded hover:bg-muted text-muted-foreground"
                    >
                      Flexible Savings
                    </a>
                    <a
                      href="/save-cave/target-achievers"
                      onClick={closeMenu}
                      className="block px-2 py-1 rounded hover:bg-muted text-muted-foreground"
                    >
                      Target Achievers
                    </a>
                    <a
                      href="/save-cave/instant-access"
                      onClick={closeMenu}
                      className="block px-2 py-1 rounded hover:bg-muted text-muted-foreground"
                    >
                      Instant Access
                    </a>
                  </div>
                )}
              </div>

              {/* View Wallets Dropdown */}
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
                    <span className="font-medium">View Wallets</span>
                  </span>
                </button>

                {isExpanded("view-wallets") && (
                  <div className="space-y-1 mt-1 ml-2 pl-3 border-l border-muted text-xs">
                    <a
                      href="/view-wallets"
                      onClick={closeMenu}
                      className="block px-2 py-1 rounded hover:bg-muted text-muted-foreground"
                    >
                      View Wallet
                    </a>
                    <a
                      href="/customer"
                      onClick={closeMenu}
                      className="block px-2 py-1 rounded hover:bg-muted text-muted-foreground"
                    >
                      All Customers
                    </a>
                    <a
                      href="/group"
                      onClick={closeMenu}
                      className="block px-2 py-1 rounded hover:bg-muted text-muted-foreground"
                    >
                      All Groups
                    </a>
                    <a
                      href="/tags"
                      onClick={closeMenu}
                      className="block px-2 py-1 rounded hover:bg-muted text-muted-foreground"
                    >
                      All Tags
                    </a>
                  </div>
                )}
              </div>

              {/* Payment Dropdown */}
              <div>
                <button
                  onClick={() => toggleExpand("payment")}
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-sm ${
                    pathname.includes("payment-approval") || pathname.includes("seerbit")
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Gift className="w-5 h-5" />
                    <span className="font-medium">Payment</span>
                  </span>
                </button>

                {isExpanded("payment") && (
                  <div className="space-y-1 mt-1 ml-2 pl-3 border-l border-muted text-xs">
                    <a
                      href="/payment-approval"
                      onClick={closeMenu}
                      className="block px-2 py-1 rounded hover:bg-muted text-muted-foreground"
                    >
                      All Ajo
                    </a>
                    <a
                      href="/seerbit"
                      onClick={closeMenu}
                      className="block px-2 py-1 rounded hover:bg-muted text-muted-foreground"
                    >
                      Seerbit Transactions
                    </a>
                  </div>
                )}
              </div>

              {/* Add to Group */}
              <a
                href="/add-to-group"
                onClick={closeMenu}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                  pathname.includes("add-to-group")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">Add to Group</span>
              </a>

              {/* Assign Pack Number */}
              <a
                href="/assign-pack-number"
                onClick={closeMenu}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                  pathname.includes("assign-pack-number")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">Assign Pack Number</span>
              </a>

              {/* Create Group */}
              <a
                href="/admin/groups/create"
                onClick={closeMenu}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                  pathname === "/admin/groups/create"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">Create Group</span>
              </a>

              {/* Profile */}
              <a
                href="/admin-edit"
                onClick={closeMenu}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                  pathname.includes("admin-edit")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </a>

              {/* Notifications */}
              <a
                href="/notifications"
                onClick={closeMenu}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                  pathname.includes("notifications")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="font-medium">Notifications</span>
              </a>

              {/* KYC */}
              <a
                href="/kyc"
                onClick={closeMenu}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                  pathname.includes("kyc")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="font-medium">KYC</span>
              </a>
            </nav>

            {/* Sign Out */}
            <a
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-sm"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </a>
          </aside>
        </div>
      )}
    </>
  )
}
