import { eq, and } from "drizzle-orm";

import { db } from "@/db";
import { userHasActivity } from "@/db/schema/activity";

export const toggleAttendance = async (userId: string, activityId: number, attend: boolean) => {
  await db
    .update(userHasActivity)
    .set({ will_attend: attend })
    .where(and(eq(userHasActivity.fk_user_id, userId), eq(userHasActivity.fk_activity_id, activityId)));
};

export type Attendee = { fk_user_id: string; will_attend: boolean };

export const getAttendeesByActivity = async (activityId: number): Promise<Attendee[]> =>
  await db
    .select({
      fk_user_id: userHasActivity.fk_user_id,
      will_attend: userHasActivity.will_attend
    })
    .from(userHasActivity)
    .where(eq(userHasActivity.fk_activity_id, activityId));
