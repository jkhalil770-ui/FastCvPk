import { NextResponse } from "next/server";
import { sendCleanCVEmail } from "@/lib/email";

/**
 * API route to dispatch clean watermark-free PDFs via Resend.
 * Protected: requires a valid admin secret token in Authorization header.
 */
export async function POST(req: Request) {
  try {
    // Verify admin secret token — must match server-side env var
    const adminSecret = process.env.ADMIN_API_SECRET;
    const authHeader = req.headers.get("x-admin-token");

    if (!adminSecret || authHeader !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { email, name, pdfBase64 } = body;

    if (!email || !name || !pdfBase64) {
      return NextResponse.json({ error: "Missing required mail fields (email, name, or pdfBase64)" }, { status: 400 });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Call Resend client dispatcher
    const response = await sendCleanCVEmail({ email, name, pdfBase64 });
    
    if (response.error) {
      throw new Error(response.error.message);
    }

    return NextResponse.json({ success: true, id: response.data?.id });
  } catch (error: any) {
    console.error("API send-cv-email route error:", error);
    return NextResponse.json({ error: error.message || "Failed to dispatch email." }, { status: 500 });
  }
}
