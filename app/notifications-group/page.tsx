 "use client"

import { useState, useEffect } from "react"
 import { Header } from "@/components/header"
 import { Sidebar } from "@/components/sidebar"
import { X, Check, AlertCircle, Info } from "lucide-react"

interface GroupNotification {
  id: string
  type: "success" | "warning" | "info" | "error"
  user: string
  post: string
  title: string
  groupTag: string
  // message: string
  timestamp: string
  // sender: string
  read: boolean
}

export default function NotificationsGroupPage() {
  const [notifications, setNotifications] = useState<GroupNotification[]>([])
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState("")
  const [title, setTitle] = useState("")
  const [post, setPost] = useState("")
  const [groupTag, setGroupTag] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // ✅ API endpoints
  const CREATE_URL = "api/notification-grp-create"
  const SHOW_URL   = "api/notification-grp-show"
  const IND_CREATE_URL = "api/notification-create"
  const IND_SHOW_URL = "api/notification-show"


  // ✅ Fetch notifications from SHOW endpoint
  const fetchNotifications = async () => {
    try {
      const res = await fetch(SHOW_URL, { headers: { Accept: "application/json" } })
      const data = await res.json()
      if (data.responseCode === "00") {
        const mapped = data.details.map((item: any, index: number) => ({
          id: index.toString(),
          type: "info", // you can adjust based on API data
          user: item.user,
          post: item.post,
          title: item.title,
          groupTag: item.groupTag,
          // message: item.content,
          timestamp: new Date(item.time).toLocaleString(),
          // sender: item.sender,
          read: false,
        }))
        setNotifications(mapped)
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err)
    }
  }

  // Load notifications on page mount
  useEffect(() => {
    fetchNotifications()
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <div className="w-3 h-3 bg-green-500 rounded-full" />
      case "warning": return <AlertCircle size={20} className="text-yellow-500" />
      case "error":   return <div className="w-3 h-3 bg-red-500 rounded-full" />
      case "info":    return <Info size={20} className="text-blue-500" />
      default:        return null
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-50 border-l-4 border-green-500"
      case "warning": return "bg-yellow-50 border-l-4 border-yellow-500"
      case "error":   return "bg-red-50 border-l-4 border-red-500"
      case "info":    return "bg-blue-50 border-l-4 border-blue-500"
      default:        return "bg-gray-50"
    }
  }

  // ✅ Handle create  individual notification (POST)
  const handleSubmit_ind = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(IND_CREATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, title, post }),
      })
      const data = await res.json()
      if (!res.ok || data.responseCode !== "00") {
        throw new Error(data.error || "Failed to create notification")
      }

      setSuccess("Post created successfully!")
      setUser("")
      setTitle("")
      setPost("")
      // setGroupTag("")
      setShowModal(false)

      // ✅ Refresh notifications from SHOW endpoint
      fetchNotifications()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Handle create  group notification (POST)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(CREATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, title, post, groupTag }),
      })
      const data = await res.json()
      if (!res.ok || data.responseCode !== "00") {
        throw new Error(data.error || "Failed to create notification")
      }

      setSuccess("Post created successfully!")
      setUser("")
      setTitle("")
      setPost("")
      setGroupTag("")
      setShowModal(false)

      // ✅ Refresh notifications from SHOW endpoint
      fetchNotifications()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        {/* Top bar with Create button */}
        <div className="flex justify-end p-4 border-b bg-white">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Create Group Notification
          </button>
        </div>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-foreground">Group Notifications</h1>
              <span className="text-sm text-muted-foreground">
                {notifications.filter((n) => !n.read).length} unread
              </span>
            </div>

            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg ${getBgColor(notification.type)} ${
                    !notification.read ? "ring-1 ring-offset-0 ring-primary/20" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{notification.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{notification.post}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                      <p className="text-xs text-muted-foreground mt-1">Sender: {notification.user }</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <Check size={18} className="text-primary" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <X size={18} className="text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {notifications.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No notifications at this time</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-bold mb-4">Create Notification</h2>

              {error && <div className="text-red-600 mb-2">{error}</div>}
              {success && <div className="text-green-600 mb-2">{success}</div>}

              <div className="mb-4">
                <label className="block mb-1">User</label>
                <input
                  className="w-full border px-2 py-1 rounded"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  className="w-full border px-2 py-1 rounded"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

               <div className="mb-4">
                <label className="block mb-1">Group Tag</label>
                <input
                  type="text"
                  className="w-full border px-2 py-1 rounded"
                  value={groupTag}
                  onChange={(e) => setGroupTag(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Post</label>
                <input
                  type="text"
                  className="w-full border px-2 py-1 rounded"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// ✅ API route handlers (app/api/notification-create/route.ts)
import { NextResponse } from "next/server"