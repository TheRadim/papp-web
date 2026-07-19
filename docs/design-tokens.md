# Design Tokens

Colour values were selected after inspecting the supplied round Papp logo and matching the visible blue/coral/pink gradient direction.

```css
:root {
  --papp-blue-deep: #055f8e;
  --papp-blue: #1183ba;
  --papp-blue-light: #35a7d7;
  --papp-coral: #fb867f;
  --papp-orange: #f7a074;
  --papp-pink: #fb6d88;
  --papp-gradient-primary: linear-gradient(120deg, var(--papp-blue-deep), var(--papp-blue-light), var(--papp-coral), var(--papp-pink));
  --surface-primary: #ffffff;
  --surface-secondary: #f7f5f2;
  --surface-tertiary: #eef5f8;
  --text-primary: #172126;
  --text-secondary: #46565e;
  --text-muted: #708088;
  --border-subtle: rgba(23, 33, 38, 0.12);
  --shadow-soft: 0 18px 50px rgba(20, 31, 37, 0.08);
  --shadow-card: 0 16px 38px rgba(20, 31, 37, 0.1);
  --radius-small: 6px;
  --radius-medium: 8px;
  --radius-large: 18px;
}
```

Use the gradient for active details, hotspots and selected CTA accents. Avoid full-page gradient backgrounds.
