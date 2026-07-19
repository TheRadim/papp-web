# Redirect Plan

## High Priority

- `/` -> `/da` or locale-negotiated homepage.
- `/produkter` -> `/da/products/sensors` or `/da` depending owner preference.
- `/udstyr` -> `/da/products/sensors`
- `/analyse` -> `/da/services/analysis`
- `/rådgivning` and `/r%C3%A5dgivning` -> `/da/services/consultancy`
- `/projekter` -> `/da/projects`
- `/app` -> `/da/app`
- `/om-os` -> `/da/about`
- `/kontakt` -> `/da/contact`
- `/privatlivspolitik` -> `/da/privacy`

## Project Redirects

Project detail URLs from the Wix crawl should redirect to matching slugs in `/da/projects/[slug]` after final legacy URL extraction.

## Notes

- Redirect implementation depends on hosting platform.
- English route redirects are not required for old Danish-only Wix URLs unless analytics show English legacy traffic.
