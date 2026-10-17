# Launchify · Web Client

**From a product brief to an editable landing page.**

Next.js 16 · React 19 · TypeScript · Tailwind CSS · Firebase Auth · SignalR

[Demo URL](https://launchify-frontend-theta.vercel.app) · [Backend source](https://github.com/bora399/launchify-backend)

## Product flow

1. Sign in with Firebase Auth.
2. Describe a product and choose Aurora, Brutal, Corporate, or Minimal.
3. Follow generation progress delivered over SignalR.
4. Edit the page, arrange dashboard projects, and share its public URL.
5. Review visit totals and waitlist entries, export leads, or download the page as HTML.

## Implementation highlights

| Area | Where to look |
| --- | --- |
| Generation UI and authenticated SignalR connection | [Create page](app/create/page.tsx) |
| Server-rendered public page | [Slug route](app/%5Bslug%5D/page.tsx) |
| Four presentation themes | [Template components](app/components/templates) |
| Firebase bearer token on private requests | [authenticatedFetch](app/utils/authenticatedFetch.ts) |
| Project ordering and malformed-storage handling | [Ordering utilities](app/utils/projectOrder.ts), [tests](tests/projectOrder.test.mjs) |
| HTML export with embedded styles/assets | [Export implementation](app/utils/exportHtml.ts) |
| Projects, lead lists and aggregate charts | [Dashboard](app/dashboard/page.tsx) |

The dashboard uses local cached data and background fetching. Its charts summarize project totals; they are not a daily analytics time series or a count of unique visitors.

HTML export retrieves the published page and embeds resources. Its waitlist script still calls the API, so signup requires network access and a permitted CORS origin. Opening a local file does not guarantee that its form can submit.

## Run locally

Use Node.js 22.6+ for the repository's type-stripping test command, npm, a Firebase project, and the companion API.

```bash
git clone https://github.com/bora399/launchify-frontend.git
cd launchify-frontend
npm ci
```

Create `.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5125
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-web-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

These Firebase values configure the browser client. Never put a Firebase service-account private key in a `NEXT_PUBLIC_` variable. Enable the sign-in providers used by the app and configure Firebase authorized domains for your environment.

```bash
npm run dev
```

Open `http://localhost:3000`. Keep the frontend and backend on the same Firebase project. Set `NEXT_PUBLIC_API_URL` explicitly when running locally; source files otherwise fall back to the hosted API.

## Checks

```bash
npm run test:project-order
npx tsc --noEmit
npm run build
```

`npm run lint` is defined, but `eslint-config-next` is on major version 14 while Next.js is on major version 16. Align that configuration before treating lint as a passing quality gate.

## Next improvements

- Add end-to-end coverage for login, creation, editing, and export.
- Consolidate API configuration and shared response types.
- Verify exported waitlist behavior for each supported hosting origin.
- Add dated screenshots of the actual dashboard and generated pages.

The demo URL is supplied for exploration; its availability and authenticated flows need checking in the target deployment.
