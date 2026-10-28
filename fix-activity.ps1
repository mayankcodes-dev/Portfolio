$file = "d:\Portfolio\src\app\page.tsx"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
$nl = "`r`n"

# ------- Fix 1: Remove the DSA icon div from the first stat card -------
# Old: has the orange LeetCode icon wrapped in a div
$oldDSAIcon = "              <div className=`"grid size-12 flex-shrink-0 place-items-center rounded-xl bg-[#FFA116]/10`">$nl                <svg viewBox=`"0 0 24 24`" fill=`"#FFA116`" className=`"size-6`">$nl                  <path d=`"M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0z`" />$nl                </svg>$nl              </div>"

$content = $content.Replace($oldDSAIcon, "")
Write-Host "DSA icon removed: $(-not $content.Contains('FFA116'))"

# ------- Fix 2: Remove GitHub icon div from second stat card -------
$oldGHIcon = "              <div className=`"grid size-12 flex-shrink-0 place-items-center rounded-xl bg-[#0a0a0a]/5`">$nl                <svg viewBox=`"0 0 24 24`" fill=`"currentColor`" className=`"size-6 text-[#0a0a0a]`">$nl                  <path d=`"M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0 1 12 6.84a9.56 9.56 0 0 1 2.5.34c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z`" />$nl                </svg>$nl              </div>"

$content = $content.Replace($oldGHIcon, "")
Write-Host "GH icon removed: $(-not $content.Contains('bg-[#0a0a0a]/5'))"

# ------- Fix 3: Fix the "Profile â†'" arrow encoding in both buttons -------
# The file has garbled encoding; replace with plain ASCII arrow
$content = $content.Replace("Profile â†'", "Profile ->")
Write-Host "Arrow fix applied: $($content.Contains('Profile ->'))"

# ------- Fix 4: Add intro line after the h2 Dev Activity -------
$oldH2Block = "<h2 className=`"text-3xl md:text-4xl font-extrabold tracking-tight`">Dev Activity</h2>$nl              <p className=`"mt-2 text-sm text-neutral-500`">"
$newH2Block = "<h2 className=`"text-3xl md:text-4xl font-extrabold tracking-tight`">Dev Activity</h2>$nl              <p className=`"mt-1 text-base text-neutral-600 font-medium`">I&apos;m Mayank, a tinkerer obsessed with software&apos;s craft.</p>$nl              <p className=`"mt-2 text-sm text-neutral-500`">"

$content = $content.Replace($oldH2Block, $newH2Block)
Write-Host "Intro line added: $($content.Contains('tinkerer obsessed with software'))"

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "All fixes applied and saved."
