'use server';

import { db } from "@/lib/db/db";

export const getTeamsAction = async () => {
    const results = await db.query.team.findMany();

    if (results) {
        return results;
    } else {
        return [];
    }
};