import { NextRequest, NextResponse } from "next/server";
import { PORTFOLIO_CONTEXT } from "@/data/portfolio-context";

/* ─── In-memory rate limiter (5 requests per minute per IP) ─── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  if (entry.count >= 5) return true;

  entry.count++;
  return false;
}

/* ─── POST /api/assistant ─── */
export async function POST(req: NextRequest) {
  /* 1. Rate limit */
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment before asking again." },
      { status: 429 }
    );
  }

  /* 2. Parse + validate body */
  let query: string;
  try {
    const body = await req.json();
    query = typeof body.query === "string" ? body.query.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!query) {
    return NextResponse.json(
      { error: "Query cannot be empty. Try: ask What tech stack does Mayank use?" },
      { status: 400 }
    );
  }

  if (query.length > 500) {
    return NextResponse.json(
      { error: "Query too long. Please keep it under 500 characters." },
      { status: 400 }
    );
  }

  /* 3. Check API key */
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Assistant is temporarily unavailable. Please contact Mayank directly." },
      { status: 503 }
    );
  }

  /* 4. Call Groq API */
  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: PORTFOLIO_CONTEXT,
          },
          {
            role: "user",
            content: query,
          },
        ],
        max_tokens: 220,
        temperature: 0.6,
        stream: false,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("[assistant] Groq API error:", groqRes.status, errText);
      return NextResponse.json(
        { error: "Assistant encountered an error. Please try again." },
        { status: 502 }
      );
    }

    const data = await groqRes.json();
    const response: string =
      data?.choices?.[0]?.message?.content?.trim() ?? "No response received.";

    return NextResponse.json({ response });
  } catch (err) {
    console.error("[assistant] Fetch error:", err);
    return NextResponse.json(
      { error: "Failed to reach the assistant. Check your connection." },
      { status: 503 }
    );
  }
}
