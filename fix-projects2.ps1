$projFile = "d:\Portfolio\src\data\projects.ts"
$proj = [System.IO.File]::ReadAllText($projFile, [System.Text.Encoding]::UTF8)
$nl = "`n"  # LF only

$oldBlock = 'id: "cliniq",' + $nl + '    title: "ClinIQ",' + $nl + '    description: "B2B SaaS platform that captures patient history via AI voice in 22 languages, digitizes medical documents, and delivers a structured clinical summary to the doctor before the patient walks in.",' + $nl + '    longDescription: "ClinIQ is a B2B SaaS platform that captures complete patient history through AI voice conversation in 22 languages, digitizes medical documents, and delivers a structured clinical summary to the doctor before the patient walks in. Deploys as a web app, mobile app, or clinic kiosk. Built on Groq LPUs for 85% faster inference, hybrid RAG over ICMR/ICD-10 for clinical accuracy, and Whisper-v3 for <500ms multilingual transcription.",' + $nl + '    image: ""'

$newBlock = 'id: "cliniq",' + $nl + '    title: "ClinIQ",' + $nl + '    description: "B2B SaaS that captures patient history via AI voice in 22 languages, digitizes medical records, and delivers a structured clinical summary to the doctor before the patient walks in.",' + $nl + '    longDescription: "ClinIQ is a B2B SaaS platform that captures patient history through AI voice in 22 languages, digitizes medical records, and delivers a structured clinical summary to the doctor before the patient walks in. Deploys as a web app, mobile app, or clinic kiosk.",' + $nl + '    image: "/images/Cliniq.jpeg"'

$before = $proj
$proj = $proj.Replace($oldBlock, $newBlock)

if ($proj -eq $before) {
  Write-Host "ERROR: replacement did not match"
  # Try partial match for debugging
  $imgIdx = $proj.IndexOf('image: ""')
  Write-Host "Empty image at: $imgIdx"
} else {
  Write-Host "SUCCESS: ClinIQ block updated"
  [System.IO.File]::WriteAllText($projFile, $proj, [System.Text.Encoding]::UTF8)
  Write-Host "Saved."
}
