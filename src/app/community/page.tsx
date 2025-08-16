'use client';
import { useState } from 'react'
import { Users, MessageSquare, Heart, Share, BookOpen, Calendar, Award, Star, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LayoutWrapper from '@/components/LayoutWrapper'

const Community = () => {
    const [activeTab, setActiveTab] = useState('discussions')

    const discussions = [
        {
            id: 1,
            title: "Best practices for React Hooks - sharing my experience",
            author: "Rahul Sharma",
            avatar: "RS",
            timeAgo: "2 hours ago",
            category: "React",
            replies: 12,
            likes: 28,
            isHot: true,
            excerpt: "After working with React hooks for 2 years, here are the patterns I've found most useful..."
        },
        {
            id: 2,
            title: "Need help with algorithm optimization in competitive programming",
            author: "Priya Patel",
            avatar: "PP",
            timeAgo: "4 hours ago",
            category: "Algorithms",
            replies: 8,
            likes: 15,
            isHot: false,
            excerpt: "I'm stuck on optimizing this dynamic programming solution. Current time complexity is O(n²)..."
        },
        {
            id: 3,
            title: "Sharing my hackathon winning project - AI-powered study assistant",
            author: "Arjun Kumar",
            avatar: "AK",
            timeAgo: "1 day ago",
            category: "Projects",
            replies: 25,
            likes: 67,
            isHot: true,
            excerpt: "Built this during the recent hackathon. It uses NLP to help students with personalized study plans..."
        },
        {
            id: 4,
            title: "Database design question - normalization vs performance",
            author: "Sneha Agarwal",
            avatar: "SA",
            timeAgo: "2 days ago",
            category: "Database",
            replies: 15,
            likes: 23,
            isHot: false,
            excerpt: "Working on a project where I need to balance normalized schema with query performance..."
        }
    ]

    const resources = [
        {
            id: 1,
            title: "Complete DSA Roadmap 2024",
            type: "Guide",
            author: "CYBOTIXX Team",
            downloads: 1250,
            rating: 4.9,
            tags: ["DSA", "Interview Prep", "Algorithms"]
        },
        {
            id: 2,
            title: "React Best Practices Cheat Sheet",
            type: "Cheat Sheet",
            author: "Alumni Network",
            downloads: 890,
            rating: 4.8,
            tags: ["React", "Frontend", "JavaScript"]
        },
        {
            id: 3,
            title: "System Design Interview Questions",
            type: "Question Bank",
            author: "Senior Students",
            downloads: 2100,
            rating: 4.7,
            tags: ["System Design", "Interview", "Architecture"]
        }
    ]

    const events = [
        {
            id: 1,
            title: "Weekly Code Review Session",
            date: "Every Friday",
            time: "6:00 PM",
            type: "Regular",
            participants: 25,
            host: "Peer Learning Group"
        },
        {
            id: 2,
            title: "Mock Interview Practice",
            date: "Dec 22, 2024",
            time: "3:00 PM",
            type: "Special",
            participants: 15,
            host: "Alumni Mentors"
        },
        {
            id: 3,
            title: "Open Source Contribution Workshop",
            date: "Dec 28, 2024",
            time: "10:00 AM",
            type: "Workshop",
            participants: 40,
            host: "Tech Leads"
        }
    ]

    const achievements = [
        {
            name: "Priya Patel",
            achievement: "Completed 100 Day Coding Challenge",
            timeAgo: "3 hours ago",
            badge: "🔥"
        },
        {
            name: "Arjun Kumar",
            achievement: "Won Web Dev Hackathon",
            timeAgo: "1 day ago",
            badge: "🏆"
        },
        {
            name: "Sneha Agarwal",
            achievement: "Reached 1000+ LeetCode Problems",
            timeAgo: "2 days ago",
            badge: "💎"
        }
    ]

    return (
        <LayoutWrapper>
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-foreground">
                        Community Hub
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Connect, learn, and grow together with fellow developers and coding enthusiasts
                    </p>
                </div>

                {/* Community Stats */}
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl border border-border p-6 shadow-sm text-center">
                        <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-foreground">324</h3>
                        <p className="text-muted-foreground">Active Members</p>
                    </div>
                    <div className="bg-white rounded-xl border border-border p-6 shadow-sm text-center">
                        <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-foreground">1,250</h3>
                        <p className="text-muted-foreground">Discussions</p>
                    </div>
                    <div className="bg-white rounded-xl border border-border p-6 shadow-sm text-center">
                        <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-foreground">89</h3>
                        <p className="text-muted-foreground">Resources Shared</p>
                    </div>
                    <div className="bg-white rounded-xl border border-border p-6 shadow-sm text-center">
                        <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-foreground">156</h3>
                        <p className="text-muted-foreground">Achievements</p>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-xl border border-border shadow-sm">
                    <div className="flex overflow-x-auto">
                        {[
                            { key: 'discussions', label: 'Discussions', icon: MessageSquare },
                            { key: 'resources', label: 'Resources', icon: BookOpen },
                            { key: 'events', label: 'Study Groups', icon: Calendar },
                            { key: 'achievements', label: 'Achievements', icon: Award }
                        ].map(tab => {
                            const Icon = tab.icon
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === tab.key
                                            ? 'text-primary border-primary bg-primary/5'
                                            : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Content based on active tab */}
                {activeTab === 'discussions' && (
                    <div className="space-y-6">
                        {/* Start Discussion Button */}
                        <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                </div>
                                <Input placeholder="Start a new discussion..." className="flex-1" />
                                <Button>Post</Button>
                            </div>
                        </div>

                        {/* Discussions List */}
                        <div className="space-y-4">
                            {discussions.map(discussion => (
                                <div key={discussion.id} className="bg-white rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                                            {discussion.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer">
                                                    {discussion.title}
                                                </h3>
                                                {discussion.isHot && (
                                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                                        <TrendingUp className="w-3 h-3" />
                                                        Hot
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-muted-foreground mb-3">{discussion.excerpt}</p>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="font-medium text-foreground">{discussion.author}</span>
                                                <span>{discussion.timeAgo}</span>
                                                <span className="bg-muted px-2 py-1 rounded text-xs">{discussion.category}</span>
                                                <div className="flex items-center gap-4 ml-auto">
                                                    <div className="flex items-center gap-1">
                                                        <MessageSquare className="w-4 h-4" />
                                                        {discussion.replies}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Heart className="w-4 h-4" />
                                                        {discussion.likes}
                                                    </div>
                                                    <Share className="w-4 h-4 cursor-pointer hover:text-primary" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'resources' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resources.map(resource => (
                            <div key={resource.id} className="bg-white rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                                            {resource.type}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium">{resource.rating}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-3">by {resource.author}</p>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {resource.tags.map(tag => (
                                        <span key={tag} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">{resource.downloads} downloads</span>
                                    <Button size="sm">Download</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="space-y-6">
                        {events.map(event => (
                            <div key={event.id} className="bg-white rounded-xl border border-border p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Calendar className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span>{event.date} at {event.time}</span>
                                                <span>•</span>
                                                <span>Hosted by {event.host}</span>
                                                <span>•</span>
                                                <span>{event.participants} participants</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.type === 'Special' ? 'bg-purple-100 text-purple-700' :
                                                event.type === 'Workshop' ? 'bg-green-100 text-green-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            {event.type}
                                        </span>
                                        <Button size="sm" variant="outline">Join</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'achievements' && (
                    <div className="space-y-4">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="bg-white rounded-xl border border-border p-6 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="text-2xl">{achievement.badge}</div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-foreground">{achievement.name}</h3>
                                        <p className="text-muted-foreground">{achievement.achievement}</p>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{achievement.timeAgo}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </LayoutWrapper>
    )
}

export default Community