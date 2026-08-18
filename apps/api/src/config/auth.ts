import { z } from "zod";
import { parseConfig } from "./parse.ts";

const schema = z.object({
	BETTER_AUTH_SECRET: z.string().min(32),
	BETTER_AUTH_URL: z.url(),
});

export type AuthConfig = { secret: string; baseUrl: string };

export function loadAuthConfig(source: NodeJS.ProcessEnv = process.env): AuthConfig {
	const { BETTER_AUTH_SECRET, BETTER_AUTH_URL } = parseConfig("auth", schema, source);
	return { secret: BETTER_AUTH_SECRET, baseUrl: BETTER_AUTH_URL };
}
