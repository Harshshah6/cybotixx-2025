import { cn, timeAgo } from '@/lib/utils'
import { Bell, Calendar, Clock, AlertCircle, Trophy, BookOpen } from 'lucide-react'
import { Skeleton } from './ui/skeleton'
import { getAnnouncementsAction } from '@/actions/announcement'
import { Suspense } from 'react'

export const Announcements = async () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground flex items-center">
                    <Bell className="w-6 h-6 mr-2 text-primary" />
                    Announcements
                </h2>
            </div>

            <div className="space-y-3">
                <Suspense fallback={<AnnouncementSkeleton />}>
                    <FetchAnnouncements />
                </Suspense>
            </div>
        </div>
    )
}

async function FetchAnnouncements() {

    const announcements = await getAnnouncementsAction();

    const getPriorityColor = (priority: number) => {
        switch (priority) {
            case 1: return 'text-red-600 bg-red-50 border-red-200'
            case 2: return 'text-blue-600 bg-blue-50 border-blue-200'
            default: return 'text-green-600 bg-green-50 border-green-200'
        }
    }

    const getAnnouncementIcon = (type: string) => {
        switch (type) {
            case 'event': return Calendar
            case 'achievement': return Trophy
            case 'workshop': return BookOpen
            case 'maintenance': return AlertCircle
            default: return Bell
        }
    }

    return (
        <>
            {announcements.map((announcement) => {
                const Icon = getAnnouncementIcon(announcement.type_of_announcement)
                return (
                    <div
                        key={announcement.id}
                        className={cn(
                            `bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 transition-all duration-300 ${getPriorityColor(announcement.importance_level)} hover:shadow transition-all duration-200`,
                            // 'hover:from-blue-100 hover:to-purple-100 hover:border-blue-300'
                        )}
                    >
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <Icon className="w-5 h-5 mt-0.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm mb-1">
                                    {announcement.title}
                                </h3>
                                <p className="text-sm opacity-90 mb-2">
                                    {announcement.description}
                                </p>
                                <div className="flex items-center text-xs opacity-75">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {timeAgo(announcement.createdAt)}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            {!announcements.length && (
                <div className="mt-8 text-center text-muted-foreground">
                    No announcements available.
                </div>
            )}
        </>
    );
}

function AnnouncementSkeleton() {
    return (
        <>
            {
                [0, 1, 2, 3].map((i) => (
                    <div key={i} className="border shadow rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <Skeleton className="w-5 h-5 mt-0.5 rounded" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-2">
                                <Skeleton className="h-4 w-1/3 rounded" />
                                <Skeleton className="h-3 w-3/4 rounded" />
                                <Skeleton className="h-3 w-2/4 rounded" />
                                <div className="flex items-center space-x-2">
                                    <Skeleton className="w-3 h-3 rounded" />
                                    <Skeleton className="h-3 w-16 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
