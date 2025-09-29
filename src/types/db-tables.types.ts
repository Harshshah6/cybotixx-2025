import { getEventByIdAction } from "@/actions/event";
import { getParticipantsAction } from "@/actions/participants";
import { event, announcement, participants, team, user, winners, group, groupParticipants } from "@/lib/db/schema";

type WithRelations<T, R> = T & R;

export type EventBase = typeof event.$inferSelect;
export type EventInsert = typeof event.$inferInsert;

export type WinnerBase = typeof winners.$inferSelect;
export type WinnerInsert = typeof winners.$inferInsert;

export type AnnouncementBase = typeof announcement.$inferSelect;
export type AnnouncementInsert = typeof announcement.$inferInsert;

export type ParticipantBase = typeof participants.$inferSelect;
export type ParticipantInsert = typeof participants.$inferInsert;

export type TeamBase = typeof team.$inferSelect;
export type TeamInsert = typeof team.$inferInsert;

export type UserBase = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;

export type groupBase = typeof group.$inferSelect;
export type groupInsert = typeof group.$inferInsert;

export type groupParticipantsBase = typeof groupParticipants.$inferSelect;
export type groupParticipantsInsert = typeof groupParticipants.$inferInsert;


export type ParticipantsWithRelations = Awaited<ReturnType<typeof getParticipantsAction>>[number];

export type WinnerWithRelations = WithRelations<WinnerBase, { user: UserBase; event: EventBase }>;

// export type EventWithRelations = WithRelations<EventBase, {
//     participants: ParticipantBase[]; 
//     winners: WinnerBase[],
//     groups: WithRelations<groupBase, {
//         members: WithRelations<groupParticipantsBase, & { user: UserBase }>
//     }>
// }>;

export type EventWithRelations = Awaited<ReturnType<typeof getEventByIdAction>>

export type UserWithRelations = WithRelations<UserBase, { participants: ParticipantBase[]; winners: WinnerBase[] }>;
