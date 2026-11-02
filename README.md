# TraceAgentriX

**Enterprise AI Security & Control Platform**

See. Secure. Control every AI agent on every device.

---

## Architecture (Single Codebase)

Frontend + Backend **alag nahi** — sab **Next.js App Router** mein.

```
traceagentrix/
├── src/
│   ├── app/
│   │   ├── (auth)/                 # Login / Register
│   │   ├── (dashboard)/            # Protected pages
│   │   │   ├── dashboard/
│   │   │   ├── agents/
│   │   │   ├── devices/
│   │   │   ├── mcps/
│   │   │   ├── alerts/
│   │   │   ├── policies/
│   │   │   └── analytics/
│   │   ├── api/                    # Backend APIs (Route Handlers)
│   │   │   ├── auth/
│   │   │   ├── agents/
│   │   │   ├── devices/
│   │   │   ├── mcps/
│   │   │   ├── alerts/
│   │   │   ├── policies/
│   │   │   └── analytics/
│   │   ├── layout.tsx
│   │   └── page.tsx                # Landing Page
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── landing/
│   │   └── auth/
│   ├── lib/                        # prisma, auth helpers, utils
│   ├── hooks/
│   ├── types/
│   └── styles/
├── prisma/
│   └── schema.prisma
├── public/
└── docs/
```

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| Framework   | Next.js 15 (App Router)                         |
| Language    | TypeScript                                      |
| Styling     | Tailwind CSS + Custom Design System             |
| Animations  | Framer Motion                                   |
| Database    | PostgreSQL + Prisma                             |
| Auth        | JWT (Email + Password)                          |
| API         | Next.js Route Handlers (`/api/...`)             |

---

## Core Features

- Landing Page (Professional)
- Authentication (Register / Login)
- Dashboard Overview
- AI Agents inventory + Risk scores
- MCPs list + status
- Devices fleet management
- Usage & Token Analytics
- Live Alerts / Incidents
- Basic Policies

---

## Design

Dark Cybersecurity theme  
Primary Accent: Cyan `#22D3EE` + Teal `#14B8A6`
