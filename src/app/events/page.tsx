import LayoutWrapper from '@/components/LayoutWrapper'
import SearchAndFilterSection from '@/components/(events)/SearchAndFilterSection';
import EventsGrid from '@/components/(events)/EventsGrid';
import { Search } from 'lucide-react';
import { Suspense } from 'react';
import { getEventsAction } from '@/actions/event';

export const dynamic = "force-dynamic";

const Events = () => {
    return (
        <LayoutWrapper>
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-foreground">
                        Events & Competitions
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Join exciting coding competitions, workshops, and hackathons. Challenge yourself and win amazing prizes!
                    </p>
                </div>

                {/* Search and Filters */}
                <Suspense>
                    <SearchAndFilterSection />
                </Suspense>

                {/* Events Grid */}
                <Suspense>
                    <EventsGrid events={getEventsAction()} fallBack={fallbackUI()} />
                </Suspense>
            </div>
        </LayoutWrapper>
    )
}

function fallbackUI() {
    return (
        <div className="text-center py-16 bg-white rounded-xl border border-border">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find more events.
            </p>
        </div>
    );
}

export default Events