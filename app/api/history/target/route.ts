// import { NextResponse } from "next/server"

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url)
//   const search = searchParams.get("search")

//   const res = await fetch(
//     `http://94.72.111.23:2000/myritewallet/v1/ADMIN/ALL-CUSTOMERS/VIEW?search=${search}`
//   )
//   const data = await res.json()

//   return NextResponse.json(data)
// }


// app/api/pending/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://94.72.111.23:2000/myritewallet/v1/ADMIN/TARGET/HISTORY", {
      method: "GET",
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend request failed with ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // 👀 Log the structure so you know what property to map
    console.log("Backend response:", data);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch backend" }, { status: 500 });
  }
}

// POST: Create a group or sub-group (admin supplies name and optional parentGroupId for sub-groups)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Raw request body from frontend:", body);

    // Accept both 'name' and 'groupName' from frontend
    const name = body.name || body.groupName;
    const { parentGroupId, ...rest } = body;
    if (!name) {
      return NextResponse.json({ error: "Group name is required" }, { status: 400 });
    }

    // Compose payload for backend API
    const payload: any = {
      name,
      ...rest,
    };
    if (parentGroupId) payload.parentGroupId = parentGroupId;

    // Log payload for debugging
    console.log("Payload sent to backend API:", payload);

    // Replace with your actual backend endpoint for group creation
    const response = await fetch("http://94.72.111.23:2000/myritewallet/v1/ADMIN/TARGET/HISTORY", {
      method: "POST",
      headers: { "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend request failed with ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create group" }, { status: 500 });
  }
}
