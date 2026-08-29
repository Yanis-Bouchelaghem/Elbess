import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";
import type { Auth } from "./auth/index.ts";

// for hc<AppType>
export function createApp(auth: Auth) {
	return new Hono()
		.get("/", (c) => c.text("Hello Hono!"))
		.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))
		.get("/docs", swaggerUI({ url: "/api/auth/open-api/generate-schema" }));
}

export type AppType = ReturnType<typeof createApp>;
