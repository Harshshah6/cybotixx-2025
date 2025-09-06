import { db } from "@/lib/db/db";
import { os } from "@orpc/server";

export const listEvents = os.handler(async ({ }) => {
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
                orderBy: (field, { asc }) => asc(field.prize),
            },
        },
        orderBy: (fields, operators) => operators.asc(fields.scheduled),
    });

    if (process.env.NEXT_PHASE === "phase-production-build") {
        console.warn("⚠️ DB called during BUILD phase!");
    }

    // console.log("listEvents was called: ", results);

    return results ?? [];
})