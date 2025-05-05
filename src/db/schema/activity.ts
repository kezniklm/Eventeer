import { relations, sql } from "drizzle-orm";
import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./auth";
import { room } from "./room";

// interval types for repeating
const periodEnum = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"] as const;

/** -- TASK ------------------------------------------------------------- */
export const task = sqliteTable("task", {
  id: integer().primaryKey(),
  name: text().notNull(),
  description: text(),
  author_id: text("author_id")
    .notNull()
    .references(() => users.id),
  created_at: integer("created_at", { mode: "timestamp_ms" }).defaultNow().notNull(),
  due_date: integer("due_date", { mode: "timestamp_ms" }),
  is_completed: integer("is_completed", { mode: "boolean" }).default(false),
  priority: integer().default(0),
  repeatable_type: text({ enum: periodEnum }),
  repeatable_value: integer()
});

export const subtask = sqliteTable("subtask", {
  id: integer().primaryKey(),
  fk_task: integer().references(() => task.id),
  name: text().notNull(),
  is_done: integer({ mode: "boolean" }).default(false)
});

export const userHasTask = sqliteTable("task_has_user", {
  fk_user: text("fk_user").references(() => users.id),
  fk_task: integer("fk_task").references(() => task.id)
});

export const taskRelations = relations(task, ({ one, many }) => ({
  author: one(users, {
    fields: [task.author_id],
    references: [users.id]
  }),
  subtasks: many(subtask),
  assignedUsers: many(userHasTask)
}));

export const subtaskRelations = relations(subtask, ({ one }) => ({
  task: one(task, {
    fields: [subtask.fk_task],
    references: [task.id]
  })
}));

export const userHasTaskRelations = relations(userHasTask, ({ one }) => ({
  user: one(users, {
    fields: [userHasTask.fk_user],
    references: [users.id]
  }),
  task: one(task, {
    fields: [userHasTask.fk_task],
    references: [task.id]
  })
}));

/** -- EVENT ------------------------------------------------------------ */
export const event = sqliteTable("event", {
  id: integer().primaryKey(),
  name: text().notNull(),
  description: text(),
  author_id: text("author_id")
    .notNull()
    .references(() => users.id),
  created_at: integer("created_at", { mode: "timestamp_ms" }).defaultNow().notNull(),
  event_date: integer("event_date", { mode: "timestamp_ms" }).notNull(),
  location: text(),
  repeatable_type: text({ enum: periodEnum }),
  repeatable_value: integer()
});

export const userHasEvent = sqliteTable("event_has_user", {
  fk_user: text("fk_user").references(() => users.id),
  fk_event: integer("fk_event").references(() => event.id)
});

export const eventRelations = relations(event, ({ one, many }) => ({
  author: one(users, {
    fields: [event.author_id],
    references: [users.id]
  }),
  assignedUsers: many(userHasEvent)
}));

export const userHasEventRelations = relations(userHasEvent, ({ one }) => ({
  user: one(users, {
    fields: [userHasEvent.fk_user],
    references: [users.id]
  }),
  event: one(event, {
    fields: [userHasEvent.fk_event],
    references: [event.id]
  })
}));

/** -- SETTLE UP -------------------------------------------------------- */
export const settleUp = sqliteTable("settle_up", {
  id: integer().primaryKey(),
  name: text().notNull(),
  description: text(),
  author_id: text("author_id")
    .notNull()
    .references(() => users.id),
  created_at: integer("created_at", { mode: "timestamp_ms" }).defaultNow().notNull(),
  deadline: integer("deadline", { mode: "timestamp_ms" }),
  target_amount: integer().notNull()
});

export const userSettledUp = sqliteTable("user_settled_up", {
  fk_user: text("fk_user").references(() => users.id),
  fk_settle_up: integer("fk_settle_up").references(() => settleUp.id),
  amount: integer().notNull()
});

export const settleUpRelations = relations(settleUp, ({ one, many }) => ({
  author: one(users, {
    fields: [settleUp.author_id],
    references: [users.id]
  }),
  contributions: many(userSettledUp)
}));

export const userSettledUpRelations = relations(userSettledUp, ({ one }) => ({
  user: one(users, {
    fields: [userSettledUp.fk_user],
    references: [users.id]
  }),
  settle_up: one(settleUp, {
    fields: [userSettledUp.fk_settle_up],
    references: [settleUp.id]
  })
}));

/** -- ROOM ACTIVITY (volitelně) ----------------------------------------- */
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

export const roomActivityRelations = relations(roomActivity, ({ one }) => ({
  room: one(room, { fields: [roomActivity.fk_room], references: [room.id] }),
  task: one(task, { fields: [roomActivity.fk_task], references: [task.id] }),
  event: one(event, { fields: [roomActivity.fk_event], references: [event.id] }),
  settle_up: one(settleUp, { fields: [roomActivity.fk_settle_up], references: [settleUp.id] })
}));
