CREATE TABLE "new__User" (
   "id" uuid NOT NULL PRIMARY KEY,
   "email" varchar NOT NULL UNIQUE,
   "password" varchar NOT NULL,
   "created" timestamp with time zone NOT NULL
);




INSERT INTO "new__User" ("id", "password", "created") SELECT "id", "password", "created" FROM "User";
DROP TABLE "User";
ALTER TABLE "new__User" RENAME TO "User";