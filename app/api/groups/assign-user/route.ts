import { NextResponse } from "next/server"

// POST: Assign a user to a group or sub-group
export async function POST(req: Request) {
  try {

    const body = await req.json()
    const { userId, groupId, packNumber } = body
    if (!userId || !groupId || !packNumber) {
      return NextResponse.json({ error: "userId, groupId, and packNumber are required" }, { status: 400 })
    }

    // Replace with your actual backend endpoint for user assignment
    const response = await fetch("http://94.72.111.23:2000/myritewallet/v1/ADMIN/ROTATION-GROUP/ASSIGN-USER", {
      method: "POST",
      headers: { "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify({ userId, groupId, packNumber }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend request failed with ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to assign user to group" }, { status: 500 })
  }
}
