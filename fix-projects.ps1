$nl = "`r`n"

# ──────────────────────────────────────────────
# 1. Fix projects.ts: ClinIQ image + description
# ──────────────────────────────────────────────
$projFile = "d:\Portfolio\src\data\projects.ts"
$proj = [System.IO.File]::ReadAllText($projFile, [System.Text.Encoding]::UTF8)

# Set ClinIQ image to local file
$proj = $proj.Replace('id: "cliniq",' + $nl + '    title: "ClinIQ",' + $nl + '    description: "B2B SaaS platform that captures patient history via AI voice in 22 languages, digitizes medical documents, and delivers a structured clinical summary to the doctor before the patient walks in.",' + $nl + '    longDescription: "ClinIQ is a B2B SaaS platform that captures complete patient history through AI voice conversation in 22 languages, digitizes medical documents, and delivers a structured clinical summary to the doctor before the patient walks in. Deploys as a web app, mobile app, or clinic kiosk. Built on Groq LPUs for 85% faster inference, hybrid RAG over ICMR/ICD-10 for clinical accuracy, and Whisper-v3 for <500ms multilingual transcription.",' + $nl + '    image: ""',
  'id: "cliniq",' + $nl + '    title: "ClinIQ",' + $nl + '    description: "B2B SaaS that captures complete patient history via AI voice in 22 languages, digitizes medical documents, and delivers a structured clinical summary to the doctor before the patient walks in.",' + $nl + '    longDescription: "ClinIQ is a B2B SaaS platform that captures patient history through AI voice in 22 languages, digitizes medical records, and delivers a structured clinical summary to the doctor before the patient walks in. Deploys as a web app, mobile app, or clinic kiosk.",' + $nl + '    image: "/images/Cliniq.jpeg"')

[System.IO.File]::WriteAllText($projFile, $proj, [System.Text.Encoding]::UTF8)

$check = $proj.Contains('/images/Cliniq.jpeg')
Write-Host "ClinIQ image set: $check"
$check2 = $proj.Contains('Groq LPUs')
Write-Host "Engineering jargon removed: $(-not $check2)"
