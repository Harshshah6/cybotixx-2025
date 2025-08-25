import type { EventBase } from '@/types/db-tables.types'
import React, { use } from 'react'
import { Users, Calendar } from "lucide-react";
import { Button } from '../ui/button';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';

export default function UpcomingEvents({ events: eventsPromise }: { events: Promise<EventBase[]> }) {
    const events = use(eventsPromise).slice(0, 4);
    return (
        <>
            {events.map((event, index) => (
                <div
                    key={event.id}
                    className="event-card flex flex-col animate-fade-in transition-all duration-300"
                    style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                {event.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-[7]">
                                {event.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {event.scheduled.toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {event.max_participants} participants
                        </div>
                        <span className={`border rounded-xl px-3 py-1 text-xs`}>
                            {event.event_status === 'ongoing' ? '🔴 Live' : '⏳ Upcoming'}
                        </span>
                    </div>

                    <Button
                        className={`w-full ${event.event_status === 'ongoing' ? 'btn-cyber' : 'btn-outline-cyber'}`}
                        asChild
                    >
                        <Link href={`/events/${event.id}`}>
                            {event.event_status === 'ongoing' ? 'Join Now' : 'Learn More'}
                        </Link>
                    </Button>
                </div>
            ))}
        </>
    )
}

export function UpcomingEventsSkeleton() {
    return (
        <>
            {
                [1, 2, 3].map((i) => (
                    <div key={i}>
                        <div className="event-card flex flex-col animate-fade-in transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1 space-y-3">
                                    <Skeleton className="h-5 w-2/5 rounded" />
                                    <Skeleton className="h-3 w-full rounded" />
                                    <Skeleton className="h-3 w-4/5 rounded" />
                                    <Skeleton className="h-3 w-3/5 rounded" />
                                </div>
                            </div>
                            <div className="flex-1 flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-4 h-4 rounded" />
                                    <Skeleton className="h-3 w-20 rounded" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-4 h-4 rounded" />
                                    <Skeleton className="h-3 w-24 rounded" />
                                </div>
                                <Skeleton className="h-6 w-20 rounded-xl" />
                            </div>
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                    </div>
                ))
            }
        </>
    )
}