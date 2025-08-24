'use server';

import { auth } from "@/lib/auth";
import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const userProfileCompleteAction = async (data: { roll_number: string; phone_number: string, sem: number }) => {
    try {
        const s = await auth.api.getSession({
            headers: await headers()
        })
        const cur_user = s?.user;

        if (!cur_user) return { ok: false }

        const res = await db.update(user).set({
            roll_number: data.roll_number,
            phone_number: data.phone_number,
            sem: data.sem,
        }).where(eq(user.id, cur_user.id)).returning();
        return { ok: res ? true : false }
    } catch {
        return { ok: false }
    }
};