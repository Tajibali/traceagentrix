# TraceAgentriX – Project Structure

## Architecture Decision

**Single Next.js Codebase** (no separate NestJS backend)

- Pages → `src/app/(dashboard)/...` and `src/app/(auth)/...`
- APIs → `src/app/api/...` (Route Handlers)
- Database → MongoDB + Mongoose
- Auth → JWT based

---

## Folder Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Sidebar + Header layout
│   │   ├── dashboard/page.tsx      # Overview
│   │   ├── agents/page.tsx
│   │   ├── devices/page.tsx
│   │   ├── mcps/page.tsx
│   │   ├── alerts/page.tsx
│   │   ├── policies/page.tsx
│   │   └── analytics/page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   └── me/route.ts
│   │   ├── agents/route.ts
│   │   ├── devices/route.ts
│   │   ├── mcps/route.ts
│   │   ├── alerts/route.ts
│   │   ├── policies/route.ts
│   │   └── analytics/route.ts
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Landing page
│
├── components/
│   ├── ui/                         # Button, Card, Badge, Input, etc.
│   ├── layout/                     # Sidebar, Header, PageHeader
│   ├── dashboard/                  # AgentCard, DeviceCard, etc.
│   ├── landing/                    # Hero, Features, CTA sections
│   └── auth/                       # LoginForm, RegisterForm
│
├── lib/
│   ├── mongodb.ts
│   ├── auth.ts                     # JWT helpers
│   └── utils.ts
│
├── hooks/
├── types/
└── styles/
    └── design-tokens.css
```

---

## API Routes Plan

| Method | Endpoint                  | Purpose                    |
|--------|---------------------------|----------------------------|
| POST   | /api/auth/register        | Create account             |
| POST   | /api/auth/login           | Login + return JWT         |
| GET    | /api/auth/me              | Current user               |
| GET    | /api/agents               | List AI agents             |
| GET    | /api/devices              | List devices               |
| GET    | /api/mcps                 | List MCP connectors        |
| GET    | /api/alerts               | Live alerts                |
| GET    | /api/policies             | Policies list              |
| GET    | /api/analytics            | Usage & token stats        |

---

## Next Steps

1. Initialize Next.js project (package.json, configs)
2. Design tokens + Tailwind setup
3. Core UI components
4. Mongoose models
5. Auth API + pages
6. Dashboard layout + pages
