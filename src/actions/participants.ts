'use server';

import { db } from "@/lib/db/db";

export const getParticipantsAction = async () => {
    const results = await db.query.participants.findMany({
        with: {
            event: {
                with: {
                    participants: true,
                    winners: true,
                }
            },
            user: {
                with: {
                    participants: true,
                    winners: true,
                },
            },
        }
    });
    return results ?? [];
};