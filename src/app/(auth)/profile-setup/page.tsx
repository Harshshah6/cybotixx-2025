import { ProfileCompletion } from '@/components/(auth)/ProfileCompletion';
import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function ProfileSetup() {
    const data = await getServerSession();
    const user = data?.user;

    if (!user) redirect('/');

    if ((user.roll_number == '#NUll#') || (user.phone_number == '#NUll#'))
        return (<ProfileCompletion />)
    else
        redirect('/');
}
