$file = "d:\Portfolio\src\components\sections\projects-section.tsx"
$raw = [System.IO.File]::ReadAllBytes($file)
$content = [System.Text.Encoding]::UTF8.GetString($raw)

# Detect line ending
$hasCRLF = $content.Contains("`r`n")
Write-Host "Has CRLF: $hasCRLF"
Write-Host "Length: $($content.Length)"

# Find the section
$idx = $content.IndexOf("Project rows")
Write-Host "Found 'Project rows' at index: $idx"

if ($idx -ge 0) {
  $snippet = $content.Substring($idx, 400)
  Write-Host "=== SNIPPET ==="
  Write-Host $snippet
}
