"use client"

import { useState, useEffect } from "react"
import { TargetAchieversMetrics } from "./target-achievers-metrics"

interface JoinRequest {
  targetName: string
  id: string
  name: string
  mobile: string
  balance: string   // ✅ make balance numeric
  salary: string   // ✅ make salary numeric
  groupCode: string
}

export function TargetAchieversGroups() {
  const [requests, setRequests] = useState<JoinRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Search State
  const [searchTerm, setSearchTerm] = useState("")

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 7

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/pending/target")
        if (!response.ok) throw new Error("Failed to fetch requests")

        const json = await response.json()
        const items = Array.isArray(json.details) ? json.details : []

        // const formatted: JoinRequest[] = items.map((item: any) => ({
        //   id: item.mobile ?? "",
        //   name: item.name ?? "Unknown",
        //   mobile: item.mobile ?? "N/A",
        //   salary: Number(item.salary) || 0,   // ✅ convert to number
        //   groupCode: item.groupCode ?? "N/A",
        //   targetName: item.targetName ?? "N/A",
        // }))

        const formatted: JoinRequest[] = items.map((item: any) => {
          // Log the raw salary value from the API
          console.log("Raw salary from API:", item.salary, "Type:", typeof item.salary)

          return {
            id: item.mobile ?? "",
            name: item.name ?? "Unknown",
            mobile: item.mobile ?? "N/A",
            salary: item.salary ?? "N/A",
            balance: item.balance ?? "N/A",
            targetName: item.targetName ?? "N/A",
            groupCode: item.groupCode ?? "N/A",
          }
        })

        setRequests(formatted)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  // Filter requests based on search term
  const filteredRequests = requests.filter((req) => {
    const term = searchTerm.toLowerCase()
    return (
      req.name.toLowerCase().includes(term) ||
      req.mobile.toLowerCase().includes(term) ||
      req.targetName.toLowerCase().includes(term) ||
      req.salary.toLowerCase().includes(term) ||
      req.balance.toLowerCase().includes(term)
    )
  })

  // Calculate pagination properties
  const totalPages = Math.ceil(filteredRequests.length / pageSize) || 1
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const totalBalance = requests.reduce((sum, req) => sum + Number(req.salary), 0)

  if (loading) return <p className="p-6">Loading requests...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Target Achievers Groups</h2>

      {/* Metrics card */}
      {/* <TargetAchieversMetrics totalBalance={totalBalance} /> */}

      {/* Search Input Control */}
      <div className="mb-6 max-w-md">
        <label className="block mb-1 text-sm font-medium">Search</label>
        <input
          type="text"
          placeholder="Search by name, mobile, target name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1) // Reset to page 1 on query change
          }}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-900"
        />
      </div>

      {/* Table */}
      <table className="w-full mt-6">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">NAME</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">MOBILE</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">SALARY</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">BALANCE</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">TARGETNAME</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRequests.length > 0 ? (
            paginatedRequests.map((req) => (
              <tr key={req.id}>
                <td className="px-4 py-2 border">{req.name}</td>
                <td className="px-4 py-2 border">{req.mobile}</td>
                <td className="px-4 py-2 border">{req.salary}</td>
                <td className="px-4 py-2 border">{req.balance}</td>
                <td className="px-4 py-2 border">{req.targetName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-6 text-muted-foreground">
                No records matching &quot;{searchTerm}&quot;
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {filteredRequests.length > pageSize && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            className="px-3 py-1 rounded border disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded border disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}