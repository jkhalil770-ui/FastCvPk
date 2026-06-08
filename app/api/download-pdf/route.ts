import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const pdfBase64 = formData.get("pdfBase64") as string;
    const filename = formData.get("filename") as string;

    if (!pdfBase64 || !filename) {
      return NextResponse.json({ error: "Missing pdfBase64 or filename" }, { status: 400 });
    }

    // Convert base64 back to binary buffer
    const pdfBuffer = Buffer.from(pdfBase64, "base64");

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err: any) {
    console.error("API download-pdf error:", err);
    return NextResponse.json({ error: err.message || "Failed to download PDF." }, { status: 500 });
  }
}
