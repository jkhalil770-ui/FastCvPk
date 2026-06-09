import { Resend } from "resend";

// Standard Resend initialization using Server-Side Secret Key
const resendApiKey = process.env.RESEND_API_KEY || "re_dummy_key_for_build";
export const resend = new Resend(resendApiKey);

export interface SendEmailParams {
  email: string;
  name: string;
  pdfBase64: string; // Base64 content of clean watermark-free PDF
}

/**
 * Delivers clean watermark-free PDF to customer inbox via Resend.
 * Matches requested email template and exact text copy.
 */
export async function sendCleanCV({ email, name, pdfBase64 }: SendEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured on the server.");
  }

  const cleanFilename = `${name.trim().replace(/\s+/g, "_")}_CV.pdf`;

  // HTML content matching exact text copy
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #333333;">
      <p style="font-size: 15px; line-height: 1.6; margin-bottom: 15px;">Assalam o Alaikum ${name},</p>
      
      <p style="font-size: 15px; line-height: 1.6; margin-bottom: 15px;">
        Aapki payment confirm ho gayi.<br />
        Clean CV (without watermark) attached hai.
      </p>
      
      <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
        FastCV PK use karne ka shukriya!<br />
        <a href="https://fastcvpk.online" style="color: #3b82f6; text-decoration: none; font-weight: bold;">fastcvpk.online</a>
      </p>

      <p style="font-size: 15px; line-height: 1.6; font-weight: bold; color: #4b5563; margin-top: 25px;">
        Team FastCV PK
      </p>
    </div>
  `;

  const textContent = `Assalam o Alaikum ${name},

Aapki payment confirm ho gayi.
Clean CV (without watermark) attached hai.

FastCV PK use karne ka shukriya!
fastcvpk.online

Team FastCV PK`;

  return await resend.emails.send({
    from: "FastCV PK <noreply@fastcvpk.online>", // Verified domains are required on Resend live dashboard
    to: email,
    subject: "Aapki Professional CV Ready Hai ✓ — FastCV PK",
    html: htmlContent,
    text: textContent,
    attachments: [
      {
        filename: cleanFilename,
        content: pdfBase64,
      }
    ]
  });
}

// Keep alias for compatibility
export const sendCleanCVEmail = sendCleanCV;
