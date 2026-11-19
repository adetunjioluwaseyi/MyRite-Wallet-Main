"use client"

import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ReportsFilters() {
  return (
    <div className="bg-card rounded-lg p-4 mb-8 border border-border">
      <div className="flex gap-4 items-center flex-wrap">
        {/* Date Range */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">From</label>
          <input
            type="date"
            defaultValue="2022-11-15"
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">TO</label>
          <input
            type="date"
            defaultValue="2022-11-15"
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
          />
        </div>

        {/* Search */}
        <div className="flex-1 min-w-48 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input type="text" placeholder="Search here..." className="pl-10 py-2 bg-background border border-border" />
        </div>

        {/* Filter Button */}
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>
    </div>
  )
}
