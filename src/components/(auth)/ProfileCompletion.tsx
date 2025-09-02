'use client'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { userProfileCompleteAction } from '@/actions/user'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'

interface ProfileData {
    rollNumber: string
    semester: string
    phoneNumber: string
}

export const ProfileCompletion = () => {
    const [formData, setFormData] = useState<ProfileData>({
        rollNumber: '',
        semester: '',
        phoneNumber: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const res = await userProfileCompleteAction({
                roll_number: formData.rollNumber,
                phone_number: formData.phoneNumber,
                sem: parseInt(formData.semester),
            });
            if (res.ok) {
                router.push("/");
            } else {
                toast("FAILED TO UPDATE PROFILE.")
            }
        } catch {
            toast("FAILED TO UPDATE PROFILE.")
        }
        setIsSubmitting(false)
    }

    const handleChange = (field: keyof ProfileData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <div className="inline-flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow border relative">
                            <Image src={"/logo.png"} alt='cybotixx-logo' fill />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-primary">CYBOTIXX</h1>
                            <p className="text-xs text-muted-foreground -mt-1">BCA Department</p>
                        </div>
                    </div>
                </div>

                {/* Profile Completion Form */}
                <Card className="shadow border bg-card backdrop-blur-sm">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Complete Your Profile</CardTitle>
                        <CardDescription className="text-center">
                            Help us personalize your experience by providing some additional information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="rollNumber">Roll Number</Label>
                                <Input
                                    id="rollNumber"
                                    type="text"
                                    placeholder="e.g., BCA2023001"
                                    value={formData.rollNumber}
                                    onChange={(e) => handleChange('rollNumber', e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="semester">Current Semester</Label>
                                <Select
                                    value={formData.semester}
                                    onValueChange={(value) => handleChange('semester', value)}
                                    required
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your semester" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1st Semester</SelectItem>
                                        <SelectItem value="2">2nd Semester</SelectItem>
                                        <SelectItem value="3">3rd Semester</SelectItem>
                                        <SelectItem value="4">4th Semester</SelectItem>
                                        <SelectItem value="5">5th Semester</SelectItem>
                                        <SelectItem value="6">6th Semester</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    placeholder="e.g., 9876543210"
                                    maxLength={10}
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting || !formData.rollNumber || !formData.semester || !formData.phoneNumber}
                            >
                                {isSubmitting ? 'Setting up your account...' : 'Complete Setup'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-muted-foreground">
                            This information helps us verify your student status and send important updates
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
