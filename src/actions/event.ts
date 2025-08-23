'use server';

import { db } from "@/lib/auth/db";

export const getEventsAction = async () => {
    const results = await db.query.event.findMany({
        with: {
            participants: true,
            winners: {
                with: {
                    event: true
                }
            },
        }
    });
    if (results) {
        return results;
    } else {
        return [];
    }
};

export const getEventByIdAction = async (id: number) => {
    const result = await db.query.event.findMany({
        where: (event, { eq }) => (eq(event.id, id)),
        with: {
            participants: true,
            winners: {
                with: {
                    event: true
                }
            },
        }
    });
    return result[0];
};