CREATE TABLE "Channel" (
   "id" uuid NOT NULL,
   "name" varchar NOT NULL,
   "description" varchar,
   "workspace" uuid NOT NULL,
   "profile" uuid NOT NULL
);

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
   "created" datatime NOT NULL
);

CREATE TABLE "Workspace" (
   "id" uuid NOT NULL PRIMARY KEY,
   "name" varchar NOT NULL,
   "description" varchar,
   "profile" uuid NOT NULL
);

ALTER TABLE "Channel" ADD CONSTRAINT "fkWorkspace" FOREIGN KEY ("workspace") REFERENCES "Workspace" ("id");
ALTER TABLE "Channel" ADD CONSTRAINT "fkProfile" FOREIGN KEY ("profile") REFERENCES "Profile" ("id");

ALTER TABLE "Profile" ADD CONSTRAINT "fkUser" FOREIGN KEY ("user") REFERENCES "User" ("id");

ALTER TABLE "Workspace" ADD CONSTRAINT "fkProfile" FOREIGN KEY ("profile") REFERENCES "Profile" ("id");
