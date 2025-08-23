import { use } from 'react'
import { Calendar, Users, Trophy, ArrowLeft, CheckCircle, AlertCircle, Star } from 'lucide-react'
import LayoutWrapper from '@/components/LayoutWrapper'
import Link from 'next/link'
import RenderEnrollmentStatus from '@/components/(events)/RenderEnrollmentStatus'
import { getEventByIdAction } from '@/actions/event'
import React from 'react'

const EventDetail = ({ params }: { params: Promise<{ id: number }> }) => {
    const { id } = use(params);
    const event = use(getEventByIdAction(id));

    return (
        <LayoutWrapper>
            <div className="space-y-8">
                {/* Back Button */}
                <Link
                    href="/events"
                    className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Events
                </Link>

                {event ? (
                    <>
                        <div className="space-y-6">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                                            {event.title}
                                        </h1>
                                        <span className={`badge-${event.event_status}`}>
                                            {event.event_status === 'ongoing' ? 'Live' :
                                                event.event_status === 'upcoming' ? 'Upcoming' : 'Ended'}
                                        </span>
                                    </div>

                                    {/* <p className="text-lg text-muted-foreground mb-6">
                                        {event.description}
                                    </p> */}

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="cyber-card text-center py-4">
                                            <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                                            <div className="text-sm font-medium text-foreground">{event.scheduled.toDateString()}</div>
                                            <div className="text-xs text-muted-foreground">{event.scheduled.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
                                        </div>
                                        <div className="cyber-card text-center py-4">
                                            <Users className="w-6 h-6 mx-auto mb-2" />
                                            <div className="text-sm font-medium text-foreground">{(event.participants.length ?? 1)}/{event.max_participants}</div>
                                            <div className="text-xs text-muted-foreground">Participants</div>
                                        </div>
                                        <div className="cyber-card text-center py-4">
                                            <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                                            <div className="text-sm font-medium text-foreground">NULL</div>
                                            <div className="text-xs text-muted-foreground">Prize Pool</div>
                                        </div>
                                        <div className="cyber-card text-center py-4">
                                            <Star className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                                            <div className="text-sm font-medium text-foreground">{event.difficulty}</div>
                                            <div className="text-xs text-muted-foreground">Difficulty</div>
                                        </div>
                                    </div>
                                </div>

                                <RenderEnrollmentStatus event={event} />
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="cyber-card">
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">About This Event</h2>
                                    <div className="prose prose-invert max-w-none">
                                        {event.description.split('\n\n').map((paragraph, index) => (
                                            <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div className="cyber-card">
                                    <h2 className="text-2xl font-semibold text-foreground mb-4">Event Schedule</h2>
                                    <div className="space-y-4">
                                        {/* {event.schedule.map((item, index) => (
                                            <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                                                <div className="text-primary font-mono text-sm bg-primary/10 px-3 py-1 rounded">
                                                    {item.time}
                                                </div>
                                                <div className="text-foreground">{item.activity}</div>
                                            </div>
                                        ))} */}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="cyber-card">
                                    <h3 className="text-xl font-semibold text-foreground mb-4">Rules & Guidelines</h3>
                                    <ul className="space-y-2">
                                        {(event.rules_and_guidelines ?? "").split("\n").map((rule, index) => (
                                            <React.Fragment key={index} >
                                                {
                                                    rule.trim() !== "" &&
                                                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                                        {rule}
                                                    </li>
                                                }
                                            </React.Fragment>
                                        ))}
                                    </ul>
                                </div>

                                <div className="cyber-card">
                                    <h3 className="text-xl font-semibold text-foreground mb-4">Requirements</h3>
                                    <ul className="space-y-2">
                                        {(event.requirements ?? "").split("\n").map((req, index) => (
                                            <React.Fragment key={index} >
                                                {
                                                    req.trim() !== "" &&
                                                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <AlertCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                                        {req}
                                                    </li>
                                                }
                                            </React.Fragment>
                                        ))}
                                    </ul>
                                </div>

                                <div className="cyber-card">
                                    <h3 className="text-xl font-semibold text-foreground mb-4">Topics Covered</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {(event.tags ?? []).map(tag => (
                                            <span
                                                key={tag}
                                                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm border border-primary/20"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) :
                    (<>
                        <div className="text-sm text-muted-foreground">No event details available.</div>
                    </>)
                }

            </div>
        </LayoutWrapper>
    )
}

export default EventDetail