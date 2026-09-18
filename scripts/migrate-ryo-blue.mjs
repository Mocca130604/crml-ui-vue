#!/usr/bin/env node
/**
 * CRML-UI v2.0.3 — Ryo Blue Migration Script
 *
 * Replaces `--crt-electric-lime` used as PRIMARY/DEFAULT with `var(--crml-action-primary)`
 * and hardcoded `#CCFF00` (outside of `variant-lime` blocks) with `var(--crml-action-primary)`.
 *
 * Rules:
 * - Inside `.variant-lime { ... }` blocks → SKIP (keep lime)
 * - Inside `variant === 'lime'` JS conditions → SKIP (keep lime)
 * - Default button/state/active CSS → REPLACE with semantic var
 * - Hardcoded #CCFF00 outside lime context → REPLACE
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const COMP_DIR = path.resolve(__dirname, '../src/components')

let totalFiles = 0
let totalReplacements = 0

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')
  const original = content
  let changes = 0

  // Strategy: process line by line, track if we're inside a lime-variant CSS block
  const lines = content.split('\n')
  const result = []
  let insideLimeVariantBlock = 0 // bracket depth tracker when inside a lime block
  let inLimeContext = false

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Detect entering a lime-specific block (CSS or JS)
    const limeBlockStart = (
      line.includes('.variant-lime') ||
      line.includes("variant === 'lime'") ||
      line.includes('variant == "lime"') ||
      line.includes("variant: 'lime'") ||
      line.includes('"lime"') && line.includes('background') ||
      line.includes("'lime'") && line.includes('case') ||
      (line.trim().startsWith('lime:') && line.includes('{')) ||
      (line.includes("'lime'") && line.includes(':') && line.includes('#CCFF00'))
    )

    if (limeBlockStart && line.includes('{')) {
      inLimeContext = true
      insideLimeVariantBlock = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
    } else if (limeBlockStart && !line.includes('{')) {
      // single-line lime reference without block — skip just this line
      result.push(line)
      continue
    }

    if (inLimeContext) {
      insideLimeVariantBlock += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
      if (insideLimeVariantBlock <= 0) {
        inLimeContext = false
        insideLimeVariantBlock = 0
      }
      result.push(line)
      continue
    }

    // Outside lime context — do replacements

    // 1. Replace var(--crt-electric-lime) → var(--crml-action-primary)
    //    BUT only when it's NOT explicitly being used as lime variant
    const beforeLimePrimary = line
    line = line
      .replace(/var\(--crt-electric-lime\)/g, 'var(--crml-action-primary)')

    // 2. Replace hardcoded #CCFF00 → var(--crml-action-primary)
    line = line.replace(/#CCFF00/gi, 'var(--crml-action-primary)')
    line = line.replace(/#ccff00/gi, 'var(--crml-action-primary)')

    if (line !== beforeLimePrimary) {
      changes++
    }

    result.push(line)
  }

  const newContent = result.join('\n')

  if (newContent !== original) {
    fs.writeFileSync(filePath, newContent, 'utf-8')
    totalFiles++
    totalReplacements += changes
    console.log(`  ✅ ${path.relative(COMP_DIR, filePath)} — ${changes} replacement(s)`)
  }
}

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      scanDir(full)
    } else if (entry.isFile() && entry.name.endsWith('.vue')) {
      processFile(full)
    }
  }
}

console.log('\n[CRML] 🔵 Ryo Blue Migration — Replacing electric-lime primary usages...\n')
scanDir(COMP_DIR)
console.log(`\n[CRML] ✅ Done! Modified ${totalFiles} files, ${totalReplacements} line-level replacements.\n`)
console.log('[CRML] ℹ️  variant="lime" blocks were preserved untouched.\n')
