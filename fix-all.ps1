# Fix 1: Cursor dot 4x bigger (6px -> 24px)
$cursorFile = "d:\Portfolio\src\components\shared\cursor.tsx"
$cursor = [System.IO.File]::ReadAllText($cursorFile, [System.Text.Encoding]::UTF8)

# Change dot size from 6 to 24
$cursor = $cursor.Replace("width: 6,`n          height: 6,", "width: 24,`n          height: 24,")
# Fix the transform offset for centering (was mx-3, my-3 for 6px dot; now mx-12, my-12 for 24px dot)
$cursor = $cursor.Replace("translate(`${mx - 3}px, `${my - 3}px)", "translate(`${mx - 12}px, `${my - 12}px)")

[System.IO.File]::WriteAllText($cursorFile, $cursor, [System.Text.Encoding]::UTF8)

if ($cursor.Contains("width: 24,")) {
  Write-Host "OK: cursor dot updated to 24px"
} else {
  Write-Host "ERROR: cursor update failed"
}
