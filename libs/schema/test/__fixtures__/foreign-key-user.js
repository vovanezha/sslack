module.exports = `ALTER TABLE "User" ADD CONSTRAINT "fkGroup" FOREIGN KEY ("group") REFERENCES "Group" ("id");
ALTER TABLE "User" ADD CONSTRAINT "fkChat" FOREIGN KEY ("chat") REFERENCES "Chat" ("token");
ALTER TABLE "User" ADD CONSTRAINT "profile_id" FOREIGN KEY ("profile") REFERENCES "Profile" ("id");`
