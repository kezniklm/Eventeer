"use client";

import { useRouter } from "next/navigation";

import { leaveRoomAction } from "@/server-actions/rooms";
import { RoomContextProvider } from "@/context/room-context";
import { type RoomInfo } from "@/db/zod/room";

import { RoomDetailActions } from "./room-detail-actions";

type Props = {
  roomInfo: RoomInfo;
  userId: string;
};

export const RoomDetailActionsWrapper = ({ roomInfo, userId }: Props) => {
  const router = useRouter();

  const handleLeave = async () => {
    await leaveRoomAction(roomInfo.room.id, userId);
    router.push("/rooms");
  };

  return (
    <RoomContextProvider value={roomInfo}>
      <RoomDetailActions handleLeave={handleLeave} />
    </RoomContextProvider>
  );
};
