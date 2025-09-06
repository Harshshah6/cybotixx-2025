import { UserWithRelations } from '@/types/db-tables.types'
import { Eye, Edit, Trash2 } from 'lucide-react';
import React, { use } from 'react'
import { TableRow, TableCell } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export default function AdminUsersTableBody({ usersPromise }: { usersPromise: Promise<UserWithRelations[]> }) {
    const users = use(usersPromise);
    
    return (
        <>
            {users.map((user, idx) => (
                <TableRow key={idx}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                        <Badge variant={"default"}>
                            {user.role}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <div className="text-center">
                            <p className="text-lg font-semibold text-foreground">{user.winners.length}</p>
                            <p className="text-xs text-muted-foreground">victories</p>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="text-center">
                            <p className="text-lg font-semibold text-foreground">{user.participants.length}</p>
                            <p className="text-xs text-muted-foreground">events</p>
                        </div>
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
