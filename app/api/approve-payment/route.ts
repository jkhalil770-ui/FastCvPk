import { NextResponse } from "next/server";
import { sendCleanCVEmail } from "@/lib/email";

/**
 * API route to approve pending transaction claims.
 * Dispatches clean watermark-free PDF via Resend email.
 * NOTE: Firestore updates (hasWatermark: false) are done client-side in admin panel.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { paymentId, pdfBase64, email, name } = body;

    if (!paymentId || !pdfBase64 || !email || !name) {
      return NextResponse.json({ error: "Missing paymentId, pdfBase64, email, or name" }, { status: 400 });
    }

    // Dispatch Clean PDF via Resend Email
    try {
      const emailRes = await sendCleanCVEmail({
        email,
        name,
        pdfBase64
      });
      if (emailRes.error) {
        console.warn("Resend mail warning:", emailRes.error);
        return NextResponse.json({ error: "Email dispatch failed: " + emailRes.error.message }, { status: 500 });
      }
    } catch (mailErr: any) {
      console.error("Resend execution error:", mailErr);
      return NextResponse.json({ error: mailErr.message || "Email service failed." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Clean CV emailed successfully via Resend." });
  } catch (error: any) {
    console.error("API approve-payment route error:", error);
    return NextResponse.json({ error: error.message || "Failed to process payment approval." }, { status: 500 });
  }
}
