"use server";

import { revalidateTag } from "next/cache";

export const revalidateTagAction = async (tag: string) => revalidateTag(tag);
