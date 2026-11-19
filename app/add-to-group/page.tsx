"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

interface JoinRequest {
  requestId: string
  mobile: string
  name: string
  salary: string
  groupCode: string
  groupMode: string
  paymentInterval: string
  duration: string
  amount: string
  cashout: string
  status: "pending" | "approved" | "declined"
  createdAt?: string
}

function rowClass(groupMode: string, status: string): string {
  const mode = (groupMode || "").toLowerCase()
  if (status === "approved") return "bg-green-100"
  if (status === "declined") return "bg-red-100"
  if (mode === "wealth") return "bg-purple-50"
  if (mode === "flexible") return "bg-blue-50"
  if (mode === "instant") return "bg-green-50"
  if (mode === "target") return "bg-yellow-50"
  if (mode === "daily") return "bg-pink-50"
  if (mode === "weekly") return "bg-indigo-50"
  if (mode === "monthly") return "bg-orange-50"
  return ""
}

export default function AddToGroupPage() {
  const [requests, setRequests] = useState<JoinRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Search & Pagination state
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  const safeJson = async (res: Response) => {
    const text = await res.text()
    try {
      return text ? JSON.parse(text) : {}
    } catch {
      return {}
    }
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const [wealth] = await Promise.all([
          fetch("/api/pending/wealth").then(safeJson),
        //   fetch("/api/pending/target").then(safeJson),
        //   fetch("/api/pending/instant").then(safeJson),
        //   fetch("/api/pending/flexible").then(safeJson),
        ])

        const allItems = [
          ...(wealth.details || []),
        //   ...(target.details || []),
        //   ...(instant.details || []),
        //   ...(flexible.details || []),
        ]

        const formatted: JoinRequest[] = allItems.map((item: any) => ({
          requestId: item.requestID ?? `${item.mobile}-${Date.now()}`,
          mobile: item.mobile ?? "",
          name: item.name ?? "Unknown",
          salary: item.salary ?? "N/A",
          groupCode: item.groupCode ?? "UNKNOWN",
          groupMode: item.groupMode ?? "N/A",
          paymentInterval: item.paymentInterval ?? "N/A",
          duration: item.duration ?? "N/A",
          amount: item.amount ?? "N/A",
          cashout: item.cashout ?? "N/A",
          status: "pending",
          createdAt: item.createdAt ?? "",
        }))

        setRequests(formatted)
      } catch (err: any) {
        setLoadError(err?.message ?? "Failed to fetch requests")
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  // Approve via proxy (send all fields)
  const handleApprove = async (req: JoinRequest) => {
    setActionError(null)

    try {
      const payload = {
        mobile: req.mobile,
        groupCode: req.groupCode,
        requestId: req.requestId,   // use lowercase "Id"
        status: "approved",
        approvedBy: "admin",
        approvedOn: new Date().toISOString(),
      }

      console.log("Approve payload:", payload)

      const response = await fetch("/api/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const text = await response.text()
        console.error("Approve failed response:", response.status, text)
        throw new Error(text || "Failed to approve request")
      }

      setRequests(prev =>
        prev.map(r => r.requestId === req.requestId ? { ...r, status: "approved" } : r)
      )

    } catch (err: any) {
      const message = err?.message || "Network error"
      console.error("Approve failed:", err)
      setActionError(message)
      toast({
        title: "Approve failed",
        description: message,
        variant: "destructive",
      })
      return
    }
  }

  // Decline via proxy (send all fields)
  const handleDecline = async (req: JoinRequest) => {
    try {
      setActionError(null)

      const payload = {
        mobile: req.mobile,
        groupCode: req.groupCode,
        requestId: req.requestId,
        status: "declined",
        approvedBy: "admin", // or declinedBy if backend expects that
        approvedOn: new Date().toISOString(),
      }

      console.log("Decline payload:", payload)

      const response = await fetch("/api/decline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const responseText = await response.text()
        let errorMessage = responseText

        try {
          const errorJson = JSON.parse(responseText)
          errorMessage = errorJson?.error || errorJson?.message || responseText
        } catch {
          // keep raw text if JSON parsing fails
        }

        console.error("Decline failed response:", response.status, errorMessage)
        throw new Error(
          errorMessage || "Unable to decline request. Please try again later."
        )
      }

      setRequests(prev =>
        prev.map(r => r.requestId === req.requestId ? { ...r, status: "declined" } : r)
      )

      toast({
        title: "Request declined",
        description: "The request has been declined successfully.",
        variant: "default",
      })
    } catch (err: any) {
      const message = err?.message || "Network error"
      console.error("Decline failed:", err)
      setActionError(message)
      toast({
        title: "Decline failed",
        description: message,
        variant: "destructive",
      })
    }
  }

  // Filter requests based on search term
  const filteredRequests = requests.filter((req) => {
    const term = searchTerm.toLowerCase()
    return (
      req.requestId.toLowerCase().includes(term) ||
      req.mobile.toLowerCase().includes(term) ||
      req.name.toLowerCase().includes(term) ||
      req.salary.toLowerCase().includes(term) ||
      req.groupCode.toLowerCase().includes(term) ||
      req.groupMode.toLowerCase().includes(term) ||
      req.paymentInterval.toLowerCase().includes(term) ||
      req.duration.toLowerCase().includes(term) ||
      req.amount.toLowerCase().includes(term) ||
      req.cashout.toLowerCase().includes(term) ||
      req.status.toLowerCase().includes(term)
    )
  })

  // Calculate pagination boundaries
  const totalPages = Math.ceil(filteredRequests.length / pageSize) || 1
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  if (loading) return <p className="p-6">Loading requests...</p>
  if (loadError) return <p className="p-6 text-red-600">Error: {loadError}</p>

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Pending Requests</h1>

            {/* Search Bar */}
            <div className="mb-4 max-w-md">
              <input
                type="text"
                placeholder="Search requests by mobile"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full border px-3 py-2 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {actionError && (
              <div className="mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-red-900">
                <p className="font-semibold">Action failed</p>
                <p>{actionError}</p>
              </div>
            )}

            <div className="w-full overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Request ID</th>
                    <th className="px-4 py-2 border">Mobile</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Salary</th>
                    <th className="px-4 py-2 border">Group Code</th>
                    <th className="px-4 py-2 border">Group Mode</th>
                    <th className="px-4 py-2 border">Payment Interval</th>
                    <th className="px-4 py-2 border">Duration</th>
                    <th className="px-4 py-2 border">Amount</th>
                    <th className="px-4 py-2 border">Cashout</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRequests.length > 0 ? (
                    paginatedRequests.map((req, index) => (
                      <tr
                        key={`${req.mobile}-${req.groupCode}-${index}`}
                        className={rowClass(req.groupMode, req.status)}
                      >
                        <td className="px-4 py-2 border">{req.requestId}</td>
                        <td className="px-4 py-2 border">{req.mobile}</td>
                        <td className="px-4 py-2 border">{req.name}</td>
                        <td className="px-4 py-2 border">{req.salary}</td>
                        <td className="px-4 py-2 border">{req.groupCode}</td>
                        <td className="px-4 py-2 border">{req.groupMode}</td>
                        <td className="px-4 py-2 border">{req.paymentInterval}</td>
                        <td className="px-4 py-2 border">{req.duration}</td>
                        <td className="px-4 py-2 border">{req.amount}</td>
                        <td className="px-4 py-2 border">{req.cashout}</td>
                        <td className="px-4 py-2 border">{req.status}</td>
                        <td className="px-4 py-2 border space-x-2">
                          {req.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(req)}
                                className="px-3 py-1 bg-green-500 text-white rounded"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleDecline(req)}
                                className="px-3 py-1 bg-red-500 text-white rounded"
                              >
                                Decline
                              </button>
                            </>
                          )}
                          {req.status === "approved" && (
                            <span className="text-green-600 font-semibold">✔ Approved</span>
                          )}
                          {req.status === "declined" && (
                            <span className="text-red-600 font-semibold">✘ Declined</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={12} className="text-center py-6 text-gray-500 border">
                        No records matching &quot;{searchTerm}&quot;
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

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
        </main>
      </div>
    </div>
  )
}