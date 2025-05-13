import { eq } from "drizzle-orm";

import { db } from "@/db";
import { roomActivity, task, event, settleUp, userHasActivity } from "@/db/schema/activity";
import { users } from "@/db/schema/auth";

export const getActivityUsersNames = async (activityId: number) =>
  await db
    .select({ id: users.id, name: users.name })
    .from(users)
    .innerJoin(userHasActivity, eq(userHasActivity.fk_user_id, users.id))
    .where(eq(userHasActivity.fk_activity_id, activityId));

export const getActivitiesByRoom = async (roomId: number) => {
  const activities = await db
    .select({
      id: roomActivity.id,
      name: roomActivity.name,
      description: roomActivity.description,
      isPublic: roomActivity.isPublic,
      priority: roomActivity.priority,
      createdById: roomActivity.created_by,
      author: users,
      repeatableType: roomActivity.repeatableType,
      repeatableValue: roomActivity.repeatableValue,
      timestamp: roomActivity.timestamp,
      createdAt: roomActivity.createdAt,
      taskId: roomActivity.fk_task,
      eventId: roomActivity.fk_event,
      eventPlace: event.place,
      settleUpId: roomActivity.fk_settle_up,
      settleMoney: settleUp.money
    })
    .from(roomActivity)
    .leftJoin(users, eq(users.id, roomActivity.created_by))
    .leftJoin(task, eq(task.id, roomActivity.fk_task))
    .leftJoin(event, eq(event.id, roomActivity.fk_event))
    .leftJoin(settleUp, eq(settleUp.id, roomActivity.fk_settle_up))
    .where(eq(roomActivity.fk_room, roomId));

  return {
    tasks: activities.filter((a) => a.taskId !== null),
    events: activities.filter((a) => a.eventId !== null),
    settleUps: activities.filter((a) => a.settleUpId !== null)
  };
};

export const getActivityBySettleUp = async (settleUpId: number) => {
  const rows = await db.select().from(roomActivity).where(eq(roomActivity.fk_settle_up, settleUpId));

  if (rows.length !== 1) {
    throw new Error("Failed to fetch settle up!");
  }

  return rows[0];
};
