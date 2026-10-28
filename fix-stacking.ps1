$file = "d:\Portfolio\src\components\sections\projects-section.tsx"
$content = [System.IO.File]::ReadAllText($file)

# Replace the old project rows wrapper and article with new sticky stacking structure
$oldBlock = @'
        {/* Project rows */}
        <div className="flex flex-col divide-y divide-neutral-100">
          {pinnedProjects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              className="flex flex-col md:flex-row gap-8 md:gap-12 py-12 first:pt-0 last:pb-0"
            >
'@

$newBlock = @'
        {/* Project rows — sticky stacking cards */}
        <div className="relative flex flex-col">
          {pinnedProjects.map((project, i) => (
            <div
              key={project.id}
              style={{ position: "sticky", top: `${80 + i * 28}px`, zIndex: i + 1 }}
              className="pb-6"
            >
            <motion.article
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#F5F3F0] rounded-2xl border border-neutral-200 shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-7 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12"
            >
'@

# Also fix the closing tags - old has one </motion.article>, new needs </motion.article></div>
$oldClose = @'
            </motion.article>
          ))}
        </div>
'@

$newClose = @'
            </motion.article>
            </div>
          ))}
        </div>
'@

$content = $content.Replace($oldBlock, $newBlock)
$content = $content.Replace($oldClose, $newClose)

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "Done! Verifying..."
$verify = [System.IO.File]::ReadAllText($file)
if ($verify.Contains('position: "sticky"')) {
  Write-Host "SUCCESS: sticky stacking found in file"
} else {
  Write-Host "ERROR: replacement did not apply"
}
