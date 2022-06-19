CREATE TABLE "User" (
   "id" uuid NOT NULL PRIMARY KEY,
   "login" varchar NOT NULL UNIQUE,
   "password" varchar NOT NULL,
   "created" timestamp with time zone NOT NULL
);


