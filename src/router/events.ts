import { getEventsAction } from "@/actions/event";
import { os } from "@orpc/server";

export const listEvents = os.handler(async ({ }) => {
    const result = await getEventsAction();
    return result;
})