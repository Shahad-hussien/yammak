import { auth } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import DriverMap from "@/components/map/DriverMapWrapper";
const DriverPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  const supabase = await createClient();
  if (!session || session.user.role !== "driver") {
    redirect("/login");
  }
  const { data: drivers } = await supabase
    .from("drivers")
    .select("current_lat, current_lng")
    .eq("user_id", session?.user.id)
    .single();

  if (!drivers) return <p>Driver not found.</p>;

  if (!drivers?.current_lat || !drivers?.current_lng) {
    return <p>Location not available</p>;
  }
  return (
    <div className="h-[calc(100vh-4rem)] w-full">
      <DriverMap
        current_lat={drivers.current_lat}
        current_lng={drivers.current_lng}
      />
    </div>
  );
};

export default DriverPage;
