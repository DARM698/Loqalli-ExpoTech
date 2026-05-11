"use client";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// Solución para los iconos de Leaflet que a veces no cargan en Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function Updater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 14);
  }, [center, map]);
  return null;
}

export default function Map({ lat, lng }: { lat: number; lng: number }) {
  return (
    <MapContainer 
      center={[lat, lng]} 
      zoom={14} 
      className="h-full w-full z-0" // z-0 para que no tape los dropdowns de Tailwind
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; CARTO'
      />
      <Marker position={[lat, lng]} icon={icon} />
      <Updater center={[lat, lng]} />
    </MapContainer>
  );
}