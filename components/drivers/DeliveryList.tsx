import { StopPoint } from "@/types";

// Note: If you have an icon library like Lucide-React, you can replace these emojis
// with components like <MapPin />, <Package />, etc.

const DeliveryList = ({ stops }: { stops: StopPoint[] }) => {
  return (
    <div className="mx-auto my-6 max-w-md space-y-4 rounded-xl bg-gray-50 p-4 shadow-sm">
      <h2 className="mb-2 px-1 text-lg font-bold text-gray-800">
        Delivery Stops
      </h2>

      {stops.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-500">
          No stops scheduled.
        </p>
      ) : (
        stops.map((stopPoint) => (
          <div
            key={stopPoint.id}
            className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            {/* Stop Header / ID */}
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold tracking-wider text-indigo-600 uppercase">
                Stop #{stopPoint.id.toString().slice(-4)}{" "}
                {/* Snipping ID for clean display if it's a long UUID */}
              </span>
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            </div>

            {/* Stop Details */}
            <div className="space-y-2 text-sm text-gray-600">
              {/* Pickup Section */}
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 text-base" aria-hidden="true">
                  📦
                </span>
                <div>
                  <p className="text-xs font-medium tracking-tight text-gray-400 uppercase">
                    Pickup From
                  </p>
                  <p className="font-semibold text-gray-800">
                    {stopPoint.customer?.name || "Unknown Merchant"}
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="my-0.5 ml-2.5 h-3 w-0.5 bg-gray-200" />

              {/* Delivery Section */}
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 text-base" aria-hidden="true">
                  📍
                </span>
                <div>
                  <p className="text-xs font-medium tracking-tight text-gray-400 uppercase">
                    Deliver To
                  </p>
                  <p className="font-semibold text-gray-800">
                    {stopPoint.customer?.name || "Unknown Customer"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DeliveryList;
