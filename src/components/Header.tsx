"use client";

import { useState } from "react";
import { Container, Text, Button, ThemeToggle, Avatar, AuthModal } from "@/components";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuth } from "@/providers/AuthProvider";
import { useUser } from "@/providers/UserProvider";
import Link from "next/link";

export const Header = () => {
  const { theme } = useTheme();
  const { user, signOut } = useAuth();
  const { profile } = useUser();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <header 
        className="sticky top-0 z-50 border-b backdrop-blur-sm"
        style={{
          backgroundColor: `${theme.colors.surface}CC`, // Semi-transparent
          borderColor: theme.colors.border
        }}
      >
        <Container size="full">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <Link href="/">
                <Text size="xl" weight="bold" className="cursor-pointer">
                  🌙 comoona
                </Text>
              </Link>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-4">
                <Link href="/">
                  <Button variant="ghost" size="sm">Home</Button>
                </Link>
                <Button variant="ghost" size="sm">Popular</Button>
                <Button variant="ghost" size="sm">All</Button>
              </nav>
            </div>
            
            {/* Search Bar */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-8">
              <div 
                className="relative rounded-full px-4 py-2 text-sm"
                style={{
                  backgroundColor: theme.colors.background,
                  border: `1px solid ${theme.colors.border}`
                }}
              >
                <Text variant="muted" className="cursor-text">
                  🔍 Search comoona...
                </Text>
              </div>
            </div>
            
            {/* User Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {user && (
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  📨
                </Button>
              )}
              
              {user ? (
                <>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                  <Avatar 
                    size="sm" 
                    fallback={profile?.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"} 
                    className="cursor-pointer" 
                  />
                </>
              ) : (
                <Button variant="primary" size="sm" onClick={() => setShowAuthModal(true)}>
                  Log In
                </Button>
              )}
            </div>
          </div>
        </Container>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};