"use client"

export function ActionButtons({
  onActionClick,
}: {
  onActionClick: (action: "suspend" | "penalize") => void
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <button
        type="button"
        title="Join a new channel"
        className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 font-medium py-2.5 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        {/* plus icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-sm">Join Channel</span>
      </button>

      <button
        type="button"
        onClick={() => onActionClick("suspend")}
        title="Suspend account"
        aria-label="Suspend account"
        className="inline-flex items-center justify-center gap-2 border border-border bg-card text-foreground font-medium py-2.5 px-4 rounded-md hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {/* suspend icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 2v20M5 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-sm">Suspend</span>
      </button>

      <button
        type="button"
        onClick={() => onActionClick("penalize")}
        title="Penalize account"
        aria-label="Penalize account"
        className="inline-flex items-center justify-center gap-2 bg-destructive text-white font-medium py-2.5 px-4 rounded-md hover:bg-destructive/90 transition-colors focus:outline-none focus:ring-2 focus:ring-destructive/30"
      >
        {/* penalize / warning icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="none" fill="currentColor" />
          <path d="M12 9v4M12 17h.01" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-sm">Penalize</span>
      </button>
    </div>
  )
}
