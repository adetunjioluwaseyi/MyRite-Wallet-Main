// app/api/contributors/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      "http://94.72.111.23:2000/myritewallet/v1/ADMIN/ROTATION-GROUP/WITH-SLOT",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend request failed with ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Backend response:", JSON.stringify(data, null, 2));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch backend" },
      { status: 500 }
    );
  }
}
