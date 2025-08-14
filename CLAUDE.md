# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack for faster builds
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Architecture Overview

This is a Next.js 15 application using the App Router architecture with the following key characteristics:

### Project Structure
- **App Router**: Uses the new `src/app/` directory structure
- **TypeScript**: Fully configured with strict mode enabled
- **Tailwind CSS v4**: Modern CSS framework with PostCSS integration
- **Font Optimization**: Uses Next.js font optimization with Geist fonts

### Key Configuration
- **Path Aliases**: `@/*` maps to `./src/*` for cleaner imports
- **ESLint**: Configured with Next.js TypeScript rules via flat config
- **TypeScript**: Strict mode with modern ES2017 target
- **Module Resolution**: Uses bundler resolution for optimal bundling

### Frontend Stack
- **React 19**: Latest React version with concurrent features
- **Next.js 15**: App Router with automatic optimization
- **Tailwind CSS**: Utility-first styling with dark mode support
- **CSS Variables**: Custom properties for theme consistency

### Development Notes
- Hot reloading is enabled via Turbopack in development
- The app uses Next.js Image component for optimized image loading
- TypeScript path mapping allows clean imports with `@/` prefix
- ESLint extends Next.js recommended rules for TypeScript projects