import { serverHelpers } from "@/lib/trpc/serverHelper";
import { Smartphone } from "lucide-react";
import Link from "next/link";
import React from "react";
import DeviceSlider from "./DeviceSlider";

export default async function DevicesList() {
  const devices = await serverHelpers.catalog.getDevices.fetch();
  return (
    <div>
      <DeviceSlider devices={devices}/>
    </div>
  );
}
