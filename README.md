# Dawei Valve Website

Modern Next.js + Tailwind CSS rebuild for `daweivalve.com`.

The redesign uses the original Dawei website archive as a content and asset library. Original catalog photography, the Dawei logo, company history, certification scans, and quality-control imagery have been integrated into a faster responsive structure. Legacy ASP and Flash code are not used.

The complete historical catalog is available at `/catalog`. Run `node scripts/extract-legacy-catalog.mjs` after changing the extracted legacy source to regenerate `data/legacy-catalog.json`.

## Local development

```bash
npm install
npm run dev
```

## Preview deployment

Import this directory into Vercel as a Next.js project. Vercel will detect the framework and use:

- Build command: `next build`
- Output: Next.js default
- Node.js: 20.x or newer

Deploy to a Vercel preview URL first. Do **not** add or change the `daweivalve.com` domain until the new site has been reviewed and approved.

## Before production launch

- Replace or expand placeholder product visuals with approved product photography.
- Confirm company address, phone, email, certifications, and final company copy.
- Confirm that all historical product images and technical claims remain representative of current supply capabilities.
- Connect the RFQ form to email, CRM, or a form service.
- Add approved PDFs, certificates, and technical datasheets.
- Review product specifications with Dawei before publishing.
- Add analytics and search engine verification.
- Only after final approval, plan the DNS cutover from Wix name servers with a rollback window.
