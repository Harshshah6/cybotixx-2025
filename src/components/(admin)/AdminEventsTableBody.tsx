import React, { use } from 'react'
import { TableCell, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { getEventsActionReturnType } from '@/actions/event';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '../ui/context-menu';

export default function AdminEventsTableBody({ eventsPromise }: { eventsPromise: Promise<getEventsActionReturnType[]> }) {
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
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                </DrawerTrigger>
                                <DrawerContent className='container m-auto'>
                                    <DrawerHeader>
                                        <DrawerTitle>Participants List</DrawerTitle>
                                        <DrawerDescription asChild className='max-h-[50vh] mt-4 overflow-auto'>
                                            <div className='flex flex-col gap-3'>
                                                {
                                                    event.participants.map((item, idx) => (
                                                        <UserItem key={idx} participant={item} />
                                                    ))
                                                }
                                            </div>
                                        </DrawerDescription>
                                    </DrawerHeader>
                                    <DrawerFooter>
                                        {/* <Button>Submit</Button> */}
                                        <DrawerClose asChild>
                                            <Button variant="outline">Dismiss</Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
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


function UserItem({ participant: item }: { participant: getEventsActionReturnType["participants"][number] }) {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className='bg-muted rounded p-2 grid grid-cols-2 gap-3'>
                    <div className='text-start'>{item.user.name}</div>
                    <div className='text-start'>{item.user.roll_number}</div>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>Announce 1st winner</ContextMenuItem>
                <ContextMenuItem>Announce 2nd winner</ContextMenuItem>
                <ContextMenuItem>Announce 3rd winner</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}