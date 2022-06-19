CREATE TABLE "Profile" (
   "id" uuid NOT NULL PRIMARY KEY,
   "name" varchar NOT NULL,
   "surname" varchar NOT NULL,
   "avatar" varchar NOT NULL,
   "user" uuid NOT NULL
);

CREATE TABLE "User" (
   "id" uuid NOT NULL PRIMARY KEY,
   "login" varchar NOT NULL UNIQUE,
   "password" varchar NOT NULL,
   "first_name" varchar NOT NULL,
   "created" timestamp with time zone NOT NULL
);

CREATE TABLE "Workspace" (
   "workspaceId" uuid NOT NULL PRIMARY KEY,
   "name" varchar NOT NULL,
   "description" varchar,
   "profile" uuid NOT NULL
);

ALTER TABLE "Profile" ADD CONSTRAINT "fkUser" FOREIGN KEY ("user") REFERENCES "User" ("id");

ALTER TABLE "Workspace" ADD CONSTRAINT "fkProfile" FOREIGN KEY ("profile") REFERENCES "Profile" ("id");
