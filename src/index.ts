import { serve } from "@hono/node-server";
import app from "./app.js";
import { envConfig } from "./env.js";

serve(
  {
    fetch: app.fetch,
    port: envConfig.PORT || 3000,
  },
  (info) => {
    console.log(`Server is running on port ${info.port}`);
  }
);
