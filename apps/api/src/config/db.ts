import { z } from "zod";
import { parseConfig } from "./parse.ts";

const schema = z.object({
	DATABASE_URL: z.url(),
});

export type DbConfig = { url: string };

export function loadDbConfig(source: NodeJS.ProcessEnv = process.env): DbConfig {
	const { DATABASE_URL } = parseConfig("database", schema, source);
	return { url: DATABASE_URL };
}
