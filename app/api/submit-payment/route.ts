import { NextResponse } from "next/server";

/**
 * API route to record user transaction ID claims for watermark removal.
 * NOTE: Actual Firestore save is handled by client SDK in download page.
 * This route validates the request and returns a payment ID.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cvId, name, transactionId, email } = body;

    if (!cvId || !name || !transactionId || !email) {
      return NextResponse.json({ error: "Missing required verification fields" }, { status: 400 });
    }

    // Generate a payment ID to return (client saves to Firestore directly)
    const paymentId = "pay-" + Math.random().toString(36).substring(2, 12);

    return NextResponse.json({ id: paymentId, success: true });
  } catch (error: any) {
    console.error("API submit-payment route error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit payment claim." }, { status: 500 });
  }
}
