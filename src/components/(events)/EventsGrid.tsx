'use client';
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import { Calendar, Clock, Users, Trophy, Award, ArrowRight, Zap } from 'lucide-react';
import { useQueryState, parseAsString } from 'nuqs';

export default function EventsGrid({ fallBack }: { fallBack: React.JSX.Element }) {

    const [searchTerm] = useQueryState('searchTerm', parseAsString.withDefault(""));
    const [filterStatus] = useQueryState('filterStatus', parseAsString.withDefault("all"));

    const events = [
        {
            id: 1,
            title: "Code Sprint Challenge",
            date: "Dec 25, 2024",
            time: "10:00 AM - 4:00 PM",
            participants: 45,
            maxParticipants: 60,
            status: "upcoming" as const,
            description: "Fast-paced coding competition with algorithmic challenges. Test your problem-solving skills against the best coders in the department.",
            prize: "₹15,000",
            difficulty: "Intermediate",
            tags: ["Algorithms", "Data Structures", "Problem Solving"],
            winners: []
        },
        {
            id: 2,
            title: "Web Dev Hackathon",
            date: "Jan 15, 2025",
            time: "9:00 AM - 9:00 AM (+1)",
            participants: 32,
            maxParticipants: 40,
            status: "upcoming" as const,
            description: "24-hour hackathon to build innovative web applications. Bring your creativity and technical skills to create something amazing.",
            prize: "₹25,000",
            difficulty: "Advanced",
            tags: ["Web Development", "React", "Node.js", "Creativity"],
            winners: []
        },
        {
            id: 3,
            title: "AI/ML Workshop",
            date: "Dec 20, 2024",
            time: "2:00 PM - 6:00 PM",
            participants: 28,
            maxParticipants: 35,
            status: "live" as const,
            description: "Hands-on workshop on machine learning fundamentals. Learn from industry experts and build your first ML model.",
            prize: "Certificate",
            difficulty: "Beginner",
            tags: ["Machine Learning", "Python", "AI", "Workshop"],
            winners: []
        },
        {
            id: 4,
            title: "Competitive Programming Contest",
            date: "Nov 30, 2024",
            time: "10:00 AM - 2:00 PM",
            participants: 58,
            maxParticipants: 60,
            status: "ended" as const,
            description: "Intense competitive programming session featuring complex algorithmic problems.",
            prize: "₹10,000",
            difficulty: "Advanced",
            tags: ["Competitive Programming", "Algorithms", "Mathematics"],
            winners: [
                { rank: 1, name: "Rahul Sharma", score: 2850 },
                { rank: 2, name: "Priya Patel", score: 2720 },
                { rank: 3, name: "Arjun Kumar", score: 2650 }
            ]
        }
    ]

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesFilter = filterStatus === 'all' || event.status === filterStatus

        return matchesSearch && matchesFilter
    })

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'live': return <Zap className="w-4 h-4" />
            case 'upcoming': return <Clock className="w-4 h-4" />
            case 'ended': return <Trophy className="w-4 h-4" />
            default: return <Calendar className="w-4 h-4" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'live': return 'bg-green-100 text-green-700 border-green-200'
            case 'upcoming': return 'bg-blue-100 text-blue-700 border-blue-200'
            case 'ended': return 'bg-gray-100 text-gray-700 border-gray-200'
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
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                                        {getStatusIcon(event.status)}
                                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                                        event.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
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
                                {event.date}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <Clock className="w-4 h-4 mr-2 text-primary" />
                                {event.time.split(' - ')[0]}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <Users className="w-4 h-4 mr-2 text-primary" />
                                {event.participants}/{event.maxParticipants}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <Trophy className="w-4 h-4 mr-2 text-primary" />
                                {event.prize}
                            </div>
                        </div>

                        {/* Participation Progress */}
                        <div className="mb-4">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>Participation</span>
                                <span>{Math.round((event.participants / event.maxParticipants) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="h-2 bg-primary rounded-full transition-all duration-300"
                                    style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                            {event.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                                    {tag}
                                </span>
                            ))}
                            {event.tags.length > 3 && (
                                <span className="text-xs text-muted-foreground">+{event.tags.length - 3} more</span>
                            )}
                        </div>
                    </div>

                    {/* Winners Section (for ended events) */}
                    {event.status === 'ended' && event.winners.length > 0 && (
                        <div className="px-6 py-4 bg-muted/30 border-t border-border">
                            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                                <Award className="w-4 h-4 mr-2 text-yellow-500" />
                                Top Winners
                            </h4>
                            <div className="space-y-2">
                                {event.winners.slice(0, 3).map(winner => (
                                    <div key={winner.rank} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${winner.rank === 1 ? 'bg-yellow-400 text-black' :
                                                winner.rank === 2 ? 'bg-gray-300 text-black' :
                                                    'bg-orange-400 text-black'
                                                }`}>
                                                {winner.rank}
                                            </div>
                                            <span className="text-foreground font-medium">{winner.name}</span>
                                        </div>
                                        <span className="text-muted-foreground">{winner.score} pts</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    <div className="p-6 pt-0">
                        <Button
                            className={`w-full ${event.status === 'live' ? 'bg-green-600 hover:bg-green-700' :
                                event.status === 'upcoming' ? '' :
                                    'bg-muted text-muted-foreground hover:bg-muted'
                                }`}
                            disabled={event.status === 'ended'}
                            asChild
                        >
                            <Link href={`/events/${event.id}`} className="block">
                                {event.status === 'live' ? (
                                    <>Join Live Event <ArrowRight className="w-4 h-4 ml-2" /></>
                                ) : event.status === 'upcoming' ? (
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
