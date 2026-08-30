# InteractionTool V1.5 — Pre-launch QA

## Completed in this pass
- Confirmed production framework versions against official sources:
  - Next.js 16.3.3 Active LTS
  - React / React DOM 19.2.7
- Replaced obsolete `next lint` script with `npm run typecheck` (`tsc --noEmit`)
- Strengthened validation for all compensation and direct-cost fields
- Added implausible retirement-value warning
- Added optional commute time-adjusted estimate to Results
- Added validation tests
- Added `sitemap.ts`
- Added `robots.ts`
- Added configurable `NEXT_PUBLIC_SITE_URL`
- Added three internally linked career SEO guides

## Build/test verification status
A full `npm install` was attempted in the execution environment but did not finish before the tool timeout, so dependencies were not available for `npm test` or `npm run build`. This package therefore should still receive one local/CI install + test + typecheck + build pass before production deployment.

Recommended verification commands:
```bash
npm install
npm test
npm run typecheck
npm run build
```

## Deployment environment variable
Set:
`NEXT_PUBLIC_SITE_URL=https://YOUR-ACTUAL-DOMAIN`

This ensures sitemap URLs use the production domain.
