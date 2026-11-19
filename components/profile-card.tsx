"use client"

import { useState, useEffect } from "react"

interface User {
  firstName: string
  lastName: string
  email: string
  mobile: string
  dateOfBirth: string
  maritalStatus: string
  gender: string
  createdAt: string
}

export function ProfileCard({ searchValue }: { searchValue: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/customers?search=${encodeURIComponent(searchValue)}`)
        if (!response.ok) throw new Error("Failed to fetch user")

        const json = await response.json()
        console.log("API response:", json)

        // ✅ Handle array or single object
        const data = Array.isArray(json) ? json[0] : json

        setUser(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [searchValue])

  if (loading) return <p>Loading user...</p>
  if (error) return <p className="text-red-600">Error: {error}</p>
  if (!user) return <p>No user found</p>

  // ✅ Safe date formatting
  const formattedDob = user.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A"

  const formattedCreated = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A"

  return (
    <div className="bg-card rounded-2xl p-8">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center overflow-hidden">
          <img src="/user-avatar.jpg" alt="User avatar" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mt-4">
          {user.firstName || "N/A"} {user.lastName || ""}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{user.email || "N/A"}</p>
        <p className="text-sm text-muted-foreground">{user.mobile || "N/A"}</p>
        <p className="text-sm text-muted-foreground">DOB: {formattedDob}</p>
        <p className="text-sm text-muted-foreground">Gender: {user.gender || "N/A"}</p>
        <p className="text-sm text-muted-foreground">Marital: {user.maritalStatus || "N/A"}</p>
        <p className="text-sm text-muted-foreground">Joined: {formattedCreated}</p>
      </div>
    </div>
  )
}
