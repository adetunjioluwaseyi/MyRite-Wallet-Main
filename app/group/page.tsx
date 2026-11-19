"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

interface JoinRequest {
  groupCode: string
  groupMode: string
  grouptag: string
  maximumAllowed: string
  currentMembers: string
  status: string
//   mobile: string
//   dateOfBirth: string
//   maritalStatus: string
//   gender: string
//   createdAt: string
}

export default function customer() {
  const [requests, setRequests] = useState<JoinRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/groups")
        if (!response.ok) throw new Error("Failed to fetch requests")

        const json = await response.json()
        const items = Array.isArray(json.details) ? json.details : []

        const formatted: JoinRequest[] = items.map((item: any) => ({
          groupCode: item.groupCode ?? "",
          groupMode: item.groupMode ?? "",
          grouptag: item.grouptag ?? "",
          maximumAllowed: item.maximumAllowed ?? "",
          currentMembers: item.currentMembers ?? "",
          status: item.status ?? "",
        //   gender: item.gender ?? "",
        //   createdAt: item.createdAt ?? "",
          
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
            <h1 className="text-xl font-bold mb-4">GROUP DETAILS</h1>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Group Code</th>
                  <th className="px-4 py-2 border">Group Mode</th>
                  <th className="px-4 py-2 border">Group Tag</th>
                  <th className="px-4 py-2 border">Maximum Allowed</th>
                  <th className="px-4 py-2 border">Current Members</th>
                  <th className="px-4 py-2 border">Status</th>
                  
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.groupCode}>
                    <td className="px-4 py-2 border">{req.groupCode}</td>
                    <td className="px-4 py-2 border">{req.groupMode}</td>
                    <td className="px-4 py-2 border">{req.grouptag}</td>
                    <td className="px-4 py-2 border">{req.maximumAllowed}</td>
                    <td className="px-4 py-2 border">{req.currentMembers}</td>
                    <td className="px-4 py-2 border">{req.status}</td>
                    
                    
                    <td className="px-4 py-2 border space-x-2">
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
