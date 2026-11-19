"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ProfileCard } from "@/components/profile-card"
import { ActionButtons } from "@/components/action-buttons"
import { ChannelsTable } from "@/components/channels-table"
import { ConfirmationModal } from "@/components/confirmation-modal"

export default function ViewWalletsPage() {
  const [userStatus, setUserStatus] = useState("Active")
  const [showModal, setShowModal] = useState(false)
  const [modalAction, setModalAction] = useState<"suspend" | "penalize" | null>(null)

  // New states for search
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const handleActionClick = (action: "suspend" | "penalize") => {
    setModalAction(action)
    setShowModal(true)
  }

  const handleConfirm = () => {
    if (modalAction === "suspend") {
      setUserStatus("Suspended")
    } else if (modalAction === "penalize") {
      setUserStatus("Penalized")
    }
    setShowModal(false)
    setModalAction(null)
  }

  const handleCancel = () => {
    setShowModal(false)
    setModalAction(null)
  }

  // Simulated search handler (replace with API call)
  const handleSearch = () => {
    // Example: fetch user from backend
    // fetch(`/api/users?query=${searchQuery}`)
    //   .then(res => res.json())
    //   .then(data => setSelectedUser(data))

    // For now, mock user data
    setSelectedUser({
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      walletId: "WALLET123"
    })
    setUserStatus("Active")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-8">
            
            {/* Search Bar */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name or email..."
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                Search
              </button>
            </div>

            {/* Profile + Actions */}
            {selectedUser && (
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <ProfileCard userStatus={userStatus} user={selectedUser} />
                </div>
                <div>
                  <ActionButtons onActionClick={handleActionClick} />
                </div>
              </div>
            )}

            {/* Channels Table */}
            {selectedUser && (
              <div>
                <ChannelsTable user={selectedUser} />
              </div>
            )}
          </div>
        </main>
      </div>

      {showModal && (
        <ConfirmationModal
          action={modalAction}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}



// "use client"

// import { useState } from "react"
// import { Header } from "@/components/header"
// import { Sidebar } from "@/components/sidebar"
// import { ProfileCard } from "@/components/profile-card"
// import { ActionButtons } from "@/components/action-buttons"
// import { ChannelsTable } from "@/components/channels-table"
// import { ConfirmationModal } from "@/components/confirmation-modal"

// export default function ViewWalletsPage() {
//   const [userStatus, setUserStatus] = useState("Active")
//   const [showModal, setShowModal] = useState(false)
//   const [modalAction, setModalAction] = useState<"suspend" | "penalize" | null>(null)

//   const handleActionClick = (action: "suspend" | "penalize") => {
//     setModalAction(action)
//     setShowModal(true)
//   }

//   const handleConfirm = () => {
//     if (modalAction === "suspend") {
//       setUserStatus("Suspended")
//     } else if (modalAction === "penalize") {
//       setUserStatus("Penalized")
//     }
//     setShowModal(false)
//     setModalAction(null)
//   }

//   const handleCancel = () => {
//     setShowModal(false)
//     setModalAction(null)
//   }

//   return (
//     <div className="flex h-screen bg-background">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="flex-1 overflow-auto p-8">
//           <div className="space-y-8">
//             <div className="grid grid-cols-3 gap-6">
//               <div className="col-span-2">
//                 <ProfileCard userStatus={userStatus} />
//               </div>
//               <div>
//                 <ActionButtons onActionClick={handleActionClick} />
//               </div>
//             </div>

//             <div>
//               <ChannelsTable />
//             </div>
//           </div>
//         </main>
//       </div>

//       {showModal && <ConfirmationModal action={modalAction} onConfirm={handleConfirm} onCancel={handleCancel} />}
//     </div>
//   )
// }
