"use server";

import { db } from "@/lib/db/db";

export const getCybotixxStats = async () => {
  const totalUsers = (await db.query.user.findMany()).length ?? 0;
  const totalEvents = (await db.query.event.findMany()).length ?? 0;
  const totalParticipants = (await db.query.participants.findMany()).length ?? 0;

  return {totalUsers, totalEvents, totalParticipants};
};
