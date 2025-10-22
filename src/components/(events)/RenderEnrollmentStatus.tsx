"use client";
import React, { useState } from "react";
import EnrollmentFormModal from "./EnrollmentFormModal";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { EventWithRelations } from "@/types/db-tables.types";
import { enrollForAnEventAction } from "@/actions/participants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useLoaderContext } from "../ui/custom/MLoader";

export default function RenderEnrollmentStatus({
  event,
}: {
  event: EventWithRelations;
}) {
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const router = useRouter();
  const { data, isPending } = useSession();
  const { setIsLoading } = useLoaderContext();

  if (isPending || !event) {
    return <></>;
  }

  const renderEnrollmentSection = () => {
    if (!isPending && data?.user) {
      if (event.participants.find((u) => u.userId === data.user.id)) {
        return (
          <div className="text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
            <h3 className="text-lg font-semibold text-foreground">
              You&apos;re Enrolled!
            </h3>
            <p className="text-sm text-muted-foreground">
              Check your email for event details and updates.
            </p>
            {/* <Button className="w-full" variant="outline">
              View My Events
            </Button> */}
          </div>
        );
      }
    }

    const handleEnrollButton = async () => {
      if (!data?.user) {
        router.push("/sign-in");
        return;
      }

      if (event.participants.length == event.max_participants) {
        toast("Participant slots are full!");
        return;
      }

      setIsLoading(true);
      const result = await enrollForAnEventAction(event.id);
      if (result.ok) {
        setIsEnrolled(true);
        setIsLoading(false);
        router.refresh();
        return;
      }

      if (result.error === "roll-not-found") {
        toast("Roll Number Not Setup.");
        router.push("/profile-setup");
        setIsLoading(false);
        return;
      } else if (result.error === "not-auth") {
        router.push("/sign-in");
        setIsLoading(false);
        return;
      }
      toast(result.error);
      setIsLoading(false);
    };

    if (event.event_status === "upcoming") {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground text-center">
            Ready to Compete?
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Spots Available:</span>
              <span className="text-primary font-medium">
                {
                  (event.max_participants ?? event.participants.length + 1) - event.participants.length
                }
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                style={{
                  width: `${(event.participants.length / (event.max_participants ?? 1)) * 100}%`,
                }}
              />
            </div>
          </div>
          <Button
            className="btn-cyber w-full cursor-pointer"
            onClick={() => { if(event.is_group_event) setShowEnrollForm(true) else handleEnrollButton()}}
          >
            Enroll Now
          </Button>
        </div>
      );
    }

    if (event.event_status === "ongoing") {
      return (
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 mx-auto animate-pulse" />
          <h3 className="text-lg font-semibold text-foreground">
            Event is Live!
          </h3>
          <p className="text-sm text-muted-foreground">
            The event has already started. Contact organizers for late entry.
          </p>
          <Button className="btn-cyber w-full animate-pulse-glow" onClick={handleEnrollButton}>
            Join Live Event
          </Button>
        </div>
      );
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
    );
  };

  return (
    <>
      <div className="lg:w-80">
        <div className="cyber-card">{renderEnrollmentSection()}</div>
      </div>

      {/* Enrollment Modal */}
      {showEnrollForm && (
        <EnrollmentFormModal
          event={event}
          setIsEnrolled={setIsEnrolled}
          isEnrolled={isEnrolled}
          setShowEnrollForm={setShowEnrollForm}
        />
      )}
    </>
  );
}

