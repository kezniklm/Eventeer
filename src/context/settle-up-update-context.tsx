"use client";

import { createContext, useContext } from "react";

import { type SettleUpForm } from "@/db/zod/settle-up";

type UpdateContext = {
  settleUpId: number;
  data: SettleUpForm;
};

const SettleUpUpdateContext = createContext<UpdateContext | null>(null);

export const useUpdateSettleUpContext = () => useContext(SettleUpUpdateContext);

export const SettleUpUpdateProvider = ({
  children,
  settleUpId,
  data
}: {
  children: React.ReactNode;
  settleUpId: UpdateContext["settleUpId"];
  data: SettleUpForm;
}) => <SettleUpUpdateContext.Provider value={{ settleUpId, data }}>{children}</SettleUpUpdateContext.Provider>;
