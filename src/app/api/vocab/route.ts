import { NextRequest, NextResponse } from "next/server"

const API_BASE = "https://german-language.onrender.com"
const API_KEY = "demo-key-12345"

export async function GET(request: NextRequest) {
  // Read the level from the URL e.g. /api/vocab?level=a1
  const { searchParams } = new URL(request.url)
  const level = searchParams.get("level")

  // Validate — don't let bad requests hit the external API
  const validLevels = ["a1", "a2", "b1", "b2", "c1"]
  if (!level || !validLevels.includes(level)) {
    return NextResponse.json(
      { error: "Invalid level. Use a1, a2, b1, b2, or c1" },
      { status: 400 }
    )
  }

  try {
    // Call the rep12 API from the server
    const response = await fetch(
      `${API_BASE}/vocab?level=${level}&limit=100&offset=0`,
      {
        headers: { "X-API-Key": API_KEY },
        // Cache this response for 1 hour — handles cold start delays
        next: { revalidate: 3600 },
      }
    )

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch vocabulary" },
      { status: 500 }
    )
  }
}