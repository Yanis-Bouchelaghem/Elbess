import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import type { DbConfig } from "../config/db.ts";
import * as listingSchema from "../listings/listings.table.ts";
import * as authSchema from "./schema.ts";

const schema = { ...authSchema, ...listingSchema };

export function createDb(config: DbConfig) {
	return drizzle(new Pool({ connectionString: config.url }), { schema });
}

export type Db = ReturnType<typeof createDb>;
