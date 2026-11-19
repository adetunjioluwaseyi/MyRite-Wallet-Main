export default function SignOutPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="bg-card p-8 rounded-lg border border-border text-center">
        <h1 className="text-2xl font-bold mb-4">Signed out</h1>
        <p className="text-sm text-muted-foreground mb-6">This is a placeholder sign-out page. Implement actual sign-out logic as needed.</p>
        <a href="/" className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded">Go back to dashboard</a>
      </div>
    </div>
  )
}
