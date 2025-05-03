import { relations, sql } from "drizzle-orm";
import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./auth";
import { room } from "./room";

const periodEnum = ["DAILY, WEEKLY, MONTHLY, YEARLY"] as const;

export const roomActivity = sqliteTable(
  "room_activity",
  {
    id: integer().primaryKey(),
    fk_room: integer().references(() => room.id),
    fk_task: integer().references(() => task.id),
    fk_event: integer().references(() => event.id),
    fk_settle_up: integer().references(() => settleUp.id),
    name: text().notNull(),
    description: text()
  },
  (table) => [
    check(
      "activity_check",
      sql`
      (CASE WHEN ${table.fk_event} IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN ${table.fk_task} IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN ${table.fk_settle_up} IS NOT NULL THEN 1 ELSE 0 END)= 1`
    )
  ]
);

export const task = sqliteTable("task", {
  id: integer().primaryKey(),
  priority: integer().default(0),
  repeatable_type: text({ enum: periodEnum }),
  repeatable_value: integer()
});

export const subtask = sqliteTable("subtask", {
  id: integer().primaryKey(),
  fk_task: integer().references(() => task.id),
  is_done: integer({ mode: "boolean" }).default(false)
});

export const taskRelations = relations(task, ({ many }) => ({
  subtasks: many(subtask)
}));

export const subtaskRelations = relations(subtask, ({ one }) => ({
  task: one(task, {
    fields: [subtask.id],
    references: [task.id]
  })
}));

export const event = sqliteTable("event", {
  id: integer().primaryKey(),
  date: integer({ mode: "timestamp" }),
  repeatable_type: text({ enum: periodEnum }),
  repeatable_value: integer()
});

export const settleUp = sqliteTable("settle_up", {
  id: integer().primaryKey(),
  money: integer().notNull()
});

export const userSettledUp = sqliteTable("user_settled_up", {
  fk_user: integer().references(() => users.id),
  fk_settle_up: integer().references(() => settleUp.id)
});

export const settledUpRelations = relations(settleUp, ({ many }) => ({
  usersSettledUp: many(userSettledUp)
}));

export const userSettledUpRelations = relations(userSettledUp, ({ one }) => ({
  settle_up: one(settleUp, {
    fields: [userSettledUp.fk_settle_up],
    references: [settleUp.id]
  }),
  user: one(users, {
    fields: [userSettledUp.fk_user],
    references: [users.id]
  })
}));

export const userHasActivity = sqliteTable("activity_has_user", {
  fk_user_id: integer().references(() => users.id),
  fk_activity_id: integer().references(() => roomActivity.id)
});

export const roomActivityRelations = relations(roomActivity, ({ one, many }) => ({
  task: one(task, {
    fields: [roomActivity.id],
    references: [task.id]
  }),
  settle_up: one(settleUp, {
    fields: [roomActivity.id],
    references: [settleUp.id]
  }),
  event: one(event, {
    fields: [roomActivity.id],
    references: [event.id]
  }),
  usersHasActivity: many(userHasActivity)
}));

export const userHasActivityRelations = relations(userHasActivity, ({ one }) => ({
  room_activity: one(roomActivity, {
    fields: [userHasActivity.fk_activity_id],
    references: [roomActivity.id]
  }),
  user: one(users, {
    fields: [userHasActivity.fk_user_id],
    references: [users.id]
  })
}));
