import { createContext, useContext } from "react";

import { type RoomInfo } from "@/db/zod/room";

const RoomContext = createContext<RoomInfo | null>(null);

export const useRoomContext = () => {
  const roomContext = useContext(RoomContext);

  if (!roomContext) {
    throw new Error("useRoomContext can be used only inside RoomContextProvider");
  }

  return roomContext;
};

export const RoomContextProvider = RoomContext.Provider;
