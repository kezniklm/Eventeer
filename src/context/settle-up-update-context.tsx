"use client";

import { createContext, useContext } from "react";

import { type SettleUpForm } from "@/db/zod/settle-up";

const SettleUpUpdateContext = createContext<SettleUpForm | null>(null);

export const useUpdateSettleUpContext = () => useContext(SettleUpUpdateContext);

export const SettleUpUpdateProvider = SettleUpUpdateContext.Provider;
