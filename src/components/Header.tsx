"use client";

import { Container, Text, Button, ThemeToggle, Avatar } from "@/components";
import { useTheme } from "@/providers/ThemeProvider";

export const Header = () => {
  const { theme } = useTheme();

  return (
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
            <Text size="xl" weight="bold" className="cursor-pointer">
              🌙 comoona
            </Text>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="sm">Home</Button>
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
            <Button variant="ghost" size="sm" className="hidden md:flex">
              📨
            </Button>
            <Button variant="primary" size="sm">
              Log In
            </Button>
            <Avatar size="sm" fallback="U" className="cursor-pointer" />
          </div>
        </div>
      </Container>
    </header>
  );
};