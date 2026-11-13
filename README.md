# Muhammad Maaz — 3D Portfolio

Portfolio of Muhammad Maaz, Agentic AI & Full-Stack Developer. A single-page site with a scroll-driven WebGL scene: a reactive "AI core" that travels and changes with each section.

- **Live:** https://my-portfolio-ten-iota-25.vercel.app/
- **Repo:** https://github.com/mmaaz-497/My-Portfolio

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 (theme tokens in `src/app/globals.css`)
- three.js with `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- Framer Motion for section animation, Lenis for smooth scrolling
- Formspree for the contact form

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things live

| Path | What it holds |
|---|---|
| `src/config/site.ts` | Name, email, location, CV path, social links, Formspree URL |
| `src/config/navigation.ts` | Nav links (header, scroll-spy, footer) |
| `src/data/*.ts` | All content: projects, services, skills, experience, certificate, bio |
| `src/components/*.tsx` | Page sections (Hero, AboutMe, Skills, Services, Projects, ...) |
| `src/components/ui/` | Shared pieces: tilt card, reveal, section heading, icons, logo, smooth scroll |
| `src/components/three/` | The 3D scene |
| `public/` | Profile photo, CV, certificate, project screenshots, service images, skill icons |
| `design/` | Source artwork for the 2M monogram (not served) |

### Editing content

Add or change a project, service, skill or job by editing the matching file in `src/data/`. Sections and the 3D scene read from there, so nothing else needs to change. A service's "Shipped" link points at a project by `id`, so each URL is written once in `projects.ts`.

### The 3D scene

- `journey.ts` — one pose per section (position, size, brightness). Tune the scroll journey here.
- `AICore.tsx`, `AgentNetwork.tsx`, `ParticleField.tsx`, `SkillOrbit.tsx` — the objects.
- `Scene.tsx` — canvas, camera rig, bloom.
- `SceneCanvas.tsx` — decides whether the scene runs at all.

The scene is loaded only in the browser. Phones and low-power devices get a lighter version (fewer particles, no bloom, no skill orbit). Visitors with "reduce motion" enabled, or without WebGL, get a static gradient backdrop instead.

### Themes

Dark is the default. The header toggle switches to light and remembers the choice. Colours are CSS variables on `:root` and `[data-theme="light"]`; components use the generated utilities (`bg-background`, `text-accent`, `border-line`) rather than hex values.

## Deployment

Deployed on Vercel from the `main` branch. No environment variables are required.
