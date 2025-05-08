import { eq } from "drizzle-orm";

import { db } from "@/db";
import { roomActivity } from "@/db/schema/activity";

export const getActivitiesByRoom = async (roomId: number) => {
  const activities = await db
    .select({
      id: roomActivity.id,
      name: roomActivity.name,
      description: roomActivity.description,
      taskId: roomActivity.fk_task,
      eventId: roomActivity.fk_event,
      settleUpId: roomActivity.fk_settle_up
    })
    .from(roomActivity)
    .where(eq(roomActivity.fk_room, roomId));

  return {
    tasks: activities.filter((a) => a.taskId !== null),
    events: activities.filter((a) => a.eventId !== null),
    settleUps: activities.filter((a) => a.settleUpId !== null)
  };
};
