$projFile = "d:\Portfolio\src\data\projects.ts"
$proj = [System.IO.File]::ReadAllText($projFile, [System.Text.Encoding]::UTF8)
$idx = $proj.IndexOf('id: "cliniq"')
Write-Host "Found at: $idx"
$snip = $proj.Substring($idx, 600)
Write-Host "=== RAW SNIPPET ==="
Write-Host $snip
