import { StopPoint } from "@/types";
import { haversineDistance } from "./distance";

export function routePlanner(
  stops: StopPoint[],
  driverLat: number,
  driverLng: number
): StopPoint[] {
  return [...stops].sort((a, b) => {
    const distA = haversineDistance(
      driverLat,
      driverLng,
      a.pickup.lat,
      a.pickup.lng
    );
    const distB = haversineDistance(
      driverLat,
      driverLng,
      b.pickup.lat,
      b.pickup.lng
    );
    return distA - distB;
  });
}
