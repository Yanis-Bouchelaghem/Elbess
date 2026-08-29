import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createAuth } from "./auth/index.ts";
import { loadAuthConfig } from "./config/auth.ts";
import { loadDbConfig } from "./config/db.ts";
import { createDb } from "./db/index.ts";

const auth = createAuth(createDb(loadDbConfig()), loadAuthConfig());

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

serve({
	fetch: app.fetch,
	port: 3000,
}, (info) => {
	console.log(`Server is running on http://localhost:${info.port}`);
});
