"use client";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

const paragraphStyle = {
  fontFamily: "Open Sans",
  margin: 0,
  fontSize: 13,
};

const MapBox = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [roundedArea, setRoundedArea] = useState<any>();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidGluYXJjIiwiYSI6ImNtMGN1bDFpZjA1eWEycnI0ZmxybTlkbjcifQ.5s1B_kde390phpT0ADmIsQ";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/tinarc/cm0cv31k4000101pk1vlz62zt",
      center: [-91.874, 42.76],
      zoom: 12,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });
    mapRef.current.addControl(draw);

    mapRef.current.on("draw.create", updateArea);
    mapRef.current.on("draw.delete", updateArea);
    mapRef.current.on("draw.update", updateArea);
    mapRef.current.on("load", () => {
      mapRef.current!.addSource("tinarcten", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [5.7582100855722445, 58.974307358108945],
                    [5.77272316746064, 58.95912530000956],
                    [5.714369100971368, 58.95340323055012],
                    [5.704942024903801, 58.97252479931396],
                    [5.7582100855722445, 58.974307358108945],
                  ],
                ],
              },
            },
          ],
        },
      });
    });

    function updateArea(e: any) {
      console.log(e, "event");
      const data = draw.getAll();
      if (data.features.length > 0) {
        const area = turf.area(data);

        setRoundedArea(Math.round(area * 100) / 100);
        console.log(area, "roundedArea");
      } else {
        setRoundedArea(null);
        if (e.type !== "draw.delete") alert("Click the map to draw a polygon.");
        console.log(roundedArea, "roundedArea");
      }
    }

    return () => {
      mapRef.current!.remove();
    };
  }, []);

  return (
    <>
      <div ref={mapContainerRef} id="map" className="h-screen"></div>
      <div
        className="calculation-box h-screen"
        style={{
          height: 75,
          width: 150,
          position: "absolute",
          bottom: 40,
          left: 10,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: 15,
          textAlign: "center",
        }}
      >
        <p style={paragraphStyle}>Click the map to draw a polygon.</p>
        <div id="calculated-area">
          {roundedArea && (
            <>
              <p style={paragraphStyle}>
                <strong>{roundedArea}</strong>
              </p>
              <p style={paragraphStyle}>square meters</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MapBox;
