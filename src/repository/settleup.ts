import { eq } from "drizzle-orm";

import { db } from "@/db";
import { roomActivity, settleUp, userHasActivity } from "@/db/schema/activity";
import { type SettleUpInsertSchema } from "@/db/zod/settle-up";
import { type UserIdNamePair } from "@/db/zod/user";

export const getSettleUpsByRoom = async (roomId: number) =>
  await db
    .select({
      activityId: roomActivity.id,
      name: roomActivity.name,
      description: roomActivity.description,
      isPublic: roomActivity.isPublic,
      priority: roomActivity.priority,
      authorId: roomActivity.created_by,
      timestamp: roomActivity.timestamp,
      createdAt: roomActivity.createdAt,
      money: settleUp.money
    })
    .from(roomActivity)
    .innerJoin(settleUp, eq(settleUp.id, roomActivity.fk_settle_up))
    .where(eq(roomActivity.fk_room, roomId));

export const createSettleUp = async (data: SettleUpInsertSchema, users: UserIdNamePair[]) =>
  db.transaction(async (tx) => {
    const [inserted] = await tx
      .insert(settleUp)
      .values({
        roomId: data.roomId,
        money: data.money
      })
      .returning();

    const [activity] = await tx
      .insert(roomActivity)
      .values({
        fk_settle_up: inserted.id,
        name: data.name,
        description: data.description,
        created_by: data.created_by,
        fk_room: data.roomId
      })
      .returning();

    if (users.length !== 0) {
      const usersWithSettleUp = users.map((user) => ({ fk_user_id: user.id, fk_activity_id: activity.id }));
      tx.insert(userHasActivity).values([...usersWithSettleUp]);
    }

    return { ...inserted, ...activity };
  });
