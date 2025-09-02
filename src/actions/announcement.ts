'use server';

import { db } from "@/lib/db/db";

export const getAnnouncementsAction = async () => {
    const results = await db.query.announcement.findMany({ orderBy: (fields, { desc }) => desc(fields.createdAt) });
    if (results) {
        return results;
    } else {
        return [];
    }
};