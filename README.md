# Todea Website

Corporate website for [Todea](https://todea.co.kr) — a Seoul-based cloud native infrastructure consultancy.

## Tech Stack

- **Framework:** Next.js 14 (static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **i18n:** next-intl (English, Korean, Japanese, Chinese)
- **Hosting:** GitHub Pages

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static output is generated in the `out/` directory.

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that builds and deploys to GitHub Pages automatically.

## Project Structure

```
src/
  app/[locale]/       # Next.js app router with locale param
  components/         # React components (Nav, Hero, Services, etc.)
  i18n/               # Internationalization config and navigation
  messages/           # Translation files (en.json, ko.json, ja.json, zh.json)
public/
  icons/              # Self-hosted tech stack SVG icons
```
