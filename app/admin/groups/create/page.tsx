import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import CreateGroupForm from "@/components/CreateGroupForm"

export default function AdminCreateGroupPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Create Group / Sub-group</h1>
            <CreateGroupForm />
          </div>
        </main>
      </div>
    </div>
  )
}
