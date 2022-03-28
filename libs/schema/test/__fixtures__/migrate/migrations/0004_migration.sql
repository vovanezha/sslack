CREATE TABLE "new__User" (
   "id" uuid NOT NULL PRIMARY KEY,
   "login" varchar NOT NULL UNIQUE,
   "password" varchar NOT NULL,
   "first_name" varchar NOT NULL,
   "last_name" varchar NOT NULL,
   "created" timestamp with time zone NOT NULL
);




INSERT INTO "new__User" ("id", "login", "password", "created") SELECT "id", "login", "password", "created" FROM "User";
DROP TABLE "User" CASCADE;
ALTER TABLE "new__User" RENAME TO "User";
