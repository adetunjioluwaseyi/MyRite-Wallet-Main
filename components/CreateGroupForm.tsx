"use client"

import { useState, useEffect } from "react"

export default function CreateGroupForm() {

  const [groupName, setgroupName] = useState("")
  const [parentGroupId, setParentGroupId] = useState("")
  const [startDate, setStartDate] = useState("")
  const [groupCode, setGroupCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [availableGroupCodes, setAvailableGroupCodes] = useState<string[]>([])

  useEffect(() => {
    const fetchGroupCodes = async () => {
      try {
        const res = await fetch("/api/groups")
        const data = await res.json()

        const codes = Array.isArray(data.details)
          ? data.details.map((g: any) => g.groupCode).filter(Boolean)
          : []

        setAvailableGroupCodes(codes)
      } catch {
        setAvailableGroupCodes([])
      }
    }

    fetchGroupCodes()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError("")
    setSuccess("")

    if (!groupName.trim()) {
      setError("Group name is required")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName,
          parentGroupId: parentGroupId || undefined,
          startDate,
          groupCode,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to create group")
      }

      setSuccess("Group created successfully!")

      setgroupName("")
      setParentGroupId("")
      setStartDate("")
      setGroupCode("")

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded mt-8"
    >

      <h2 className="text-lg font-bold mb-4">
        Create Group / Sub-group
      </h2>

      {error && (
        <div className="text-red-600 mb-2">{error}</div>
      )}

      <div className="mb-4">
        <label className="block mb-1">Group Name</label>

        <input
          className="w-full border px-2 py-1 rounded"
          value={groupName}
          onChange={(e) => {
            setgroupName(e.target.value)
            if (error) setError("")
          }}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Start Date</label>

        <input
          type="date"
          className="w-full border px-2 py-1 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">
          Available Group Code
        </label>

        <select
          className="w-full border px-2 py-1 rounded"
          value={groupCode}
          onChange={(e) => setGroupCode(e.target.value)}
          required
        >
          <option value="">Select group code</option>

          {availableGroupCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">
          Parent Group ID (optional for sub-group)
        </label>

        <input
          className="w-full border px-2 py-1 rounded"
          value={parentGroupId}
          onChange={(e) => setParentGroupId(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </button>

      {error && (
        <div className="text-red-600 mt-2">
          {error}
        </div>
      )}

      {success && (
        <div className="text-green-600 mt-2">
          {success}
        </div>
      )}
    </form>
  )
}