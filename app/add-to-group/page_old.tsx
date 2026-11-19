"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Search, Check, X } from "lucide-react"

interface JoinRequest {
  id: string
  name: string
  income: string
  channel: string
  status: "pending" | "approved" | "declined"
}

export default function AddToGroupPage() {
  const [requests, setRequests] = useState<JoinRequest[]>([
    {
      id: "1",
      name: "Taiwo Adekola",
      income: "₦150,000",
      channel: "Daily Savings",
      status: "pending",
    },
    {
      id: "2",
      name: "Kehinde Adekola",
      income: "₦200,000",
      channel: "Weekly Savings",
      status: "pending",
    },
    {
      id: "3",
      name: "James Oladipo",
      income: "₦175,000",
      channel: "Flex Me",
      status: "pending",
    },
    {
      id: "4",
      name: "Toyo Adesola",
      income: "₦120,000",
      channel: "Target Achievers",
      status: "pending",
    },
    {
      id: "5",
      name: "Damilola Olaboyo",
      income: "₦300,000",
      channel: "Instant Access",
      status: "pending",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const handleApprove = (id: string) => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req)))
  }

  const handleDecline = (id: string) => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: "declined" } : req)))
  }

  const filteredRequests = requests.filter(
    (req) =>
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.channel.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const pendingRequests = filteredRequests.filter((req) => req.status === "pending")
  const approvedRequests = filteredRequests.filter((req) => req.status === "approved")
  const declinedRequests = filteredRequests.filter((req) => req.status === "declined")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-foreground">Add to Group Requests</h1>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg mb-6 max-w-md">
              <Search size={18} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search user or channel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>

            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
              <div className="bg-card border border-border rounded-lg overflow-hidden mb-8">
                <div className="px-6 py-4 bg-primary/5 border-b border-border">
                  <h2 className="text-lg font-semibold text-foreground">Pending Requests ({pendingRequests.length})</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">NAME</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">INCOME</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                          INTENDED CHANNEL
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-muted-foreground">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingRequests.map((request) => (
                        <tr key={request.id} className="border-b border-border hover:bg-muted/50">
                          <td className="px-6 py-4 text-sm font-medium text-foreground">{request.name}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{request.income}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{request.channel}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleApprove(request.id)}
                                className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium text-sm"
                              >
                                <Check size={16} />
                                Approve
                              </button>
                              <button
                                onClick={() => handleDecline(request.id)}
                                className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm"
                              >
                                <X size={16} />
                                Decline
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Approved Requests */}
            {approvedRequests.length > 0 && (
              <div className="bg-card border border-border rounded-lg overflow-hidden mb-8">
                <div className="px-6 py-4 bg-green-50 border-b border-border">
                  <h2 className="text-lg font-semibold text-green-900">
                    Approved Requests ({approvedRequests.length})
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">NAME</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">INCOME</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                          CHANNEL JOINED
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-muted-foreground">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedRequests.map((request) => (
                        <tr key={request.id} className="border-b border-border hover:bg-muted/50">
                          <td className="px-6 py-4 text-sm font-medium text-foreground">{request.name}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{request.income}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{request.channel}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              Approved
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Declined Requests */}
            {declinedRequests.length > 0 && (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="px-6 py-4 bg-red-50 border-b border-border">
                  <h2 className="text-lg font-semibold text-red-900">Declined Requests ({declinedRequests.length})</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">NAME</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">INCOME</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                          REQUESTED CHANNEL
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-muted-foreground">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {declinedRequests.map((request) => (
                        <tr key={request.id} className="border-b border-border hover:bg-muted/50">
                          <td className="px-6 py-4 text-sm font-medium text-foreground">{request.name}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{request.income}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{request.channel}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                              Declined
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {requests.length === 0 && (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <p className="text-muted-foreground text-lg">No join requests at this time</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
