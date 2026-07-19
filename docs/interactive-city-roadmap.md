# Interactive City Roadmap

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

- Add Three.js or React Three Fiber only after the model exists.
- Use Meshopt or Draco compression as appropriate.
- Limit texture sizes and draw calls.
- Lazy-load the 3D scene after the H1 and core content render.
