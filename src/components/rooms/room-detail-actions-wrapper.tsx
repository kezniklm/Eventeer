"use client";

import { useRouter } from "next/navigation";

import { leaveRoomAction } from "@/server-actions/rooms";

import { RoomDetailActions } from "./room-detail-actions";

type Props = {
  roomId: number;
  userId: string;
};

export const RoomDetailActionsWrapper = ({ roomId, userId }: Props) => {
  const router = useRouter();

  const handleLeave = async () => {
    await leaveRoomAction(roomId, userId);
    router.push("/rooms");
  };

  return <RoomDetailActions roomId={roomId} handleLeave={handleLeave} />;
};
