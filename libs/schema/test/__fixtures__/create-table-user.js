module.exports = `CREATE TABLE "User" (
   "name" varchar NOT NULL UNIQUE,
   "password" varchar NOT NULL,
   "created" timestamp with time zone NOT NULL,
   "id" uuid NOT NULL PRIMARY KEY,
   "active" boolean,
   "age" integer NOT NULL DEFAULT 12,
   "city" NOT NULL
);`
