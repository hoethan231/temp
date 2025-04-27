import mapboxgl from "mapbox-gl";

// Safely set the custom worker class ONLY on client side
if (typeof window !== "undefined") {
  (mapboxgl as any).workerClass = require("mapbox-gl/dist/mapbox-gl-csp-worker").default;
}

export default mapboxgl;
