import { cn } from '@/lib/utils'
import { Bell, Calendar, Clock, AlertCircle, Trophy, BookOpen } from 'lucide-react'

const Announcements = () => {
    const announcements = [
        {
            id: 1,
            type: 'event',
            icon: Calendar,
            title: 'New Event: Code Sprint Challenge',
            message: 'Registration now open for the upcoming Code Sprint Challenge on Dec 25, 2024',
            time: '2 hours ago',
            priority: 'high'
        },
        {
            id: 2,
            type: 'achievement',
            icon: Trophy,
            title: 'Department Achievement',
            message: 'Cybotixx BCA Department ranked #1 in State-level Programming Competition',
            time: '1 day ago',
            priority: 'medium'
        },
        {
            id: 3,
            type: 'workshop',
            icon: BookOpen,
            title: 'AI/ML Workshop Resources',
            message: 'Workshop materials and recordings are now available in the learning section',
            time: '2 days ago',
            priority: 'low'
        },
        {
            id: 4,
            type: 'maintenance',
            icon: AlertCircle,
            title: 'System Maintenance',
            message: 'Platform will undergo maintenance on Dec 22, 2024 from 2:00 AM to 4:00 AM',
            time: '3 days ago',
            priority: 'medium'
        }
    ]

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-50 border-red-200'
            case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200'
            default: return 'text-green-600 bg-green-50 border-green-200'
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground flex items-center">
                    <Bell className="w-6 h-6 mr-2 text-primary" />
                    Announcements
                </h2>
            </div>

            <div className="space-y-3">
                {announcements.map((announcement) => {
                    const Icon = announcement.icon
                    return (
                        <div
                            key={announcement.id}
                            className={cn(
                                `bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 transition-all duration-300 ${getPriorityColor(announcement.priority)} hover:shadow-md transition-all duration-200`,
                                'hover:from-blue-100 hover:to-purple-100 hover:border-blue-300'
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
                                        {announcement.message}
                                    </p>
                                    <div className="flex items-center text-xs opacity-75">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {announcement.time}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* <div className="text-center">
                <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                    View All Announcements
                </button>
            </div> */}
        </div>
    )
}

export default Announcements
