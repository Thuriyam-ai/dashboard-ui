# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 29-Sept-2025

### Added
- **Unified URL Structure**: Implemented flat URL structure for better navigation
  - `/dashboard` - Main dashboard overview
  - `/analytics` - Call quality analytics (formerly `/team-leader-dashboard/call-quality-analytics`)
  - `/conversations` - Conversation management (formerly `/team-leader-dashboard/conversations`)
  - `/goals` - Goal management (formerly `/team-leader-dashboard/goal-mgmt`)
  - `/campaigns` - Campaign management (formerly `/team-leader-dashboard/campaign-mgmt`)
- **New Dashboard Page**: Created main dashboard with quick stats and navigation buttons
- **Copied Route Structure**: All team-leader-dashboard routes now available at root level

### Changed
- **Navigation Updates**: Updated all internal navigation links to use new flat URLs
- **Sidebar Navigation**: Updated sidebar to use unified URL structure
- **Component Imports**: Fixed dashboard component imports to reference correct locations

### Technical Details
- Moved all pages from `team-leader-dashboard/` to app root with flat structure
- Updated all `router.push()` calls to use new URLs
- Maintained original team-leader-dashboard structure for reference
- Fixed component import paths in dashboard index.ts

## [0.5.6] - 29-Sept-2025

### Changed
- **Fully Flattened Structure**: Moved team-dashboard components directly to dashboard folder
- **Simplified Organization**: Removed nested team-dashboard subfolder

### Structure Improvements
- **Direct Component Access**: All dashboard components now directly in `/components/dashboard/`
- **Cleaner Architecture**: Eliminated all unnecessary nesting for optimal organization
- **Unified Component Structure**: Single dashboard folder contains all related components

## [0.5.5] - 29-Sept-2025

### Added
- **Dashboard Route**: Created `/dashboard` page to fix 404 navigation error
- **Dashboard Overview**: Added main dashboard with quick stats and navigation

### Fixed
- **404 Navigation Error**: Resolved missing `/dashboard` route that was causing 404 errors
- **Sidebar Navigation**: Dashboard navigation item now works correctly

## [0.5.4] - 29-Sept-2025

### Changed
- **Flattened Component Structure**: Moved team-leader-dashboard components directly to dashboard folder
- **Simplified Organization**: Removed nested team-leader-dashboard subfolder

### Structure Improvements
- **Direct Component Access**: Team leader components now directly in `/components/dashboard/`
- **Cleaner Structure**: Eliminated unnecessary nesting for better organization
- **Maintained Navigation**: All navigation paths working correctly after reorganization

## [0.5.3] - 29-Sept-2025

### Changed
- **Component Organization**: Reorganized components structure under single dashboard folder
- **Import Paths**: Updated all import paths to reflect new component organization

### Structure Improvements
- **Unified Dashboard Components**: All dashboard-related components now under `/components/dashboard/`
- **Team Dashboard**: Moved to `/components/dashboard/team-dashboard/`
- **Team Leader Dashboard**: Moved to `/components/dashboard/team-leader-dashboard/`
- **Centralized Exports**: Single entry point for all dashboard components

## [0.5.2] - 29-Sept-2025

### Removed
- **Breadcrumb Components**: Removed breadcrumb navigation from all team-leader dashboard pages
- **URL Display Cleanup**: Simplified URL display by removing "team-leader-dashboard" prefix

### Fixed
- **Sidebar Content Gap**: Fixed gap between sidebar and main content by removing conflicting marginLeft
- **Layout Consistency**: Improved layout alignment across all team-leader pages

## [0.5.1] - 29-Sept-2025

### Fixed
- **Navigation Indentation**: Fixed inconsistent indentation in team-leader sidebar
- **Flattened Navigation Structure**: Removed nested "Configuration" group for consistent spacing

## [0.5.0] - 29-Sept-2025

### Added
- **Unified Sidebar Component**: Single MUI sidebar handling all navigation contexts
- **Context-Aware Navigation**: Dynamic sidebar based on dashboard vs team-leader context
- **Comprehensive Navigation**: Combined all navigation items into one component

### Changed
- **Single Sidebar Architecture**: Removed duplicate sidebar components
- **Context-Based Rendering**: Sidebar adapts navigation based on context prop
- **Import Consolidation**: All sidebar imports now use unified component

### Removed
- **Duplicate Components**: Eliminated team-leader-sidebar.tsx
- **Redundant Code**: Removed duplicate navigation logic and styling

### Technical Improvements
- **DRY Principle**: Single source of truth for all sidebar functionality
- **Maintainability**: Easier to maintain one sidebar component
- **Consistency**: Uniform navigation experience across all pages
- **Bundle Size**: Reduced code duplication and bundle size

## [0.4.0] - 29-Sept-2025

### Added
- **Missing Dependencies**: Added `lucide-react` and `axios` packages for complete functionality

### Changed
- **Sidebar Consolidation**: Converted SCSS sidebar to MUI-only implementation
- **Color Standardization**: Replaced all hardcoded colors with CSS custom properties
- **Error Boundary**: Migrated to MUI Alert components for consistency

### Fixed
- **Build Dependencies**: Resolved missing package imports causing build failures
- **Color Consistency**: Unified color palette across SCSS and MUI components
- **Component Exports**: Streamlined sidebar exports to single MUI implementation

### Technical Improvements
- **Single Source of Truth**: One sidebar component using MUI theming
- **CSS Variables**: All SCSS files now use consistent design tokens
- **MUI Integration**: Error boundary now uses Material-UI components
- **Build Optimization**: Clean build with no missing dependencies

## [0.3.0] - 29-Sept-2025

### Added
- **Hybrid MUI + SCSS Styling System**: Comprehensive styling strategy combining Material-UI and SCSS
- **Unified Theme System**: CSS variables matching MUI theme for consistency across components
- **Component Migration Framework**: Clear guidelines for MUI vs SCSS usage decisions
- **Production Styling Guidelines**: Complete documentation for team adoption
- **Component Standardization**: MUI-first approach with SCSS for specialized components

### Changed
- **SystemHealth Component**: Migrated from SCSS to full MUI implementation with theme integration
- **Sidebar Navigation**: Standardized on MUI version, deprecated legacy inline sx styles
- **Global CSS**: Added unified theme variables for consistent design tokens
- **Build Configuration**: Fixed CSS import issues and autoprefixer warnings

### Fixed
- **Build Errors**: Resolved CSS import resolution issues
- **Autoprefixer Warnings**: Fixed `align-items: end` to `align-items: flex-end` in SCSS files
- **Theme Consistency**: Unified color palette and spacing across all components
- **Development Server**: Ensured clean startup without errors

### Technical Improvements
- **Bundle Optimization**: Better MUI tree shaking and reduced custom CSS
- **Accessibility**: Improved a11y features through MUI components
- **Type Safety**: Enhanced TypeScript integration with MUI
- **Performance**: Optimized component rendering and theme switching
- **Maintainability**: Single source of truth for design tokens

### Documentation
- **STYLING-GUIDELINES.md**: Comprehensive hybrid approach documentation
- **IMPLEMENTATION-SUMMARY.md**: Progress tracking and migration roadmap
- **Component Classification**: Clear categorization of MUI vs SCSS components
- **Migration Patterns**: Examples and best practices for team adoption

## [0.2.0] - 2025-05-05

### Added

- Release archive script (`cicd/release-archive.sh`) for project archiving and S3 upload
- Jenkins pipeline (`cicd/Jenkinsfile.release-archive`) for automated release process

## [0.1.0] - 2025-04-16

### Added

- Initial project setup
- Next.js configuration
- TypeScript configuration
- ESLint and Prettier setup
- Project structure documentation
- Basic component structure
- Environment configuration
- CI/CD pipeline foundation
