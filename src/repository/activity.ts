import { eq } from "drizzle-orm";

import { db } from "@/db";
import { roomActivity, settleUp, task, event, userHasActivity } from "@/db/schema/activity";
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
      taskIsPublic: task.isPublic,
      eventIsPublic: event.isPublic,
      settleUpIsPublic: settleUp.isPublic,
      description: roomActivity.description,
      taskId: roomActivity.fk_task,
      dueDate: task.due_date,
      createdById: roomActivity.created_by,
      authorName: users.name,
      eventId: roomActivity.fk_event,
      settleUpId: roomActivity.fk_settle_up,
      eventDateTime: event.dateTime,
      eventPlace: event.place,
      settleDate: settleUp.date,
      settleMoney: settleUp.money
    })
    .from(roomActivity)
    .leftJoin(task, eq(task.id, roomActivity.fk_task))
    .leftJoin(users, eq(users.id, roomActivity.created_by))
    .leftJoin(event, eq(event.id, roomActivity.fk_event))
    .leftJoin(settleUp, eq(settleUp.id, roomActivity.fk_settle_up))
    .where(eq(roomActivity.fk_room, roomId));

  return {
    tasks: activities.filter((a) => a.taskId !== null),
    events: activities.filter((a) => a.eventId !== null),
    settleUps: activities.filter((a) => a.settleUpId !== null)
  };
};
