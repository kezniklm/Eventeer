import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import {
  event,
  roomActivity,
  roomActivityRelations,
  settledUpRelations,
  settleUp,
  subtask,
  task,
  taskRelations,
  userHasActivity,
  userSettledUp,
  userSettledUpRelations
} from "./schema/activity";
import { accounts, authenticators, sessions, users, verificationTokens } from "./schema/auth";
import { room, roomsRelations, userHasRoom, userHasRoomRelations } from "./schema/room";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN
});

export const db = drizzle(client, {
  schema: {
    users,
    accounts,
    sessions,
    verificationTokens,
    authenticators,
    room,
    userHasRoom,
    roomsRelations,
    userHasRoomRelations,
    roomActivity,
    task,
    subtask,
    taskRelations,
    event,
    settleUp,
    userSettledUp,
    settledUpRelations,
    userSettledUpRelations,
    roomActivityRelations,
    userHasActivity
  }
});
