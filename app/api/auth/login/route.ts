export async function POST(request: Request) {
  try {
    console.log("[v0] API proxy received request")

    const body = await request.json()
    console.log("[v0] Request body:", body)

    const externalApiUrl =
      "http://94.72.111.23:2000/myritewallet/v1/ADMIN/AUTH/ADMIN/LOGIN"
    console.log("[v0] Forwarding to:", externalApiUrl)

    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    console.log("[v0] External API response status:", response.status)

    const contentType = response.headers.get("content-type")
    let data

    if (contentType?.includes("application/json")) {
      data = await response.json()
    } else {
      const text = await response.text()
      console.error("[v0] Unexpected response:", text)
      return Response.json(
        { message: "Unexpected response from server" },
        { status: response.status }
      )
    }

    console.log("[v0] External API response:", data)

    if (!response.ok) {
      return Response.json(
        { message: data.message || "Invalid username or password" },
        { status: response.status }
      )
    }

    return Response.json(data, { status: 200 })
  } catch (error) {
    console.error("[v0] API proxy error:", error)
    return Response.json(
      { message: "Connection failed. Please try again." },
      { status: 500 }
    )
  }
}
