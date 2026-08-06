# GitHub Pages Deployment

The site deploys to GitHub Pages from the public `TheRadim/papp-web` repository.

## Build

```bash
npm run pages:build
```

This sets `GITHUB_PAGES=1`, exports the Next.js app to `out/`, and uses `/papp-web` as the base path for project Pages.

## Deployment

The workflow at `.github/workflows/pages.yml` builds `out/` whenever `main` is pushed, uploads it as a Pages artifact and deploys it with GitHub's Pages deployment action.

Expected URL:

```text
https://theradim.github.io/papp-web/
```

## Notes

- `.nojekyll` is included so GitHub Pages serves `_next` assets.
- Static GitHub Pages cannot run the Next.js `/api/contact` route. The form currently falls back to the email message when delivery is unavailable.
