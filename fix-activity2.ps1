$file = "d:\Portfolio\src\app\page.tsx"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# 1. Remove the "I'm Mayank" intro line from Dev Activity
$old1 = "`r`n              <p className=`"mt-1 text-base text-neutral-600 font-medium`">I&apos;m Mayank, a tinkerer obsessed with software&apos;s craft.</p>"
$content = $content.Replace($old1, "")
Write-Host "Intro line removed: $(-not $content.Contains('mt-1 text-base text-neutral-600'))"

# 2. Fix garbled em-dash: bytes for â€" → proper —
# The garbled sequence in the file for "—" rendered as "â€""
# Replace via regex on the "Coding every day" line
$content = [regex]::Replace($content, 'Coding every day [^\{]+\{" "\}', 'Coding every day &mdash;{" "}')
Write-Host "Em-dash fixed: $($content.Contains('&mdash;'))"

# 3. Fix garbled middle-dot: Â· → ·
$content = [regex]::Replace($content, '\{" "\}[^\{<]+\{" "\}', '{" "}&middot;{" "}')
Write-Host "Middot fixed: $($content.Contains('&middot;'))"

# 4. Hero subtitle: add whitespace-nowrap to keep on one line
$old4 = 'className="mt-6 text-neutral-500 text-xl md:text-xl leading-relaxed font-sans font-light"'
$new4 = 'className="mt-6 text-neutral-500 text-base md:text-lg leading-relaxed font-sans font-light whitespace-nowrap"'
$content = $content.Replace($old4, $new4)
Write-Host "Hero subtitle whitespace-nowrap: $($content.Contains('whitespace-nowrap'))"

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "Saved."
