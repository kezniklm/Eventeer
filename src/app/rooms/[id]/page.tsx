import { type Metadata } from "next";
import { eq } from "drizzle-orm";

import { EventCard } from "@/components/rooms/EventCard";
import { RoomActions } from "@/components/rooms/RoomActions";
import { SettleUpCard } from "@/components/rooms/SettleUpCard";
import { TaskCard } from "@/components/rooms/TaskCard";
import { db } from "@/db";
import { roomActivity } from "@/db/schema/activity";
import { room } from "@/db/schema/room";

export const metadata: Metadata = {
  title: "Room Details",
  description: "View detailed information about your room."
};

type RoomDetailPageProps = { params: { id: string } };

const RoomDetailPage = async ({ params }: RoomDetailPageProps) => {
  const { id } = params;
  const roomId = Number(id);

  const roomData = await db
    .select({ name: room.name, description: room.description })
    .from(room)
    .where(eq(room.id, roomId))
    .get();

  if (!roomData) {
    return <p>Room not found.</p>;
  }

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

  const tasks = activities.filter((a) => a.taskId !== null);
  const events = activities.filter((a) => a.eventId !== null);
  const settleUps = activities.filter((a) => a.settleUpId !== null);

  return (
    <div className="space-y-12 p-4">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">{roomData.name}</h1>
          <RoomActions roomId={roomId} />
        </div>
        {roomData.description && <p className="text-muted-foreground">{roomData.description}</p>}
      </header>

      {tasks.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Tasks</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((t) => (
              <TaskCard key={t.id} name={t.name} description={t.description ?? undefined} />
            ))}
          </div>
        </section>
      )}

      {events.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Events</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <EventCard key={e.id} name={e.name} description={e.description ?? undefined} />
            ))}
          </div>
        </section>
      )}

      {settleUps.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Settle Ups</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {settleUps.map((s) => (
              <SettleUpCard key={s.id} name={s.name} description={s.description ?? undefined} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default RoomDetailPage;
