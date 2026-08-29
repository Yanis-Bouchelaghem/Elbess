import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import type { AuthConfig } from "../config/auth.ts";
import type { Db } from "../db/index.ts";

export function createAuth(db: Db, config: AuthConfig) {
	return betterAuth({
		secret: config.secret,
		baseURL: config.baseUrl,
		database: drizzleAdapter(db, { provider: "pg" }),
		emailAndPassword: { enabled: true },
		plugins: [openAPI()],
	});
}

export type Auth = ReturnType<typeof createAuth>;
