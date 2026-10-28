$file = "d:\Portfolio\src\components\sections\projects-section.tsx"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# The old divider wrapper line
$oldWrapper = '<div className="flex flex-col divide-y divide-neutral-100">'
$newWrapper = '<div className="relative flex flex-col">'

# Old article open - use CRLF to match exactly
$nl = "`r`n"
$oldArticleOpen = "            <motion.article$nl              key={project.id}$nl              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 }}$nl              whileInView={{ opacity: 1, x: 0, y: 0 }}$nl              viewport={{ once: true, margin: `"-60px`" }}$nl              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}$nl              className=`"flex flex-col md:flex-row gap-8 md:gap-12 py-12 first:pt-0 last:pb-0`"$nl            >"

$newArticleOpen = "            <div$nl              key={project.id}$nl              style={{ position: `"sticky`", top: ``${80 + i * 28}px``, zIndex: i + 1 }}$nl              className=`"pb-6`"$nl            >$nl            <motion.article$nl              initial={{ opacity: 0, y: 60, scale: 0.97 }}$nl              whileInView={{ opacity: 1, y: 0, scale: 1 }}$nl              viewport={{ once: true, margin: `"-80px`" }}$nl              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}$nl              className=`"bg-[#F5F3F0] rounded-2xl border border-neutral-200 shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-7 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12`"$nl            >"

# Old closing - article close then map close
$oldClose = "            </motion.article>$nl          ))}$nl        </div>"
$newClose = "            </motion.article>$nl            </div>$nl          ))}$nl        </div>"

Write-Host "Applying div wrapper fix..."
$before = $content
$content = $content.Replace($oldWrapper, $newWrapper)
if ($content -eq $before) { Write-Host "WARN: wrapper not replaced" } else { Write-Host "OK: wrapper replaced" }

Write-Host "Applying article open fix..."
$before = $content
$content = $content.Replace($oldArticleOpen, $newArticleOpen)
if ($content -eq $before) { Write-Host "WARN: article open not replaced" } else { Write-Host "OK: article open replaced" }

Write-Host "Applying closing tags fix..."
$before = $content
$content = $content.Replace($oldClose, $newClose)
if ($content -eq $before) { Write-Host "WARN: closing not replaced" } else { Write-Host "OK: closing replaced" }

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)

# Verify
if ($content.Contains('position: "sticky"')) {
  Write-Host "SUCCESS: sticky stacking confirmed in file"
} else {
  Write-Host "ERROR: sticky not found in final content"
}
