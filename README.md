# TODEA Website

Corporate website for TODEA — IT Consulting & Cloud Native Solutions.

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) v4
- [next-intl](https://next-intl.dev/) — i18n (English, Italian, Korean)
- [reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3) — spam protection

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # Add your reCAPTCHA keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key (public) |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret key (server-side only) |

Get keys at [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin). The app works without keys — reCAPTCHA is skipped if unset.

## Project Structure

```
app/
  [locale]/
    layout.jsx        # Root layout (fonts, metadata, providers)
    page.jsx          # Home page
  globals.css         # Tailwind imports and custom theme
components/
  ui/                 # Reusable UI (Button, Container, SectionHeader, LanguageSwitcher)
  Header/             # Site header with navigation
  Hero/               # Hero section with terminal illustration
  WaveDivider/        # SVG wave section dividers
  Services/           # Services grid (6 cards)
  Approach/           # "How We Work" steps (3 cards)
  About/              # About section
  TechStack/          # Technology logos grid
  Industries/         # Industry sectors grid (6 cards)
  CtaBanner/          # Call-to-action banner
  Contact/            # Contact CTA section
  ContactModal/       # Contact form modal + provider context
  Footer/             # Site footer
  FadeIn/             # Scroll-triggered fade-in animation
  RecaptchaProvider   # reCAPTCHA v3 wrapper
config/
  i18n/
    routing.js        # Locale definitions (en, it, ko)
    request.js        # Message loader per locale
messages/
  en.json             # English translations
  it.json             # Italian translations
  ko.json             # Korean translations
public/
  favicons/           # Favicon assets (SVG + PNG)
```

## Internationalization

Three languages with URL path prefixes:
- `/en` — English
- `/it` — Italian
- `/ko` — Korean

Root `/` auto-detects browser language and redirects. Language switcher dropdown in the header.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
