import { NextRequest, NextResponse } from "next/server";
import { PORTFOLIO_CONTEXT } from "@/data/portfolio-context";

/* ─── In-memory rate limiter (10 requests per minute per IP) ─── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 10) return true;
  entry.count++;
  return false;
}

/* ─── Model fallback list ─── */
const MODELS = [
  "llama-3.3-70b-versatile",
  "llama3-70b-8192",
  "llama3-8b-8192",
  "gemma2-9b-it",
];

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
      { error: "Assistant is temporarily unavailable. Please contact Mayank directly at admin@mayankcodes.dev" },
      { status: 503 }
    );
  }

  /* 4. Try each (key × model) combination until one succeeds */
  for (const apiKey of apiKeys) {
    for (const model of MODELS) {
      try {
        console.log(`[assistant] Trying model=${model} key=${apiKey.slice(-6)}`);
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: PORTFOLIO_CONTEXT },
              { role: "user",   content: query },
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
          console.log(`[assistant] Success: model=${model}`);
          return NextResponse.json({ response });
        }

        const errBody = await groqRes.text().catch(() => "");
        console.warn(`[assistant] model=${model} status=${groqRes.status} body=${errBody.slice(0, 120)}`);

        // 401 = bad key → try next key (break inner model loop)
        if (groqRes.status === 401 || groqRes.status === 403) break;

        // 404 / 400 on model → try next model
        // 429 / 5xx → try next model or next key
        // continue to next model
      } catch (err) {
        console.error(`[assistant] Network error model=${model}:`, err);
        // Network error → try next model
      }
    }
  }

  return NextResponse.json(
    { error: "Assistant is unavailable right now. Please try again in a moment or reach out at admin@mayankcodes.dev" },
    { status: 503 }
  );
}
