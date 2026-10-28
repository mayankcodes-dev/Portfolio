$file = "d:\Portfolio\src\app\page.tsx"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# Find the Profile button lines
$idx1 = $content.IndexOf("Profile")
Write-Host "First Profile at: $idx1"
if ($idx1 -ge 0) {
  $snippet = $content.Substring($idx1, 30)
  Write-Host "Snippet bytes:"
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($snippet)
  Write-Host ($bytes -join " ")
  Write-Host "Snippet text: $snippet"
}

# Try to find and replace using the actual bytes
# Find all occurrences of "Profile" followed by anything up to the closing quote
$profilePattern = 'Profile [^\x22<]+'
$matches = [regex]::Matches($content, $profilePattern)
Write-Host "Found $($matches.Count) Profile button(s)"
foreach ($m in $matches) {
  Write-Host "  At $($m.Index): '$($m.Value)'"
}
