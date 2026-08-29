CREATE TYPE "public"."listing_condition" AS ENUM('new_with_tags', 'like_new', 'good', 'fair');--> statement-breakpoint
CREATE TYPE "public"."listing_status" AS ENUM('active', 'reserved', 'sold');--> statement-breakpoint
CREATE TABLE "listing_photos" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"listing_id" uuid NOT NULL,
	"object_key" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listings" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"seller_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"condition" "listing_condition" NOT NULL,
	"price_minor" integer NOT NULL,
	"status" "listing_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "listing_photos" ADD CONSTRAINT "listing_photos_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_seller_id_user_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "listing_photos_listing_idx" ON "listing_photos" USING btree ("listing_id","sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX "listing_photos_object_key_uidx" ON "listing_photos" USING btree ("object_key");--> statement-breakpoint
CREATE INDEX "listings_seller_idx" ON "listings" USING btree ("seller_id");--> statement-breakpoint
CREATE INDEX "listings_feed_idx" ON "listings" USING btree ("status","category","id");