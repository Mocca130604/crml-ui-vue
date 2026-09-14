import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_CODE = path.resolve(__dirname, '..', '..')
const REACT_DIR = path.resolve(BASE_CODE, 'crml-ui-react')
const HTML_DIR = path.resolve(BASE_CODE, 'crml-ui-html')
const SVELTE_DIR = path.resolve(BASE_CODE, 'crml-ui-svelte')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, content, 'utf-8')
}

console.log('⚡ Generating Full Component Suites across React, HTML, and Svelte...')

// =========================================================================
// 1. GENERATE REACT COMPONENTS
// =========================================================================

// src/components/crml-ui-styles.css (Common styles for React)
writeFile(path.resolve(REACT_DIR, 'src/components/crml-react.css'), `
@import '../tokens/index.css';

.crml-btn, .crml-bouncy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--crml-font-heading, 'Space Grotesk', sans-serif);
  font-weight: 800;
  cursor: pointer;
  border: 3px solid var(--crt-obsidian, #0D0D0D);
  border-radius: var(--crml-radius-md, 8px);
  box-shadow: 4px 4px 0px var(--crt-obsidian, #0D0D0D);
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-transform: uppercase;
  user-select: none;
  text-decoration: none;
  box-sizing: border-box;
}

.crml-btn:hover:not(:disabled), .crml-bouncy-btn:hover:not(:disabled) {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0px var(--crt-obsidian, #0D0D0D);
}

.crml-btn:active:not(:disabled), .crml-bouncy-btn:active:not(:disabled) {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0px var(--crt-obsidian, #0D0D0D);
}

.crml-btn:disabled, .crml-bouncy-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0D0D0D) !important;
}

/* Variants */
.variant-primary, .variant-lime {
  background-color: var(--crt-electric-lime, #CCFF00);
  color: var(--crt-obsidian, #0D0D0D);
}
.variant-danger, .variant-pink {
  background-color: var(--crt-hot-pink, #FF007F);
  color: #FFFFFF;
}
.variant-secondary, .variant-cyan {
  background-color: var(--crt-cyber-cyan, #00F0FF);
  color: var(--crt-obsidian, #0D0D0D);
}
.variant-warning, .variant-yellow {
  background-color: var(--crt-sunburst-yellow, #FFD600);
  color: var(--crt-obsidian, #0D0D0D);
}
.variant-outline {
  background-color: #FFFFFF;
  color: var(--crt-obsidian, #0D0D0D);
}
.variant-obsidian {
  background-color: var(--crt-obsidian, #0D0D0D);
  color: #FFFFFF;
}

/* Sizing */
.size-sm { padding: 0.35rem 0.75rem; font-size: 0.75rem; }
.size-md { padding: 0.6rem 1.25rem; font-size: 0.875rem; }
.size-lg { padding: 0.85rem 1.75rem; font-size: 1rem; }

/* Badges */
.crml-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.2rem 0.5rem;
  font-family: var(--crml-font-mono, 'Space Mono', monospace);
  font-size: 0.75rem;
  font-weight: 800;
  border: 2px solid var(--crt-obsidian, #0D0D0D);
  border-radius: var(--crml-radius-sm, 4px);
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0D0D0D);
  letter-spacing: 0.5px;
}

.crml-sticker {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  font-weight: 900;
  border: 2.5px solid var(--crt-obsidian, #0D0D0D);
  border-radius: 999px;
  box-shadow: 3px 3px 0px var(--crt-obsidian, #0D0D0D);
}
.tilt-left { transform: rotate(-3deg); }
.tilt-right { transform: rotate(3deg); }

/* Inputs */
.crml-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
}
.crml-label {
  font-family: var(--crml-font-mono, monospace);
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--crt-obsidian, #0D0D0D);
}
.crml-input {
  width: 100%;
  padding: 0.65rem 0.85rem;
  font-family: var(--crml-font-mono, monospace);
  font-size: 0.875rem;
  border: 2.5px solid var(--crt-obsidian, #0D0D0D);
  border-radius: var(--crml-radius-md, 6px);
  background: #FFFFFF;
  color: var(--crt-obsidian, #0D0D0D);
  box-shadow: 3px 3px 0px var(--crt-obsidian, #0D0D0D);
  outline: none;
  box-sizing: border-box;
  transition: all 0.15s ease;
}
.crml-input:focus {
  border-color: var(--crt-obsidian, #0D0D0D);
  box-shadow: 5px 5px 0px var(--crt-cyber-cyan, #00F0FF);
  transform: translate(-1px, -1px);
}

/* Switch */
.crml-switch-row {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}
.crml-switch-track {
  width: 48px;
  height: 26px;
  background-color: #E4E4E7;
  border: 2px solid var(--crt-obsidian, #0D0D0D);
  border-radius: 999px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.crml-switch-track.active {
  background-color: var(--crt-electric-lime, #CCFF00);
}
.crml-switch-thumb {
  width: 18px;
  height: 18px;
  background-color: #FFFFFF;
  border: 2px solid var(--crt-obsidian, #0D0D0D);
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 3px;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 1px 1px 0px var(--crt-obsidian, #0D0D0D);
}
.crml-switch-track.active .crml-switch-thumb {
  transform: translateX(21px);
  background-color: var(--crt-obsidian, #0D0D0D);
}

/* Cards */
.crml-card {
  background: #FFFFFF;
  border: 3px solid var(--crt-obsidian, #0D0D0D);
  border-radius: var(--crml-radius-lg, 12px);
  box-shadow: 5px 5px 0px var(--crt-obsidian, #0D0D0D);
  padding: 1.25rem;
  box-sizing: border-box;
}
.crml-card-header {
  border-bottom: 2.5px solid var(--crt-obsidian, #0D0D0D);
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
`)

// React Atoms
writeFile(path.resolve(REACT_DIR, 'src/components/atoms/CrmlButton.tsx'), `import React from 'react'
import '../crml-react.css'

export interface CrmlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'outline' | 'obsidian' | 'lime' | 'pink' | 'cyan' | 'yellow'
  size?: 'sm' | 'md' | 'lg'
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  children?: React.ReactNode
}

export const CrmlButton: React.FC<CrmlButtonProps> = ({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  children,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      className={\`crml-btn variant-\${variant} size-\${size} \${className}\`}
      disabled={disabled}
      {...props}
    >
      {iconLeft && <span className="crml-icon-left">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="crml-icon-right">{iconRight}</span>}
    </button>
  )
}
`)

writeFile(path.resolve(REACT_DIR, 'src/components/atoms/CrmlBouncyButton.tsx'), `import React from 'react'
import '../crml-react.css'

export interface CrmlBouncyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'primary' | 'danger' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  children?: React.ReactNode
}

export const CrmlBouncyButton: React.FC<CrmlBouncyButtonProps> = ({
  variant = 'lime',
  size = 'md',
  iconLeft,
  iconRight,
  children,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      className={\`crml-bouncy-btn variant-\${variant} size-\${size} \${className}\`}
      disabled={disabled}
      {...props}
    >
      {iconLeft && <span className="crml-icon-left">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="crml-icon-right">{iconRight}</span>}
    </button>
  )
}
`)

writeFile(path.resolve(REACT_DIR, 'src/components/atoms/CrmlBadge.tsx'), `import React from 'react'
import '../crml-react.css'

export interface CrmlBadgeProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'obsidian' | 'lime' | 'pink' | 'cyan' | 'yellow'
  size?: 'sm' | 'md'
  children?: React.ReactNode
  className?: string
}

export const CrmlBadge: React.FC<CrmlBadgeProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = ''
}) => {
  return (
    <span className={\`crml-badge variant-\${variant} size-\${size} \${className}\`}>
      {children}
    </span>
  )
}
`)

writeFile(path.resolve(REACT_DIR, 'src/components/atoms/CrmlStickerBadge.tsx'), `import React from 'react'
import '../crml-react.css'

export interface CrmlStickerBadgeProps {
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow'
  tilt?: 'none' | 'left' | 'right'
  star?: boolean
  children?: React.ReactNode
  className?: string
}

export const CrmlStickerBadge: React.FC<CrmlStickerBadgeProps> = ({
  variant = 'pink',
  tilt = 'right',
  star = false,
  children,
  className = ''
}) => {
  return (
    <div className={\`crml-sticker variant-\${variant} tilt-\${tilt} \${className}\`}>
      {star && <span>★</span>}
      <span>{children}</span>
    </div>
  )
}
`)

writeFile(path.resolve(REACT_DIR, 'src/components/atoms/CrmlInput.tsx'), `import React from 'react'
import '../crml-react.css'

export interface CrmlInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow'
}

export const CrmlInput: React.FC<CrmlInputProps> = ({
  label,
  variant = 'lime',
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\\s+/g, '-') : undefined)
  return (
    <div className="crml-input-wrapper">
      {label && <label htmlFor={inputId} className="crml-label">{label}</label>}
      <input id={inputId} className={\`crml-input variant-\${variant} \${className}\`} {...props} />
    </div>
  )
}
`)

writeFile(path.resolve(REACT_DIR, 'src/components/atoms/CrmlNeonSwitch.tsx'), `import React from 'react'
import '../crml-react.css'

export interface CrmlNeonSwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow'
  disabled?: boolean
}

export const CrmlNeonSwitch: React.FC<CrmlNeonSwitchProps> = ({
  checked = false,
  onChange,
  label,
  variant = 'lime',
  disabled = false
}) => {
  return (
    <div
      className={\`crml-switch-row variant-\${variant}\`}
      onClick={() => !disabled && onChange && onChange(!checked)}
      style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <div className={\`crml-switch-track \${checked ? 'active' : ''}\`}>
        <div className="crml-switch-thumb" />
      </div>
      {label && <span className="crml-label">{label}</span>}
    </div>
  )
}
`)

// React Molecules
writeFile(path.resolve(REACT_DIR, 'src/components/molecules/CrmlDualRangeSlider.tsx'), `import React, { useState, useRef, useEffect } from 'react'
import '../crml-react.css'

export interface CrmlDualRangeSliderProps {
  minLimit?: number
  maxLimit?: number
  value?: [number, number]
  defaultValue?: [number, number]
  step?: number
  prefix?: string
  suffix?: string
  label?: string
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow'
  compact?: boolean
  showLimits?: boolean
  onChange?: (val: [number, number]) => void
}

export const CrmlDualRangeSlider: React.FC<CrmlDualRangeSliderProps> = ({
  minLimit = 0,
  maxLimit = 1000,
  value,
  defaultValue = [150, 800],
  step = 10,
  prefix = '$',
  suffix = '',
  label = 'PRICE RANGE FILTER',
  variant = 'lime',
  compact = false,
  showLimits = true,
  onChange
}) => {
  const [internalVal, setInternalVal] = useState<[number, number]>(value || defaultValue)
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value) setInternalVal(value)
  }, [value])

  const [minVal, maxVal] = internalVal
  const range = maxLimit - minLimit
  const minPercent = range > 0 ? Math.max(0, Math.min(100, ((minVal - minLimit) / range) * 100)) : 0
  const maxPercent = range > 0 ? Math.max(0, Math.min(100, ((maxVal - minLimit) / range) * 100)) : 100

  const format = (v: number) => {
    let s = v.toString()
    if (compact) {
      if (Math.abs(v) >= 1000000) s = (v / 1000000).toFixed(v % 1000000 === 0 ? 0 : 1) + 'M'
      else if (Math.abs(v) >= 1000) s = (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + 'K'
    } else {
      s = v.toLocaleString()
    }
    return \`\${prefix}\${s}\${suffix}\`
  }

  const handleMinChange = (v: number) => {
    const clamped = Math.max(minLimit, Math.min(v, maxVal - step))
    const next: [number, number] = [clamped, maxVal]
    setInternalVal(next)
    if (onChange) onChange(next)
  }

  const handleMaxChange = (v: number) => {
    const clamped = Math.min(maxLimit, Math.max(v, minVal + step))
    const next: [number, number] = [minVal, clamped]
    setInternalVal(next)
    if (onChange) onChange(next)
  }

  return (
    <div className={\`crml-dual-range-wrapper variant-\${variant}\`} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
        <span className="crml-label">{label}</span>
        <span className="crml-badge variant-lime" style={{ fontWeight: 900 }}>
          {format(minVal)} — {format(maxVal)}
        </span>
      </div>

      <div ref={trackRef} style={{ position: 'relative', width: '100%', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '100%', height: 10, backgroundColor: '#E4E4E7', border: '2.5px solid #0D0D0D', borderRadius: 999, overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              height: '100%',
              backgroundColor: '#FF007F',
              left: \`\${minPercent}%\`,
              width: \`\${Math.max(0, maxPercent - minPercent)}%\`
            }}
          />
        </div>

        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={step}
          value={minVal}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          onPointerDown={() => setActiveThumb('min')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 24,
            background: 'transparent',
            pointerEvents: 'none',
            appearance: 'none',
            margin: 0,
            border: 'none',
            outline: 'none',
            zIndex: activeThumb === 'min' ? 5 : 2
          }}
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={step}
          value={maxVal}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          onPointerDown={() => setActiveThumb('max')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 24,
            background: 'transparent',
            pointerEvents: 'none',
            appearance: 'none',
            margin: 0,
            border: 'none',
            outline: 'none',
            zIndex: activeThumb === 'max' ? 5 : 3
          }}
        />
      </div>

      {showLimits && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', fontWeight: 800, color: '#757575' }}>
          <span style={{ background: '#F4F4F5', border: '1px solid #0D0D0D', padding: '1px 5px', borderRadius: 3, fontWeight: 900 }}>{format(minLimit)}</span>
          <span style={{ background: '#F4F4F5', border: '1px solid #0D0D0D', padding: '1px 5px', borderRadius: 3, fontWeight: 900 }}>{format(maxLimit)}</span>
        </div>
      )}
    </div>
  )
}
`)

writeFile(path.resolve(REACT_DIR, 'src/components/molecules/CrmlPillTabs.tsx'), `import React from 'react'
import '../crml-react.css'

export interface CrmlPillTabItem {
  id: string
  label: string
  icon?: string
}

export interface CrmlPillTabsProps {
  tabs: CrmlPillTabItem[]
  activeTab?: string
  onChange?: (id: string) => void
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow'
}

export const CrmlPillTabs: React.FC<CrmlPillTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'lime'
}) => {
  const current = activeTab || tabs[0]?.id
  return (
    <div style={{ display: 'inline-flex', gap: '0.5rem', background: '#F4F4F5', padding: '0.35rem', border: '2.5px solid #0D0D0D', borderRadius: 999 }}>
      {tabs.map((tab) => {
        const isActive = tab.id === current
        return (
          <button
            key={tab.id}
            onClick={() => onChange && onChange(tab.id)}
            className={\`crml-btn \${isActive ? \`variant-\${variant}\` : 'variant-outline'} size-sm\`}
            style={{ borderRadius: 999, border: '2px solid #0D0D0D', boxShadow: isActive ? '2px 2px 0px #0D0D0D' : 'none' }}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
`)

// React Organisms
writeFile(path.resolve(REACT_DIR, 'src/components/organisms/CrmlCard.tsx'), `import React from 'react'
import '../crml-react.css'

export interface CrmlCardProps {
  title?: string
  badge?: string
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow'
  children?: React.ReactNode
  className?: string
}

export const CrmlCard: React.FC<CrmlCardProps> = ({
  title,
  badge,
  variant = 'lime',
  children,
  className = ''
}) => {
  return (
    <div className={\`crml-card variant-\${variant} \${className}\`}>
      {(title || badge) && (
        <div className="crml-card-header">
          {title && <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase' }}>{title}</h3>}
          {badge && <span className="crml-badge variant-cyan">{badge}</span>}
        </div>
      )}
      <div className="crml-card-body">{children}</div>
    </div>
  )
}
`)

// React index.ts
writeFile(path.resolve(REACT_DIR, 'src/index.ts'), `export * from './components/atoms/CrmlButton'
export * from './components/atoms/CrmlBouncyButton'
export * from './components/atoms/CrmlBadge'
export * from './components/atoms/CrmlStickerBadge'
export * from './components/atoms/CrmlInput'
export * from './components/atoms/CrmlNeonSwitch'
export * from './components/molecules/CrmlDualRangeSlider'
export * from './components/molecules/CrmlPillTabs'
export * from './components/organisms/CrmlCard'
`)

// React Playground App.tsx
writeFile(path.resolve(REACT_DIR, 'playground/App.tsx'), `import React, { useState } from 'react'
import {
  CrmlButton,
  CrmlBouncyButton,
  CrmlBadge,
  CrmlStickerBadge,
  CrmlInput,
  CrmlNeonSwitch,
  CrmlDualRangeSlider,
  CrmlPillTabs,
  CrmlCard
} from '../src/index'

export function App() {
  const [count, setCount] = useState(0)
  const [neonActive, setNeonActive] = useState(true)
  const [range, setRange] = useState<[number, number]>([150, 800])
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    { id: 'all', label: '01 ALL ITEMS', icon: '⚡' },
    { id: 'mecha', label: '02 MECHA', icon: '🤖' },
    { id: 'tactile', label: '03 TACTILE', icon: '🎯' }
  ]

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem', fontFamily: "'Space Grotesk', sans-serif" }}>
      <header style={{ borderBottom: '3.5px solid #0D0D0D', paddingBottom: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <CrmlStickerBadge variant="pink" star>REACT ECOSYSTEM v0.1</CrmlStickerBadge>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0.75rem 0 0 0', letterSpacing: '-1px' }}>
            CRML - UI <span style={{ backgroundColor: '#CCFF00', padding: '0 0.5rem', border: '3px solid #0D0D0D', boxShadow: '4px 4px 0px #0D0D0D' }}>REACT</span>
          </h1>
        </div>
        <CrmlBouncyButton variant="lime" onClick={() => setCount(c => c + 1)}>
          ENERGY: {count} ⚡
        </CrmlBouncyButton>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <CrmlCard title="TACTILE BUTTONS" badge="REACT 18/19">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <CrmlBouncyButton variant="lime">LIME BOUNCY</CrmlBouncyButton>
            <CrmlBouncyButton variant="pink">HOT PINK</CrmlBouncyButton>
            <CrmlButton variant="cyan">CYBER CYAN</CrmlButton>
            <CrmlButton variant="yellow">SUNBURST</CrmlButton>
          </div>
        </CrmlCard>

        <CrmlCard title="TACTILE DUAL SLIDER" badge="PARITY FIX">
          <CrmlDualRangeSlider
            minLimit={0}
            maxLimit={1000}
            value={range}
            onChange={setRange}
            label="PRICE BOUNDS ($0 - $1,000)"
          />
        </CrmlCard>

        <CrmlCard title="SWITCH & TABS" badge="MODULAR">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <CrmlPillTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
            <CrmlNeonSwitch checked={neonActive} onChange={setNeonActive} label="TACTILE NEON OVERDRIVE" />
            <CrmlInput label="HANDLE INPUT" placeholder="Enter pilot handle..." />
          </div>
        </CrmlCard>
      </div>
    </div>
  )
}
`)

writeFile(path.resolve(REACT_DIR, 'playground/main.tsx'), `import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`)

// =========================================================================
// 2. GENERATE HTML5 & MODERN VANILLA SYSTEM
// =========================================================================

writeFile(path.resolve(HTML_DIR, 'css/crml-neubrutal.css'), `
@import './tokens/index.css';

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: var(--crml-bg-base, #FAFAFA);
  color: var(--crml-text-main, #0D0D0D);
  font-family: var(--crml-font-heading, 'Space Grotesk', sans-serif);
}

.crml-btn, .crml-bouncy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--crml-font-heading, 'Space Grotesk', sans-serif);
  font-weight: 800;
  cursor: pointer;
  border: 3px solid var(--crt-obsidian, #0D0D0D);
  border-radius: var(--crml-radius-md, 8px);
  box-shadow: 4px 4px 0px var(--crt-obsidian, #0D0D0D);
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-transform: uppercase;
  user-select: none;
  text-decoration: none;
  padding: 0.6rem 1.25rem;
  font-size: 0.875rem;
}

.crml-btn:hover, .crml-bouncy-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0px var(--crt-obsidian, #0D0D0D);
}

.crml-btn:active, .crml-bouncy-btn:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0px var(--crt-obsidian, #0D0D0D);
}

.crml-btn.variant-lime { background-color: var(--crt-electric-lime, #CCFF00); color: #0D0D0D; }
.crml-btn.variant-pink { background-color: var(--crt-hot-pink, #FF007F); color: #FFFFFF; }
.crml-btn.variant-cyan { background-color: var(--crt-cyber-cyan, #00F0FF); color: #0D0D0D; }
.crml-btn.variant-yellow { background-color: var(--crt-sunburst-yellow, #FFD600); color: #0D0D0D; }

.crml-card {
  background: #FFFFFF;
  border: 3px solid var(--crt-obsidian, #0D0D0D);
  border-radius: var(--crml-radius-lg, 12px);
  box-shadow: 5px 5px 0px var(--crt-obsidian, #0D0D0D);
  padding: 1.25rem;
}

.crml-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.5rem;
  font-family: var(--crml-font-mono, monospace);
  font-size: 0.75rem;
  font-weight: 800;
  border: 2px solid var(--crt-obsidian, #0D0D0D);
  border-radius: var(--crml-radius-sm, 4px);
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0D0D0D);
}

.crml-input {
  width: 100%;
  padding: 0.65rem 0.85rem;
  font-family: var(--crml-font-mono, monospace);
  font-size: 0.875rem;
  border: 2.5px solid var(--crt-obsidian, #0D0D0D);
  border-radius: var(--crml-radius-md, 6px);
  box-shadow: 3px 3px 0px var(--crt-obsidian, #0D0D0D);
  outline: none;
}
`)

writeFile(path.resolve(HTML_DIR, 'js/crml-tactile.js'), `
// CRML-UI Tactile Physics & Event Orchestrator for Vanilla HTML5
document.addEventListener('DOMContentLoaded', () => {
  // Spring button active simulation
  document.querySelectorAll('.crml-bouncy-btn, .crml-btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'translate(3px, 3px)';
      btn.style.boxShadow = '1px 1px 0px #0D0D0D';
    });
    btn.addEventListener('mouseup', () => {
      btn.style.transform = 'translate(-1px, -1px)';
      btn.style.boxShadow = '5px 5px 0px #0D0D0D';
    });
  });

  // Switch toggles
  document.querySelectorAll('.crml-switch-track').forEach(sw => {
    sw.addEventListener('click', () => {
      sw.classList.toggle('active');
    });
  });

  console.log('⚡ CRML-UI Vanilla Tactile Physics Engine Online.');
});
`)

writeFile(path.resolve(HTML_DIR, 'index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRML - UI [HTML5] // Vanilla Neubrutalism Library</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./css/crml-neubrutal.css">
</head>
<body>
  <div style="max-width: 1000px; margin: 0 auto; padding: 2rem 1.5rem;">
    <header style="border-bottom: 3.5px solid #0D0D0D; padding-bottom: 1.5rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span class="crml-badge" style="background: #FF007F; color: #fff;">VANILLA HTML5 & CSS3</span>
        <h1 style="font-size: 2.5rem; font-weight: 900; margin: 0.5rem 0 0 0;">
          CRML - UI <span style="background: #CCFF00; padding: 0 0.5rem; border: 3px solid #0D0D0D; box-shadow: 4px 4px 0px #0D0D0D;">HTML</span>
        </h1>
      </div>
      <button class="crml-btn variant-lime">ZERO DEPENDENCY ⚡</button>
    </header>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
      <div class="crml-card">
        <h3 style="margin-top: 0; font-size: 1.2rem; font-weight: 900;">TACTILE BUTTONS</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
          <button class="crml-btn variant-lime">LIME CTA</button>
          <button class="crml-btn variant-pink">HOT PINK</button>
          <button class="crml-btn variant-cyan">CYBER CYAN</button>
        </div>
      </div>

      <div class="crml-card">
        <h3 style="margin-top: 0; font-size: 1.2rem; font-weight: 900;">FORM INPUT</h3>
        <div style="margin-top: 1rem;">
          <label style="font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 800; display: block; margin-bottom: 0.35rem;">PILOT CALLSIGN</label>
          <input type="text" class="crml-input" placeholder="CYBER_GHOST_01" value="CRML_PILOT">
        </div>
      </div>
    </div>
  </div>
  <script src="./js/crml-tactile.js"></script>
</body>
</html>
`)

// =========================================================================
// 3. GENERATE SVELTE COMPONENTS
// =========================================================================

writeFile(path.resolve(SVELTE_DIR, 'src/components/CrmlButton.svelte'), `<script lang="ts">
  export let variant: 'lime' | 'pink' | 'cyan' | 'yellow' | 'outline' = 'lime';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled: boolean = false;
</script>

<button
  class="crml-btn variant-{variant} size-{size}"
  {disabled}
  on:click
>
  <slot />
</button>

<style>
  @import '../tokens/index.css';

  .crml-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: var(--crml-font-heading, 'Space Grotesk', sans-serif);
    font-weight: 800;
    cursor: pointer;
    border: 3px solid var(--crt-obsidian, #0D0D0D);
    border-radius: var(--crml-radius-md, 8px);
    box-shadow: 4px 4px 0px var(--crt-obsidian, #0D0D0D);
    transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
    text-transform: uppercase;
  }
  .crml-btn:hover:not(:disabled) {
    transform: translate(-1px, -1px);
    box-shadow: 5px 5px 0px var(--crt-obsidian, #0D0D0D);
  }
  .crml-btn:active:not(:disabled) {
    transform: translate(3px, 3px);
    box-shadow: 1px 1px 0px var(--crt-obsidian, #0D0D0D);
  }
  .variant-lime { background-color: var(--crt-electric-lime, #CCFF00); color: #0D0D0D; }
  .variant-pink { background-color: var(--crt-hot-pink, #FF007F); color: #FFFFFF; }
  .variant-cyan { background-color: var(--crt-cyber-cyan, #00F0FF); color: #0D0D0D; }
  .variant-yellow { background-color: var(--crt-sunburst-yellow, #FFD600); color: #0D0D0D; }
  .size-sm { padding: 0.35rem 0.75rem; font-size: 0.75rem; }
  .size-md { padding: 0.6rem 1.25rem; font-size: 0.875rem; }
  .size-lg { padding: 0.85rem 1.75rem; font-size: 1rem; }
</style>
`)

writeFile(path.resolve(SVELTE_DIR, 'src/components/CrmlBadge.svelte'), `<script lang="ts">
  export let variant: 'lime' | 'pink' | 'cyan' | 'yellow' = 'lime';
</script>

<span class="crml-badge variant-{variant}">
  <slot />
</span>

<style>
  @import '../tokens/index.css';
  .crml-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.5rem;
    font-family: var(--crml-font-mono, monospace);
    font-size: 0.75rem;
    font-weight: 800;
    border: 2px solid var(--crt-obsidian, #0D0D0D);
    border-radius: var(--crml-radius-sm, 4px);
    box-shadow: 2px 2px 0px var(--crt-obsidian, #0D0D0D);
  }
  .variant-lime { background-color: var(--crt-electric-lime, #CCFF00); color: #0D0D0D; }
  .variant-pink { background-color: var(--crt-hot-pink, #FF007F); color: #FFFFFF; }
  .variant-cyan { background-color: var(--crt-cyber-cyan, #00F0FF); color: #0D0D0D; }
  .variant-yellow { background-color: var(--crt-sunburst-yellow, #FFD600); color: #0D0D0D; }
</style>
`)

writeFile(path.resolve(SVELTE_DIR, 'src/index.ts'), `export { default as CrmlButton } from './components/CrmlButton.svelte';
export { default as CrmlBadge } from './components/CrmlBadge.svelte';
`)

writeFile(path.resolve(SVELTE_DIR, 'playground/App.svelte'), `<script lang="ts">
  import CrmlButton from '../src/components/CrmlButton.svelte';
  import CrmlBadge from '../src/components/CrmlBadge.svelte';
  let energy = 0;
</script>

<main style="max-width: 1000px; margin: 0 auto; padding: 2rem 1.5rem; font-family: 'Space Grotesk', sans-serif;">
  <header style="border-bottom: 3.5px solid #0D0D0D; padding-bottom: 1.5rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <CrmlBadge variant="pink">SVELTE 5 COMPATIBLE</CrmlBadge>
      <h1 style="font-size: 2.5rem; font-weight: 900; margin: 0.5rem 0 0 0;">
        CRML - UI <span style="background: #CCFF00; padding: 0 0.5rem; border: 3px solid #0D0D0D; box-shadow: 4px 4px 0px #0D0D0D;">SVELTE</span>
      </h1>
    </div>
    <CrmlButton variant="lime" on:click={() => energy++}>ENERGY: {energy} ⚡</CrmlButton>
  </header>

  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <CrmlButton variant="lime">LIME ACTION</CrmlButton>
    <CrmlButton variant="pink">HOT PINK</CrmlButton>
    <CrmlButton variant="cyan">CYBER CYAN</CrmlButton>
    <CrmlButton variant="yellow">SUNBURST</CrmlButton>
  </div>
</main>
`)

writeFile(path.resolve(SVELTE_DIR, 'playground/main.ts'), `import App from './App.svelte';

const app = new App({
  target: document.getElementById('app')!
});

export default app;
`)

console.log('✅ Generated components and playgrounds for React, HTML, and Svelte!')
