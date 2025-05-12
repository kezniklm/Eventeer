import { z } from "zod";

import { periodEnum, priorityEnum } from "../schema/activity";

export const priorityEnumSchema = z.enum(priorityEnum);

export const periodEnumSchema = z.enum(periodEnum);
