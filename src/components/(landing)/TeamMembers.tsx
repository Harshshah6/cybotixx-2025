import { TeamSelectType } from '@/types/db-tables.types'
import React, { use } from 'react'
import { Card, CardContent } from '../ui/card';
import { LandingPageConstants } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

export default function TeamMembers({ teams: teamsPromise }: { teams: Promise<TeamSelectType[]> }) {
    const teams = use(teamsPromise);
    return (
        <>
            {
                teams.map((member) => (
                    <Card key={member.name} className="text-center border shadow">
                        <CardContent className="p-2 md:p-6">
                            <Avatar className="w-20 h-20 mx-auto mb-4">
                                <AvatarImage src={member.image ?? ""} alt={member.name} />
                                <AvatarFallback>
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <h4 className="font-semibold">{member.name}</h4>
                            <Badge variant="secondary" className="mb-2">
                                {member.role}
                            </Badge>
                            <p className="text-sm text-muted-foreground">{member.description}</p>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}

export function TeamMembersSkeleton() {
    return (<>
        {LandingPageConstants.teamMembers.map((member) => (
            <Card key={member.name} className="text-center border shadow">
                <CardContent className="p-2 md:p-6">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold">{member.name}</h4>
                    <Badge variant="secondary" className="mb-2">
                        {member.role}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
            </Card>
        ))}
    </>);
}
