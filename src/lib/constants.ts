import { Users, Calendar, Trophy, Code, Zap, Target, Rocket, Lightbulb, Heart } from "lucide-react";

export const LandingPageConstants = {
    upcomingEvents: [
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
    ],

    cybotixxStats: [
        { label: "Active Members", value: "150+", icon: Users, color: "text-blue-600" },
        { label: "Events Hosted", value: "25", icon: Calendar, color: "text-purple-600" },
        { label: "Competitions Won", value: "12", icon: Trophy, color: "text-green-600" },
        { label: "Projects Built", value: "89", icon: Code, color: "text-orange-600" },
    ],

    cybotixxFeatures: [
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
    ],
    teamMembers: [
        {
            name: 'Ramya P',
            role: 'Faculty Coordinator',
            image: '/placeholder.svg',
            description: 'Professor of Computer Science with 15+ years of experience'
        },
        {
            name: 'Muhammed Falah',
            role: 'Club President',
            image: '/placeholder.svg',
            description: 'Third year BCA student, AI/ML enthusiast'
        },
        {
            name: 'Mohammed Maaz',
            role: 'Vice President',
            image: '/placeholder.svg',
            description: 'Third year BCA student, Full-stack developer'
        },
        {
            name: 'Harsh S Shah',
            role: 'Technical Lead',
            image: 'https://avatars.githubusercontent.com/u/69447184',
            description: 'Second year BCA student, Full-stack developer'
        }
    ],

    coreValues: [
        {
            icon: Lightbulb,
            title: 'Innovation',
            description: 'We foster creative thinking and encourage innovative solutions to real-world problems.'
        },
        {
            icon: Users,
            title: 'Collaboration',
            description: 'We believe in the power of teamwork and building strong professional networks.'
        },
        {
            icon: Target,
            title: 'Excellence',
            description: 'We strive for excellence in everything we do, from coding to leadership.'
        },
        {
            icon: Heart,
            title: 'Inclusivity',
            description: 'We welcome students from all backgrounds and skill levels to join our community.'
        }
    ]
} as const;