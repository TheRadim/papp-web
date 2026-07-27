# Interactive City Test Implementation

## Summary

The homepage hero now includes the exported Blender test scene as a progressive Three.js experience. Desktop and capable tablet viewports load `/models/papp-city-test.glb`; phones keep the existing static hero image and use normal HTML product controls.

The purpose of this pass is interaction validation, not production visual polish.

## Packages Added

- `three`
- `@react-three/fiber`
- `@react-three/drei`

The project remains a Next.js App Router site using React 19, TypeScript, Sass and npm.

`package.json` also uses targeted npm overrides for `sharp` and `brace-expansion` so `npm audit` stays clean without npm's suggested breaking downgrade path.

## Model Path

- Source asset copied from `/Users/radimtheiner/Papp/Developement/Web.glb`
- Public site path: `public/models/papp-city-test.glb`
- Runtime URL: `/models/papp-city-test.glb`
- File size: approximately 12 KB

## Actual GLB Object Names

The supplied GLB hierarchy was inspected before implementation. The product objects match the preferred names:

- `City_Base`
- `Sensors_Test`
- `Camera_Test`
- `Insights_Test`

The central object-name mapping lives in `src/config/mobility-city.ts`:

```ts
export const CITY_OBJECT_NAMES = {
  base: "City_Base",
  sensors: "Sensors_Test",
  cameras: "Camera_Test",
  insights: "Insights_Test",
} as const;
```

`City_Base` is intentionally not selectable.

## Camera Views

Camera configuration is centralised in `src/config/mobility-city.ts`.

- `overview`: `[3.4, 2.6, 4.6]`, target `[0, 0.45, 0.55]`, fov `34`
- `sensors`: `[1.6, 1.45, 3.35]`, target `[0, 0.15, 1.7]`, fov `28`
- `cameras`: `[1.55, 1.7, 2.6]`, target `[0, 0.95, 1.05]`, fov `27`
- `insights`: `[1.9, 1.7, 1.1]`, target `[0, 0.85, -0.58]`, fov `27`

Normal mode interpolates camera position, target and fov. Reduced-motion mode jumps directly to the selected view.

## Interaction

Visible GLB objects are clickable. No separate invisible 3D anchor objects were added.

- Hover sets the hovered product area and changes cursor.
- Hover highlights the object without moving the camera.
- Click selects the product area and moves the camera.
- Selection keeps the object highlighted.
- `Back to overview` clears selection and restores the overview camera.
- Clicking the empty canvas also returns to overview.

Material changes are applied only to cloned GLB materials so the cached GLTF source is not mutated globally.

## HTML Product Layer

All product names, descriptions, CTA labels and fallback labels live in `src/content/mobility-city/mobility-city.ts`.

The visible product panel is normal HTML. It includes:

- product name;
- short description;
- localized Learn more link;
- Back to overview when a product is selected.

The current site route shape is reused for both locales:

- `/en/products/sensors`
- `/en/products/cameras`
- `/en/products/insights`
- `/da/products/sensors`
- `/da/products/cameras`
- `/da/products/insights`

The task spec mentioned Danish translated product slugs, but the existing app currently generates `/da/products/...`; this implementation follows the current routing architecture.

## Accessibility Fallback

The WebGL meshes are not treated as DOM controls. Equivalent HTML product buttons are always rendered by `MobilityCityControls`.

- Desktop users can click the GLB objects or use the HTML controls.
- Keyboard users can tab to the HTML product buttons and details links.
- Mobile users get static-image fallback plus the same HTML product controls.

## Mobile Fallback

Below the Bootstrap `lg` breakpoint (`992px`), the component does not render the Three.js canvas and does not load the GLB. It displays the existing static hero image and product controls.

This is controlled through a client-side media query and WebGL capability check in `MobilityCityVisual`.

## Reduced Motion

`src/hooks/useReducedMotion.ts` reads `prefers-reduced-motion`.

Reduced-motion behavior:

- camera changes happen immediately;
- repeated scaling is effectively eliminated;
- selection and color highlight remain available;
- CSS reduced-motion rules continue to disable repeated CSS animation.

## Loading And Error Fallback

The hero reserves a stable stage size to prevent layout shift. While the model loads, the static hero image remains visible. If the canvas/model throws, the error boundary sets model status to `error`, keeps the fallback image visible and leaves HTML controls usable.

Development errors are logged with a `[MobilityCity]` prefix.

## Debug Mode

Set:

```text
NEXT_PUBLIC_DEBUG_MOBILITY_CITY=true
```

Development debug mode enables OrbitControls and logs the GLB hierarchy. Debug controls do not appear unless the environment variable is set.

## Known Limitations

- The GLB is a temporary test scene with simple Blender objects.
- Camera coordinates are tuned for this small test export, not a final city model.
- No post-processing, bloom, physics, object outlines or Blender animation playback were added.
- Mobile intentionally uses the static image instead of WebGL.
- The model is not production-optimised or compressed.
- Chrome reports a `THREE.Clock` deprecation warning from the Three/R3F dependency bundle; no runtime error or failed request remains in the final smoke test.

## Replacing The Temporary Model

1. Export the final Blender scene as GLB.
2. Preserve or intentionally update the object names in `src/config/mobility-city.ts`.
3. Replace `public/models/papp-city-test.glb`.
4. Inspect the hierarchy and confirm the selectable product objects still resolve.
5. Retune `CAMERA_VIEWS` against the final object bounds.
6. Keep the HTML controls and fallback image in place for accessibility and mobile.
7. Consider Meshopt or Draco compression only when the final asset size warrants it.
