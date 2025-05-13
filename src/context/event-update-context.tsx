"use client";

import { createContext, useContext } from "react";

import { type EventForm } from "@/db/zod/event";

type UpdateContext = {
  eventId: number;
  data: EventForm;
};

const EventUpdateContext = createContext<UpdateContext | null>(null);

export const useUpdateEventContext = () => useContext(EventUpdateContext);

export const EventUpdateProvider = ({
  children,
  eventId,
  data
}: {
  children: React.ReactNode;
  eventId: UpdateContext["eventId"];
  data: EventForm;
}) => <EventUpdateContext.Provider value={{ eventId, data }}>{children}</EventUpdateContext.Provider>;
