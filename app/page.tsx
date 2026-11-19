"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)

  const API_URL = "/api/auth/login"

  useEffect(() => {
    const savedUsername = localStorage.getItem("savedUsername")
    const rememberMeFlag = localStorage.getItem("rememberMe")
    if (rememberMeFlag === "true" && savedUsername) {
      setUsername(savedUsername)
      setRememberMe(true)
    }
  }, [])

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      console.log("Sign-in attempt with username:", username)
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      console.log("[v0] Response status:", response.status)
      console.log("[v0] Response ok:", response.ok)

      const data = await response.json()
      console.log("[v0] Response data:", data)

      if (!response.ok || data.responseCode !== "00") {
        setError(data.responseMessage || "Invalid username or password")
        setLoading(false)
        return
      }

      // Save token/user info if provided
      // if (data.token) {
      //   localStorage.setItem("authToken", data.token)
      //   localStorage.setItem("user", JSON.stringify(data.user))
      // }

      // Save token/user info if provided
    if (data.token) {
      localStorage.setItem("authToken", data.token)
    }

    // Save user profile info from API
    if (data.name) {
      localStorage.setItem("userName", data.name)
    }
    if (data.mobile) {
      localStorage.setItem("userMobile", data.mobile)
    }


      if (rememberMe) {
        localStorage.setItem("rememberMe", "true")
        localStorage.setItem("savedUsername", username)
      }

      router.push("/dashboard")
      
    } catch (err) {
      console.error("[v0] Sign-in error:", err)
      setError("Connection failed. Please check your network and try again.")
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left side - Logo */}
      <div className="hidden md:flex md:w-1/2 bg-white flex-col items-center justify-center p-8">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="MyRite Wallet Logo" className="h-50 w-500" />
        </div>
      </div>

      {/* Right side - Sign In Form */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-900 to-purple-800 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-white">Nice to see you!</h2>
            <p className="text-purple-200">Enter your username and password to sign in</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-purple-800 border border-purple-700 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-purple-800 border border-purple-700 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-purple-500"
              />
              <label htmlFor="remember" className="text-sm text-purple-200">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-purple-900 font-bold rounded-lg hover:bg-purple-50 transition"
              disabled={loading}
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>

          {error && <div className="text-sm text-red-400 text-center">{error}</div>}

          <div className="text-center text-sm text-purple-200">
            Don't have an account?{" "}
            <a href="#" className="text-white font-semibold hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
