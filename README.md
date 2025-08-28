# SNR.AI Demo Dashboard

This is a [Next.js](https://nextjs.org) project for SNR.AI Automation Project, designed to demonstrate the business automation ecosystem.

Proprietary Bootstrap SNR-Automations, all rights reserved

## Deployment with Netlify

### Automatic Deployment

1. Connect your GitHub repository to Netlify
2. Configure the build settings:
   - Build command: `npm run netlify-build`
   - Publish directory: `out`
   - Node version: 20.11.1
   - Environment variable: `NETLIFY_NEXT_PLUGIN_SKIP=true`

### Manual Deployment

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Build and export the site locally:
   ```bash
   npm run netlify-build
   ```

4. Deploy to Netlify:
   ```bash
   netlify deploy --prod --dir=out
   ```

## Local Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

