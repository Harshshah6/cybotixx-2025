import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, text, integer, timestamp, jsonb, pgEnum } from "drizzle-orm/pg-core";

// Announcement Table
export const announcement = pgTable("announcement", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    importance_level: integer("importance_level").notNull(),
    type_of_announcement: varchar("type_of_announcement", { length: 100 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Team Table
export const team = pgTable("team", {
    id: serial("id").primaryKey(),
    image: varchar("image", { length: 512 }),
    name: varchar("name", { length: 100 }).notNull(),
    role: varchar("role", { length: 100 }).notNull(),
    description: text("description"),
    grade: integer("grade"),
    mail: varchar("mail", { length: 255 }),
    linkedin: varchar("linkedin", { length: 255 }),
    github: varchar("github", { length: 255 }),
});

export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);
export const eventStatusEnum = pgEnum("event_status", ["upcoming", "ongoing", "completed"]);

// Event Table
export const event = pgTable("event", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    scheduled: timestamp("scheduled", { withTimezone: true }).notNull(),
    difficulty: difficultyEnum(),
    max_participants: integer("max_participants"),
    rules_and_guidelines: text("rules_and_guidelines"),
    event_status: eventStatusEnum().default("ongoing").notNull(),
    requirements: text("requirements"),
    tags: jsonb("tags").$type<string[]>(),
});

// Participant Table
export const participant = pgTable("participant", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    sem: integer("sem"),
    achievements_tags: jsonb("achievements_tags").$type<string[]>(),
    image: varchar("image", { length: 512 }),
    email: varchar("email", { length: 255 }),
    phone_number: varchar("phone_number", { length: 10 }),
    event_id: integer("event_id").notNull().references(() => event.id, { onDelete: "cascade" })
});

export const participantRelations = relations(participant, ({ one }) => ({
    event: one(event, {
        fields: [participant.event_id],
        references: [event.id]
    })
}));

export const eventRelations = relations(event, ({ many }) => ({
    participants: many(participant),
    winners: many(participant,),
}));