# Architecture

## Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Framework    | Next.js 14 (App Router)             |
| Language     | TypeScript                          |
| Styling      | Tailwind CSS                        |
| i18n         | next-intl                           |
| Fonts        | Sora, Noto Sans KR / JP / SC        |

## Project Structure

```
website-2/
├── docs/                   # Project documentation (this directory)
├── src/
│   ├── app/
│   │   ├── globals.css     # Tailwind directives & custom CSS
│   │   └── [locale]/       # Locale-scoped routes
│   │       ├── layout.tsx  # Root layout (fonts, providers, metadata)
│   │       └── page.tsx    # Home page (assembles all sections)
│   ├── components/         # UI components
│   │   ├── Nav.tsx         # Fixed top navbar with language switcher
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Services.tsx    # Services grid
│   │   ├── Approach.tsx    # Four-step process
│   │   ├── TechStack.tsx   # Technology logos / badges
│   │   ├── CTA.tsx         # Call to action
│   │   ├── Contact.tsx     # Contact form
│   │   ├── Footer.tsx      # Site footer
│   │   └── FadeIn.tsx      # Scroll-triggered fade animation
│   ├── i18n/
│   │   ├── routing.ts      # Locale list & default locale config
│   │   └── request.ts      # Server-side message loading
│   ├── messages/           # Translation JSON files
│   │   ├── en.json
│   │   ├── ko.json
│   │   ├── ja.json
│   │   └── zh.json
│   └── middleware.ts        # next-intl locale detection middleware
├── next.config.mjs          # Next.js config with next-intl plugin
├── tailwind.config.ts       # Tailwind theme (fonts, animations)
├── tsconfig.json
└── package.json
```

## Routing

All pages live under `src/app/[locale]/`. The `middleware.ts` intercepts requests and redirects to the appropriate locale prefix (`/en`, `/ko`, `/ja`, `/zh`). The default locale is `en`.

## Styling

- Tailwind CSS utility classes are used throughout.
- Custom CSS in `globals.css` handles the service row hover line animation (`.svc`) and link underline effect (`.uline`).
- The `FadeIn` component provides scroll-triggered entrance animations using the `rise` keyframe defined in `tailwind.config.ts`.
