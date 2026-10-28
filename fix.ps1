$f = 'd:\Portfolio\src\data\projects.ts'
$c = Get-Content $f -Raw

# Update ClinIQ description (short)
$c = $c.Replace(
  '"AI Clinical Triage & B2B SaaS platform — 85% latency reduction via Groq LPU, sub-500ms speech transcription across 22 Indian languages."',
  '"B2B SaaS platform that captures patient history via AI voice in 22 languages, digitizes medical documents, and delivers a structured clinical summary to the doctor before the patient walks in."'
)

# Update ClinIQ longDescription (what user specified, slightly expanded)
$c = $c.Replace(
  '"ClinIQ replaces multi-call LLM waterfalls with a deterministic clinical state machine and single-pass JSON inference on Groq LPUs (LLaMA-3.3-70B), cutting p95 latency by 85% (4,200ms to 480ms). Features sub-500ms speech transcription across 22 Indian languages via Whisper-v3-turbo, <75ms hybrid clinical RAG (pgvector + BM25 over ICMR/ICD-10), a 60fps WebGL 3D UI, and 1-click A4 PDF prescription generation at Rs. 1.35/intake with >93% margin. Reduced doctor intake time by 75% across 210+ pilot intakes."',
  '"ClinIQ is a B2B SaaS platform that captures complete patient history through AI voice conversation in 22 languages, digitizes medical documents, and delivers a structured clinical summary to the doctor before the patient walks in. Deploys as a web app, mobile app, or clinic kiosk. Built on Groq LPUs for 85% faster inference, hybrid RAG over ICMR/ICD-10 for clinical accuracy, and Whisper-v3 for <500ms multilingual transcription."'
)

# Update YoYo longDescription - keep short like other projects
$c = $c.Replace(
  '"Serverless hotel booking platform across 10,000+ hotels in 200+ Indian cities. Features atomic date-range overlap detection preventing double-bookings, webhook-verified idempotent Stripe checkouts, and Maya — a stateful Gemini Flash AI concierge that converts natural-language queries into MongoDB filter pipelines. Deployed on AWS Lambda with 17 secrets in AWS SSM, Upstash Redis live viewer tracking, and a PWA frontend with <2s LCP on 4G."',
  '"Full-stack hotel booking platform with 10,000+ hotels across 200+ Indian cities. Includes Stripe payments, double-booking prevention, and Maya — a Gemini AI concierge for natural-language hotel search. Serverless backend on AWS Lambda with Google OAuth, PWA frontend, and <2s LCP on 4G."'
)

Set-Content $f $c -NoNewline
Write-Host "projects.ts done"
Select-String -Path $f -Pattern '"cliniq"' | Select-Object -First 3
