import { defineConfig } from "drizzle-kit";
import { loadDbConfig } from "./src/config/db.ts";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schema.ts",
	out: "./drizzle",
	dbCredentials: { url: loadDbConfig().url },
});
