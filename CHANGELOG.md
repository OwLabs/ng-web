# 📝 Changelog

All notable changes to this project will be documented in this file.
This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## [Release Version] - _title/description_

### Added

-

### Changed

-

### Fixed

-

### Removed

-

### Added (Testing)

-

### Notes

-
- ***

---

## [1.0.4] - Learning Dashboard Student Portal

### Added

- **Navbar component** with responsive design and logo
- **Floating AI Chat component** for interactive AI assistance
- **Dashboard sections**: Course progress, skill analysis, learning recommendations, activity timeline, achievements, and study goals
- **MUI X Charts** for data visualization (LineChart, BarChart, PieChart)
- **PWA support** with manifest file and optimized viewport metadata
- **Jest unit test** for FloatingAiChat component
- **Coverage collection configuration** for Jest (specific source paths)
- **Package description** with comprehensive project overview

### Changed

- **Replaced Framer Motion with GPU-accelerated CSS animations** for better performance
- **Added dynamic imports** with SSR false for below-fold sections
- **Deferred FloatingAIChat rendering** until page interactive
- **Added content-visibility-auto** to skip rendering offscreen content
- **Added touch-manipulation and 44px min-height** for mobile accessibility
- **Optimized logo loading** with fetchPriority high
- **Added optimizePackageImports** for lucide-react and @mui/x-charts
- **Enhanced Jest configuration** with improved test patterns and coverage rules
- **Updated test setup file** from `.ts` to `.tsx` for React compatibility
- **Modified test path patterns** to include `.test.ts` and `.test.tsx` files
- **Added testPathIgnorePatterns** to exclude node_modules and .next directories
- **Improved responsive design** across all dashboard sections
- **Updated FloatingAiChat, Navbar, and dashboard components**
- **Updated page.spec.tsx** unit tests and page.e2e-spec.tsx E2E tests

### Performance
- **Lighthouse score: 100/100 desktop** and **95+/100 mobile**
- GPU-accelerated animations for smooth 60fps interactions
- Code splitting with dynamic imports for faster initial load
- Optimized bundle size with package import optimization

---

## [1.0.3] - Navbar & Floating AI Chat

### Added

- Navbar component
- Floating AI Chat component
- Installed motion library

---

## [1.0.2] - Added docs

### Changed

- Update README.md with proper explanation of the project

---

## [1.0.1] - EsLint

### Fixed

- Fixed EsLint errors in GitHub Actions

---

## [1.0.0] - Initial setup

### Added

- Initial release of **ng-web**
- ShadCN Ui installed
- Jest framework for both e2e and unit testing
- Plugged **commitizen** into the project

---

### Notes

- Use **semantic versioning**: `MAJOR.MINOR.PATCH` (e.g., 1.0.0 → 1.1.0 → 1.1.1)
- Bootstrapped the ng-web project
- Always add the newest version **on top** of the file.

---
