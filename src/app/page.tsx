import Announcements from "@/components/Announcements";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Trophy, Code, Zap, Target, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Code Sprint Challenge",
      date: "Dec 25, 2024",
      time: "10:00 AM",
      participants: 45,
      status: "upcoming" as const,
      description: "Fast-paced coding competition with algorithmic challenges"
    },
    {
      id: 2,
      title: "Web Dev Hackathon",
      date: "Jan 15, 2025",
      time: "9:00 AM",
      participants: 32,
      status: "upcoming" as const,
      description: "24-hour hackathon to build innovative web applications"
    },
    {
      id: 3,
      title: "AI/ML Workshop",
      date: "Dec 20, 2024",
      time: "2:00 PM",
      participants: 28,
      status: "live" as const,
      description: "Hands-on workshop on machine learning fundamentals"
    }
  ]

  const stats = [
    { label: "Active Members", value: "150+", icon: Users, color: "text-blue-600" },
    { label: "Events Hosted", value: "25", icon: Calendar, color: "text-purple-600" },
    { label: "Competitions Won", value: "12", icon: Trophy, color: "text-green-600" },
    { label: "Projects Built", value: "89", icon: Code, color: "text-orange-600" },
  ]

  const features = [
    {
      icon: Zap,
      title: "Learn by Competing",
      description: "Sharpen your skills through exciting coding competitions and challenges"
    },
    {
      icon: Target,
      title: "Track Progress",
      description: "Monitor your improvement with detailed analytics and performance metrics"
    },
    {
      icon: Rocket,
      title: "Build Together",
      description: "Collaborate on projects and learn from fellow developers in our community"
    }
  ]

  return (
    <LayoutWrapper>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8 py-12">
          <div className="animate-fade-in">
            <h1 className="hero-title mb-6">
              Welcome to CYBOTIXX
            </h1>
            <p className="hero-subtitle">
              The ultimate destination for BCA students to learn, compete, and excel in coding.
              Join our vibrant community and turn your passion into expertise.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button asChild className="btn-cyber">
              <Link href="/events">
                Explore Events
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild className="btn-outline-cyber">
              <Link href="/community">
                Join Community
              </Link>
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="hover:border-primary/30 hover:shadow-lg bg-card border rounded-xl p-6 duration-300 shadow-sm text-center hover:scale-101"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </section>

        {/* Main Content Grid - Announcements & Features */}
        <section className="grid lg:grid-cols-3 gap-8">
          {/* Announcements - Takes 1 column */}
          <div className="lg:col-span-1">
            <Announcements />
          </div>

          {/* Features - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Choose Cybotixx?
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Our platform is designed specifically for BCA students who want to excel in competitive programming and software development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="hover:border-primary/30 flex flex-col items-center justify-center hover:shadow-lg bg-card border rounded-xl p-6 duration-300 shadow-sm text-center hover:scale-101"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-md">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground">
                Don&apos;t miss out on these exciting opportunities to showcase your skills
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary hover:text-white">
              <Link href="/events">
                View All Events
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className="event-card flex flex-col animate-fade-in hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {event.description}
                    </p>
                  </div>
                  <span className={`badge-${event.status} ml-3`}>
                    {event.status === 'live' ? '🔴 Live' : '⏳ Upcoming'}
                  </span>
                </div>

                <div className="space-y-2 flex-1 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {event.participants} participants
                  </div>
                </div>

                <Button
                  className={`w-full ${event.status === 'live' ? 'btn-cyber' : 'btn-outline-cyber'}`}
                  asChild
                >
                  <Link href={`/events/${event.id}`}>
                    {event.status === 'live' ? 'Join Now' : 'Learn More'}
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center sm:hidden">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
              <Link href="/events">
                View All Events
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </div >
    </LayoutWrapper >
  )
};

export default HomePage;
