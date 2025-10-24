import {timestamp, pgTable, varchar, uuid, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),

  firstname: varchar("first_name",{ length: 55 }).notNull(),
  lastname: varchar("last_name",{ length: 55 }),

  email: varchar({ length: 255 }).notNull().unique(),

  password: text().notNull(),
  salt: text().notNull(),


  createdAT: timestamp("created_at").notNull().defaultNow(),
  updatedAT: timestamp("updated_at").$onUpdate(() => new Date()),
});
