# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Fixed wrong memoization of settings components

## [1.2.1]- 2020-01-24

### Fixed

- Fixed suffix error on Range and Counter components

## [1.2.0]- 2020-01-08

### Added

- Ability to hide specific theme values or objects
- Added `debounceRate` to config
- Loading state for debounced theme updates
- HSL and default css colors for color value check
- Reset button

### Changed

- State handling inside settings context
- Memoized values on `RadioGroup` and settings components

## [1.1.0]- 2020-01-05

### Added

- Config key to options
- Debouncing of theme updates
- Description prop to every component

### Changed

- Exchanged `Select` with `RadioGroup` component for theme selection
- Updated styling of `SettingsItem`
- Example with variable fonts, updated example stylings
- Updated example to one global decorator instead of multiple stories with different decorators

### Fixed

- `Code` component copy button styling

## [1.0.1]- 2019-12-31

- Bumped up version number due to npm issues

## 1.0.0 - 2019-12-31

- Initial release

[unreleased]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.2.1...develop
[1.2.1]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.0.0...v1.0.1
