"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

interface JoinRequest {
  groupName: string
  duration: string
  name: string
  mobile: string
  balance: string
  groupCode: string
  // status: "pending" | "approved" | "declined"
}


export function FlexibleSavingsGroups() {
  const [requests, setRequests] = useState<JoinRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/pending/flexible")
        if (!response.ok) throw new Error("Failed to fetch requests")

        const json = await response.json()
        console.log("API response:", json)

        const items = Array.isArray(json.details) ? json.details : []

        const formatted: JoinRequest[] = items.map((item: any) => ({
          // id: item.mobile ?? "",
          name: item.name ?? "Unknown",
          mobile: item.mobile ?? "N/A",
          balance: item.balance ?? "N/A",
          groupCode: item.groupCode ?? "N/A",
          groupName: item.groupName ?? "N/A",
          duration: item.duration ?? "N/A",
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

  // ✅ Approve action with backend call
  const handleApprove = async (id: string) => {
    try {
      const response = await fetch("http://94.72.111.23:2000/myritewallet/v1/FLEXIBLE/VIEW", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: id }),
      })
      if (!response.ok) throw new Error("Failed to approve request")

      // Update UI
      setRequests((prev) =>
        prev.map((req) => (req.mobile === id ? { ...req, status: "approved" } : req))
      )
    } catch (err) {
      console.error("Approve failed:", err)
      alert("Failed to approve request")
    }
  }

  // ✅ Decline action with backend call
  const handleDecline = async (id: string) => {
    try {
      const response = await fetch("http://94.72.111.23:2000/myritewallet/v1/FLEXIBLE/VIEW", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: id }),
      })
      if (!response.ok) throw new Error("Failed to decline request")

      // Update UI
      setRequests((prev) =>
        prev.map((req) => (req.mobile === id ? { ...req, status: "declined" } : req))
      )
    } catch (err) {
      console.error("Decline failed:", err)
      alert("Failed to decline request")
    }
  }

  if (loading) return <p className="p-6">Loading requests...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Flexible Savings Groups</h2>
      
      <div>Table for Flexible Savings</div>
      <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">NAME</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">MOBILE</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">BALANCE</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">DURATION</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">GROUPCODE</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">GROUPNAME</th>
            </tr>
          </thead>
          <tbody>
                {requests.map((req) => (
                  <tr key={req.mobile}>
                    <td className="px-4 py-2 border">{req.name}</td>
                    <td className="px-4 py-2 border">{req.mobile}</td>
                    <td className="px-4 py-2 border">{req.balance}</td>
                    <td className="px-4 py-2 border">{req.duration}</td>
                    <td className="px-4 py-2 border">{req.groupCode}</td>
                    <td className="px-4 py-2 border">{req.groupName}</td>
                    <td className="px-4 py-2 border">
                      
                     
                    </td>
                  </tr>
                ))}
              </tbody>
          
        </table>
    </div>
  )
} 

















"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

interface JoinRequest {
  nokFirstName: string
  nokLastName: string
  mobile: string
  nokEmail: string
  idNumber: string
  nokAddress: string
  employmentStatus: string
  address: string
  city: string
  state: string
  country: string
  kycStatus: string
}

export default function Kyc() {
  const [requests, setRequests] = useState<JoinRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ✅ Helper: Safe JSON parsing
  const safeJson = async (res: Response) => {
    const text = await res.text()
    try {
      return text ? JSON.parse(text) : {}
    } catch {
      return {}
    }
  }

  // ✅ Helper: Resolve endpoint based on group type
  const resolveEndpoint = (groupType?: string): string => {
    const type = (groupType || "").toLowerCase()
    if (type.includes("wealth")) return "WEALTH"
    if (type.includes("flexible")) return "FLEXIBLE"
    if (type.includes("instant")) return "INSTANT"
    return "TARGET"
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const [wealth, target, instant, flexible] = await Promise.all([
          fetch("/api/pending/wealth").then(safeJson),
          fetch("/api/pending/target").then(safeJson),
          fetch("/api/pending/instant").then(safeJson),
          fetch("/api/pending/flexible").then(safeJson),
        ])

        const allItems = [
          ...(wealth.details || []),
          ...(target.details || []),
          ...(instant.details || []),
          ...(flexible.details || []),
        ]

        const formatted: JoinRequest[] = allItems.map((item: any) => ({
          nokFirstName: item.nokFirstName ?? "",
          nokLastName: item.nokLastName ?? "",
          mobile: item.mobile ?? "",
          nokEmail: item.nokEmail ?? "",
          idNumber: item.idNumber ?? "",
          nokAddress: item.nokAddress ?? "",
          employmentStatus: item.employmentStatus ?? "",
          address: item.address ?? "",
          city: item.city ?? "",
          state: item.state ?? "",
          country: item.country ?? "",
          kycStatus: item.kycStatus ?? "",
          //createdAt: item.createdAt ?? "N/A",
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

  // ✅ Approve action
  const handleApprove = async (id: string, groupType?: string) => {
    try {
      const endpoint = resolveEndpoint(groupType)
      const response = await fetch(
        `http://94.72.111.23:2000/myritewallet/v1/${endpoint}/APPROVE`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mobile: id,
            status: "approved",
            approvedBy: "admin", // Replace with actual admin info
          }),
        }
      )

      if (!response.ok) throw new Error("Failed to approve request")

      setRequests((prev) =>
        prev.map((req) =>
          req.mobile === id ? { ...req, kycStatus: "" } : req
        )
      )
    } catch (err) {
      console.error("Approve failed:", err)
      alert("Failed to approve request")
    }
  }

  // ✅ Decline action
  const handleDecline = async (id: string, groupType?: string) => {
    try {
      const endpoint = resolveEndpoint(groupType)
      const response = await fetch(
        `http://94.72.111.23:2000/myritewallet/v1/${endpoint}/DECLINE`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: id }),
        }
      )

      if (!response.ok) throw new Error("Failed to decline request")

      setRequests((prev) =>
        prev.map((req) =>
          req.mobile === id ? { ...req, kycStatus: "" } : req
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
            <h1 className="text-xl font-bold mb-4">KYC LISTS</h1>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">FirstName</th>
                  <th className="px-4 py-2 border">LastName</th>
                  <th className="px-4 py-2 border">Mobile</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Id Number</th>
                  <th className="px-4 py-2 border">Address</th>
                  <th className="px-4 py-2 border">Employment Status</th>
                  <th className="px-4 py-2 border">Address_abv</th>
                  <th className="px-4 py-2 border">City</th>
                  <th className="px-4 py-2 border">State</th>
                  <th className="px-4 py-2 border">Country</th>
                  <th className="px-4 py-2 border">KYC Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr >
                    <td className="px-4 py-2 border">{req.nokFirstName}</td>
                    <td className="px-4 py-2 border">{req.nokLastName}</td>
                    <td className="px-4 py-2 border">{req.mobile}</td>
                    <td className="px-4 py-2 border">{req.nokEmail}</td>
                    <td className="px-4 py-2 border">{req.idNumber}</td>
                    <td className="px-4 py-2 border">{req.address}</td>
                    <td className="px-4 py-2 border">{req.employmentStatus}</td>
                    <td className="px-4 py-2 border">{req.nokAddress}</td>
                    <td className="px-4 py-2 border">{req.city}</td>
                    <td className="px-4 py-2 border">{req.state}</td>
                    <td className="px-4 py-2 border">{req.country}</td>
                    <td className="px-4 py-2 border">{req.kycStatus}</td>
                    <td className="px-4 py-2 border space-x-2">
                      {/* {req.kycStatus === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleApprove(req.id, req.channel)
                            }
                            className="px-3 py-1 bg-green-500 text-white rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleDecline(req.id, req.channel)
                            }
                            className="px-3 py-1 bg-red-500 text-white rounded"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {req.status === "approved" && (
                        <span className="text-green-600 font-semibold">
                          ✔ Approved
                        </span>
                      )}
                      {req.status === "declined" && (
                        <span className="text-red-600 font-semibold">
                          ✘ Declined
                        </span>
                      )} */}
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
