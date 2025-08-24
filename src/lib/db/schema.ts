import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, text, integer, timestamp, jsonb, pgEnum, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified")
        .$defaultFn(() => false)
        .notNull(),
    image: text("image"),
    createdAt: timestamp("created_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    role: text("role"),
    banned: boolean("banned"),
    banReason: text("ban_reason"),
    banExpires: timestamp("ban_expires"),

    sem: integer("sem").default(1),
    phone_number: varchar("phone_number", { length: 10 }).default("#NUll#"),
    roll_number: text("roll_number").default("#NUll#"),
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").$defaultFn(
        () => /* @__PURE__ */ new Date(),
    ),
    updatedAt: timestamp("updated_at").$defaultFn(
        () => /* @__PURE__ */ new Date(),
    ),
});


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

export const winners = pgTable('winners', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id),
    eventId: integer('event_id').notNull().references(() => event.id),
    prize: text('prize').notNull(),
});

export const participants = pgTable('participants', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id),
    eventId: integer('event_id').notNull().references(() => event.id),
});



////////////////////////////////////////////////
//////////////// RELATIONS /////////////////////
////////////////////////////////////////////////

export const usersRelations = relations(user, ({ many }) => ({
    participants: many(participants),
    winners: many(winners),
}));

export const eventsRelations = relations(event, ({ many }) => ({
    participants: many(participants),
    winners: many(winners),
}));

export const participantsRelations = relations(participants, ({ one }) => ({
    user: one(user, { fields: [participants.userId], references: [user.id] }),
    event: one(event, { fields: [participants.eventId], references: [event.id] }),
}));

export const winnersRelations = relations(winners, ({ one }) => ({
    user: one(user, { fields: [winners.userId], references: [user.id] }),
    event: one(event, { fields: [winners.eventId], references: [event.id] }),
}));