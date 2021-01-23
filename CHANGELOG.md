# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.1.0]- 2021-01-23

### Added

- Added `disabled` option to disable panel for single stories

### Changed

- [PR](https://github.com/jeslage/storybook-addon-theme-playground/pull/25): Upgrade all dependencies using npm-check-updates
- [PR](https://github.com/jeslage/storybook-addon-theme-playground/pull/21): Bump ini from 1.3.5 to 1.3.8

### Fixed

- [PR](https://github.com/jeslage/storybook-addon-theme-playground/pull/24): Fix crash when no 'controls' property is specified
- [Issue #23](https://github.com/jeslage/storybook-addon-theme-playground/issues/23): Fixed missing controls object inside ThemeControls component

## [2.0.0]- 2020-11-23

### Added

- Added control type `number` and `color` as a replacement for type `counter` and `colorpicker`
- Added icon prop to controls config

### Changed

- [Issue #19](https://github.com/jeslage/storybook-addon-theme-playground/issues/19): Moved state to storybooks `useAddonState` hook to persist current state between story changes
- Updated `withThemePlayground` to storybooks `makeDecorator` method instead of class component

### Removed

- Removed `label` and `description` prop from all input components and moved it to parent control component
- Removed all custom input components in favor of core components from `@storybook/components`

### Deprecated

- Control type `counter` and `colorpicker` will be deprecated in one of the next releases and replaced by type `number` and `color`
- Overrides is deprecated and was replaced by controls object

## [1.3.4]- 2020-09-06

### Added

- [Issue #14](https://github.com/jeslage/storybook-addon-theme-playground/issues/14): Exported `ThemePlaygroundProps` interface

### Fixed

- [Issue #14](https://github.com/jeslage/storybook-addon-theme-playground/issues/14): Optional properties `config` and `overrides` where required inside ThemePlayground `options`

## [1.3.3]- 2020-06-27

### Changed

- [Issue #3](https://github.com/jeslage/storybook-addon-theme-playground/issues/3): Moved `withThemePlayground` to a class component due to invalid hook call while using `@storybook/addon-storyshots`.

## [1.3.2]- 2020-06-27

### Fixed

- Fixed `lodash.startcase` import issue

## [1.3.1]- 2020-06-27

### Added

- `lodash.startcase` dependency

### Fixed

- [PR](https://github.com/jeslage/storybook-addon-theme-playground/pull/5): Bump websocket-extensions from 0.1.3 to 0.1.4

## [1.3.0]- 2020-03-24

### Added

- `Select` and `RadioGroup` to override components

### Changed

- `Select` component to also accept number as a value
- Updated dev dependencies

### Fixed

- `Counter` value handling
- [PR](https://github.com/jeslage/storybook-addon-theme-playground/pull/1): Bump acorn from 6.4.0 to 6.4.1.

## [1.2.2]- 2020-01-26

### Fixed

- Fixed wrong memoization of settings components
- Fixed `hidden` prop of override settings not being applied

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

[unreleased]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v2.1.0...develop
[2.1.0]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v2.1.0...v2.0.0
[2.0.0]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v2.0.0...v1.3.4
[1.3.4]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.3.4...v1.3.3
[1.3.3]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.3.3...v1.3.2
[1.3.2]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.2.2...v1.3.0
[1.2.2]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/jeslage/storybook-addon-theme-playground/compare/v1.0.0...v1.0.1
