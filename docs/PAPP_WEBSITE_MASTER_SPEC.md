# Papp Mobility Website Master Specification

## 1. Purpose

This document is the master product, design, content, migration, and implementation specification for the new Papp Mobility website.

The new website will replace the current Wix Studio website at:

https://www.pappmobility.com/

The implementation must be fully independent of Wix and built as a custom, maintainable, bilingual website.

The website must preserve useful verified content and owned assets from the current site while substantially improving:

- company positioning;
- information architecture;
- visual quality;
- credibility;
- responsiveness;
- accessibility;
- bilingual support;
- performance;
- SEO;
- maintainability;
- ease of future content updates;
- project presentation;
- product presentation;
- readiness for future 3D interaction;
- readiness for future CMS integration.

The website must present Papp as a mobility-intelligence company, not merely as a parking-technology company.

This document should be stored in the repository as:

```text
docs/PAPP_WEBSITE_MASTER_SPEC.md
```

The implementation team or Codex should treat this document as the primary source of truth unless a later approved document explicitly overrides it.

---

## 2. Role and expected execution standard

You are acting as:

- senior frontend engineer;
- senior UX/UI designer;
- information architect;
- accessibility specialist;
- technical migration lead;
- content-structure architect;
- SEO implementation specialist;
- performance-minded web engineer.

The result must not look like:

- a copied Wix site;
- a default Bootstrap site;
- a generic SaaS template;
- a generic consultancy template;
- a stock Framer template;
- a playful consumer-parking app;
- a heavy enterprise dashboard;
- a cyberpunk data website.

The result should feel:

- custom-designed for Papp;
- modern;
- minimalistic;
- premium;
- warm;
- Scandinavian;
- technically credible;
- calm;
- professional;
- editorial;
- visually precise;
- suitable for municipalities;
- suitable for parking and mobility operators;
- suitable for engineering and consultancy partners;
- suitable for private B2B clients.

---

## 3. Strategic positioning

The older positioning can be summarised as:

> Papp is a parking-technology company offering sensors, cameras and analytics.

The new positioning should move toward:

> Papp is a mobility-intelligence company, where parking is one important use case rather than the entire company definition.

Use the following as the strategic backbone:

> Papp helps cities and operators understand mobility, utilisation and parking through sensors, cameras, analytics and advisory services.

This is not necessarily final homepage copy. It is the core strategic principle for:

- site structure;
- navigation;
- page hierarchy;
- homepage narrative;
- product relationships;
- project categorisation;
- visual storytelling;
- CTA design;
- copywriting;
- SEO topics.

The website must communicate that Papp:

- measures activity in physical environments;
- collects data through sensors and cameras;
- brings data together in Papp Insights;
- helps users understand utilisation, movement, duration, occupancy and patterns;
- supports interpretation through analysis;
- supports implementation and decision-making through consultancy;
- can work with municipalities and private operators;
- offers one connected system;
- is broader than a consumer parking app;
- uses parking as one visible application of a broader mobility-intelligence capability.

The core narrative should be:

1. Collect real-world data.
2. Understand mobility and utilisation.
3. Turn insight into better decisions.

Possible conceptual frameworks:

- Observe → Understand → Improve
- Measure → Analyse → Act
- Collect → Understand → Decide
- Data collection → Mobility intelligence → Better decisions

Do not hardcode any one framework until approved.

---

## 4. Business objectives

The website should help Papp:

- close deals more easily;
- communicate a broader market position;
- explain the relationship between hardware, platform and expertise;
- make camera projects more prominent;
- make Papp relevant to private-sector buyers;
- improve trust with municipalities and professional buyers;
- show real project experience;
- explain Papp Insights clearly;
- present the team and company professionally;
- make contacting Papp easy;
- support English and Danish audiences;
- reduce dependence on Wix;
- create a foundation that can evolve without rebuilding the entire frontend.

---

## 5. Primary audiences

The website should serve:

### Municipalities

Needs:

- credible technology;
- clear use cases;
- privacy-aware language;
- understandable project examples;
- procurement confidence;
- continuity and support;
- reporting and decision support.

### Parking operators

Needs:

- occupancy insight;
- utilisation;
- duration;
- data access;
- platform clarity;
- operational relevance;
- implementation confidence.

### Private B2B operators

Examples may include:

- shopping centres;
- property owners;
- airports;
- hospitals;
- campuses;
- venues;
- private parking facilities;
- business districts.

Needs:

- clear commercial use cases;
- measurable outcomes;
- installation understanding;
- camera and sensor relevance;
- easy path to contact.

### Engineering and consultancy companies

Needs:

- reliable measurement;
- project data;
- continuous data collection;
- temporary or permanent deployments;
- analysis support;
- collaboration potential.

### Public app users

Needs:

- concise app explanation;
- app-store links;
- confidence that the app remains supported.

The public app is important but must not define the entire company identity.

---

## 6. Core offering model

The website should distinguish between technology products and expertise services.

### Technology

1. Parking Sensors
2. Camera Analytics
3. Papp Insights

### Expertise

4. Analysis
5. Consultancy / Advisory

The first three should receive the strongest visual presence.

Analysis and Consultancy should be clearly connected to the technology offering, but must not be represented as physical products.

---

## 7. Required implementation workflow

Do not begin by immediately coding the final homepage.

Work in structured phases.

### Phase 1: Repository audit

Inspect:

- current framework;
- package manager;
- directory structure;
- routes;
- dependencies;
- styling system;
- test setup;
- localisation setup;
- deployment setup;
- existing reusable components;
- current technical debt.

Create:

```text
docs/repository-audit.md
```

Include:

- current stack;
- reusable code;
- migration risks;
- recommended implementation approach;
- files that should be preserved;
- files that should be replaced;
- files requiring review.

### Phase 2: Crawl and audit the current Wix site

Crawl all publicly accessible internal pages belonging to:

https://www.pappmobility.com/

Do not crawl unrelated external websites.

Use respectful request rates.

Inventory:

- URLs;
- page titles;
- headings;
- body text;
- navigation;
- products;
- services;
- projects;
- case studies;
- testimonials;
- team members;
- client logos;
- partner logos;
- press mentions;
- app content;
- App Store links;
- Google Play links;
- social links;
- privacy-policy content;
- contact details;
- company details;
- downloadable files;
- login destinations;
- page metadata;
- images;
- videos;
- duplicate content;
- legacy URLs.

Ignore Wix-generated technical markup and duplicate responsive content.

Create:

```text
docs/current-site-audit.md
docs/current-site-pages.csv
docs/current-site-assets.csv
docs/current-site-content-inventory.md
docs/content-gaps.md
docs/redirect-plan.md
docs/project-migration.md
```

For each current page, document:

- existing URL;
- proposed new URL;
- language;
- content type;
- retain;
- rewrite;
- merge;
- remove;
- available imagery;
- available copy;
- missing information;
- migration priority;
- SEO importance;
- redirect requirement;
- factual confidence.

### Phase 3: Asset migration

Download relevant Papp-owned public assets.

Do not hotlink production assets from Wix.

Use:

```text
public/
  images/
    brand/
    hero/
    products/
      sensors/
      cameras/
      insights/
      analysis/
      consultancy/
    projects/
      sensors/
      cameras/
      consultancy/
    team/
    app/
    partners/
    testimonials/
    articles/
    misc/
  icons/
  video/
  documents/
```

Use descriptive filenames.

Good:

```text
parking-sensor-installed.webp
camera-analytics-street.webp
papp-insights-dashboard.webp
aarhus-municipality-logo.svg
team-martine.webp
```

Bad:

```text
image123-final-2.png
wix-image-copy.webp
new-final-final.png
```

Preserve originals until migration is complete.

Record:

- source URL;
- local path;
- format;
- dimensions;
- file size;
- intended use;
- duplicate status;
- optimisation status;
- embedded-text status;
- rights-review status.

Create:

```text
docs/asset-migration-report.md
```

### Phase 4: Content architecture

Establish the content model before building final page layouts.

### Phase 5: Design system

Extract colours, type, spacing, containers, shadows, radii and button patterns before page polish.

### Phase 6: Shared layout

Build:

- header;
- mobile menu;
- language switch;
- footer;
- section container;
- typography;
- buttons;
- cards;
- links;
- form controls.

### Phase 7: Homepage

Build the homepage with a static city image first.

### Phase 8: Product and service pages

Build reusable templates.

### Phase 9: Projects and articles

Migrate verified cases.

### Phase 10: SEO, accessibility, tests and launch preparation

---

## 8. Technical stack

Use the following unless the repository has a strong reason not to:

- Next.js;
- App Router;
- TypeScript;
- strict mode;
- Bootstrap 5;
- Sass or CSS Modules;
- CSS custom properties;
- server components by default;
- client components only for interaction;
- structured local content;
- semantic HTML;
- responsive images;
- lightweight motion.

Bootstrap should be installed through the package manager.

Do not use a Bootstrap CDN.

Use Bootstrap primarily for:

- container sizing;
- responsive grid;
- rows and columns;
- responsive visibility;
- alignment;
- spacing utilities where appropriate;
- navigation layout;
- forms;
- breakpoint consistency.

Do not make the website look like default Bootstrap.

Do not add multiple UI frameworks.

Avoid:

- Material UI;
- Chakra;
- Ant Design;
- unnecessary animation frameworks;
- heavy page builders.

Use one icon set or local SVG icons.

Do not use emoji as interface icons.

---

## 9. Bootstrap customisation

Create a controlled Bootstrap override file before importing Bootstrap.

Example:

```scss
$primary: ...;
$secondary: ...;
$dark: ...;
$light: ...;

$border-radius: ...;
$border-radius-sm: ...;
$border-radius-lg: ...;
$border-radius-pill: ...;

$container-max-widths: (
  sm: ...,
  md: ...,
  lg: ...,
  xl: ...,
  xxl: ...
);

$grid-gutter-width: ...;

@import "bootstrap/scss/bootstrap";
```

Create:

```text
docs/bootstrap-and-layout-system.md
```

Document:

- breakpoints;
- container widths;
- gutter widths;
- spacing conventions;
- when Bootstrap utilities are appropriate;
- when custom component classes are required;
- naming conventions;
- responsive testing expectations.

---

## 10. Content-driven architecture

The website must be content-driven.

Do not place substantial editable text directly inside visual components.

All editable content should be stored separately from layout logic.

The architecture should make it easy to:

- update copy;
- translate pages;
- add projects;
- add team members;
- add testimonials;
- add partners;
- change contact details;
- add articles;
- reorder homepage sections;
- connect a CMS later.

Recommended structure:

```text
src/
  content/
    global/
      company.ts
      navigation.ts
      footer.ts
      contact.ts
    home/
      home.en.ts
      home.da.ts
    offerings/
      sensors.ts
      cameras.ts
      insights.ts
      analysis.ts
      consultancy.ts
    projects/
      projects.ts
    testimonials/
      testimonials.ts
    partners/
      partners.ts
    team/
      team.ts
    articles/
      articles.ts
```

Alternative acceptable systems:

- typed TypeScript;
- JSON;
- YAML;
- MDX.

Prefer typed TypeScript or MDX initially.

Do not add an external CMS unless approved.

Create reusable accessors:

```ts
getHomepageContent(locale)
getOfferingBySlug(locale, slug)
getProjects(locale, filters)
getProjectBySlug(locale, slug)
getTestimonials(locale)
getPartners()
getTeam(locale)
getArticles(locale)
```

Avoid language checks scattered throughout JSX.

Bad:

```tsx
{locale === "da" ? "Kontakt os" : "Contact us"}
```

Preferred:

```tsx
const content = getHomepageContent(locale);
<Button>{content.contactButton}</Button>
```

---

## 11. Content types

Use strongly typed content structures.

```ts
type Locale = "en" | "da";

type OfferingCategory =
  | "sensors"
  | "cameras"
  | "insights"
  | "analysis"
  | "consultancy";

type ProjectCategory =
  | "sensors"
  | "cameras"
  | "consultancy";

type ContentStatus =
  | "approved"
  | "draft"
  | "needs-content"
  | "needs-translation"
  | "needs-review";

interface LocalisedText {
  en: string;
  da: string;
}

interface SeoContent {
  title: LocalisedText;
  description: LocalisedText;
  socialImage?: string;
}

interface Offering {
  slug: string;
  category: OfferingCategory;
  name: LocalisedText;
  eyebrow?: LocalisedText;
  shortDescription: LocalisedText;
  introduction: LocalisedText;
  benefits: LocalisedText[];
  useCases: LocalisedText[];
  process?: LocalisedText[];
  heroImage: string;
  secondaryImages?: string[];
  relatedProjectSlugs: string[];
  contentStatus: ContentStatus;
  seo: SeoContent;
}

interface Project {
  slug: string;
  category: ProjectCategory;
  clientName: string;
  location?: LocalisedText;
  title: LocalisedText;
  summary: LocalisedText;
  challenge?: LocalisedText;
  approach?: LocalisedText;
  solution?: LocalisedText;
  result?: LocalisedText;
  technologies?: OfferingCategory[];
  coverImage: string;
  gallery?: string[];
  testimonialSlug?: string;
  published: boolean;
  contentStatus: ContentStatus;
  seo: SeoContent;
}

interface Testimonial {
  slug: string;
  quote: LocalisedText;
  personName?: string;
  personRole?: LocalisedText;
  organisation: string;
  organisationLogo?: string;
  published: boolean;
  contentStatus: ContentStatus;
}

interface Partner {
  slug: string;
  name: string;
  logo: string;
  website?: string;
  category: "client" | "partner" | "supporter";
  published: boolean;
}

interface TeamMember {
  slug: string;
  name: string;
  role: LocalisedText;
  biography?: LocalisedText;
  image: string;
  linkedinUrl?: string;
  published: boolean;
  contentStatus: ContentStatus;
}

interface Article {
  slug: string;
  title: LocalisedText;
  excerpt: LocalisedText;
  body?: LocalisedText;
  category: LocalisedText;
  coverImage: string;
  publishedAt?: string;
  published: boolean;
  contentStatus: ContentStatus;
  seo: SeoContent;
}
```

Do not invent missing information.

Use:

```ts
contentStatus: "needs-content"
```

or:

```ts
contentStatus: "needs-translation"
```

where appropriate.

---

## 12. Internationalisation

Support:

- English;
- Danish.

Use locale-prefixed routes:

```text
/en
/da
```

Preferred examples:

```text
/en/products/sensors
/da/produkter/sensorer

/en/products/cameras
/da/produkter/kameraer

/en/products/insights
/da/produkter/insights

/en/services/analysis
/da/ydelser/analyse

/en/services/consultancy
/da/ydelser/raadgivning
```

Translated slugs are preferred if routing remains manageable.

The language switch must:

- show EN and DA;
- preserve equivalent pages where possible;
- fall back to the equivalent homepage where necessary;
- not use flags;
- be keyboard accessible;
- expose an accessible label;
- show the active language clearly;
- remain accessible in the mobile menu.

Add:

- correct `html lang`;
- locale-specific metadata;
- canonical URLs;
- hreflang alternates;
- translated navigation;
- translated footer;
- translated forms;
- translated validation messages;
- translated accessibility labels;
- translated SEO.

Create:

```text
docs/translation-status.md
```

Report:

- missing translations;
- fallback strings;
- empty content;
- untranslated metadata;
- untranslated aria labels.

---

## 13. Visual direction

The website should use:

- clean white;
- occasional light warm-grey;
- restrained rounded corners;
- subtle blurred shadows;
- editorial typography;
- generous whitespace;
- strong alignment;
- some card-based information;
- 3D illustrations;
- product photography;
- selected project photography;
- Papp’s gradient.

The visual direction should take inspiration from:

- clean modern technology websites;
- editorial agency layouts;
- consulting websites with strong grids;
- browser-tab-like rounded navigation;
- white and soft-grey surfaces;
- large but controlled typography;
- quiet card systems;
- strong full-width imagery;
- rounded image corners;
- subtle accent colours.

The design references supplied by the project owner should be treated as visual inspiration only. Do not copy them.

The site should not become:

- overly rounded;
- overly shadowed;
- a glassmorphism interface;
- a dashboard;
- a default Framer template;
- a generic blue SaaS website.

---

## 14. Brand colours and gradient

The Papp gradient is a core visual asset.

It appears in the logo and should combine approximately:

- deep blue;
- bright blue;
- light blue;
- coral;
- orange;
- pink.

Do not guess final values without inspecting the actual logo.

Extract colours from:

- supplied logo;
- current brand assets;
- current CSS;
- representative visuals.

Create:

```text
docs/design-tokens.md
```

Define:

```css
:root {
  --papp-blue-deep: ...;
  --papp-blue: ...;
  --papp-blue-light: ...;
  --papp-coral: ...;
  --papp-orange: ...;
  --papp-pink: ...;

  --papp-gradient-primary: linear-gradient(
    120deg,
    var(--papp-blue-deep),
    var(--papp-blue-light),
    var(--papp-coral),
    var(--papp-pink)
  );

  --surface-primary: #ffffff;
  --surface-secondary: ...;
  --surface-tertiary: ...;

  --text-primary: ...;
  --text-secondary: ...;
  --text-muted: ...;

  --border-subtle: ...;
  --shadow-soft: ...;
  --shadow-card: ...;

  --radius-small: ...;
  --radius-medium: ...;
  --radius-large: ...;

  --container-max-width: ...;
}
```

Use the gradient selectively for:

- active navigation;
- headline highlights;
- primary CTA accents;
- small decorative lines;
- hotspots;
- active product states;
- selected icons;
- section labels;
- subtle hover states.

Do not use it as the background of every section.

Do not make long paragraphs gradient-coloured.

---

## 15. Typography

Use a clean modern sans-serif with:

- Danish character support;
- good readability;
- strong numerals;
- variable font support if possible;
- good web performance.

Use one primary family unless a second font adds real value.

Create a controlled scale:

- Display;
- H1;
- H2;
- H3;
- large body;
- body;
- small body;
- eyebrow;
- caption;
- navigation;
- button.

Avoid huge headings that create one-word lines.

Recommended body width:

```text
55ch to 70ch
```

---

## 16. Layout system

Use Bootstrap containers and grids for reliable alignment.

All major sections should share the same visual grid.

Create a documented container strategy.

```scss
.papp-container {
  width: 100%;
  max-width: var(--container-max-width);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}
```

Define section spacing tokens:

```css
--section-space-xs
--section-space-sm
--section-space-md
--section-space-lg
--section-space-xl
```

Requirements:

- consistent left and right edges;
- predictable gutters;
- responsive spacing;
- aligned headings;
- aligned images;
- aligned cards;
- no horizontal overflow;
- no accidental arbitrary widths.

---

## 17. Navigation concept

The top navigation may reference rounded browser tabs.

It should feel like a refined floating toolbar.

Possible traits:

- rounded white container;
- thin border;
- light blurred shadow;
- light translucency if readable;
- segmented nav items;
- active state with soft-grey or gradient accent;
- compact language switch;
- separate login button;
- Papp logo left.

Do not make it look like an actual browser.

Desktop structure:

```text
[Logo] [Solutions] [Projects] [App] [About] [Contact] [EN / DA] [Log in]
```

The header must be:

- sticky;
- readable;
- responsive;
- stable during scroll;
- accessible;
- keyboard operable;
- visually distinct from content;
- not overly tall.

The header may become more solid after scrolling.

---

## 18. Solutions dropdown

Use:

- English: Solutions
- Danish: Løsninger

unless the owner later chooses Products.

Group entries as:

### Technology

- Parking Sensors
- Camera Analytics
- Papp Insights

### Expertise

- Analysis
- Consultancy

Desktop dropdown items should include:

- title;
- short one-line explanation;
- optional icon;
- visible hover;
- visible focus.

Mobile should use an accordion.

Requirements:

- Escape closes;
- click outside closes;
- pointer can move between trigger and panel;
- keyboard navigation works;
- no hover-only access;
- touch targets at least approximately 44 × 44 px.

---

## 19. Insights login

Button labels:

- English: Log in
- Danish: Log ind

Destination:

```text
https://insights.papp.nu
```

Treat as an external application.

Use safe external-link behaviour.

The button should be distinct but not overpowering.

---

## 20. Information architecture

### Homepage

```text
/[locale]
```

### Products

```text
/[locale]/products/sensors
/[locale]/products/cameras
/[locale]/products/insights
```

### Services

```text
/[locale]/services/analysis
/[locale]/services/consultancy
```

### Projects

```text
/[locale]/projects
/[locale]/projects/[slug]
```

### App

```text
/[locale]/app
```

### About

```text
/[locale]/about
```

Team is included on About.

### Contact

```text
/[locale]/contact
```

### Privacy

```text
/[locale]/privacy
```

### Optional articles

```text
/[locale]/articles
/[locale]/articles/[slug]
```

Only publish an article index when approved content exists.

---

## 21. Homepage order

1. Hero
2. Positioning / process
3. Sensors
4. Cameras
5. Papp Insights
6. Analysis and Consultancy
7. Partner/client logo strip
8. Featured article or project
9. Testimonials
10. Contact / book a conversation
11. App
12. Footer

---

## 22. Homepage hero

Desktop:

- left: headline, one-liner, support text, CTAs;
- right: complete miniature mobility city.

The full city must be visible by default.

Working direction:

### English

> Mobility intelligence for better decisions.

> Papp helps cities and operators understand movement, utilisation and parking through connected sensors, cameras and analytics.

### Danish

> Mobilitetsindsigt til bedre beslutninger.

> Papp hjælper byer og operatører med at forstå bevægelse, udnyttelse og parkering gennem sammenhængende sensorer, kameraer og analyser.

Treat as draft content.

Possible CTAs:

- Explore our solutions
- View projects

---

## 23. Mobility city visual

Create:

```text
MobilityCityVisual
```

Initial version:

- static image;
- entire city visible;
- three HTML hotspots;
- Sensors;
- Cameras;
- Papp Insights;
- rounded hotspot markers;
- tooltip on hover/focus;
- click scrolls to section;
- keyboard accessible;
- no text baked into artwork;
- no canvas-only navigation.

Use:

```ts
type MobilityArea = "sensors" | "cameras" | "insights";

interface MobilityCityVisualProps {
  activeArea?: MobilityArea | null;
  onAreaHover?: (area: MobilityArea | null) => void;
  onAreaSelect?: (area: MobilityArea) => void;
  interactive?: boolean;
  visualMode?: "image" | "video" | "3d";
}
```

Accessible controls:

```html
<button aria-label="Explore parking sensors">
<button aria-label="Explore camera analytics">
<button aria-label="Explore Papp Insights">
```

Future desktop interaction:

- whole city shown first;
- car loops through city;
- hover highlights area;
- tooltip expands;
- rest of city slightly mutes;
- click zooms to Sensors or Cameras;
- Insights pulls back and activates whole-city data layer;
- user can return to overview;
- CTA links to product page.

---

## 24. Mobile city approach

Phones should use a different interaction.

Recommended:

- short looping WebM or static image;
- full city visible;
- product buttons underneath;
- no tiny hotspots;
- muted autoplay;
- poster image;
- reduced-motion fallback;
- mobile-specific asset;
- direct links or state switching.

Buttons:

- Parking Sensors
- Camera Analytics
- Papp Insights

Do not load a large desktop video on mobile.

---

## 25. Positioning/process section

Suggested heading:

> From movement to meaningful decisions

Suggested structure:

### Collect

Sensors and cameras measure real-world activity.

### Understand

Papp Insights reveals utilisation, duration, movement and patterns.

### Act

Analysis and consultancy help turn findings into practical decisions.

This can use:

- three cards;
- a horizontal flow;
- connected steps;
- subtle icons;
- restrained gradient indicators.

---

## 26. Sensors homepage section

Include:

- short explanation;
- core benefits;
- use cases;
- visual;
- CTA;
- anchor `#sensors`.

Possible topics:

- space-level occupancy;
- live data;
- historical data;
- utilisation;
- duration;
- charging-space monitoring;
- long-term measurement.

Do not invent technical specifications.

---

## 27. Cameras homepage section

Give stronger prominence than on the current site.

Include:

- parking areas;
- streets;
- mobility flows;
- vehicle activity;
- utilisation;
- duration;
- temporary deployments;
- permanent deployments;
- municipality relevance;
- private B2B relevance;
- privacy-conscious framing;
- CTA;
- anchor `#cameras`.

Do not claim facial recognition.

Do not use surveillance aesthetics.

Do not invent legal claims.

---

## 28. Papp Insights homepage section

Present as the intelligence centre.

Explain that it:

- connects data sources;
- supports live views;
- supports historical views;
- visualises patterns;
- compares utilisation;
- supports reporting;
- supports decisions.

Use real platform screenshots only.

Avoid fake dashboard designs.

Anchor:

```text
#insights
```

---

## 29. Analysis and Consultancy homepage section

Present as expertise, not hardware.

### Analysis

- interpret data;
- compare periods;
- identify patterns;
- report findings;
- answer mobility questions;
- communicate results.

### Consultancy

- define questions;
- choose measurement methods;
- select technology;
- plan projects;
- review findings;
- decide next steps.

Each gets a dedicated link.

---

## 30. Logo strip

Create a continuous horizontal strip with verified logos.

Distinguish in data:

- clients;
- partners;
- supporters.

Do not call all organisations clients.

Requirements:

- seamless movement;
- pause on hover/focus where practical;
- reduced-motion static grid;
- preserved aspect ratios;
- normalised heights;
- meaningful alt text;
- no duplicates;
- optional grayscale treatment;
- local assets;
- lazy loading.

---

## 31. Featured story

Use one editorial feature after the logo strip.

Possible content:

- camera project;
- sensor project;
- mobility-intelligence article;
- Papp methodology;
- selected case study.

Use:

- large image;
- category;
- title;
- excerpt;
- CTA;
- optional client.

Do not invent an article.

---

## 32. Testimonials

Show approximately three strong verified testimonials.

Prefer a grid unless a carousel adds real value.

Each may include:

- quote;
- person;
- role;
- organisation;
- organisation logo.

Do not fabricate attribution.

Use soft cards with subtle borders and shadows.

---

## 33. Contact section

Working heading:

### English

> Let’s talk about what you need to understand.

### Danish

> Lad os tale om, hvad I har brug for at forstå.

Use official email:

```text
hey@pappmobility.com
```

This replaces the old email in the new website.

Until a verified booking URL exists, use:

```text
mailto:hey@pappmobility.com
```

or the contact page.

---

## 34. App section

Place near the bottom.

Present as a related public-facing product.

Include:

- app image;
- short explanation;
- verified App Store link;
- verified Google Play link if active;
- store badges;
- App page CTA.

Do not make it visually larger than the core B2B products.

---

## 35. Product and service page structure

Use:

1. Hero
2. Problem/context
3. How it works
4. Benefits
5. Use cases
6. Supporting visual
7. Relevant projects
8. Testimonial
9. Contact CTA

Hero:

- text left;
- product visual right;
- static image initially;
- future 3D support.

---

## 36. Sensors page

Focus on:

- individual-space data;
- occupancy;
- utilisation;
- duration;
- charging-space use;
- live data;
- historical data;
- long-term trends.

Do not invent:

- battery lifetime;
- accuracy;
- dimensions;
- protocol;
- certifications;
- IP ratings.

Mark missing specs as TODO.

---

## 37. Cameras page

Focus on:

- mobility measurement;
- vehicle activity;
- parking areas;
- street use;
- duration;
- utilisation;
- flow;
- temporary measurement;
- permanent deployments;
- municipal use;
- private B2B use.

Do not claim:

- facial recognition;
- person identification;
- unverified licence-plate storage practices;
- legal certifications;
- security certifications;
- approved privacy claims without source material.

Include a draft area for approved privacy/data-handling copy.

---

## 38. Insights page

Focus on:

- one platform;
- live data;
- historical data;
- maps;
- utilisation;
- duration;
- trends;
- comparisons;
- reports;
- decision support.

Use real screenshots.

Include Log in CTA.

---

## 39. Analysis page

Focus on:

- interpretation;
- reporting;
- patterns;
- period comparisons;
- answering project questions;
- communicating findings.

---

## 40. Consultancy page

Focus on:

- understanding the problem;
- choosing technology;
- measurement design;
- implementation planning;
- reviewing findings;
- advising next steps.

---

## 41. Projects

Target launch structure:

- 2 camera projects;
- 2 sensor projects;
- 2 consultancy projects.

First crawl and verify existing material.

Do not invent cases.

Use unpublished placeholders where needed.

```ts
{
  slug: "camera-project-placeholder-1",
  category: "cameras",
  clientName: "",
  title: { en: "", da: "" },
  summary: { en: "", da: "" },
  coverImage: "",
  published: false,
  contentStatus: "needs-content"
}
```

Hide unpublished projects automatically.

Filters:

- All;
- Cameras;
- Sensors;
- Consultancy.

Only show filters with published projects.

Project cards:

- category;
- client;
- title;
- summary;
- location;
- image;
- View project link.

Project detail:

1. Hero
2. Client and location
3. Challenge
4. Approach
5. Solution
6. Outcome
7. Technology
8. Gallery
9. Testimonial
10. Related projects
11. Contact CTA

Do not show empty sections.

---

## 42. About and team

Include:

- what Papp does;
- why Papp exists;
- mission;
- approach;
- company story;
- team;
- verified geographic reach;
- verified milestones;
- CTA.

Team cards may include:

- photo;
- name;
- role;
- biography;
- LinkedIn.

Do not generate biographies from titles.

---

## 43. Contact page

Use:

```text
hey@pappmobility.com
```

Fields:

- Name
- Organisation
- Email
- Phone, optional
- Area of interest
- Message
- Privacy acknowledgement if needed

Interest options:

- Parking Sensors
- Camera Analytics
- Papp Insights
- Analysis
- Consultancy
- App
- Other

Do not connect to an invented backend.

Create:

```ts
interface ContactFormService {
  submit(payload: ContactFormPayload): Promise<ContactFormResult>;
}
```

In development:

- validate;
- state that delivery is not configured;
- do not show fake success.

Create:

```text
docs/contact-form-integration.md
```

---

## 44. Footer

Include:

- Papp logo;
- short positioning statement;
- solutions links;
- projects;
- app;
- about;
- contact;
- privacy;
- language switch if appropriate;
- email;
- social icons;
- company details.

Use:

```text
Email: hey@pappmobility.com
CVR: 41545933
© 2026 Papp Denmark ApS
```

Social:

- LinkedIn;
- Facebook.

Verify URLs during crawl.

Privacy labels:

- English: Privacy Policy
- Danish: Privatlivspolitik

Create:

```text
docs/legal-review-needed.md
```

Flag migrated legal content for review.

---

## 45. Card system

Use cards selectively for:

- testimonials;
- service summaries;
- projects;
- process steps;
- selected metrics;
- contact options;
- small benefits.

Card traits:

- white or near-white;
- thin grey border;
- soft blurred shadow;
- medium radius;
- generous padding;
- subtle hover lift;
- no dramatic shadows.

Do not put every section in a card.

---

## 46. Button system

Variants:

- Primary;
- Secondary;
- Text;
- Dark;
- Gradient accent;
- Icon-only.

Primary may use:

- dark charcoal;
- white text;
- subtle gradient detail.

Secondary may use:

- white;
- border;
- dark text.

Use pills selectively.

Buttons need:

- hover;
- focus;
- active;
- disabled;
- adequate touch size;
- optional arrow;
- no layout shift.

---

## 47. Motion

Appropriate:

- subtle section entry;
- image scale on hover;
- arrow movement;
- sticky nav transition;
- hotspot pulse;
- logo loop;
- subtle gradient movement;
- future city animation.

Avoid:

- scroll-jacking;
- excessive parallax;
- cursor-following;
- hidden cursors;
- bouncing;
- long entrances;
- content hidden until JS;
- animations that delay interaction.

Respect reduced motion.

---

## 48. Responsive behaviour

Test at:

```text
375
430
576
768
992
1200
1400
1600
```

### Desktop

- two-column hero;
- full nav;
- alternating sections;
- multi-column project grid;
- moving logo strip;
- hover hotspots.

### Tablet

- preserve two columns where appropriate;
- smaller headings;
- tap interactions;
- simplified layouts;
- no narrow text columns.

### Mobile

- stacked hero;
- text first;
- image/video next;
- product buttons under city;
- no tiny hotspots;
- single-column cards;
- reduced spacing;
- visible language and login;
- no overflow;
- static logo grid under reduced motion.

Do not merely shrink desktop.

---

## 49. Accessibility

Target WCAG 2.2 AA.

Implement:

- semantic landmarks;
- skip link;
- heading hierarchy;
- keyboard navigation;
- visible focus;
- accessible dropdowns;
- accessible mobile menu;
- accessible accordions;
- descriptive links;
- meaningful buttons;
- useful alt text;
- decorative-image handling;
- colour contrast;
- no colour-only meaning;
- reduced motion;
- form labels;
- clear form errors;
- accessible filters;
- no autoplay audio;
- no hover-only critical content.

Do not misuse ARIA tabs for the browser-tab-inspired navigation.

---

## 50. SEO

For every public page:

- unique title;
- meta description;
- canonical;
- Open Graph;
- language alternates;
- social image where available;
- correct indexability.

Create:

- sitemap;
- robots;
- redirects;
- organisation schema;
- breadcrumb schema;
- article schema only for real articles;
- project metadata without unsupported claims.

Preserve Wix SEO value through redirects.

---

## 51. Performance

Requirements:

- server components by default;
- minimal client JS;
- responsive images;
- modern image formats;
- explicit dimensions;
- lazy-load below fold;
- preload only critical assets;
- optimise fonts;
- no Wix scripts;
- no old tracking;
- no 3D framework until needed;
- poster for video;
- lazy future 3D;
- pause offscreen animation;
- avoid CLS;
- do not load project galleries on listing pages.

Create:

```text
docs/performance-strategy.md
```

---

## 52. Future interactive 3D roadmap

Create:

```text
docs/interactive-city-roadmap.md
```

Future system:

- GLB/glTF;
- Blender;
- React Three Fiber;
- Three.js where needed;
- whole city visible first;
- looping car;
- sensors;
- camera;
- Insights layer;
- HTML hotspots;
- hover;
- click-to-zoom;
- keyboard;
- touch;
- return to overview;
- mobile WebM/static fallback;
- reduced motion;
- lazy loading;
- no blocking of H1.

Recommended object names:

```text
City_Base
Road_Main
Parking_Area
Parking_Sensors
Camera_Pole
Camera_Device
Camera_Observation_Zone
Insights_Data_Layer
Insights_Data_Points
Car_Main
Building_Main
```

Recommended animation clips:

```text
Car_Loop
Sensor_Pulse
Camera_Scan
Insights_Data_Flow
```

Document:

- hotspot anchoring;
- object highlighting;
- material states;
- camera transitions;
- compression;
- Meshopt or Draco;
- texture limits;
- draw calls;
- WebGL fallback;
- reduced motion.

Do not install 3D tooling before the model exists.

---

## 53. Analytics and consent

Do not install invasive analytics automatically.

Create:

```text
docs/analytics-and-consent.md
```

Document placeholders for:

- privacy-conscious analytics;
- consent;
- cookie categories;
- error monitoring;
- form analytics.

Do not copy Wix tracking scripts.

---

## 54. Component architecture

Suggested structure:

```text
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
      products/
        sensors/page.tsx
        cameras/page.tsx
        insights/page.tsx
      services/
        analysis/page.tsx
        consultancy/page.tsx
      projects/
        page.tsx
        [slug]/page.tsx
      app/page.tsx
      about/page.tsx
      contact/page.tsx
      privacy/page.tsx

  components/
    layout/
      Header.tsx
      DesktopNavigation.tsx
      MobileNavigation.tsx
      SolutionsDropdown.tsx
      LanguageSwitcher.tsx
      Footer.tsx
      Section.tsx
      Container.tsx

    ui/
      Button.tsx
      Card.tsx
      Icon.tsx
      Eyebrow.tsx
      Tag.tsx
      GradientText.tsx
      SectionHeading.tsx

    hero/
      HomepageHero.tsx
      MobilityCityVisual.tsx
      MobilityHotspot.tsx
      MobilityMobileSelector.tsx

    positioning/
      ProcessSection.tsx
      ProcessStep.tsx

    offerings/
      OfferingFeature.tsx
      OfferingCard.tsx
      OfferingHero.tsx
      OfferingBenefits.tsx
      OfferingUseCases.tsx

    projects/
      ProjectCard.tsx
      ProjectGrid.tsx
      ProjectFilter.tsx
      ProjectHero.tsx
      RelatedProjects.tsx

    social-proof/
      PartnerLogoLoop.tsx
      PartnerLogoGrid.tsx
      TestimonialCard.tsx
      TestimonialsSection.tsx

    editorial/
      FeaturedStory.tsx
      ArticleCard.tsx

    contact/
      ContactSection.tsx
      ContactForm.tsx

    app/
      AppPromotion.tsx
      StoreBadge.tsx

  content/
    global/
    home/
    offerings/
    projects/
    testimonials/
    partners/
    team/
    articles/

  lib/
    content/
    i18n/
    seo/
    contact/
    validation/
    analytics/

  styles/
    globals.scss
    tokens.scss
    bootstrap-overrides.scss
    typography.scss
    utilities.scss
```

Avoid:

- massive page components;
- duplicate language pages;
- hardcoded content arrays;
- unexplained numbers;
- suppressed TypeScript errors;
- unused components;
- unnecessary global state.

---

## 55. Testing

At minimum test:

- English homepage;
- Danish homepage;
- language switch;
- equivalent route preservation;
- keyboard dropdown;
- Escape closing;
- mobile menu;
- body scroll lock;
- project filters;
- hidden unpublished projects;
- accessible hotspot names;
- correct product navigation;
- contact validation;
- Insights login URL;
- footer email;
- no broken internal links;
- no Wix hotlinks;
- no mobile overflow;
- reduced motion;
- metadata presence.

Use existing tools.

If none exist, add a minimal setup using:

- Vitest;
- React Testing Library;
- Playwright.

Do not add redundant systems.

Create:

```text
docs/prelaunch-audit.md
```

Report:

- broken links;
- missing pages;
- duplicate titles;
- missing descriptions;
- missing alt text;
- untranslated content;
- missing assets;
- console errors;
- hydration errors;
- overflow;
- accessibility issues.

---

## 56. Required deliverables

Produce:

1. Working responsive Next.js website.
2. Bootstrap-based layout system.
3. Custom Papp design system.
4. English and Danish routes.
5. Content-driven architecture.
6. Wix audit.
7. Asset inventory.
8. Local asset migration.
9. Redirect plan.
10. Content-gap report.
11. Homepage.
12. Sensors page.
13. Cameras page.
14. Insights page.
15. Analysis page.
16. Consultancy page.
17. Projects overview.
18. Project detail template.
19. App page.
20. About/team page.
21. Contact page.
22. Contact adapter.
23. Privacy draft.
24. Accessible navigation.
25. Browser-tab-inspired header.
26. Footer.
27. SEO.
28. Sitemap.
29. Tests.
30. Performance strategy.
31. Translation report.
32. 3D roadmap.
33. Deployment docs.
34. Owner checklist.
35. Prelaunch audit.

---

## 57. Owner checklist

Create:

```text
docs/owner-content-checklist.md
```

Include:

- Confirm final English homepage headline.
- Confirm final Danish homepage headline.
- Confirm final one-liner.
- Confirm Solutions versus Products.
- Confirm Danish terminology.
- Confirm two camera projects.
- Confirm two sensor projects.
- Confirm two consultancy projects.
- Confirm approved outcomes.
- Confirm approved numbers.
- Confirm testimonials.
- Confirm reusable partner logos.
- Confirm camera privacy copy.
- Confirm camera data-processing copy.
- Confirm photo rights.
- Confirm App Store URL.
- Confirm Google Play URL.
- Confirm team members.
- Confirm team roles.
- Confirm biographies.
- Confirm LinkedIn URL.
- Confirm Facebook URL.
- Confirm booking link.
- Confirm contact-form destination.
- Confirm hosting.
- Confirm deployment.
- Confirm analytics.
- Confirm consent.
- Confirm CMS need.
- Supply final city image.
- Supply mobile WebM.
- Supply future Blender/GLB.
- Confirm article requirement.
- Confirm privacy legal review.
- Confirm `hey@pappmobility.com` is active.

---

## 58. Factual integrity

Do not invent:

- project outcomes;
- percentages;
- quotes;
- partnerships;
- client relationships;
- technical capabilities;
- sensor accuracy;
- camera accuracy;
- hardware specifications;
- legal compliance;
- privacy claims;
- certifications;
- office locations;
- biographies;
- awards;
- press mentions;
- publication dates.

When uncertain:

1. keep as draft;
2. mark clearly;
3. add to checklist;
4. do not publish.

---

## 59. Execution order

1. Inspect repository.
2. Audit Wix.
3. Inventory content and assets.
4. Propose routes and redirects.
5. Identify missing content.
6. Extract colours.
7. Establish Bootstrap and tokens.
8. Establish content and translation system.
9. Scaffold routes.
10. Build header/footer.
11. Build UI components.
12. Build homepage.
13. Build products.
14. Build services.
15. Migrate projects.
16. Build project templates.
17. Build App.
18. Build About.
19. Build Contact.
20. Migrate Privacy.
21. Add SEO.
22. Add tests.
23. Test responsiveness.
24. Test accessibility.
25. Crawl locally.
26. Produce prelaunch audit.
27. Document TODOs.

---

## 60. Review checkpoints

### After audit

Provide:

- current pages;
- proposed routes;
- reusable content;
- rewrite recommendations;
- missing projects;
- missing translations;
- missing assets;
- redirect plan;
- risks.

### After design-system setup

Provide:

- colours;
- gradient;
- typography;
- spacing;
- containers;
- Bootstrap overrides;
- cards;
- buttons;
- header concept.

### After homepage first pass

Provide:

- desktop screenshot;
- tablet screenshot;
- mobile screenshot;
- performance observations;
- accessibility observations;
- placeholders;
- limitations.

---

## 61. Final completion report

At the end provide:

- completed work summary;
- repository structure;
- local setup;
- environment variables;
- production build;
- deployment;
- migrated pages;
- migrated assets;
- redirects;
- tests;
- accessibility;
- performance;
- missing content;
- unverified content;
- legal review;
- remaining decisions;
- limitations;
- 3D replacement roadmap.

The final website must present Papp Mobility as a modern mobility-intelligence company whose sensors, cameras, platform, analysis and consultancy work together as one connected solution.
