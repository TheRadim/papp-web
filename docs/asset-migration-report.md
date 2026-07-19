# Asset Migration Report

## Migrated

| Asset | Local path | Intended use | Status |
| --- | --- | --- | --- |
| Supplied mobility city visual | `public/images/hero/mobility-city-visual.png` | Hero supporting visual, future 3D reference | Owner supplied |
| Supplied round logo | `public/images/brand/papp-logo-round.png` | Header and footer brand asset | Owner supplied |
| Current-site transparent road | `public/images/hero/extended-road-transparent.png` | Homepage hero background visual | Migrated from current site |
| Current-site project photos | `public/images/projects/**` | Project cards, detail heroes and galleries | Migrated from current site |
| Current-site partner logos | `public/images/partners/**` | Logo strip | Migrated from current site |
| Current-site app assets | `public/images/app/**` | App page and homepage app section | Migrated from current site |

## Pending

- Team portraits.
- Full-resolution rights review for migrated Wix assets.
- True Papp Insights platform screenshots.
- Privacy/legal documents.

## Optimisation Notes

- PNG originals are preserved.
- WebP conversion via `sips` failed because the local `sips` build could not write WebP. Use `sharp`, `imagemagick` or Next image optimisation in a later pass.
