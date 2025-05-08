"use client";

import { acceptRoomInvitationAction, declineRoomInvitationAction } from "@/server-actions/rooms";

import { RoomCard } from "./room-card";

type Props = {
  room: { id: number; name: string };
  userId: string;
  badges: string[];
};

export const RoomInvitationCardWrapper = ({ room, userId, badges }: Props) => {
  const handleAccept = async () => {
    await acceptRoomInvitationAction(room.id, userId);
  };

  const handleDecline = async () => {
    await declineRoomInvitationAction(room.id, userId);
  };

  return (
    <RoomCard
      id={room.id}
      title={room.name}
      badges={badges}
      handleAccept={handleAccept}
      handleDecline={handleDecline}
    />
  );
};
