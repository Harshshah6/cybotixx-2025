'use server';

import { db } from "@/lib/db/db";

export const getEventsAction = async () => {
    const results = await db.query.event.findMany({
        with: {
            participants: {
                with: {
                    user: true,
                },
            },
            winners: {
                with: {
                    user: true,
                },
            },
        },
    });
    return results ?? [];
};

export const getEventByIdAction = async (id: number) => {
    const result = await db.query.event.findFirst({
        where: (event, { eq }) => (eq(event.id, id)),
        with: {
            participants: {
                with: {
                    user: true,
                },
            },
            winners: {
                with: {
                    user: true,
                },
            },
        },
    });
    return result;
};