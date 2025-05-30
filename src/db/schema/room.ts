import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./auth";

export const room = sqliteTable("room", {
  id: integer().primaryKey(),
  owner: text()
    .notNull()
    .references(() => users.id),
  name: text().notNull(),
  link: text().notNull().unique(),
  description: text().notNull()
});

export const userHasRoom = sqliteTable("user_has_room", {
  user_id: text()
    .notNull()
    .references(() => users.id),
  room_id: integer()
    .notNull()
    .references(() => room.id),
  invitation_state: integer({ mode: "boolean" }).notNull().default(false)
});

export const roomsRelations = relations(room, ({ many }) => ({
  roomUsers: many(userHasRoom)
}));

export const userHasRoomRelations = relations(userHasRoom, ({ one }) => ({
  user: one(users, {
    fields: [userHasRoom.user_id],
    references: [users.id]
  }),
  room: one(room, {
    fields: [userHasRoom.room_id],
    references: [room.id]
  })
}));
