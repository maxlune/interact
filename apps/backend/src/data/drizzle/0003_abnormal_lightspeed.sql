CREATE TYPE "roles" AS ENUM('admin', 'actor', 'spectator');

ALTER TABLE "users" ADD COLUMN "role" "roles" DEFAULT 'spectator' NOT NULL;