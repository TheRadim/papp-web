# Bootstrap and Layout System

## Breakpoints

Bootstrap 5 defaults are used:

- `sm`: 576px
- `md`: 768px
- `lg`: 992px
- `xl`: 1200px
- `xxl`: 1400px

## Containers

The site uses Bootstrap `.container` with custom max widths up to 1220px and local padding through `--container-padding`.

## Gutters

The Sass override sets `$grid-gutter-width: 1.75rem`.

## Spacing

Section spacing is controlled through:

- `--section-space-xs`
- `--section-space-sm`
- `--section-space-md`
- `--section-space-lg`
- `--section-space-xl`

## Utility Usage

Bootstrap utilities are appropriate for minor alignment or spacing. Reusable visual patterns should use Papp component classes in `src/styles/globals.scss`.

## Naming

- Layout: `.site-*`, `.papp-section`, `.container`
- Components: `.hero-*`, `.offering-*`, `.project-*`, `.contact-*`
- States: `.is-active`, `.has-open-menu`

## Responsive Testing Expectations

Test at 375, 430, 576, 768, 992, 1200, 1400 and 1600px before launch.
