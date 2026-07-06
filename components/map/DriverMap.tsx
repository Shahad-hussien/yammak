"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DriverOrder } from "@/types";

interface DriverMapProps {
  orders: DriverOrder[];
  current_lat: number;
  current_lng: number;
}
const DriverMap = ({ orders, current_lat, current_lng }: DriverMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current).setView(
      [current_lat, current_lng],
      13
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapRef.current);

    const DefaultIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    L.marker([current_lat, current_lng]).addTo(mapRef.current);

    orders.forEach((order) => {
      L.marker([order.pickup_lat, order.pickup_lng]).addTo(mapRef.current!);
      if (
        order.customers?.lat !== undefined ||
        order.customers?.lng !== undefined
      ) {
        L.marker([order.customers?.lat, order.customers?.lng]).addTo(
          mapRef.current!
        );
      } else {
        console.log("Customers undefined");
      }
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);
  return <div ref={containerRef} className="h-full w-full" />;
};

export default DriverMap;
