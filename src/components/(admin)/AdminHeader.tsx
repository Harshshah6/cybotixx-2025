'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function AdminHeader() {
    const [isAddEventOpen, setIsAddEventOpen] = useState(false)
    const handleAddEvent = () => {
        // Handle adding new event logic here
        console.log('Adding new event:', newEvent)
        setIsAddEventOpen(false)
        // Reset form
        setNewEvent({
            title: '',
            description: '',
            date: '',
            time: '',
            guidelines: '',
            requirements: '',
            maxParticipants: '',
            registrationDeadline: ''
        })
    }

    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        guidelines: '',
        requirements: '',
        maxParticipants: '',
        registrationDeadline: ''
    })

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage BCA club activities</p>
            </div>
            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Event
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Event</DialogTitle>
                        <DialogDescription>
                            Create a new event for BCA club members.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Event Title</Label>
                            <Input
                                id="title"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                placeholder="Enter event title"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                placeholder="Brief description of the event"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="guidelines">Rules & Guidelines</Label>
                            <Textarea
                                id="guidelines"
                                value={newEvent.guidelines}
                                onChange={(e) => setNewEvent({ ...newEvent, guidelines: e.target.value })}
                                placeholder="Event guidelines and rules"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="requirements">Requirements</Label>
                            <Textarea
                                id="requirements"
                                value={newEvent.requirements}
                                onChange={(e) => setNewEvent({ ...newEvent, requirements: e.target.value })}
                                placeholder="Event requirements or prerequisites"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="date">Event Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={newEvent.date}
                                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="time">Event Time</Label>
                                <Input
                                    id="time"
                                    type="time"
                                    value={newEvent.time}
                                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="maxParticipants">Max Participants</Label>
                                <Input
                                    id="maxParticipants"
                                    type="number"
                                    value={newEvent.maxParticipants}
                                    onChange={(e) => setNewEvent({ ...newEvent, maxParticipants: e.target.value })}
                                    placeholder="50"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="difficulty">Difficulty</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Difficulty" />
                                    </SelectTrigger>
                                    <SelectContent defaultValue={"easy"}>
                                        <SelectItem value="easy">easy</SelectItem>
                                        <SelectItem value="medium">medium</SelectItem>
                                        <SelectItem value="hard">hard</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsAddEventOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleAddEvent}>
                            Create Event
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
