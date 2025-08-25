'use client';
import { Search, Filter } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { parseAsString, useQueryState } from 'nuqs'

export default function SearchAndFilterSection() {

    const [searchTerm, setSearchTerm] = useQueryState('searchTerm', parseAsString.withDefault(""));
    const [filterStatus, setFilterStatus] = useQueryState('filterStatus', parseAsString.withDefault("all"));

    return (
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <div className="flex gap-2 flex-wrap">
                        {[
                            { key: 'all', label: 'All Events' },
                            { key: 'live', label: 'Live' },
                            { key: 'upcoming', label: 'Upcoming' },
                            { key: 'ended', label: 'Completed' }
                        ].map(filter => (
                            <Button
                                key={filter.key}
                                variant={filterStatus === filter.key ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterStatus(filter.key)}
                            >
                                {filter.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
