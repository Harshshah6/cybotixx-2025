"use client";

import { useState } from 'react'
import { Trophy, Medal, Award, TrendingUp, Users, Calendar, Target, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LayoutWrapper from '@/components/LayoutWrapper'

const Leaderboard = () => {
    const [timeframe, setTimeframe] = useState('overall')
    const [category, setCategory] = useState('all')

    const leaderboardData = [
        {
            rank: 1,
            name: "Rahul Sharma",
            avatar: "RS",
            totalPoints: 2850,
            monthlyPoints: 450,
            weeklyPoints: 120,
            eventsWon: 12,
            eventsParticipated: 25,
            department: "BCA 3rd Year",
            badges: ["🏆", "🥇", "💎"],
            achievements: ["Code Master", "Problem Solver", "Speed Demon"]
        },
        {
            rank: 2,
            name: "Priya Patel",
            avatar: "PP",
            totalPoints: 2720,
            monthlyPoints: 380,
            weeklyPoints: 95,
            eventsWon: 10,
            eventsParticipated: 22,
            department: "BCA 3rd Year",
            badges: ["🥇", "⭐", "🔥"],
            achievements: ["Algorithm Expert", "Team Player", "Innovation Award"]
        },
        {
            rank: 3,
            name: "Arjun Kumar",
            avatar: "AK",
            totalPoints: 2650,
            monthlyPoints: 320,
            weeklyPoints: 85,
            eventsWon: 8,
            eventsParticipated: 20,
            department: "BCA 2nd Year",
            badges: ["🥉", "⚡", "🎯"],
            achievements: ["Rising Star", "Consistent Performer", "Quick Learner"]
        },
        {
            rank: 4,
            name: "Sneha Agarwal",
            avatar: "SA",
            totalPoints: 2480,
            monthlyPoints: 290,
            weeklyPoints: 75,
            eventsWon: 7,
            eventsParticipated: 18,
            department: "BCA 3rd Year",
            badges: ["🏅", "💫", "🎪"],
            achievements: ["Database Queen", "Logic Builder", "Team Captain"]
        },
        {
            rank: 5,
            name: "Vikash Singh",
            avatar: "VS",
            totalPoints: 2350,
            monthlyPoints: 260,
            weeklyPoints: 65,
            eventsWon: 6,
            eventsParticipated: 16,
            department: "BCA 2nd Year",
            badges: ["🎖️", "🌟", "🔴"],
            achievements: ["Frontend Wizard", "UI/UX Expert", "Creative Coder"]
        }
    ]

    const getPointsForTimeframe = (student: typeof leaderboardData[0]) => {
        switch (timeframe) {
            case 'weekly': return student.weeklyPoints
            case 'monthly': return student.monthlyPoints
            case 'overall':
            default: return student.totalPoints
        }
    }

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return <Crown className="w-5 h-5 text-yellow-500" />
            case 2: return <Medal className="w-5 h-5 text-gray-400" />
            case 3: return <Award className="w-5 h-5 text-orange-500" />
            default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>
        }
    }

    const topThree = leaderboardData.slice(0, 3)
    // const others = leaderboardData.slice(3)

    return (
        <LayoutWrapper>
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-foreground">
                        Leaderboard
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        See who&apos;s leading the pack in coding competitions and achievements
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Timeframe:</span>
                            <div className="flex gap-2">
                                {[
                                    { key: 'overall', label: 'All Time' },
                                    { key: 'monthly', label: 'This Month' },
                                    { key: 'weekly', label: 'This Week' }
                                ].map(filter => (
                                    <Button
                                        key={filter.key}
                                        variant={timeframe === filter.key ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setTimeframe(filter.key)}
                                    >
                                        {filter.label}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Target className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Category:</span>
                            <div className="flex gap-2">
                                {[
                                    { key: 'all', label: 'All Events' },
                                    { key: 'coding', label: 'Coding' },
                                    { key: 'hackathon', label: 'Hackathons' }
                                ].map(filter => (
                                    <Button
                                        key={filter.key}
                                        variant={category === filter.key ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setCategory(filter.key)}
                                    >
                                        {filter.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top 3 Podium */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
                    <h2 className="text-2xl font-bold text-center mb-8 text-foreground">Top Performers</h2>
                    <div className="flex justify-center items-end gap-4 md:gap-8 max-w-4xl mx-auto">
                        {/* 2nd Place */}
                        <div className="flex flex-col items-center">
                            <div className="bg-white rounded-xl p-6 shadow-md border border-border text-center min-w-[200px]">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                                    {topThree[1]?.avatar}
                                </div>
                                <h3 className="font-semibold text-foreground">{topThree[1]?.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{topThree[1]?.department}</p>
                                <div className="flex justify-center mb-2">{topThree[1]?.badges.join(' ')}</div>
                                <p className="text-2xl font-bold text-primary">{getPointsForTimeframe(topThree[1])} pts</p>
                            </div>
                            <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full mt-4 font-bold">
                                2nd Place
                            </div>
                        </div>

                        {/* 1st Place */}
                        <div className="flex flex-col items-center -mt-8">
                            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-yellow-200 text-center min-w-[220px]">
                                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                    {topThree[0]?.avatar}
                                </div>
                                <h3 className="text-lg font-bold text-foreground">{topThree[0]?.name}</h3>
                                <p className="text-sm text-muted-foreground mb-3">{topThree[0]?.department}</p>
                                <div className="flex justify-center mb-3 text-lg">{topThree[0]?.badges.join(' ')}</div>
                                <p className="text-3xl font-bold text-primary">{getPointsForTimeframe(topThree[0])} pts</p>
                            </div>
                            <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full mt-4 font-bold text-lg">
                                🏆 Champion
                            </div>
                        </div>

                        {/* 3rd Place */}
                        <div className="flex flex-col items-center">
                            <div className="bg-white rounded-xl p-6 shadow-md border border-border text-center min-w-[200px]">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                                    {topThree[2]?.avatar}
                                </div>
                                <h3 className="font-semibold text-foreground">{topThree[2]?.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{topThree[2]?.department}</p>
                                <div className="flex justify-center mb-2">{topThree[2]?.badges.join(' ')}</div>
                                <p className="text-2xl font-bold text-primary">{getPointsForTimeframe(topThree[2])} pts</p>
                            </div>
                            <div className="bg-orange-400 text-orange-900 px-4 py-2 rounded-full mt-4 font-bold">
                                3rd Place
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Leaderboard Table */}
                <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h2 className="text-xl font-semibold text-foreground flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                            Complete Rankings
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Full leaderboard with detailed statistics
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/30">
                                <tr className="text-left">
                                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Rank</th>
                                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Student</th>
                                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Points</th>
                                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Events Won</th>
                                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Participation</th>
                                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Achievements</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {leaderboardData.map((student) => (
                                    <tr key={student.rank} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {getRankIcon(student.rank)}
                                                <span className="font-semibold">{student.rank}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                                                    {student.avatar}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground">{student.name}</p>
                                                    <p className="text-sm text-muted-foreground">{student.department}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-primary">{getPointsForTimeframe(student)}</p>
                                                <p className="text-xs text-muted-foreground">points</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-center">
                                                <p className="text-lg font-semibold text-foreground">{student.eventsWon}</p>
                                                <p className="text-xs text-muted-foreground">victories</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-center">
                                                <p className="text-lg font-semibold text-foreground">{student.eventsParticipated}</p>
                                                <p className="text-xs text-muted-foreground">events</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {student.achievements.slice(0, 2).map((achievement, idx) => (
                                                    <span key={idx} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                                                        {achievement}
                                                    </span>
                                                ))}
                                                {student.achievements.length > 2 && (
                                                    <span className="text-xs text-muted-foreground">+{student.achievements.length - 2}</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl border border-border p-6 shadow-sm text-center">
                        <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-foreground">156</h3>
                        <p className="text-muted-foreground">Active Participants</p>
                    </div>
                    <div className="bg-white rounded-xl border border-border p-6 shadow-sm text-center">
                        <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-foreground">42</h3>
                        <p className="text-muted-foreground">Events Completed</p>
                    </div>
                    <div className="bg-white rounded-xl border border-border p-6 shadow-sm text-center">
                        <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-foreground">89%</h3>
                        <p className="text-muted-foreground">Participation Rate</p>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    )
}

export default Leaderboard