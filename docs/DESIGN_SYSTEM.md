# TraceAgentriX – Design System

## Brand Identity
- **Product Name**: TraceAgentriX
- **Tagline**: See. Secure. Control every AI agent on every device.
- **Positioning**: Enterprise AI Security & Control Platform

## Color Palette (Dark Cybersecurity Theme)

### Primary Backgrounds
| Token              | Hex       | Usage                        |
|--------------------|-----------|------------------------------|
| `bg-deep`          | #06080F   | Main app background          |
| `bg-surface`       | #0C101B   | Cards, sidebars              |
| `bg-elevated`      | #121826   | Elevated cards, modals       |
| `bg-hover`         | #1A2236   | Hover states                 |

### Accent Colors
| Token              | Hex       | Usage                        |
|--------------------|-----------|------------------------------|
| `accent-cyan`      | #22D3EE   | Primary actions, links       |
| `accent-teal`      | #14B8A6   | Secondary accents            |
| `accent-blue`      | #3B82F6   | Info states                  |
| `glow-cyan`        | #22D3EE33 | Soft glows, borders          |

### Semantic Colors
| Token              | Hex       | Usage                        |
|--------------------|-----------|------------------------------|
| `success`          | #10B981   | Safe / Low risk              |
| `warning`          | #F59E0B   | Medium risk                  |
| `danger`           | #EF4444   | High risk / Blocked          |
| `muted`            | #64748B   | Secondary text               |
| `text-primary`     | #F1F5F9   | Main text                    |
| `text-secondary`   | #94A3B8   | Secondary text               |

### Gradients
- Primary CTA: `from-cyan-500 to-teal-500`
- Card glow: subtle cyan radial
- Risk High: `from-red-500/20 to-transparent`

## Typography
- **Font Family**: Inter (primary) + JetBrains Mono (code/numbers)
- Headings: font-semibold / font-bold, tracking-tight
- Body: font-normal, text-sm / text-base
- Mono: for risk scores, IDs, tokens

## Border Radius
- Cards: `rounded-xl` (12px)
- Buttons: `rounded-lg` (8px)
- Badges: `rounded-full`
- Inputs: `rounded-lg`

## Shadows & Glows
- Card: `shadow-lg shadow-black/40`
- Glow: `shadow-[0_0_20px_rgba(34,211,238,0.15)]`
- Hover glow: stronger cyan

## Animation Principles
- Duration: 200–300ms for micro interactions
- Easing: `ease-out` or `cubic-bezier(0.16, 1, 0.3, 1)`
- Hover: scale(1.02) + border glow + slight lift
- Page transitions: fade + slight y translate
- Loading: subtle pulse / skeleton with cyan tint

## Component Guidelines
1. All interactive elements must have clear hover + focus states
2. Use Framer Motion for meaningful animations (not decoration)
3. Cards should feel elevated on hover
4. Risk indicators always use color + icon + text
5. Keep density professional (not too sparse, not cramped)

## Icon System
- Use Lucide React
- Size: 16px (inline), 20px (buttons), 24px (headers)

## Spacing Scale
- 4, 8, 12, 16, 20, 24, 32, 40, 48, 64
