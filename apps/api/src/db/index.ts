import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import type { DbConfig } from "../config/db.ts";

export function createDb(config: DbConfig) {
	return drizzle(new Pool({ connectionString: config.url }));
}

export type Db = ReturnType<typeof createDb>;
