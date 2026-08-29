import { serve } from "@hono/node-server";
import { createApp } from "./app.ts";
import { createAuth } from "./auth/index.ts";
import { loadAuthConfig } from "./config/auth.ts";
import { loadDbConfig } from "./config/db.ts";
import { createDb } from "./db/index.ts";

const auth = createAuth(createDb(loadDbConfig()), loadAuthConfig());
const app = createApp(auth);

serve({
	fetch: app.fetch,
	port: 3000,
}, (info) => {
	console.log(`Server is running on http://localhost:${info.port}`);
});
