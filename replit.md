# Reflection

A personal portfolio & AI Zen Coach website for Arifandi (Jangkrik) — a high school student who codes from his smartphone. Features a clean white + mint green aesthetic, Framer Motion animations, and an AI-powered wellness coach named "Zeno".

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/reflection run dev` — run the Reflection frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion + Lucide React
- API: Express 5
- AI: Google Gemini (gemini-1.5-flash) via `@google/generative-ai`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/reflection/` — the React + Vite frontend (portfolio + ZenCoach UI)
- `artifacts/reflection/src/components/ZenCoach.tsx` — AI chat + daily schedule with checklist
- `artifacts/reflection/src/components/Hero.tsx` — animated hero with Framer Motion
- `artifacts/reflection/api/analyze.ts` — Vercel serverless function (for Vercel deployment)
- `artifacts/reflection/vercel.json` — Vercel routing config
- `artifacts/api-server/src/routes/zen.ts` — Express routes for /api/zen/chat and /api/zen/schedule
- `lib/api-spec/openapi.yaml` — API contract source of truth
- `lib/api-client-react/src/generated/` — generated React Query hooks

## Vercel Deployment

The app is structured for easy Vercel deployment:
1. In Vercel, set root directory to `artifacts/reflection`
2. Build command: `vite build`
3. Output directory: `dist/public`
4. Add environment variable: `GEMINI_API_KEY=your_key`
5. The `api/analyze.ts` serverless function handles AI requests on Vercel
6. `vercel.json` handles routing

## Architecture decisions

- Single-page app with hash-based scroll navigation — no routing library needed
- API served by Express on Replit, Vercel Serverless Functions on Vercel
- Gemini 1.5 Flash for fast, cost-effective AI responses
- ZenSchedule stored in localStorage for persistence between sessions
- No database needed — stateless AI interactions

## Product

- **Hero**: Animated introduction for Arifandi/Jangkrik with floating mint-green particles
- **About**: Personal story as a smartphone-coding student
- **Zen Coach "Zeno"**: AI chat + daily wellness schedule generator with interactive checklist
- **Certificates**: Dicoding, OSN, Google certs in a responsive grid
- **Projects**: Mala, Jangkrik AI, Reflection project cards
- **Contact**: Clean contact form with social links

## User preferences

- White + Mint green color scheme (#A8D5BA / #34D399 range)
- Mobile-first responsive design (coded on a smartphone)
- Framer Motion animations throughout
- Full English UI ("Reflection" app)
- No Replit-specific plugins for Vercel compatibility
- Deploy target: Vercel

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after any openapi.yaml changes
- Vercel deployment uses `artifacts/reflection` as root directory
- The `api/analyze.ts` serverless function is separate from the Express routes — both exist for dual deployment support
- `GEMINI_API_KEY` must be set in both Replit secrets and Vercel env vars

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
