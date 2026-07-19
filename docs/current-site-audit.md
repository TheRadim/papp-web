# Current Wix Site Audit

Source audited: `https://www.pappmobility.com/`

## Summary

The current Wix site positions Papp as a parking and mobility-data company with pages for products, equipment, analysis, consultancy, projects, app, about, contact, team and privacy. The homepage contains useful Danish positioning, project references, partner/client/supporter logos and testimonials, but also includes repeated responsive content and claims that should be reviewed before reuse.

## Observed Navigation

- Produkter
- Udstyr
- Analyse
- Parkeringsanalyse
- Rådgivning
- Projekter
- App
- Om os
- Kontakt
- Mød teamet
- Log ind: `https://insights.papp.nu`

## Useful Content to Retain or Rewrite

- Homepage positioning around city movement and decision-making.
- Explanation that Papp collects data with IoT sensors and cameras.
- Papp Insights as dashboard and visualisation platform.
- Advisory language around understanding customer context and guiding decisions.
- Project names listed under the Projects navigation.
- Testimonials and logos after rights and attribution review.
- Company details: CVR `41545933`.

## Claims Requiring Review Before Launch

- GDPR-compliance and data-handling claims.
- Installation time claims.
- Maintenance claims.
- Transaction-processing performance claims.
- Counts such as parking-space coverage.
- Store links and app availability.
- Press and supporter descriptions.

## New IA Recommendation

- `/en` and `/da` homepages.
- Split `Udstyr` into:
  - `/[locale]/products/sensors`
  - `/[locale]/products/cameras`
- Split `Analyse` into:
  - `/[locale]/products/insights`
  - `/[locale]/services/analysis`
- Keep `Rådgivning` as:
  - `/[locale]/services/consultancy`
- Keep projects, app, about, contact and privacy as first-class routes.
