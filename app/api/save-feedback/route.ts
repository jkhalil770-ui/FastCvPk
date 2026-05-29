import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Server-side API route to save feedback to Firestore.
 * Uses the Firebase client SDK from server context, bypassing
 * client-side Firestore security rules for anonymous users.
 */
function sanitize(value: unknown, maxLen = 500): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "")   // strip HTML tags
    .replace(/[<>'"]/g, "")    // strip dangerous chars
    .trim()
    .substring(0, maxLen);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 200);
    const cvType = sanitize(body.cvType, 100);
    const message = sanitize(body.message, 500);
    const rating = typeof body.rating === "number" ? Math.min(5, Math.max(1, body.rating)) : 0;

    if (!name || !message || !rating) {
      return NextResponse.json({ error: "Missing required fields: name, message, rating" }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Message too short (min 10 characters)" }, { status: 400 });
    }

    // Email validation (optional field)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    await addDoc(collection(db, "feedback"), {
      name,
      email,
      cvType,
      rating,
      message,
      createdAt: serverTimestamp(),
      source: "api-route",
      page: "homepage"
    });

    return NextResponse.json({ success: true, message: "Feedback saved successfully." });
  } catch (error: any) {
    console.error("API save-feedback error:", error);
    return NextResponse.json({ error: error.message || "Failed to save feedback." }, { status: 500 });
  }
}
