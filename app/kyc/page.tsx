"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

interface JoinRequest {
  customerMobile: string
  customerAddress: string
  customerName: string
  gender: string
  maritalStatus: string
  nokName: string
  nokMobile: string
  nokAddress: string
  nokEmail: string
  employmentStatus: string
  kycStatus: string
}

export default function Kyc() {
  const [requests, setRequests] = useState<JoinRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Search and Pagination States
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/kyc")
        if (!response.ok) throw new Error("Failed to fetch requests")

        const json = await response.json()
        const items = Array.isArray(json.details) ? json.details : []

        const formatted: JoinRequest[] = items.map((item: any) => ({
          customerMobile: item.customerMobile ?? "",
          customerAddress: item.customerAddress ?? "",
          customerName: item.customerName ?? "",
          gender: item.gender ?? "",
          maritalStatus: item.maritalStatus ?? "",
          nokName: item.nokName ?? "",
          nokMobile: item.nokMobile ?? "",
          nokAddress: item.nokAddress ?? "",
          nokEmail: item.nokEmail ?? "",
          employmentStatus: item.employmentStatus ?? "",
          kycStatus: item.kycStatus ?? "",
        }))

        setRequests(formatted)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(
        `http://94.72.111.23:2000/myritewallet/v1/KYC/APPROVE`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mobile: id,
            status: "approved",
            approvedBy: "admin",
          }),
        }
      )

      if (!response.ok) throw new Error("Failed to approve request")

      setRequests((prev) =>
        prev.map((req) =>
          req.nokMobile === id ? { ...req, kycStatus: "approved" } : req
        )
      )
    } catch (err) {
      console.error("Approve failed:", err)
      alert("Failed to approve request")
    }
  }

  const handleDecline = async (id: string) => {
    try {
      const response = await fetch(
        `http://94.72.111.23:2000/myritewallet/v1/KYC/DECLINE`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: id }),
        }
      )

      if (!response.ok) throw new Error("Failed to decline request")

      setRequests((prev) =>
        prev.map((req) =>
          req.nokMobile === id ? { ...req, kycStatus: "declined" } : req
        )
      )
    } catch (err) {
      console.error("Decline failed:", err)
      alert("Failed to decline request")
    }
  }

  // Filter requests across all fields based on search input
  const filteredRequests = requests.filter((req) => {
    const term = searchTerm.toLowerCase()
    return (
      req.customerMobile.toLowerCase().includes(term) ||
      req.customerAddress.toLowerCase().includes(term) ||
      req.customerName.toLowerCase().includes(term) ||
      req.gender.toLowerCase().includes(term) ||
      req.maritalStatus.toLowerCase().includes(term) ||
      req.nokName.toLowerCase().includes(term) ||
      req.nokMobile.toLowerCase().includes(term) ||
      req.nokAddress.toLowerCase().includes(term) ||
      req.nokEmail.toLowerCase().includes(term) ||
      req.employmentStatus.toLowerCase().includes(term) ||
      req.kycStatus.toLowerCase().includes(term)
    )
  })

  // Calculate pagination properties
  const totalPages = Math.ceil(filteredRequests.length / pageSize) || 1
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  if (loading) return <p className="p-6">Loading requests...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-bold mb-4">KYC LISTS</h1>

            {/* Search Input */}
            <div className="mb-4 max-w-md">
              <input
                type="text"
                placeholder="Search KYC records by  mobile.."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full border px-3 py-2 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Customer Mobile</th>
                    <th className="px-4 py-2 border">Customer Address</th>
                    <th className="px-4 py-2 border">customerName</th>
                    <th className="px-4 py-2 border">Gender</th>
                    <th className="px-4 py-2 border">Marital Status</th>
                    <th className="px-4 py-2 border">Next of Kin Name</th>
                    <th className="px-4 py-2 border">Next of Kin Mobile</th>
                    <th className="px-4 py-2 border">Next of Kin Address</th>
                    <th className="px-4 py-2 border">Next of Kin Email</th>
                    <th className="px-4 py-2 border">Employment Status</th>
                    <th className="px-4 py-2 border">KYC Status</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRequests.length > 0 ? (
                    paginatedRequests.map((req) => (
                      <tr key={req.nokMobile}>
                        <td className="px-4 py-2 border">{req.customerMobile}</td>
                        <td className="px-4 py-2 border">{req.customerAddress}</td>
                        <td className="px-4 py-2 border">{req.customerName}</td>
                        <td className="px-4 py-2 border">{req.gender}</td>
                        <td className="px-4 py-2 border">{req.maritalStatus}</td>
                        <td className="px-4 py-2 border">{req.nokName}</td>
                        <td className="px-4 py-2 border">{req.nokMobile}</td>
                        <td className="px-4 py-2 border">{req.nokAddress}</td>
                        <td className="px-4 py-2 border">{req.nokEmail}</td>
                        <td className="px-4 py-2 border">{req.employmentStatus}</td>
                        <td className="px-4 py-2 border">{req.kycStatus}</td>
                        <td className="px-4 py-2 border space-x-2">
                          {req.kycStatus === "pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(req.nokMobile)}
                                className="px-3 py-1 bg-green-500 text-white rounded"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleDecline(req.nokMobile)}
                                className="px-3 py-1 bg-red-500 text-white rounded"
                              >
                                Decline
                              </button>
                            </>
                          )}
                          {req.kycStatus === "approved" && (
                            <span className="text-green-600 font-semibold">
                              ✔ Approved
                            </span>
                          )}
                          {req.kycStatus === "declined" && (
                            <span className="text-red-600 font-semibold">
                              ✘ Declined
                            </span>
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