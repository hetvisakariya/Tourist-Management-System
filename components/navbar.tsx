"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogIn, LogOut, Settings, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout, isAuthenticated, loading } = useAuth();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/hotels", label: "Hotels" },
        { href: "/cabs", label: "Cabs" },
        { href: "/guides", label: "Tour Guides" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header className="flex justify-center sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">TravelEase</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    {!loading && (
                        <>
                            {isAuthenticated ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <User className="h-4 w-4" />
                                            {user?.name}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <Link href="/profile">
                                            <DropdownMenuItem>
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Profile</span>
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link href="/bookings">
                                            <DropdownMenuItem>
                                                <BookOpen className="mr-2 h-4 w-4" />
                                                <span>My Bookings</span>
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={logout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Sign out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <>
                                    <Link href="/auth/signin">
                                        <Button variant="outline" size="sm">
                                            <LogIn className="mr-2 h-4 w-4" />
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/auth/signup">
                                        <Button size="sm">
                                            <User className="mr-2 h-4 w-4" />
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </>
                    )}
                </div>

                {/* Mobile Navigation */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <nav className="flex flex-col gap-4 mt-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-lg font-medium transition-colors hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {!loading && (
                                <div className="flex flex-col gap-2 mt-4">
                                    {isAuthenticated ? (
                                        <>
                                            <Link href="/profile" onClick={() => setIsOpen(false)}>
                                                <Button variant="outline" className="w-full justify-start">
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    Profile
                                                </Button>
                                            </Link>
                                            <Link href="/bookings" onClick={() => setIsOpen(false)}>
                                                <Button variant="outline" className="w-full justify-start">
                                                    <BookOpen className="mr-2 h-4 w-4" />
                                                    My Bookings
                                                </Button>
                                            </Link>
                                            <Button
                                                className="w-full justify-start"
                                                variant="destructive"
                                                onClick={() => {
                                                    logout();
                                                    setIsOpen(false);
                                                }}
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Sign Out
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                                                <Button variant="outline" className="w-full">
                                                    <LogIn className="mr-2 h-4 w-4" />
                                                    Sign In
                                                </Button>
                                            </Link>
                                            <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                                                <Button className="w-full">
                                                    <User className="mr-2 h-4 w-4" />
                                                    Sign Up
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
