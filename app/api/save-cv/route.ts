import { NextResponse } from "next/server";

/**
 * API route to save CV data. 
 * Note: Actual saving is done client-side via Firestore SDK.
 * This endpoint acts as a proxy/validator.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId = null,
      sessionId = "guest-session",
      cvType,
      formData,
      generatedContent = {},
      hasWatermark = true
    } = body;

    if (!cvType || !formData) {
      return NextResponse.json({ error: "Missing required fields: cvType or formData" }, { status: 400 });
    }

    // Generate unique CV ID
    const cvId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Return generated ID; client handles Firestore save to avoid protobuf issues
    return NextResponse.json({ id: cvId, success: true });
  } catch (error: any) {
    console.error("API save-cv route error:", error);
    return NextResponse.json({ error: error.message || "Failed to process CV save request." }, { status: 500 });
  }
}
