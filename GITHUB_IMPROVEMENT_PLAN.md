# GitHub Improvement Plan

This plan is for `adrianwahyuseptianto1-cloud`.

## 1. Profile README

Create a public repository named exactly:

```text
adrianwahyuseptianto1-cloud
```

Add `github-profile/README.md` as the repo `README.md`. GitHub will display it on the profile overview.

## 2. Portfolio Repository

Create a public repo for this portfolio:

```text
developer-portfolio
```

Recommended description:

```text
Editorial developer portfolio with interactive project demos, built with Next.js and deployed on Vercel.
```

Recommended topics:

```text
nextjs react typescript portfolio vercel fullstack-developer developer-portfolio seo
```

## 3. Showcase Repositories

Do not publish the raw `Project/` folder. Create sanitized repositories instead:

| Repo | Purpose |
| --- | --- |
| `company-office-suite-demo` | Safe dummy-data demo for office mobile/web admin workflows |
| `company-tools-hub-demo` | Safe dummy-data demo for automation, WhatsApp flow, scraper jobs, and exports |
| `twitter-sna-scraper-demo` | Safe demo for SNA scraping/export workflow |
| `auto-store-v2-demo` | Safe demo for Discord store flow |

Each repo should include:

- clear `README.md`
- screenshots or GIFs
- dummy data only
- `.env.example`, never `.env`
- topics and short repo description
- Vercel/live demo link when possible

## 4. Pinned Repositories

Pin these after they exist:

1. `developer-portfolio`
2. `company-office-suite-demo`
3. `company-tools-hub-demo`
4. `twitter-sna-scraper-demo`
5. `auto-store-v2-demo`
6. `company-website-demo`

## 5. Contribution Activity

Use real, useful commits. A healthy pattern:

- day 1: portfolio base
- day 2: SEO metadata + README
- day 3: first interactive project demo
- day 4: second demo + screenshots
- day 5: cleanup docs and deployment notes

Avoid fake commits. The graph should reflect actual work.

## 6. GitHub App Status

The GitHub connector can read the profile, but currently returns no accessible repositories. To let Codex edit repos directly:

1. Open GitHub App settings.
2. Grant the app access to the target repository or all repositories.
3. Re-run repository listing from Codex.

After that, Codex can update README files, create files, and help prepare PRs through the GitHub connector.
