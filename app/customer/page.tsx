"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

interface JoinRequest {
  firstName: string
  lastName: string
  email: string
  mobile: string
  dateOfBirth: string
  maritalStatus: string
  gender: string
  createdAt: string
}

export default function customer() {
  const [requests, setRequests] = useState<JoinRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Search state
  const [searchTerm, setSearchTerm] = useState("")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  // Filter requests based on search term across all fields
  const filteredRequests = requests.filter((req) => {
    const term = searchTerm.toLowerCase()
    return (
      req.firstName.toLowerCase().includes(term) ||
      req.lastName.toLowerCase().includes(term) ||
      req.email.toLowerCase().includes(term) ||
      req.mobile.toLowerCase().includes(term) ||
      req.dateOfBirth.toLowerCase().includes(term) ||
      req.maritalStatus.toLowerCase().includes(term) ||
      req.gender.toLowerCase().includes(term) ||
      req.createdAt.toLowerCase().includes(term)
    )
  })

  // Calculate paginated data from the filtered set
  const totalPages = Math.ceil(filteredRequests.length / pageSize) || 1
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/customers")
        if (!response.ok) throw new Error("Failed to fetch requests")

        const json = await response.json()
        const items = Array.isArray(json.details) ? json.details : []

        const formatted: JoinRequest[] = items.map((item: any) => ({
          firstName: item.firstName ?? "",
          lastName: item.lastName ?? "",
          email: item.email ?? "",
          mobile: item.mobile ?? "",
          dateOfBirth: item.dateOfBirth ?? "",
          maritalStatus: item.maritalStatus ?? "",
          gender: item.gender ?? "",
          createdAt: item.createdAt ?? "",
          
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
          req.mobile === id ? { ...req, kycStatus: "approved" } : req
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
          req.mobile === id ? { ...req, kycStatus: "declined" } : req
        )
      )
    } catch (err) {
      console.error("Decline failed:", err)
      alert("Failed to decline request")
    }
  }

  if (loading) return <p className="p-6">Loading requests...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-bold mb-4">CUSTOMER LISTS</h1>

            {/* Search Input Bar */}
            <div className="mb-4 max-w-md">
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Reset page on query change
                }}
                className="w-full border px-3 py-2 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">FirstName</th>
                  <th className="px-4 py-2 border">LastName</th>
                  <th className="px-4 py-2 border">Mobile</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Date of Birth</th>
                  <th className="px-4 py-2 border">Marital Status</th>
                  <th className="px-4 py-2 border">Gender</th>
                  <th className="px-4 py-2 border">Created At</th>
                  
                </tr>
              </thead>
              <tbody>
                {paginatedRequests.length > 0 ? (
                  paginatedRequests.map((req) => (
                    <tr key={req.mobile}>
                       
                      <td className="px-4 py-2 border">{req.firstName}</td>
                      <td className="px-4 py-2 border">{req.lastName}</td>
                      <td className="px-4 py-2 border">{req.mobile}</td>
                      <td className="px-4 py-2 border">{req.email}</td>
                      <td className="px-4 py-2 border">{req.dateOfBirth}</td>
                      <td className="px-4 py-2 border">{req.maritalStatus}</td>
                      <td className="px-4 py-2 border">{req.gender}</td>
                      <td className="px-4 py-2 border">{req.createdAt}</td>
                      
                      <td className="px-4 py-2 border space-x-2">
                        
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-6 text-gray-500 border">
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
        </main>
      </div>
    </div>
  )
}