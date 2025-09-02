import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Image from 'next/image';
import React, { } from 'react'
import Link from 'next/link';
import GoogleLoginButton from '@/components/(auth)/GoogleLoginButton';

export default function Page() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center space-x-3 group">
                        <div className="w-12 h-12 rounded-xl relative flex items-center justify-center transition-transform duration-300 shadow-lg">
                            <Image src={"/logo.png"} alt="cybotixx-logo" fill className="" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-primary">CYBOTIXX</h1>
                            <p className="text-xs text-muted-foreground -mt-1">BCA Department</p>
                        </div>
                    </Link>
                </div>

                {/* Google Sign In Card */}
                <Card className="shadow-card border bg-card/95 backdrop-blur-sm">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
                        <CardDescription className="text-center">
                            Sign in with your Google account to continue
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        <GoogleLoginButton />

                        <div className="text-center text-xs text-muted-foreground">
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </div>

                        {/* <div className="text-center text-sm">
                            <span className="text-muted-foreground">Want to use email instead? </span>
                            <Link href="/signin" className="text-primary hover:underline font-medium">
                                Sign in with email
                            </Link>
                        </div> */}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
