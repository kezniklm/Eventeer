"use client";

import { RoomContextProvider } from "@/context/room-context";
import { type RoomInfo } from "@/db/zod/room";

type Props = {
  children: React.ReactNode;
  roomInfo: RoomInfo;
};

export const Providers = ({ children, roomInfo }: Props) => (
  <RoomContextProvider value={roomInfo}>{children}</RoomContextProvider>
);
