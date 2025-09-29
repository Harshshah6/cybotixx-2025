"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { EventBase } from "@/types/db-tables.types";
import { enrollForAnEventAction } from "@/actions/participants";
import { Plus, X } from "lucide-react";

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
    teamName: '',
    memberEmails: [''],
    topic: ''
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
      teamName: '',
      memberEmails: [''],
      topic: ''
    })

    if (event.is_group_event) {
      return console.log(enrollForm);
    }

    const result = await enrollForAnEventAction(event.id);
    toast(result ? "SUCCESSFULLY ENROLLED" : "ENROLLMENT FAILED");
  };

  const handleInputChange = (field: string, value: string) => {
    setEnrollForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleMemberEmailChange = (index: number, value: string) => {
    setEnrollForm(prev => ({
      ...prev,
      memberEmails: prev.memberEmails.map((email, i) => i === index ? value : email)
    }))
  }

  const addMemberEmail = () => {
    if (enrollForm.memberEmails.length < (event.max_group_size ?? 5)) {
      setEnrollForm(prev => ({
        ...prev,
        memberEmails: [...prev.memberEmails, '']
      }))
    }
  }

  const removeMemberEmail = (index: number) => {
    if (enrollForm.memberEmails.length > 1) {
      setEnrollForm(prev => ({
        ...prev,
        memberEmails: prev.memberEmails.filter((_, i) => i !== index)
      }))
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-balance text-foreground mb-4">
          Enroll in - {event.title}
        </h3>

        <form onSubmit={handleEnroll} className="space-y-4">
          <>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Team Name</label>
              <Input
                required
                value={enrollForm.teamName}
                onChange={(e) => handleInputChange('teamName', e.target.value)}
                placeholder="Enter your team name"
              />
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-foreground">Team Member Emails</h4>
                <span className="text-xs text-muted-foreground">2-3 additional members required</span>
              </div>

              <div className="space-y-3">
                {enrollForm.memberEmails.map((email, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => handleMemberEmailChange(index, e.target.value)}
                      placeholder={`Member ${index + 1} email ${index === 0 ? '*' : ''}`}
                      required={index === 0}
                      className="flex-1"
                    />
                    {enrollForm.memberEmails.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => removeMemberEmail(index)}
                        className="h-10 w-10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                    {index === enrollForm.memberEmails.length - 1 && enrollForm.memberEmails.length < (event.max_group_size ?? 5) && (
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={addMemberEmail}
                        className="h-10 w-10"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Topic Name</label>
              <Input
                value={enrollForm.topic}
                onChange={(e) => handleInputChange('topic', e.target.value)}
                placeholder="Topic to be presented"
              />
            </div>
          </>

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
