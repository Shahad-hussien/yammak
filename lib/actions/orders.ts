import { DriverOrder } from "@/types";
import { createClient } from "@/utils/supabase/server";

export async function getDriverOrders(driverId: string) {
  const supabase = await createClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, status, pickup_lat, pickup_lng, customers(lat, lng, name)")
    .eq("driver_id", driverId)
    .in("status", ["assigned", "picked_up", "in_transit"]);

  if (error) {
    return [];
  }

  return orders.map((order) => ({
    ...order,
    customers: Array.isArray(order.customers)
      ? (order.customers[0] ?? null)
      : order.customers,
  })) as DriverOrder[];
}
