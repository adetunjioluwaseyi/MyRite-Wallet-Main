"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { UserPlus, Mail, Lock, Shield } from "lucide-react"

interface FormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  role: string
  permissions: string[]
}

export default function CreateAdminPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Admin",
    permissions: [],
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const allPermissions = [
    { id: "view_users", label: "View Users" },
    { id: "manage_users", label: "Manage Users" },
    { id: "manage_payments", label: "Manage Payments" },
    { id: "manage_groups", label: "Manage Groups" },
    { id: "view_reports", label: "View Reports" },
    { id: "manage_reports", label: "Manage Reports" },
    { id: "view_transactions", label: "View Transactions" },
    { id: "manage_system", label: "Manage System" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const togglePermission = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill in all required fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    console.log("[v0] Creating new admin/user:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Admin",
        permissions: [],
      })
      setSubmitted(false)
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <UserPlus className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Create New Admin/User</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-8 space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
              )}

              {submitted && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  Admin/User created successfully!
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Mail size={16} />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Lock size={16} />
                  Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Enter password (min. 8 characters)"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confirm Password *</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Shield size={16} />
                  Role *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option>Admin</option>
                  <option>Super Admin</option>
                  <option>Support</option>
                  <option>Moderator</option>
                </select>
              </div>

              {/* Permissions */}
              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Assign Permissions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {allPermissions.map((permission) => (
                    <label key={permission.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm text-foreground">{permission.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-6 border-t border-border">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
                >
                  Create Admin/User
                </button>
                <button
                  type="reset"
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground font-medium hover:bg-muted"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
