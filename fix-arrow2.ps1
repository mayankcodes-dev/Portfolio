$file = "d:\Portfolio\src\app\page.tsx"
$raw = [System.IO.File]::ReadAllBytes($file)
$content = [System.Text.Encoding]::UTF8.GetString($raw)

# Replace the garbled "Profile ..." sequence with "Profile →" using regex
# The pattern after "Profile " is garbled multi-byte: bytes 195 162 226 128 160 226 128 153
# Use regex to match "Profile " followed by any non-quote chars up to closing </a>
$before = $content
$content = [regex]::Replace($content, 'Profile [^"<]+(?=</a>)', 'Profile')

$replaced = ($content -ne $before)
Write-Host "Arrow sequences replaced: $replaced"

# Count occurrences of "Profile" now
$count = ([regex]::Matches($content, 'Profile')).Count
Write-Host "Profile occurrences: $count"

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "Saved."
