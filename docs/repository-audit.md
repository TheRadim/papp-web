# Repository Audit

Date: 2026-07-19

## Current Stack

- Fresh repository in `/Users/radimtheiner/Papp/Developement/WEB`.
- No existing framework, package manager files, routes, dependencies, test setup, localisation setup or deployment setup were present before implementation.
- New stack scaffolded according to the master specification:
  - Next.js App Router
  - TypeScript strict mode
  - Bootstrap 5 installed through npm
  - Sass with CSS custom properties
  - Typed local content
  - Vitest for minimal content tests

## Reusable Code

- None existed in the target repository.
- Supplied reusable assets copied into `public/images`:
  - `public/images/hero/mobility-city-visual.png`
  - `public/images/brand/papp-logo-round.png`

## Migration Risks

- The current Wix site contains duplicated responsive markup and repeated content.
- Several claims on the current site require owner/legal review before reuse, especially privacy, GDPR, performance and technical claims.
- Partner/client logos are visible on the current site, but local logo asset migration and rights review are incomplete.
- App Store and Google Play URLs were found on the current site and wired into the app badges.
- Social URLs should be verified in a full crawl.
- Existing privacy policy content was not fully migrated in this pass and requires legal review.

## Recommended Implementation Approach

1. Keep the new site content-driven with typed TypeScript files.
2. Preserve verified high-level positioning and project names.
3. Mark unverifiable claims with `needs-review` or `needs-content`.
4. Migrate owned Wix images locally before launch.
5. Replace current broad `Udstyr` page with explicit product pages for Sensors, Cameras and Papp Insights.
6. Treat Analysis and Consultancy as expertise services rather than products.
7. Add a CMS only after the content model stabilises.

## Files to Preserve

- `docs/PAPP_WEBSITE_MASTER_SPEC.md`
- `public/images/hero/mobility-city-visual.png`
- `public/images/brand/papp-logo-round.png`

## Files to Replace

- No pre-existing local files.

## Files Requiring Review

- `src/content/projects/projects.ts`
- `src/content/testimonials/testimonials.ts`
- `src/content/partners/partners.ts`
- `src/content/team/team.ts`
- `src/app/[locale]/privacy/page.tsx`
