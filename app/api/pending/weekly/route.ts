// app/api/pending/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://94.72.111.23:2000/myritewallet/v1/ADMIN/GROUP/WEEKLY/VIEW", {
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
