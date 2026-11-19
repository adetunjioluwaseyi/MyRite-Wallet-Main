"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { X, Check, Info } from "lucide-react"
// import { Group } from "@/components/daily-wealth-rotation-groups"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "error"
  title: string
  groupName: string;
  message?: string
  post?: string
  user?: string
  sender?: string
  groupTag?: string
  timestamp: string
  read: boolean
}

interface Group {
  groupName: string;
  groupCode: string;
}

const safeJson = async (res: Response) => {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Server did not return valid JSON");
  }
};

export default function NotificationsPage() {
  const [viewMode, setViewMode] = useState<"individual" | "group">("individual")
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState("")
  const [title, setTitle] = useState("")
  const [post, setPost] = useState("") 
  const [groupTag, setGroupTag] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);

   const CREATE_URL = viewMode === "group" ? "api/notification-grp-create" : "api/notification-create"
  const SHOW_URL   = viewMode === "group" ? "api/notification-grp-show"   : "api/notification-show"
  // const CREATE_URL = "api/notification-grp-create" 
  // const SHOW_URL = "api/notification-grp-show" 
  const IND_CREATE_URL = "api/notification-create"
  // const IND_SHOW_URL = "api/notification-show"


  // all group names

  // Step 1: Fetch groups for dropdown
    useEffect(() => {
      setCurrentPage(1); // Reset to first page when group changes or new data loads
      const fetchGroups = async () => {
        try {
          const res = await fetch("/api/all-groups");
          const data = await safeJson(res);
   
          const formatted: Group[] = (data.details || []).map((item: any) => ({
            groupName: item.grouptag ?? "",
            groupCode: item.groupCode ?? "",
          }));
   
          setGroups(formatted);
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Failed to fetch groups";
          setError(message);
        }
      };
      fetchGroups();
    }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(SHOW_URL, { headers: { Accept: "application/json" } })
      const data = await res.json()
      if (data.responseCode === "00") {
        const mapped = data.details.map((item: any, index: number) => ({
          id: index.toString(),
          type: "info",
          title: item.title,
          // message: viewMode === "individual" ? item.content : undefined,
          post: viewMode === "group" ? item.post : undefined,
          // groupName: item.groupName ?? selectedGroupName ?? "N/A",
          // post: viewMode === "individual" ? item.post : undefined,
          user: viewMode === "group" ? item.user : undefined,
          sender: viewMode === "individual" ? item.sender : undefined,
          groupTag: viewMode === "group" ? item.groupTag : undefined,
          groupName: viewMode === "group" ? item.groupName : undefined,
          timestamp: new Date(item.time || Date.now()).toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
          read: false,
        }))
        setNotifications(mapped)
      } else {
        setNotifications([])
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err)
      setNotifications([])
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [viewMode])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

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
      const body = viewMode === "group"
        ? { user, title, post, groupTag }
        : { sender: user, title, content: post } 

      const res = await fetch(CREATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok || data.responseCode !== "00") {
        throw new Error(data.error || "Failed to create notification")
      }

      setSuccess("Notification created successfully!")
      setUser("")
      setTitle("")
      setPost("")
      setGroupTag("")
      setShowModal(false)
      
      await fetchNotifications()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
// individual ENDPOINT 
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
      const body = viewMode === "individual"
        ? { user, title, post }
        : { sender: user, title, content: post } 

      const res = await fetch(IND_CREATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok || data.responseCode !== "00") {
        throw new Error(data.error || "Failed to create notification")
      }

      setSuccess("Notification created successfully!")
      setUser("")
      setTitle("")
      setPost("")
      // setGroupTag("")
      setShowModal(false)
      
      await fetchNotifications()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        {/* Top Control Bar Matching Your Image */}
        <div className="flex justify-between items-center p-6 bg-white border-b border-gray-100">
          <div className="flex bg-[#f1f5f9] p-1 rounded-xl">
            <button
              onClick={() => setViewMode("individual")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                viewMode === "individual" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => setViewMode("group")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                viewMode === "group" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
              }`}
            >
             Group 
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm tracking-wide shadow-sm"
          >
            Create Notification
          </button>
        </div>

        {/* Notification Container Layout */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-[#1e293b]">
                {viewMode === "group" ? "Group Notifications" : "General Notifications"}
              </h1>
              <span className="text-xs bg-[#f1f5f9] text-[#64748b] px-3 py-1 rounded-full font-medium">
                {notifications.filter((n) => !n.read).length} unread
              </span>
            </div>

            <div className="space-y-4">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="bg-[#f0f7ff] border-l-4 border-blue-500 rounded-r-xl p-5 shadow-sm relative"
                >
                  <div className="flex items-start gap-4">
                    {/* Info Circle Icon aligned like your screenshot */}
                    <div className="mt-0.5 text-blue-500">
                      <Info size={20} className="stroke-[2.5]" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-[#0f172a] text-base">{n.title}</h3>
                      
                      {/* Displays content correctly based on the current tab */}
                      {viewMode === "group" ? (
                        <div className="mt-1 space-y-1">
                          <p className="text-sm text-[#475569]">{n.post}</p>
                          <p className="text-xs text-gray-400 font-medium">Sender: {n.user || "System"}</p>
                          {n.groupName && (
                            <p className="text-xs text-blue-600 font-semibold">Group: {n.groupName}</p>
                          )}
                          {/* {n.groupTag && (
                            <p className="text-xs text-blue-600 font-semibold">Group: {n.groupTag}</p>
                          )} */}
                        </div>
                      ) : (
                        <div className="mt-1 space-y-1">
                          <p className="text-sm text-[#475569]">{n.message}</p>
                          <p className="text-xs text-gray-400 font-medium">Sender: {n.sender || "System"}</p>
                        </div>
                      )}
                      
                      <p className="text-[11px] text-gray-400 mt-2 font-medium">{n.timestamp}</p>
                    </div>

                    {/* Action buttons matching position & color layout */}
                    <div className="flex items-center gap-4 self-center pr-2">
                      {!n.read && (
                        <button onClick={() => markAsRead(n.id)} title="Mark as read">
                          <Check size={18} className="text-blue-500 hover:text-blue-700 stroke-[2.5]" />
                        </button>
                      )}
                      <button onClick={() => deleteNotification(n.id)} title="Delete">
                        <X size={18} className="text-red-500 hover:text-red-700 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {notifications.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No notifications found.
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Input Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md mx-4">
            <form onSubmit={viewMode === "group" ? handleSubmit : handleSubmit_ind}>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {viewMode === "group" ? "New Group Notification" : "New General Notification"}
              </h2>

              {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {viewMode === "group" ? "User/Author" : "Sender Name"}
                </label>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter title"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content/Message</label>
                <textarea
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 h-24"
                  placeholder="Enter message details..."
                />
              </div>

              {/* {viewMode === "group" && (
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Tag</label>
                  <input
                    type="text"
                    value={groupTag}
                    onChange={(e) => setGroupTag(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Enter group tag"
                  />
                </div>
              )} */}

               {/* GroupName Dropdown */}
      {viewMode === "group" && (
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Group Name</label>
        <select
        // value={groupTag}
        value={groupTag}
          onChange={e => setGroupTag(e.target.value)}
          className="border px-2 py-1 rounded min-w-[200px]"
        >
          <option value="">Select Group</option>
          {groups.map(g => (
            <option key={g.groupCode} value={g.groupName}>
              {g.groupName}
            </option>
          ))}
        </select>
      </div>
      )}

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg text-sm text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg"
                >
                  {loading ? "Sending..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}