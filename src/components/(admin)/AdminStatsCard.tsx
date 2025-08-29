import React, { Suspense } from 'react'
import { Card, CardContent } from '../ui/card'
import { Calendar, Trophy, Users } from 'lucide-react'
import { db } from '@/lib/db/db'

export default function AdminStatsCard() {
    return (
        <>
            <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                            <p className="text-2xl font-bold text-foreground">
                                <Suspense fallback={<span className="h-6 w-12 bg-muted animate-pulse" />}>
                                    <GetTotalUsers />
                                </Suspense>
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Active Events</p>
                            <p className="text-2xl font-bold text-foreground">
                                <Suspense fallback={<span className="h-6 w-12 bg-muted animate-pulse" />}>
                                    <GetTotalEvents />
                                </Suspense>
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Registrations</p>
                            <p className="text-2xl font-bold text-foreground">
                                <Suspense fallback={<span className="h-6 w-12 bg-muted animate-pulse" />}>
                                    <GetTotalRegistrations />
                                </Suspense>
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

async function GetTotalUsers() {
    const result = await db.query.user.findMany();
    return <>{result.length}</>;
}

async function GetTotalEvents() {
    const result = await db.query.event.findMany();
    return <>{result.length}</>;
}

async function GetTotalRegistrations() {
    const result = await db.query.participants.findMany();
    return <>{result.length}</>;
}