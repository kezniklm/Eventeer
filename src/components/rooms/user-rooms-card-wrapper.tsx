"use client";

import { leaveRoomAction, inviteUserToRoomAction } from "@/server-actions/rooms";
import { type Result } from "@/result";

import { RoomCard } from "./room-card";

type Props = {
  room: { id: number; name: string; link: string };
  userId: string;
  badges: string[];
};

export const RoomCardWrapper = ({ room, userId, badges }: Props) => {
  const handleLeave = async () => {
    try {
      await leaveRoomAction(room.id, userId);
    } catch (err) {
      console.error("Failed to leave room", err);
    }
  };

  const handleAddUser = async (email: string): Promise<Result> => {
    try {
      await inviteUserToRoomAction(room.id, email);
      return { success: true, message: "User invited successfully" };
    } catch (err) {
      console.error("Failed to invite user", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      return { success: false, message: errorMessage };
    }
  };

  return (
    <RoomCard
      id={room.id}
      title={room.name}
      linkName={room.link}
      badges={badges}
      handleLeave={handleLeave}
      handleAddUser={handleAddUser}
    />
  );
};
