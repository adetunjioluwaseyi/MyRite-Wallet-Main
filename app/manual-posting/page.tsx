"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function ManualPosting() {
  const [amount, setAmount] = useState("")
  const [mobile, setMobile] = useState("")
  const [reason, setReason] = useState("")
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError(null)
    setSuccess(null)

    if (!amount.trim() || !mobile.trim() || !reason.trim()) {
      setError("All fields (Amount, Mobile, and Reason) are required.")
      return
    }

    setLoading(true)

    try {
      // Replace this URL with the exact Next.js API route path you created
      const res = await fetch("/api/admin/funds/manual", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount.trim(),
          mobile: mobile.trim(),
          reason: reason.trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to process manual funding")
      }

      setSuccess("Manual funding posted successfully!")

      // Reset form fields
      setAmount("")
      setMobile("")
      setReason("")
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 border rounded-lg shadow-sm bg-white mt-8"
          >
            <h2 className="text-xl font-bold mb-4">Manual Funding</h2>

            {error && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded">
                {success}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                step="any"
                placeholder="e.g. 5000"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  if (error) setError(null)
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Mobile Number</label>
              <input
                type="tel"
                placeholder="e.g. 08012345678"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value)
                  if (error) setError(null)
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Reason</label>
              <textarea
                rows={3}
                placeholder="Enter reason for manual funding..."
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value)
                  if (error) setError(null)
                }}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit Funding"}
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}