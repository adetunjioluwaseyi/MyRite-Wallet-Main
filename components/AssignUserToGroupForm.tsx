"use client"

import { useState } from "react"

export default function AssignUserToGroupForm() {
  const [userId, setUserId] = useState("")
  const [groupId, setGroupId] = useState("")
  const [packNumber, setPackNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const res = await fetch("/api/groups/assign-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, groupId, packNumber }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to assign user")
      setSuccess("User assigned to group successfully!")
      setUserId("")
      setGroupId("")
      setPackNumber("")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded mt-8">
      <h2 className="text-lg font-bold mb-4">Assign User to Group / Sub-group</h2>
      <div className="mb-4">
        <label className="block mb-1">User ID</label>
        <input
          className="w-full border px-2 py-1 rounded"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Group/Sub-group ID</label>
        <input
          className="w-full border px-2 py-1 rounded"
          value={groupId}
          onChange={e => setGroupId(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Pack Number</label>
        <input
          className="w-full border px-2 py-1 rounded"
          value={packNumber}
          onChange={e => setPackNumber(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Assigning..." : "Assign"}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {success && <div className="text-green-600 mt-2">{success}</div>}
    </form>
  )
}
