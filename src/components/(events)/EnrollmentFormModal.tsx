"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { EventBase } from "@/types/db-tables.types";
import { enrollForAnEventAction } from "@/actions/participants";

export default function EnrollmentFormModal({
  event,
  setIsEnrolled,
  setShowEnrollForm,
}: {
  event: EventBase;
  isEnrolled: boolean;
  setIsEnrolled: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEnrollForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [enrollForm, setEnrollForm] = useState({
    name: "",
    email: "",
    rollNumber: "",
    experience: "",
    motivation: "",
  });

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate enrollment
    setIsEnrolled(true);
    setShowEnrollForm(false);

    toast("Enrollment Successful! 🎉", {
      description:
        "You've been successfully enrolled in the event. Check your email for confirmation details.",
    });

    // Reset form
    setEnrollForm({
      name: "",
      email: "",
      rollNumber: "",
      experience: "",
      motivation: "",
    });

    const result = await enrollForAnEventAction(event.id);
    toast(result?"SUCCESSFULLY ENRoLLED":"ENROLLMENT FAILED");
  };

  const handleInputChange = (field: string, value: string) => {
    setEnrollForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Enroll in {event.title}
        </h3>

        <form onSubmit={handleEnroll} className="space-y-4">
          <div>
            <Label
              htmlFor="name"
              className="text-sm font-medium text-foreground mb-2 block"
            >
              Full Name *
            </Label>
            <Input
              id="name"
              required
              value={enrollForm.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground mb-2 block"
            >
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={enrollForm.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <Label
              htmlFor="rollNum"
              className="text-sm font-medium text-foreground mb-2 block"
            >
              Roll Number *
            </Label>
            <Input
              id="rollNum"
              required
              value={enrollForm.rollNumber}
              onChange={(e) => handleInputChange("rollNumber", e.target.value)}
              placeholder="Enter your roll number"
            />
          </div>

          {/* <div>
                        <Label htmlFor='experience' className="text-sm font-medium text-foreground mb-2 block">Programming Experience</Label>
                        <Input
                            id='experience'
                            value={enrollForm.experience}
                            onChange={(e) => handleInputChange('experience', e.target.value)}
                            placeholder="e.g., 2 years, Beginner, etc."
                        />
                    </div>

                    <div>
                        <Label htmlFor='motivation' className="text-sm font-medium text-foreground mb-2 block">Why do you want to participate?</Label>
                        <Textarea
                            id='motivation'
                            value={enrollForm.motivation}
                            onChange={(e) => handleInputChange('motivation', e.target.value)}
                            placeholder="Tell us what motivates you to join this event..."
                            rows={3}
                        />
                    </div> */}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEnrollForm(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="btn-cyber flex-1">
              Enroll Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
