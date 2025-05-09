import { eq } from "drizzle-orm";

import { db } from "@/db";
import { roomActivity, task } from "@/db/schema/activity";
import { users } from "@/db/schema/auth";

export const getActivitiesByRoom = async (roomId: number) => {
  const activities = await db
    .select({
      id: roomActivity.id,
      name: roomActivity.name,
      description: roomActivity.description,
      taskId: roomActivity.fk_task,
      dueDate: task.due_date,
      createdById: roomActivity.created_by,
      authorName: users.name,
      eventId: roomActivity.fk_event,
      settleUpId: roomActivity.fk_settle_up
    })
    .from(roomActivity)
    .leftJoin(task, eq(task.id, roomActivity.fk_task))
    .leftJoin(users, eq(users.id, roomActivity.created_by))
    .where(eq(roomActivity.fk_room, roomId));

  return {
    tasks: activities.filter((a) => a.taskId !== null),
    events: activities.filter((a) => a.eventId !== null),
    settleUps: activities.filter((a) => a.settleUpId !== null)
  };
};
