import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const backendResponse = await fetch(
      "http://94.72.111.23:2000/myritewallet/v1/ADMIN/WITHDRAWAL/UPDATE",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    )

    const text = await backendResponse.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      data = { raw: text }
    }

    return NextResponse.json(data, { status: backendResponse.status })
  } catch (err: any) {
    console.error("Proxy error:", err)
    return NextResponse.json(
      { error: "Proxy failed", details: err.message },
      { status: 500 }
    )
  }
}
