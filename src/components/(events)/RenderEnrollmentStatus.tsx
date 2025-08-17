'use client'
import React, { useState } from 'react'
import EnrollmentFormModal from './EnrollmentFormModal'
import { CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { Button } from '../ui/button'
import { eventDataType } from '@/app/events/[id]/page'

export default function RenderEnrollmentStatus({ event }: { event: eventDataType }) {
    const [showEnrollForm, setShowEnrollForm] = useState(false)
    const [isEnrolled,setIsEnrolled] = useState(false)

    const renderEnrollmentSection = () => {
        if (isEnrolled) {
            return (
                <div className="text-center space-y-4">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                    <h3 className="text-lg font-semibold text-foreground">You&apos;re Enrolled!</h3>
                    <p className="text-sm text-muted-foreground">
                        Check your email for event details and updates.
                    </p>
                    <Button className="w-full" variant="outline">
                        View My Events
                    </Button>
                </div>
            )
        }

        if (event.status === 'upcoming') {
            return (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground text-center">
                        Ready to Compete?
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                            <span>Spots Available:</span>
                            <span className="text-primary font-medium">
                                {event.maxParticipants - event.participants}
                            </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                            <div
                                className="h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                                style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                            />
                        </div>
                    </div>
                    <Button
                        className="btn-cyber w-full"
                        onClick={() => setShowEnrollForm(true)}
                    >
                        Enroll Now
                    </Button>
                </div>
            )
        }

        if (event.status === 'live') {
            return (
                <div className="text-center space-y-4">
                    <AlertCircle className="w-12 h-12 text-accent mx-auto animate-pulse" />
                    <h3 className="text-lg font-semibold text-foreground">Event is Live!</h3>
                    <p className="text-sm text-muted-foreground">
                        The event has already started. Contact organizers for late entry.
                    </p>
                    <Button className="btn-cyber w-full animate-pulse-glow">
                        Join Live Event
                    </Button>
                </div>
            )
        }

        // Default case for ended events
        return (
            <div className="text-center space-y-4">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-semibold text-foreground">Event Ended</h3>
                <p className="text-sm text-muted-foreground">
                    This event has concluded. Check out the winners below!
                </p>
            </div>
        )
    }

    return (
        <>
            <div className="lg:w-80">
                <div className="cyber-card">
                    {renderEnrollmentSection()}
                </div>
            </div>

            {/* Enrollment Modal */}
            {showEnrollForm &&
                <EnrollmentFormModal
                    event={event}
                    setIsEnrolled={setIsEnrolled}
                    isEnrolled={isEnrolled}
                    setShowEnrollForm={setShowEnrollForm}
                />
            }
        </>
    )
}
