# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Comoona** is a Reddit-like social platform built with modern web technologies. The application allows users to create posts, comment, and participate in sub-forums (similar to subreddits).

## Development Commands

- `npm run dev` - Start development server with Turbopack for faster builds
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Architecture Overview

### Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS v4 with custom theme system
- **State Management**: React Context (Theme Provider pattern)

### Database Schema (Prisma)

```prisma
User {
  id: String (cuid)
  name: String
  email: String (unique)
  posts: Post[]
  comments: Comment[]
}

SubForum {
  id: String (cuid)
  name: String (unique)
  posts: Post[]
}

Post {
  id: String (cuid)
  title: String
  content: String?
  createdAt: DateTime
  author: User
  SubForum: SubForum
  comments: Comment[]
}

Comment {
  id: String (cuid)
  content: String
  createdAt: DateTime
  author: User
  post: Post
}
```

### Routing System

- `/` - Home page
- `/c` - SubForums listing page
- `/c/[subForum]` - Individual subforum view
- `/c/[subForum]/posts` - Posts in subforum
- `/c/[subForum]/posts/[postId]` - Individual post view (current implementation)
- `/c/[subForum]/posts/[postId]/[postTitle]` - Individual post view (preferred URL structure with title, spaces as underscores)
- `/c/[subForum]/posts/[postId]/comment` - Comment on post
- `/u/[username]` - User profile page

### Theme System

- Custom light/dark theme implementation using React Context
- Theme objects defined in `src/styles/theme.ts`
- `useTheme()` hook for theme management
- Automatic system preference detection

## Development Rules & Principles

### Styling Technology

- **Tailwind CSS** - Use Tailwind classes for all styling
- **Theme Context** - Use `useTheme()` hook for dark/light mode switching
- **Theme System** - Import theme objects from `styles/theme.ts`
- **NO inline styles** - Use Tailwind classes only, never inline styles

### Component Architecture

#### Component Reuse Rule (MANDATORY)

Always reuse existing components from the `components/` folder instead of recreating UI elements in each page. This eliminates code duplication and maintains consistency.

#### Component Organization

- **Page-specific components**: Create `components/[page-name]/` folder with `index.ts` export file
- **Reusable components**: Put components that can be used across multiple pages in the main `components/` folder
- **Break down rule**: Create components when pages have too many lines, when mapping repeatedly, or when breaking down complex components

#### Available UI Components

Import these reusable components from `components/`:

- **Card** - Clean container with subtle borders and shadows (theme-aware)
- **Button** - Primary/secondary button variants (theme-aware)
- **Text** - Typography components with proper hierarchy (theme-aware)
- **Input** - Form input fields (theme-aware)
- **Avatar** - User profile images
- **Screen** - Full-height page wrapper (theme-aware background)
- **Container** - Responsive content wrapper
- **ThemeToggle** - Dark/light mode toggle button

### Design System

#### Design Principles

- **Clean & Minimalistic** - Remove unnecessary elements, focus on content
- **Premium Feel** - Subtle shadows, proper spacing, clean typography
- **Theme Support** - Support both dark and light modes seamlessly
- **Consistent Spacing** - Use Tailwind spacing scale consistently
- **Cursor Consistency** - Every clickable element must have `cursor-pointer` class

#### Layout Rules

- Use `<Screen>` wrapper for each main view (handles theme background)
- Use `<Card>` for content blocks (automatically theme-aware)
- Use `<Container>` for responsive content areas
- Apply margin/padding in layout wrappers, not individual components
- Use responsive containers (flex/grid) for web layout

### Performance & Code Quality

#### Performance Rule (CRITICAL)

Minimize component re-renders and expensive operations. Fewer renders = better performance.

#### DRY (Don't Repeat Yourself)

- Eliminate code duplication by centralizing repeated logic in reusable components
- Create reusable abstractions with configurable props
- Use single source of truth for shared logic
- Apply separation of concerns - each component focuses on its specific responsibility

#### TypeScript & Configuration

- **Path Aliases**: `@/*` maps to `./src/*` for cleaner imports
- **Strict Mode**: TypeScript strict mode enabled
- **ESLint**: Configured with Next.js TypeScript rules

### Database Development

- Use Prisma Client for all database operations
- PostgreSQL with connection pooling via `@prisma/adapter-pg`
- Generated client available at `src/generated/prisma/`

## Communication Style

NO SUGARCOATING. Be direct and honest:
- Tell the user when they're wrong
- Point out cleaner/better/faster solutions immediately
- Don't be polite if it sacrifices clarity
- Direct feedback over diplomatic language
