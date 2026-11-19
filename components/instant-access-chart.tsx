"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

interface JoinRequest {
  date: string
  amount: string
  transactionType: string
  mobile: string
  name: string
  
}

export function InstantAccessChart() {
  const [requests, setRequests] = useState<JoinRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
  
    useEffect(() => {
      const fetchRequests = async () => {
        try {
          const response = await fetch("/api/history/instant")
          if (!response.ok) throw new Error("Failed to fetch requests")
  
          const json = await response.json()
          console.log("API response:", json)
  
          const items = Array.isArray(json.details) ? json.details : []
  
          const formatted: JoinRequest[] = items.map((item: any) => ({
            // id: item.mobile ?? "",
            date: item.date ?? "Unknown",
            amount: item.amount ?? "Unknown",
            transactionType: item.transactionType ?? "Unknown",
            mobile: item.mobile ?? "N/A",
            name: item.name ?? "Unknown",
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


    if (loading) return <p className="p-6">Loading requests...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Instant Savings History</h2>
      {/* Customize your instant savings chart here */}
      {/* <div>History for Instant Savings</div> */}
      <div className="bg-card rounded-lg border border-border p-6">
      {/* <h2 className="text-xl font-bold text-foreground mb-6">Instant Savings Groups</h2> */}
      
      <div>Table for Instant Savings</div>
      <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">DATE</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">MOBILE</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">AMOUNT</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">TRANSACTION TYPE </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">MOBILE</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">NAME</th>
            </tr>
          </thead>
          <tbody>
                {requests.map((req) => (
                  <tr key={req.mobile}>
                    <td className="px-4 py-2 border">{req.date}</td>
                    <td className="px-4 py-2 border">{req.mobile}</td>
                    <td className="px-4 py-2 border">{req.amount}</td>
                    <td className="px-4 py-2 border">{req.transactionType}</td>
                    <td className="px-4 py-2 border">{req.mobile}</td>
                    <td className="px-4 py-2 border">{req.name}</td>
                    <td className="px-4 py-2 border">
                      
                     
                    </td>
                  </tr>
                ))}
              </tbody>
          
        </table>
    </div>
    </div>
  )
}
