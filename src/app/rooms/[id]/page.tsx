import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { EventCard } from "@/components/rooms/EventCard";
import { RoomActions } from "@/components/rooms/RoomActions";
import { SettleUpCard } from "@/components/rooms/SettleUpCard";
import { TaskCard } from "@/components/rooms/TaskCard";
import { getActivitiesByRoom } from "@/repository/activityRepository";
import { getRoomById } from "@/repository/roomRepository";

export const metadata: Metadata = {
  title: "Room Details",
  description: "View detailed information about your room."
};

type RoomDetailPageProps = {
  params: Promise<{ id: string }>;
};

const RoomDetailPage = async ({ params }: RoomDetailPageProps) => {
  const { id } = await params;
  const roomId = Number(id);

  const roomData = await getRoomById(roomId.toString());

  if (!roomData) {
    notFound();
  }

  const { tasks, events, settleUps } = await getActivitiesByRoom(roomId.toString());

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
