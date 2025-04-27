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
        description: text(),
    },
    (table) => [
        check(
            "activity_check",
            sql`
      (CASE WHEN ${table.fk_event} IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN ${table.fk_task} IS NOT NULL THEN 1 ELSE 0 END) +
      (CASE WHEN ${table.fk_settle_up} IS NOT NULL THEN 1 ELSE 0 END)= 1`
        ),
    ]
);

export const task = sqliteTable("task", {
    id: integer().primaryKey(),
    priority: integer().default(0),
    repeatable_type: text({ enum: periodEnum }),
    repeatable_value: integer(),
});

export const subtask = sqliteTable("subtask", {
    id: integer().primaryKey(),
    fk_task: integer().references(() => task.id),
    is_done: integer({ mode: "boolean" }).default(false),
});

export const taskRelations = relations(task, ({ many }) => ({
    subtasks: many(subtask),
}));

export const event = sqliteTable("event", {
    id: integer().primaryKey(),
    date: integer({ mode: "timestamp" }),
    repeatable_type: text({ enum: periodEnum }),
    repeatable_value: integer(),
});

export const settleUp = sqliteTable("settle_up", {
    id: integer().primaryKey(),
    money: integer().notNull(),
});

export const userSettledUp = sqliteTable("user_settled_up", {
    fk_user: integer().references(() => users.id),
    fk_settle_up: integer().references(() => settleUp.id),
});

export const settledUpRelations = relations(settleUp, ({ many }) => ({
    usersSettledUp: many(userSettledUp),
}));

export const userSettledUpRelations = relations(userSettledUp, ({ one }) => ({
    settle_up: one(settleUp),
    user: one(users),
}));

export const userHasActivity = sqliteTable("activity_has_user", {
    fk_user_id: integer().references(() => users.id),
    fk_activity_id: integer().references(() => roomActivity.id),
});

export const roomActivityRelations = relations(
    roomActivity,
    ({ one, many }) => ({
        task: one(task),
        settle_up: one(settleUp),
        event: one(settleUp),
        usersHasActivity: many(userHasActivity),
    })
);

export const userHasActivityRelations = relations(
    userHasActivity,
    ({ one }) => ({
        room_activity: one(roomActivity),
        user: one(users),
    })
);
