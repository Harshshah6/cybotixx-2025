'use server';

import { db } from "@/lib/db/db";

export const getAnnouncementsAction = async () => {
    const results = await db.query.announcement.findMany();
    if (results) {
        return results;
    } else {
        return [];
    }
};