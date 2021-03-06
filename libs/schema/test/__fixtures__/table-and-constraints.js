module.exports = `CREATE TABLE "Channel" (
   "id" uuid NOT NULL PRIMARY KEY,
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
   "user" serial NOT NULL
);

CREATE TABLE "User" (
   "id" serial NOT NULL PRIMARY KEY,
   "login" varchar NOT NULL UNIQUE,
   "password" varchar NOT NULL,
   "created" timestamp with time zone NOT NULL
);

CREATE TABLE "Workspace" (
   "id" uuid NOT NULL PRIMARY KEY,
   "name" varchar NOT NULL,
   "description" varchar
);

CREATE TABLE "WorkspaceProfile" (
   "profileId" uuid NOT NULL,
   "workspaceId" uuid NOT NULL
);

ALTER TABLE "Channel" ADD CONSTRAINT "fkWorkspace" FOREIGN KEY ("workspace") REFERENCES "Workspace" ("id");
ALTER TABLE "Channel" ADD CONSTRAINT "fkProfile" FOREIGN KEY ("profile") REFERENCES "Profile" ("id");

ALTER TABLE "Profile" ADD CONSTRAINT "fkUser" FOREIGN KEY ("user") REFERENCES "User" ("id");

ALTER TABLE "WorkspaceProfile" ADD CONSTRAINT "fkProfileId" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id");
ALTER TABLE "WorkspaceProfile" ADD CONSTRAINT "fkWorkspaceId" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id");`
