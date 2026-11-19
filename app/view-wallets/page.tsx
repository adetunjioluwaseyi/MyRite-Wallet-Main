"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

interface JoinRequest {
  firstName: string
  lastName: string
  email: string
  mobile: string
  deviceStatus?: string
}

export default function Customer() {
  const [requests, setRequests] = useState<JoinRequest[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<JoinRequest | null>(null)

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
          deviceStatus: item.deviceStatus ?? "inactive",
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

  const handleEnableDevice = async (mobile: string) => {
  try {
     const response = await fetch("/api/device", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ mobile }),
                          });

    // Parse JSON response
    const data = await response.json()
    console.log("API response:", data)

    // Check backend responseCode instead of response.ok
    if (data.responseCode !== "00") {
      throw new Error(data.responseMessage || "Failed to enable device")
    }

    // Update local state
    setRequests((prev) =>
      prev.map((req) =>
        req.mobile === mobile ? { ...req, deviceStatus: "enabled" } : req
      )
    )

    alert(`✅ ${data.responseMessage} for ${mobile}`)
    setShowModal(false) // close modal after success
  } catch (err: any) {
    console.error("Enable device failed:", err)
    alert(err.message || "Failed to enable device")
  }
}


  const filteredRows = searchTerm
    ? requests.filter((req) => req.mobile.includes(searchTerm))
    : requests

  if (loading) return <p className="p-6">Loading requests...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Device Management</h1>

            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by mobile number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border px-3 py-2 rounded w-64"
              />
            </div>

            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">FirstName</th>
                  <th className="px-4 py-2 border">LastName</th>
                  <th className="px-4 py-2 border">Mobile</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((req, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 border">{req.firstName}</td>
                    <td className="px-4 py-2 border">{req.lastName}</td>
                    <td className="px-4 py-2 border">{req.mobile}</td>
                    <td className="px-4 py-2 border">{req.email}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => {
                          setSelectedCustomer(req)
                          setShowModal(true)
                        }}
                        className="px-2 py-1 bg-purple-600 text-white rounded"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal */}
            {showModal && selectedCustomer && (
              <div className="fixed inset-0 flex items-center justify-center ">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                  <h2 className="text-lg font-bold mb-4">Customer Details</h2>
                  {/* <p><strong>First Name:</strong> {selectedCustomer.firstName}</p>
                  <p><strong>Last Name:</strong> {selectedCustomer.lastName}</p> */}
                  <p><strong>Mobile:</strong> {selectedCustomer.mobile}</p>
                  {/* <p><strong>Email:</strong> {selectedCustomer.email}</p> */}
                  <p><strong>Device Status:</strong> {selectedCustomer.deviceStatus}</p>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => handleEnableDevice(selectedCustomer.mobile)}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Enable Device
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-3 py-1 bg-gray-400 text-white rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
