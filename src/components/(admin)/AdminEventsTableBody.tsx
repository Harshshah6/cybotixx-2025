import React, { use } from 'react'
import { EventWithRelations } from '@/types/db-tables.types';
import { TableCell, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function AdminEventsTableBody({ eventsPromise }: { eventsPromise: Promise<EventWithRelations[]> }) {
    const events = use(eventsPromise);
    return (
        <>
            {events.map((event) => (
                <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.scheduled.toDateString()}</TableCell>
                    <TableCell>{event.participants.length}</TableCell>
                    <TableCell>
                        <Badge variant={event.event_status === 'upcoming' ? 'default' : 'secondary'}>
                            {event.event_status}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            ))}

        </>
    )
}
