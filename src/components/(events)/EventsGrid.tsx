'use client';
import React, { use } from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import { Calendar, Clock, Users, Trophy, ArrowRight, Zap } from 'lucide-react';
import { useQueryState, parseAsString } from 'nuqs';
import { getEventsActionReturnType } from '@/actions/event';

export default function EventsGrid({ events: eventsPromise, fallBack }: { events: Promise<getEventsActionReturnType[]>, fallBack: React.JSX.Element }) {
    const events = use(eventsPromise);
    const [searchTerm] = useQueryState('searchTerm', parseAsString.withDefault(""));
    const [filterStatus] = useQueryState('filterStatus', parseAsString.withDefault("all"));

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (event.tags ?? []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesFilter = filterStatus === 'all' || event.event_status === filterStatus

        return matchesSearch && matchesFilter
    })

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'ongoing': return <Zap className="w-4 h-4" />
            case 'upcoming': return <Clock className="w-4 h-4" />
            case 'completed': return <Trophy className="w-4 h-4" />
            default: return <Calendar className="w-4 h-4" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ongoing': return 'bg-green-100 text-green-700 border-green-200'
            case 'upcoming': return 'bg-blue-100 text-blue-700 border-blue-200'
            case 'completed': return 'bg-gray-100 text-gray-700 border-gray-200'
            default: return 'bg-gray-100 text-gray-700 border-gray-200'
        }
    }

    if (filteredEvents.length === 0) {
        return fallBack;
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
                    {/* Event Header */}
                    <div className="p-6 pb-4">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.event_status)}`}>
                                        {getStatusIcon(event.event_status)}
                                        {event.event_status.charAt(0).toUpperCase() + event.event_status.slice(1)}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                        event.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                        {event.difficulty}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-muted-foreground text-sm line-clamp-2">
                                    {event.description}
                                </p>
                            </div>
                        </div>

                        {/* Event Meta Info */}
                        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                            <div className="flex items-center text-muted-foreground">
                                <Calendar className="w-4 h-4 mr-2 text-primary" />
                                {event.scheduled.toDateString()}
                            </div>
                            <div suppressHydrationWarning className="flex items-center text-muted-foreground">
                                <Clock className="w-4 h-4 mr-2 text-primary" />
                                {formatTime(event.scheduled)}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <Users className="w-4 h-4 mr-2 text-primary" />
                                {event.participants.length}/{event.max_participants}
                            </div>
                            {/* <div className="flex items-center text-muted-foreground">
                                <Trophy className="w-4 h-4 mr-2 text-primary" />
                                NULL
                            </div> */}
                        </div>

                        {/* Participation Progress */}
                        <div className="mb-4">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>Participation</span>
                                <span>{Math.round((event.participants.length / (event.max_participants ?? event.participants.length + 1)) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="h-2 bg-primary rounded-full transition-all duration-300"
                                    style={{ width: `${(event.participants.length / (event.max_participants ?? event.participants.length + 1)) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                            {(event.tags ?? []).slice(0, 3).map(tag => (
                                <span key={tag} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                                    {tag}
                                </span>
                            ))}
                            {(event.tags ?? []).length > 3 && (
                                <span className="text-xs text-muted-foreground">+{(event.tags ?? []).length - 3} more</span>
                            )}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="p-6 pt-0">
                        <Button
                            className={`w-full ${event.event_status === 'ongoing' ? 'bg-green-600 hover:bg-green-700' :
                                event.event_status === 'upcoming' ? '' :
                                    'bg-muted text-muted-foreground hover:bg-muted'
                                }`}
                            disabled={event.event_status === 'completed'}
                            asChild
                        >
                            <Link href={`/events/${event.id}`} className="block">
                                {event.event_status === 'ongoing' ? (
                                    <>Join Live Event <ArrowRight className="w-4 h-4 ml-2" /></>
                                ) : event.event_status === 'upcoming' ? (
                                    <>View Details <ArrowRight className="w-4 h-4 ml-2" /></>
                                ) : (
                                    'Event Completed'
                                )}
                            </Link>
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

function formatTime(date: Date) {
    return new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC"
    }).format(date)
}