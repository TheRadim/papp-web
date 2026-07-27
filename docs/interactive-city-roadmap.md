# Interactive City Roadmap

## Current Prototype

- `/models/papp-city-test.glb` is wired into the homepage hero as a desktop/tablet Three.js experience.
- The current GLB contains temporary Blender objects:
  - `City_Base`
  - `Sensors_Test`
  - `Camera_Test`
  - `Insights_Test`
- Product objects can be hovered and clicked.
- Click selection moves the camera, shows an HTML product panel and exposes a normal Learn more link.
- Mobile uses the static image and HTML controls instead of WebGL.
- Implementation details are documented in `docs/interactive-city-test-implementation.md`.

## Future Asset

- Build a GLB/glTF miniature city in Blender.
- Preserve a whole-city overview as the first state.
- Keep HTML hotspots for accessibility.

## Recommended Object Names

- `City_Base`
- `Road_Main`
- `Parking_Area`
- `Parking_Sensors`
- `Camera_Pole`
- `Camera_Device`
- `Camera_Observation_Zone`
- `Insights_Data_Layer`
- `Insights_Data_Points`
- `Car_Main`
- `Building_Main`

## Recommended Animation Clips

- `Car_Loop`
- `Sensor_Pulse`
- `Camera_Scan`
- `Insights_Data_Flow`

## Interaction

- Hover highlights Sensors, Cameras or Insights.
- Click zooms to a product area.
- Insights pulls back to an overview data layer.
- Keyboard controls mirror pointer behaviour.
- Touch uses mobile buttons instead of tiny hotspots.
- Reduced-motion users receive static image or poster.

## Technical Notes

- Three.js, React Three Fiber and Drei are now installed for the test scene.
- Use Meshopt or Draco compression as appropriate.
- Limit texture sizes and draw calls.
- Lazy-load the 3D scene after the H1 and core content render.

## Final Model Replacement

When the simple test scene is replaced with the final city model:

- keep one stable product object or group for sensors, cameras and insights;
- update `CITY_OBJECT_NAMES` only if Blender names intentionally change;
- retune `CAMERA_VIEWS` for the final object bounds;
- keep visible objects themselves clickable rather than adding separate invisible anchors unless the final geometry requires grouping support;
- preserve the static-image mobile fallback and HTML controls;
- add animation clips such as `Car_Loop`, `Sensor_Pulse`, `Camera_Scan` and `Insights_Data_Flow` only after the core selection interaction remains stable.
