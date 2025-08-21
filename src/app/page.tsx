import Announcements from "@/components/Announcements";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, Calendar, Code, Target, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { LandingPageConstants } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HomePage = () => {

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
            {/* <Button asChild className="btn-outline-cyber">
              <Link href="/community">
                Join Community
                <Users className="w-4 h-4 ml-2" />
              </Link>
            </Button> */}
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {LandingPageConstants.cybotixxStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={cn(
                  "bg-card border duration-300 rounded-xl p-6 shadow-sm text-center"
                )}
              >
                <Icon className={`size-8 ${stat.color} mx-auto mb-3`} />
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
              {LandingPageConstants.cybotixxFeatures.map((feature, index) => {
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
            {LandingPageConstants.upcomingEvents.map((event, index) => (
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

        {/* About Section */}
        <section className="space-y-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Code className="w-12 h-12 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">About Cybotixx</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We are a passionate community of BCA students dedicated to exploring technology,
                building innovative projects, and fostering a culture of continuous learning and growth.
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-6 h-6 text-primary" />
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To create an inclusive environment where BCA students can enhance their technical skills,
                  collaborate on innovative projects, and prepare for successful careers in technology.
                  We aim to bridge the gap between academic learning and industry requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Rocket className="w-6 h-6 text-primary" />
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To become the leading student technology community that empowers the next generation
                  of developers, innovators, and tech leaders. We envision a future where every member
                  graduates with confidence, skills, and connections to thrive in the tech industry.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-center">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {LandingPageConstants.coreValues.map((value) => {
                const Icon = value.icon
                return (
                  <Card key={value.title} className="text-center border shadow hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Team Section */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-center">Meet Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {LandingPageConstants.teamMembers.map((member) => (
                <Card key={member.name} className="text-center border shadow">
                  <CardContent className="p-2 md:p-6">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold">{member.name}</h4>
                    <Badge variant="secondary" className="mb-2">
                      {member.role}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </div >
    </LayoutWrapper >
  )
};

export default HomePage;
