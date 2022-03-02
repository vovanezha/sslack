module.exports = `CREATE TABLE "Profile" (
   "id" uuid NOT NULL PRIMARY KEY,
   "name" varchar NOT NULL,
   "surname" varchar NOT NULL,
   "avatar" varchar NOT NULL,
   "user" NOT NULL
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

ALTER TABLE "Profile" ADD CONSTRAINT "fkUser" FOREIGN KEY ("user") REFERENCES "User" ("id");

ALTER TABLE "WorkspaceProfile" ADD CONSTRAINT "fkProfileId" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id");
ALTER TABLE "WorkspaceProfile" ADD CONSTRAINT "fkWorkspaceId" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id");`
