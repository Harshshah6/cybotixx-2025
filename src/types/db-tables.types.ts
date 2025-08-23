import { event, announcement, participant, team, } from "@/lib/auth/schema"

export type EventSelectType = typeof event.$inferSelect & { participants: ParticipantSelectType[], winners: ParticipantSelectType[] };
export type EventInsertType = typeof event.$inferInsert;

export type AnnouncementSelectType = typeof announcement.$inferSelect;
export type AnnouncementInsertType = typeof announcement.$inferInsert;

export type ParticipantSelectType = typeof participant.$inferSelect;
export type ParticipantInsertType = typeof participant.$inferInsert;

export type TeamSelectType = typeof team.$inferSelect;
export type TeamInsertType = typeof team.$inferInsert;