import { use } from 'react'
import { Calendar, Users, Trophy, ArrowLeft, CheckCircle, AlertCircle, Star } from 'lucide-react'
import LayoutWrapper from '@/components/LayoutWrapper'
import Link from 'next/link'
import RenderEnrollmentStatus from '@/components/(events)/RenderEnrollmentStatus'

type EventStatus = 'upcoming' | 'live' | 'ended'
export type eventDataType = {
    id: number;
    title: string;
    date: string;
    time: string;
    participants: number;
    maxParticipants: number;
    status: EventStatus;
    description: string;
    longDescription: string;
    prize: string;
    difficulty: string;
    tags: string[];
    rules: string[];
    schedule: {
        time: string;
        activity: string;
    }[];
    requirements: string[];
    winners: never[];
};

const EventDetail = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);

    // Mock event data (in real app, fetch from API)
    const event: eventDataType = {
        id: parseInt(id || '1'),
        title: "Code Sprint Challenge",
        date: "Dec 25, 2024",
        time: "10:00 AM - 4:00 PM",
        participants: 45,
        maxParticipants: 60,
        status: "upcoming" as EventStatus,
        description: "Fast-paced coding competition with algorithmic challenges. Test your problem-solving skills against the best coders in the department.",
        longDescription: `Join us for an exhilarating coding competition where you'll tackle challenging algorithmic problems under time pressure. This event is designed to test your problem-solving skills, coding efficiency, and ability to work under pressure.

The competition will feature multiple rounds with increasing difficulty, covering topics like dynamic programming, graph algorithms, string manipulation, and mathematical computations. Participants will have access to their preferred programming languages including C++, Java, Python, and JavaScript.

Whether you're a beginner looking to challenge yourself or an experienced coder aiming for the top spot, this competition offers something for everyone. Come prepared to think fast, code faster, and compete with the brightest minds in our department!`,
        prize: "₹15,000",
        difficulty: "Intermediate",
        tags: ["Algorithms", "Data Structures", "Problem Solving"],
        rules: [
            "Individual participation only",
            "Duration: 6 hours with breaks",
            "4-5 problems of varying difficulty",
            "Standard competitive programming rules apply",
            "Plagiarism will result in disqualification"
        ],
        schedule: [
            { time: "10:00 AM", activity: "Registration & Setup" },
            { time: "10:30 AM", activity: "Opening Ceremony & Rules Briefing" },
            { time: "11:00 AM", activity: "Round 1: Warm-up Problems (1 hour)" },
            { time: "12:30 PM", activity: "Round 2: Intermediate Challenges (2 hours)" },
            { time: "2:30 PM", activity: "Lunch Break" },
            { time: "3:30 PM", activity: "Round 3: Advanced Problems (1.5 hours)" },
            { time: "5:00 PM", activity: "Results & Award Ceremony" }
        ],
        requirements: [
            "Laptop with preferred IDE/editor",
            "Stable internet connection",
            "Basic knowledge of algorithms and data structures",
            "Competitive programming experience (preferred)"
        ],
        winners: []
    }

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

                {/* Event Header */}
                <div className="space-y-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                                    {event.title}
                                </h1>
                                <span className={`badge-${event.status}`}>
                                    {event.status === 'live' ? '🔴 Live' :
                                        event.status === 'upcoming' ? '⏳ Upcoming' : '✅ Ended'}
                                </span>
                            </div>

                            <p className="text-lg text-muted-foreground mb-6">
                                {event.description}
                            </p>

                            {/* Event Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="cyber-card text-center py-4">
                                    <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                                    <div className="text-sm font-medium text-foreground">{event.date}</div>
                                    <div className="text-xs text-muted-foreground">{event.time}</div>
                                </div>
                                <div className="cyber-card text-center py-4">
                                    <Users className="w-6 h-6 text-accent mx-auto mb-2" />
                                    <div className="text-sm font-medium text-foreground">{event.participants}/{event.maxParticipants}</div>
                                    <div className="text-xs text-muted-foreground">Participants</div>
                                </div>
                                <div className="cyber-card text-center py-4">
                                    <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                                    <div className="text-sm font-medium text-foreground">{event.prize}</div>
                                    <div className="text-xs text-muted-foreground">Prize Pool</div>
                                </div>
                                <div className="cyber-card text-center py-4">
                                    <Star className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                                    <div className="text-sm font-medium text-foreground">{event.difficulty}</div>
                                    <div className="text-xs text-muted-foreground">Difficulty</div>
                                </div>
                            </div>
                        </div>

                        {/* Enrollment Section */}
                        <RenderEnrollmentStatus event={event} />
                    </div>
                </div>

                {/* Event Details Tabs */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="cyber-card">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">About This Event</h2>
                            <div className="prose prose-invert max-w-none">
                                {event.longDescription.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Schedule */}
                        <div className="cyber-card">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Event Schedule</h2>
                            <div className="space-y-4">
                                {event.schedule.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                                        <div className="text-primary font-mono text-sm bg-primary/10 px-3 py-1 rounded">
                                            {item.time}
                                        </div>
                                        <div className="text-foreground">{item.activity}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Rules */}
                        <div className="cyber-card">
                            <h3 className="text-xl font-semibold text-foreground mb-4">Rules & Guidelines</h3>
                            <ul className="space-y-2">
                                {event.rules.map((rule, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Requirements */}
                        <div className="cyber-card">
                            <h3 className="text-xl font-semibold text-foreground mb-4">Requirements</h3>
                            <ul className="space-y-2">
                                {event.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <AlertCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tags */}
                        <div className="cyber-card">
                            <h3 className="text-xl font-semibold text-foreground mb-4">Topics Covered</h3>
                            <div className="flex flex-wrap gap-2">
                                {event.tags.map(tag => (
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

            </div>
        </LayoutWrapper>
    )
}

export default EventDetail