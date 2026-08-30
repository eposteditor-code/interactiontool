# InteractionTool V1.2 — Local Persistence

The job-offer comparison is now saved automatically in browser localStorage.

## Behavior
- Inputs and the current wizard step are saved after changes.
- Returning to the tool on the same browser/device restores the comparison.
- A visible "Start over" control clears the saved comparison.
- No account or server-side storage is required.
- If localStorage is blocked or unavailable, the tool continues to work without persistence.

## Privacy
This implementation stores the comparison only in the user's browser. It does not send salary or job data to a server.

## Storage key
`interactiontool.job-offer.v1`

## Tests
`tests/storage.test.ts` validates serialization/parsing and malformed-state handling.
