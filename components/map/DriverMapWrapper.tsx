"use client";
import dynamic from "next/dynamic";

const DriverMap = dynamic(() => import("@/components/map/DriverMap"), {
  ssr: false,
  loading: () => <div className="bg-muted h-full w-full animate-pulse" />,
});

export default DriverMap;
