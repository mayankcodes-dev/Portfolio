import { NextResponse } from "next/server";

/* GET /api/test-groq — diagnose Groq key/model on Vercel */
export async function GET() {
  const key = process.env.GROQ_API_KEY ?? "";
  const models = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "llama3-70b-8192",
    "llama3-8b-8192",
    "gemma2-9b-it",
    "mixtral-8x7b-32768",
  ];
  const results: Record<string, string | number> = {
    keyPresent: key ? `yes (ends ...${key.slice(-6)})` : "NO KEY",
    keyLength: key.length,
  };

  for (const model of models) {
    try {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: "hi" }],
          max_tokens: 5,
        }),
      });
      const body = await r.text().catch(() => "");
      results[model] = r.ok ? "OK" : `${r.status}: ${body.slice(0, 120)}`;
    } catch (e) {
      results[model] = `network error: ${String(e).slice(0, 60)}`;
    }
  }

  return NextResponse.json(results);
}
