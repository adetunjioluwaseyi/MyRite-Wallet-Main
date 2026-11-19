"use client"

export function ProfileCard({ userStatus }: { userStatus: string }) {
  const getStatusColor = () => {
    switch (userStatus) {
      case "Active":
        return "text-green-500"
      case "Suspended":
        return "text-red-500"
      case "Penalized":
        return "text-yellow-500"
      default:
        return "text-green-500"
    }
  }

  return (
    <div className="bg-card rounded-2xl p-8">
      <div className="flex gap-8">
        {/* Left side: Profile info */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center overflow-hidden">
            <img src="/user-avatar.jpg" alt="User avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mt-4">Deborah . A</h2>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < 1 ? "text-yellow-500 text-lg" : "text-gray-400 text-lg"}>
                ★
              </span>
            ))}
          </div>
          <span className={`text-sm font-semibold mt-2 ${getStatusColor()}`}>{userStatus}</span>
        </div>

        {/* Right side: Balance cards */}
        <div className="flex-1">
  <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-white">
    <div className="grid grid-cols-2 gap-6">
      {/* Wallet Balance */}
      <div>
        <p className="text-sm opacity-90">Wallet Balance</p>
        <p className="text-3xl font-bold mt-1">₦ 200,000</p>
        {/* <p className="text-sm mt-1 opacity-90">Pay Out</p> */}
      </div>

      {/* Eligibility */}
      <div>
        <p className="text-sm opacity-90">Eligibility</p>
        <p className="text-3xl font-bold mt-1">₦ 20,000</p>
        <button className="mt-3 px-4 py-2 bg-white text-primary font-semibold rounded-lg shadow hover:bg-gray-100">
          Pay Out
        </button>
        {/* <p className="text-sm mt-1 opacity-90">Pay Out</p> */}
      </div>
    </div>
  </div>
</div>

        {/* <div className="flex-1 space-y-4">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-5 text-white">
            <p className="text-sm opacity-90">Wallet Balance</p>
            <p className="text-3xl font-bold mt-1">₦ 200,000</p>
            <p className="text-sm mt-1 opacity-90">Pay Out</p>
          </div>
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-5 text-white">
            <p className="text-sm opacity-90">Eligibility</p>
            <p className="text-3xl font-bold mt-1">₦ 20,000</p>
            <p className="text-sm mt-1 opacity-90">Pay Out</p>
          </div>
        </div> */}
      </div>
    </div>
  )
}
