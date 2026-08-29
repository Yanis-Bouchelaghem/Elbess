import { sql } from "drizzle-orm";
import { index, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../db/schema.ts";

export const listingStatus = pgEnum("listing_status", ["active", "reserved", "sold"]);
export const listingCondition = pgEnum("listing_condition", ["new", "like_new", "good", "fair"]);

export const listings = pgTable(
	"listings",
	{
		// uuidv7() is native in Postgres 18 and sorts by creation time,
		// which is what makes cursor pagination on the feed cheap.
		id: uuid("id").primaryKey().default(sql`uuidv7()`),
		sellerId: text("seller_id").notNull().references(() => user.id, { onDelete: "cascade" }),
		title: text("title").notNull(),
		description: text("description").notNull(),
		category: text("category").notNull(),
		condition: listingCondition("condition").notNull(),
		priceCents: integer("price_cents").notNull(),
		city: text("city"),
		status: listingStatus("status").notNull().default("active"),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().$onUpdate(() => new Date()).notNull(),
		deletedAt: timestamp("deleted_at", { withTimezone: true }),
	},
	(table) => [
		index("listings_seller_idx").on(table.sellerId),
		index("listings_feed_idx").on(table.status, table.category, table.id),
	],
);

export type Listing = typeof listings.$inferSelect;
export type NewListing = typeof listings.$inferInsert;
