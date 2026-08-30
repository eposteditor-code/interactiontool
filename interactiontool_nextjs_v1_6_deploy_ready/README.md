# InteractionTool — Next.js Production Foundation

This is the first production-structured version of the Job Offer Decision & Negotiation Simulator.

## What changed from the standalone prototype
- Next.js app structure
- TypeScript
- Calculation engine moved into `/lib/calculator.ts`
- Typed domain models in `/types/job.ts`
- Reusable form, step bar and results components
- Single-page wizard preserved
- SEO metadata included
- Audited calculation logic carried forward

## Run locally
```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Recommended next production tasks
1. Add unit tests for calculator functions.
2. Persist wizard state in localStorage.
3. Add a true interactive Negotiation Lab component.
4. Add privacy-safe share cards.
5. Add homepage + methodology + privacy pages.
6. Deploy to Vercel or Cloudflare.


## V1.1 automated test layer
This package now includes Vitest-based unit tests for the calculation engine.

Run:
```bash
npm install
npm test
```


## V1.2 browser persistence
- Automatic localStorage save
- Restore on return
- Visible Start Over control
- Pure storage parser/serializer
- Persistence unit tests


## V1.3 React Negotiation Lab
- Live salary slider
- Live office-days slider
- Live PTO slider
- Live bonus slider
- Live retirement slider
- Break-even progress
- Updated scenario effective value/hour
- Dynamic deal-equivalent paths
- Negotiation scenario unit tests
