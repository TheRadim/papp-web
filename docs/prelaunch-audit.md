# Prelaunch Audit

## Current Status

This is an implementation checkpoint, not a launch-ready audit.

## Implemented

- Bilingual route structure.
- Homepage.
- Product and service pages.
- Projects overview and detail template.
- App, about, contact and privacy pages.
- Header, dropdown, mobile menu and footer.
- Contact validation with unconfigured delivery state.
- Sitemap and robots.
- Minimal content tests.

## Needs QA

- Browser screenshots at required widths.
- Keyboard walkthrough of dropdown and mobile menu.
- Automated accessibility scan.
- Local crawl for broken links.
- Console and hydration error review.
- No mobile overflow verification.
- Final WebP/AVIF image optimisation.

## Known Issues

- Root HTML language is currently defaulted to English because Next's top-level root layout is not locale-specific in this pass.
- Danish routes use English segment names for implementation simplicity.
- Partner strip uses migrated local logo assets from the current site.
- Privacy policy is a legal-review placeholder.
- App Store and Google Play badges link to current-site URLs.
