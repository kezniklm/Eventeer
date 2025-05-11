import { z } from "zod";

import { priorityEnum } from "../schema/activity";

export const priorityEnumSchema = z.enum(priorityEnum);
