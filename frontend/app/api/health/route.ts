import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json({
      status: "healthy",
      service: "Next.js Real Estate App",
      timestamp: new Date().toISOString(),
      features: {
        virtualTours: true,
        multilingual: true,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        service: "Next.js Real Estate App",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
