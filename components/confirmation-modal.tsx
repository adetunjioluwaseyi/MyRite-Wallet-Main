"use client"

export function ConfirmationModal({
  action,
  onConfirm,
  onCancel,
}: {
  action: "suspend" | "penalize" | null
  onConfirm: () => void
  onCancel: () => void
}) {
  const getModalContent = () => {
    switch (action) {
      case "suspend":
        return {
          title: "Suspend Account",
          message: "Are you sure you want to suspend this account?",
          confirmText: "Yes, Suspend",
          confirmColor: "bg-red-600 hover:bg-red-700",
        }
      case "penalize":
        return {
          title: "Penalize Account",
          message: "Are you sure you want to penalize this account?",
          confirmText: "Yes, Penalize",
          confirmColor: "bg-yellow-600 hover:bg-yellow-700",
        }
      default:
        return null
    }
  }

  const content = getModalContent()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg p-8 max-w-sm w-full mx-4">
        <h3 className="text-2xl font-bold text-foreground mb-4">{content?.title}</h3>
        <p className="text-muted-foreground mb-8">{content?.message}</p>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-muted text-foreground font-semibold py-2 px-4 rounded-lg hover:bg-muted/80 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 text-white font-semibold py-2 px-4 rounded-lg transition-colors ${content?.confirmColor}`}
          >
            {content?.confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
