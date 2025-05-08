import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { RoomDetailActions } from "@/components/rooms/room-detail-actions";
import { SettleUpCard } from "@/components/rooms/settleup-card";
import { TaskCard } from "@/components/rooms/task-card";
import { getActivitiesByRoom } from "@/repository/activity";
import { getRoomByLink } from "@/repository/room";
import { EventCard } from "@/components/rooms/event-card";

export const metadata: Metadata = {
  title: "Room Details",
  description: "View detailed information about your room."
};

type RoomDetailPageProps = {
  params: Promise<{ link: string }>;
};

const RoomDetailPage = async ({ params }: RoomDetailPageProps) => {
  const { link } = await params;

  const room = await getRoomByLink(link);

  if (!room) {
    notFound();
  }

  const { tasks, events, settleUps } = await getActivitiesByRoom(room.id);

  return (
    <div className="space-y-12 p-4">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">{room.name}</h1>
          <RoomDetailActions roomId={room.id} />
        </div>
        {room.description && <p className="text-muted-foreground">{room.description}</p>}
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
