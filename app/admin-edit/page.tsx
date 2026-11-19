"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Save, X } from "lucide-react"

interface AdminData {
  name: string
  email: string
  role: string
  phone: string
  permissions: string[]
}

export default function AdminEditPage() {
  const [formData, setFormData] = useState<AdminData>({
    name: "David Okonkwo",
    email: "david.okonkwo@myrite.com",
    role: "Super Admin",
    phone: "+234 803 456 7890",
    permissions: ["view_users", "manage_payments", "manage_groups", "view_reports"],
  })

  const [isEditing, setIsEditing] = useState(false)
  const [tempData, setTempData] = useState(formData)

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

  const handleEdit = () => {
    setTempData(formData)
    setIsEditing(true)
  }

  const handleSave = () => {
    setFormData(tempData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setTempData((prev) => ({ ...prev, [field]: value }))
  }

  const togglePermission = (permissionId: string) => {
    setTempData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-foreground">Admin Profile Edit</h1>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="bg-card rounded-lg border border-border p-8 space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-border">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">DO</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{formData.name}</h2>
                  <p className="text-sm text-muted-foreground">{formData.role}</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    value={isEditing ? tempData.name : formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-card disabled:bg-muted disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                  <input
                    type="email"
                    value={isEditing ? tempData.email : formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-card disabled:bg-muted disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={isEditing ? tempData.phone : formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-card disabled:bg-muted disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                  <select
                    value={isEditing ? tempData.role : formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-card disabled:bg-muted disabled:cursor-not-allowed"
                  >
                    <option>Admin</option>
                    <option>Super Admin</option>
                    <option>Support</option>
                    <option>Moderator</option>
                  </select>
                </div>
              </div>

              {/* Permissions */}
              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Permissions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {allPermissions.map((permission) => (
                    <label key={permission.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(isEditing ? tempData : formData).permissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                        disabled={!isEditing}
                        className="w-4 h-4 accent-primary disabled:cursor-not-allowed"
                      />
                      <span className={`text-sm ${isEditing ? "text-foreground" : "text-muted-foreground"}`}>
                        {permission.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-3 pt-6 border-t border-border">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground font-medium hover:bg-muted"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}