'use client';
import { Button } from '@/components/ui/button'
import { Code2, Calendar, X, Menu } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LoginButton from './ui/custom/LoginButton';
import { LoaderContextProvider } from './ui/custom/MLoader';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    const navigation = [
        { name: 'Dashboard', href: '/', icon: Code2 },
        { name: 'Events', href: '/events', icon: Calendar },
        // { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    ]

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    return (
        <div className="min-h-screen bg-background">
            <LoaderContextProvider>
                {/* Header */}
                <header className="bg-white/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <Link href="/" className="flex items-center space-x-3 group">
                                <div className="size-10 relative rounded-xl flex items-center justify-center">
                                    <Image src={"/logo.png"} alt='cybotixx-logo' width={40} height={40} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-primary">
                                        CYBOTIXX
                                    </h1>
                                    <p className="text-xs text-muted-foreground -mt-1">Forum</p>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-2">
                                {navigation.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive(item.href) ? 'active bg-primary/10 text-primary' : 'hover:bg-muted/50'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="font-medium">{item.name}</span>
                                        </Link>
                                    )
                                })}
                            </nav>

                            {/* Notifications & Mobile Menu */}
                            <div className="flex items-center space-x-2">
                                <LoginButton className="hidden md:flex" />

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                </Button>
                            </div>
                        </div>

                        {/* Mobile Navigation */}
                        {isMobileMenuOpen && (
                            <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
                                <div className="flex flex-col space-y-2">
                                    {navigation.map((item) => {
                                        const Icon = item.icon
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`nav-link flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${isActive(item.href) ? 'active bg-primary/10 text-primary' : 'hover:bg-muted/50'
                                                    }`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <Icon className="w-5 h-5" />
                                                <span className="font-medium">{item.name}</span>
                                            </Link>
                                        )
                                    })}
                                </div>
                                <LoginButton className="mt-5" />
                            </nav>
                        )}
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-6 py-8">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t border-border bg-muted/30 mt-16">
                    <div className="container mx-auto px-6 py-8">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center space-x-3 mb-4 md:mb-0">
                                <div className="w-10 h-10 relative rounded-xl flex items-center justify-center">
                                    <Image src={"/logo.png"} alt='cybotixx-logo' width={40} height={40} className="text-white" />
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    © {new Date().getFullYear()} Cybotixx - Forum.
                                </span>
                            </div>
                            <div className="text-sm text-muted-foreground relative ">
                                <Image src="/jain-college-logo.png" alt="" width={500} height={500} className='w-50 h-12 aspect-video' />
                            </div>
                        </div>
                    </div>
                </footer>
            </LoaderContextProvider>
        </div>
    )
}


export default LayoutWrapper