import { ProfileCompletion } from '@/components/(auth)/ProfileCompletion';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function ProfileSetup() {
    const data = await auth.api.getSession({
        headers: await headers()
    })
    const user = data?.user;

    if (!user) redirect('/');

    if ((user.roll_number == '#NUll#') || (user.phone_number == '#NUll#'))
        return (<ProfileCompletion />)
    else
        redirect('/');
}
