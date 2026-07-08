"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { StopPoint } from "@/types";

interface DriverMapProps {
  orders: StopPoint[];
  current_lat: number;
  current_lng: number;
}
const shopIcon = L.divIcon({
  html: "🏪",
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const personIcon = L.divIcon({
  html: "👤",
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});
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
      L.marker([order.pickup.lat, order.pickup.lng], { icon: shopIcon })
        .bindPopup(`Pickup order: ${order.customer?.name} `)
        .addTo(mapRef.current!);
      if (
        order.customer?.lat !== undefined &&
        order.customer?.lng !== undefined
      ) {
        L.marker([order.customer.lat, order.customer.lng], {
          icon: personIcon,
        })
          .bindPopup(`Customer: ${order.customer.name}`)
          .addTo(mapRef.current!);

        const firstStop = orders[0];
        if (firstStop) {
          L.polyline([
            [current_lat, current_lng],
            [firstStop.pickup.lat, firstStop.pickup.lng],
          ]).addTo(mapRef.current!);
        }
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
