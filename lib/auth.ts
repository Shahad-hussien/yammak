import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, admin, dispatcher, driver } from "@/lib/permissions";
export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "driver",
      },
    },
  },
  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin,
        dispatcher,
        driver,
      },
    }),
  ],
});
