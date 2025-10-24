import type { AppRouteHandler } from "@/schema/route-handler.js";
import type { GetMacAddressRoute } from "./index.js";
import macAddress from "macaddress";
export const getMacAddressHandler: AppRouteHandler<GetMacAddressRoute> = async (
  c
) => {
  const mac_address = await macAddress.one();

  console.log("Mac Address: ", mac_address);

  return c.json({ mac_address }, 200);
};
