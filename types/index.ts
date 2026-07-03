export interface Customer {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  lat: number;
  lng: number;
}

export interface Driver {
  id: string;
  created_at: string;
  user_id: string;
  shift_status: "on" | "off";
  shift_started_at: string | null;
  current_lat: number | null;
  current_lng: number | null;
  last_location_update: string | null;
}

export interface Order {
  id: string;
  created_at: string;
  customer_id: string;
  driver_id: string | null;
  dispatcher_id: string;
  pickup_lat: number;
  pickup_lng: number;
  status:
    | "pending"
    | "assigned"
    | "picked_up"
    | "in_transit"
    | "delivered"
    | "failed";
  delivered_at: string | null;
}
