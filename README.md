# Bekki Brooker

Single-page website for Bekki Brooker — specialist hair cutting in Ormeau.

## Development

```sh
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Tailwind CSS rebuilds on file changes and `live-server` auto-reloads the page.

## Build

```sh
pnpm build
```

Compiles and minifies CSS to `dist/style.css`.

## Deployment

Pushes to `master` trigger a GitHub Actions workflow that builds the CSS and deploys to GitHub Pages via the `gh-pages` branch.

## Stack

- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first CSS
- [Google Fonts](https://fonts.google.com/) — Newsreader + Manrope
- GitHub Actions + GitHub Pages
