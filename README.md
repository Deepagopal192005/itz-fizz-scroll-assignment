# ITZ FIZZ — Scroll-Driven Hero Assignment

A responsive product landing page built with Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.

## Features

- Full-screen hero inspired by the supplied ITZ FIZZ reference.
- Letter-spaced headline with staggered entrance animation.
- Four statistics animated in sequence.
- Original inline SVG sports-car illustration.
- Scroll-linked pinned hero animation: the car translates, rotates, and scales according to scroll progress.
- Responsive desktop and mobile layouts.
- Additional content sections and accessible navigation.
- Static export configured for GitHub Pages.

## Requirements

- Node.js 20 or later recommended.
- npm.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Verify production build

```bash
npm run build
```

The static website is generated into the `out/` directory.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions**.
4. Add `.github/workflows/deploy.yml` (provided in this project).
5. Push to `main`; the workflow publishes the `out/` folder.

If the repository is a project site (URL includes `/repository-name/`), set `basePath` in `next.config.ts` to `"/repository-name"` and ensure asset paths account for that prefix. For a user site (`username.github.io`), no base path is needed.

## Submission

- Live URL: add after deployment.
- GitHub repository: add your repository URL.

## Notes

The statistics are illustrative content included to match the assignment brief; they are not verified real-world product claims.
