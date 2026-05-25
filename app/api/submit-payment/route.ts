import { NextResponse } from "next/server";

/**
 * API route to record user transaction ID claims for watermark removal.
 * NOTE: Actual Firestore save is handled by client SDK in download page.
 * This route validates and sanitizes the request and returns a payment ID.
 */

function sanitize(value: unknown, maxLen = 200): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "")  // strip HTML tags
    .replace(/[<>'"]/g, "")   // strip dangerous chars
    .trim()
    .substring(0, maxLen);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cvId = sanitize(body.cvId, 100);
    const name = sanitize(body.name, 100);
    const transactionId = sanitize(body.transactionId, 100);
    const email = sanitize(body.email, 200);

    if (!cvId || !name || !transactionId || !email) {
      return NextResponse.json({ error: "Missing required verification fields" }, { status: 400 });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Generate a payment ID to return (client saves to Firestore directly)
    const paymentId = "pay-" + Math.random().toString(36).substring(2, 12);

    // Return minimal response — no sensitive data leaked
    return NextResponse.json({ id: paymentId, success: true });
  } catch (error: any) {
    console.error("API submit-payment route error:", error);
    return NextResponse.json({ error: "Failed to submit payment claim." }, { status: 500 });
  }
}
