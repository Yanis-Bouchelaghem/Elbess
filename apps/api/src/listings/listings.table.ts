import { relations, sql } from "drizzle-orm";
import { index, integer, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
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

export const listingPhotos = pgTable(
	"listing_photos",
	{
		id: uuid("id").primaryKey().default(sql`uuidv7()`),
		listingId: uuid("listing_id").notNull().references(() => listings.id, { onDelete: "cascade" }),
		// Storage key only ("listings/<id>/<uuid>.jpg"). The public URL is built at
		// read time so the bucket or CDN domain can change without a data migration.
		objectKey: text("object_key").notNull(),
		sortOrder: integer("sort_order").notNull().default(0),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => [
		index("listing_photos_listing_idx").on(table.listingId, table.sortOrder),
		uniqueIndex("listing_photos_object_key_uidx").on(table.objectKey),
	],
);

export const listingsRelations = relations(listings, ({ one, many }) => ({
	seller: one(user, { fields: [listings.sellerId], references: [user.id] }),
	photos: many(listingPhotos),
}));

export const listingPhotosRelations = relations(listingPhotos, ({ one }) => ({
	listing: one(listings, { fields: [listingPhotos.listingId], references: [listings.id] }),
}));

export type Listing = typeof listings.$inferSelect;
export type NewListing = typeof listings.$inferInsert;
export type ListingPhoto = typeof listingPhotos.$inferSelect;
