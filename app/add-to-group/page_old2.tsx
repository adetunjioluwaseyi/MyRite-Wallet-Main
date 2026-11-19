"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

interface JoinRequest {
  createdAt: string
  id: string
  name: string
  income: string
  channel: string
  status: "pending" | "approved" | "declined"
}

export default function AddToGroupPage() {
  const [requests, setRequests] = useState<JoinRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const safeJson = async (res: Response) => {
      const text = await res.text();
      try {
        return text ? JSON.parse(text) : {};
      } catch {
        return {};
      }
    };
    const fetchRequests = async () => {
      try {
        const [wealth, target, instant, flexible] = await Promise.all([
          fetch('/api/pending/wealth').then(safeJson),
          fetch('/api/pending/target').then(safeJson),
          fetch('/api/pending/instant').then(safeJson),
          fetch('/api/pending/flexible').then(safeJson),
        ]);
        const allItems = [
          ...(wealth.details || []),
          ...(target.details || []),
          ...(instant.details || []),
          ...(flexible.details || []),
        ];
        const formatted: JoinRequest[] = allItems.map((item: any) => ({
          id: item.mobile ?? "",
          name: item.mobile ?? "Unknown",
          income: item.groupModel ?? "N/A",
          channel: item.groupTag ?? "N/A",
          status: item.status ?? "pending",
          createdAt: item.createdAt ?? "N/A",
        }));
        setRequests(formatted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // ✅ Approve action with backend call
  const handleApprove = async (id: string, groupTag: string, groupType?: string) => {
    try {
      let endpoint = "TARGET";
      const type = (groupType || "").toLowerCase();
      if (type.includes("wealth")) {
        endpoint = "WEALTH";
      } else if (type.includes("flexible")) {
        endpoint = "FLEXIBLE";
      } else if (type.includes("instant")) {
        endpoint = "INSTANT";
      } else if (type.includes("target")) {
        endpoint = "TARGET";
      }
      const response = await fetch(`http://94.72.111.23:2000/myritewallet/v1/${endpoint}/APPROVE`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: id,
          status: "approved",
          approvedBy: "admin" // Replace with actual admin info if available
        }),
      });
      if (!response.ok) throw new Error("Failed to approve request");
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req))
      );
    } catch (err) {
      console.error("Approve failed:", err);
      alert("Failed to approve request");
    }
  };

  // ✅ Decline action with backend call
  const handleDecline = async (id: string) => {
    try {
      const response = await fetch("http://94.72.111.23:2000/myritewallet/v1/WEALTH/DECLINE", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: id }),
      })
      if (!response.ok) throw new Error("Failed to decline request")

      // Update UI
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: "declined" } : req))
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
            <h1 className="text-xl font-bold mb-4">Pending Requests</h1>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Mobile</th>
                  <th className="px-4 py-2 border">Group Model</th>
                  <th className="px-4 py-2 border">Group Tag</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Created At</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td className="px-4 py-2 border">{req.name}</td>
                    <td className="px-4 py-2 border">{req.income}</td>
                    <td className="px-4 py-2 border">{req.channel}</td>
                    <td className="px-4 py-2 border">{req.status}</td>
                    <td className="px-4 py-2 border">{req.createdAt}</td>
                    <td className="px-4 py-2 border space-x-2">
                      {req.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(req.id, undefined, req.income)}
                            className="px-3 py-1 bg-green-500 text-white rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleDecline(req.id)}
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
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
