ALTER TABLE "listings" ADD COLUMN "reserved_by" text;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_reserved_by_user_id_fk" FOREIGN KEY ("reserved_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "listings_reserved_by_idx" ON "listings" USING btree ("reserved_by") WHERE "listings"."reserved_by" is not null;