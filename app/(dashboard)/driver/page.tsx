import { auth } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import DriverMap from "@/components/map/DriverMapWrapper";
import { getDriverOrders } from "@/lib/actions/orders";
import { routePlanner } from "@/utils/routePlanner";
import { StopPoint } from "@/types";
import DeliveryList from "@/components/drivers/DeliveryList";

const DriverPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  const supabase = await createClient();
  if (!session || session.user.role !== "driver") {
    redirect("/login");
  }
  const { data: drivers } = await supabase
    .from("drivers")
    .select("id, current_lat, current_lng")
    .eq("user_id", session?.user.id)
    .single();

  if (!drivers) return <p>Driver not found.</p>;

  const orders = await getDriverOrders(drivers.id);
  if (!drivers?.current_lat || !drivers?.current_lng) {
    return <p>Location not available</p>;
  }

  const stops: StopPoint[] = orders.map((order) => ({
    id: order.id,
    pickup: { lat: order.pickup_lat, lng: order.pickup_lng },
    customer: order.customers
      ? {
          lat: order.customers.lat,
          lng: order.customers.lng,
          name: order.customers.name,
        }
      : null,
  }));

  const orderedStops = routePlanner(
    stops,
    drivers.current_lat,
    drivers.current_lng
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full">
      <div className="flex-1">
        <DriverMap
          orders={orderedStops}
          current_lat={drivers.current_lat}
          current_lng={drivers.current_lng}
        />
      </div>
      <div className="w-80 overflow-y-auto border-l">
        <DeliveryList stops={orderedStops} />
      </div>
    </div>
  );
};

export default DriverPage;
