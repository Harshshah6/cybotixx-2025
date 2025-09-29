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
            groups: {
                with: {
                    members: {
                        with: {
                            user: true,
                        }
                    },
                }
            },
            winners: {
                with: {
                    user: true,
                },
                orderBy: (field, { asc }) => asc(field.prize),
            },
        },
        orderBy: (fields, operators) => operators.asc(fields.scheduled),
    });
    return results ?? [];
};

export type getEventsActionReturnType = Awaited<ReturnType<typeof getEventsAction>>[number]

export const getEventByIdAction = async (id: number) => {
    const result = await db.query.event.findFirst({
        where: (event, { eq }) => (eq(event.id, id)),
        with: {
            participants: {
                with: {
                    user: true,
                },
            },
            groups: {
                with: {
                    members: {
                        with: {
                            user: true,
                        }
                    },
                }
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