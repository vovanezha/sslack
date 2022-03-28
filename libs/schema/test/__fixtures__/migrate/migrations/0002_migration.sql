CREATE TABLE "new__Channel" (
   "id" uuid NOT NULL,
   "name" varchar NOT NULL,
   "workspace_2" uuid NOT NULL,
   "workspace" uuid NOT NULL,
   "profile" uuid NOT NULL
);

CREATE TABLE "Chat" (
   "id" uuid NOT NULL PRIMARY KEY,
   "messages" varchar NOT NULL
);

CREATE TABLE "new__Workspace" (
   "workspaceId" uuid NOT NULL PRIMARY KEY,
   "name" varchar NOT NULL,
   "description" varchar,
   "profile" uuid NOT NULL
);

ALTER TABLE "new__Channel" ADD CONSTRAINT "fkWorkspace_2" FOREIGN KEY ("workspace_2") REFERENCES "new__Workspace" ("workspaceId");
ALTER TABLE "new__Channel" ADD CONSTRAINT "fkWorkspace" FOREIGN KEY ("workspace") REFERENCES "new__Workspace" ("workspaceId");
ALTER TABLE "new__Channel" ADD CONSTRAINT "fkProfile" FOREIGN KEY ("profile") REFERENCES "Profile" ("id");

ALTER TABLE "new__Workspace" ADD CONSTRAINT "fkProfile" FOREIGN KEY ("profile") REFERENCES "Profile" ("id");


INSERT INTO "new__Channel" ("id", "name", "workspace", "profile") SELECT "id", "name", "workspace", "profile" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new__Channel" RENAME TO "Channel";

INSERT INTO "new__Workspace" ("name", "description", "profile") SELECT "name", "description", "profile" FROM "Workspace";
DROP TABLE "Workspace";
ALTER TABLE "new__Workspace" RENAME TO "Workspace";
