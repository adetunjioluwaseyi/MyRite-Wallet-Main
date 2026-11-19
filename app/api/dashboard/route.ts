import { NextResponse } from "next/server"

const DASHBOARD_URL = "http://94.72.111.23:2000/myritewallet/v1/ADMIN/DASHBOARD"

export async function GET() {
  try {
    const response = await fetch(DASHBOARD_URL, {
      headers: { accept: "application/json" },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Dashboard backend request failed with ${response.status}` },
        { status: response.status },
      )
    }

    return NextResponse.json(await response.json())
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the dashboard backend" },
      { status: 502 },
    )
  }
}