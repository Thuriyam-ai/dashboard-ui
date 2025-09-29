# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.7.0] - 29-Sept-2025

### Added
- **Bolt-New Migration**: Started migration from React + Vite + Tailwind bolt-new project
  - Added TypeScript types for bolt components (`BoltUser`, `BoltAgent`, `BoltDashboardConfig`, etc.)
  - Migrated mock data from bolt-new project
  - Created `BoltTeamLeaderOverview` component with full MUI conversion
  - Added `/bolt-overview` page for testing migrated components

### Changed
- **Component Architecture**: Established new `bolt-components` folder structure
- **Styling Migration**: Converted Tailwind classes to MUI components and `sx` props
- **Type Safety**: Added comprehensive TypeScript definitions for bolt components

### Technical Details
- Migrated from Tailwind CSS to Material-UI components
- Converted `className` attributes to MUI `sx` prop styling
- Replaced Lucide React icons with Material-UI icons
- Maintained all original functionality with improved type safety
- Successfully built and compiled all migrated components

### Migration Features
- **Agent Performance Metrics**: Interactive leaderboard with quality scores
- **Search & Filter**: Real-time agent search and filtering
- **Responsive Design**: Mobile-first MUI responsive layout
- **Data Visualization**: Progress bars, chips, and metric cards
- **Interactive Elements**: Expandable sections and action buttons

## [Unreleased]

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
