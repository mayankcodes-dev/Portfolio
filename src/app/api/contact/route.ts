import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  // ── Parse & validate ────────────────────────────────────────────────────
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "All fields (name, email, message) are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // ── Send via Resend ──────────────────────────────────────────────────────
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    // In local dev without a key configured, log and return success so the
    // UI flow can still be tested without crashing.
    console.warn("[contact] RESEND_API_KEY not set — email not sent (dev mode).");
    return NextResponse.json({ success: true, dev: true });
  }

  const emailPayload = {
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: ["admin@mayankcodes.dev"], // ← update to your real inbox once domain is verified
    reply_to: email,
    subject: `New message from ${name} via portfolio`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f9fafb;border-radius:12px;">
        <h2 style="color:#1a1a1a;margin-bottom:8px;">New Portfolio Contact</h2>
        <p style="color:#6b7280;margin-bottom:24px;font-size:14px;">Submitted via mayankcodes.dev</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;font-weight:600;color:#374151;width:80px;">Name</td>
            <td style="padding:8px 0;color:#111827;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:600;color:#374151;">Email</td>
            <td style="padding:8px 0;color:#111827;"><a href="mailto:${email}" style="color:#6366f1;">${email}</a></td>
          </tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#fff;border-radius:8px;border:1px solid #e5e7eb;">
          <p style="margin:0;font-weight:600;color:#374151;margin-bottom:8px;">Message</p>
          <p style="margin:0;color:#374151;white-space:pre-line;line-height:1.6;">${message}</p>
        </div>
      </div>
    `,
  };

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailPayload),
  });

  if (!resendResponse.ok) {
    const errorBody = await resendResponse.text();
    console.error("[contact] Resend error:", errorBody);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
