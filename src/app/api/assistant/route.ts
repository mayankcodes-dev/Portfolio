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

  if (entry.count >= 10) return true; // 10 requests per minute per IP

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

  /* 3. Prepare API keys */
  const apiKeys = [
    process.env.GROQ_API_KEY,
    process.env.GROQ_API_KEY_2,
    process.env.GROQ_API_KEY_3,
  ].filter((key): key is string => !!key);

  if (apiKeys.length === 0) {
    return NextResponse.json(
      { error: "Assistant is temporarily unavailable. Please contact Mayank directly." },
      { status: 503 }
    );
  }

  /* 4. Call Groq API with fallback rotation */
  for (let i = 0; i < apiKeys.length; i++) {
    const apiKey = apiKeys[i];
    console.log(`[assistant] Trying key #${i + 1} of ${apiKeys.length}...`);
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

      if (groqRes.ok) {
        const data = await groqRes.json();
        const response: string =
          data?.choices?.[0]?.message?.content?.trim() ?? "No response received.";
        console.log(`[assistant] Success with key #${i + 1}`);
        return NextResponse.json({ response });
      }

      // If we get a 429 or 5xx, try the next key
      if (groqRes.status === 429 || (groqRes.status >= 500 && groqRes.status <= 599)) {
        console.warn(`[assistant] Key #${i + 1} failed with ${groqRes.status}, rotating to next key...`);
        continue;
      }

      // Otherwise, return error immediately
      return NextResponse.json(
        { error: "Assistant encountered an error. Please try again." },
        { status: groqRes.status }
      );
    } catch (err) {
      console.error(`[assistant] Network error on key #${i + 1}:`, err);
      continue;
    }
  }

  return NextResponse.json(
    { error: "Failed to reach the assistant. Check your connection." },
    { status: 503 }
  );
}
