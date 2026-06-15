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

    // Replace non-ASCII characters with underscores for ASCII filename fallback
    const safeFilename = filename.replace(/[^\x00-\x7F]/g, "_");
    const encodedFilename = encodeURIComponent(filename);

    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    // Standard ASCII filename fallback + RFC 5987 UTF-8 filename
    headers.set("Content-Disposition", `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodedFilename}`);
    headers.set("Cache-Control", "no-store, max-age=0");

    return new NextResponse(pdfBuffer, { headers });
  } catch (err: any) {
    console.error("API download-pdf error:", err);
    return NextResponse.json({ error: err.message || "Failed to download PDF." }, { status: 500 });
  }
}
