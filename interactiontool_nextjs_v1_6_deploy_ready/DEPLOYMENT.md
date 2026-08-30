# InteractionTool Deployment Checklist

## Required before production
1. Install dependencies:
   `npm install`
2. Run tests:
   `npm test`
3. Run TypeScript verification:
   `npm run typecheck`
4. Run production build:
   `npm run build`

## Environment
Set:
`NEXT_PUBLIC_SITE_URL=https://YOUR-PRODUCTION-DOMAIN`

Do not leave the production deployment using the localhost fallback.

## Recommended Vercel flow
- Push this folder to a Git repository.
- Import the repository into Vercel.
- Add `NEXT_PUBLIC_SITE_URL` in Project Settings → Environment Variables.
- Deploy.
- Confirm these routes after deployment:
  - `/`
  - `/career/job-offer-comparison`
  - `/methodology`
  - `/privacy`
  - `/disclaimer`
  - `/about`
  - `/sitemap.xml`
  - `/robots.txt`
  - all three `/guides/...` pages

## Post-deploy checks
- Run one complete job comparison on desktop and mobile.
- Refresh midway through the wizard and verify localStorage restoration.
- Test “Start over”.
- Test Negotiation Lab sliders.
- Verify sitemap uses the live domain.
- Verify no salary/job data appears in network requests from calculator logic.
- Submit sitemap to Google Search Console after the domain is verified.

## Build verification note
The current execution environment could not complete `npm install` within its allowed tool timeout, so the install/test/typecheck/build commands still need to be executed once in local development, CI, or Vercel before launch.
