# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2023-03-20

- Only fail tflint checks when error occurs instead of warnings

## [1.0.22] - 2023-02-24

### Changed

- The command `circleci-continue-long-job-cancel` now recognizes all workflows which have not been stopped. This will pick up ALL long running CircleCI Jobs, and not just ones which are `on-hold`

## [1.0.21] - 2023-02-22

### Changed

- Added optional argument to GitHub commands to let them be configured to run even if prior steps failed

## [1.0.20] - 2023-02-06

### Added

- The command `circleci-continue-long-job-cancel` can ignore - that is not emit age warnings - for workflows where all the on hold (aka yet to be approved approval jobs) have a name containing specified words

## [1.0.19] - 2023-02-06

### Fixed

- 1.0.13 introduced a bug with `circleci-continue-long-job-cancel`'s ability to correctly fetch user
  info for better Slack messages.

## [1.0.18] - 2023-02-03

### Fixed

- further reduce the size of code generated during `slack-notify-compact` command
- setup command only downloads repository once

## [1.0.17] - 2023-01-27

### Fixed

- 1.0.13 introduced a bug with `circleci-continue-long-job-cancel`'s datetime comparisons.

## [1.0.16] - 2023-01-27

### Fixed

- 1.0.14 introduced a bug with some Python `requests` helpers.

## [1.0.15] - 2023-01-27

### Fixed

- 1.0.14 introduced a bug in the way that our Python scripts function in regards to argument parsing.

## [1.0.14] - 2023-01-27

### Added

- Alerting included now for errors originating from CircleCI
- Command: `circleci-continue-long-job-cancel`
  - `--n-windows` argument:
    - Allows for setting how many windows for the continue CircleCI crawler to walk back across
    - Default: 6 (12 hours, each window is 2 hours in length)

## [1.0.13] - 2023-01-23

### Fixed

- The Command `circleci-continue-long-job-cancel` did not have the ability to properly paginate
  over results. This release makes it such that the Cancel command will now walk over a period of
  time, instead of a set number of pages.

## [1.0.12] - 2023-01-20

### Added

- `circleci-stop-if` command

### Changed

- modifications to this orb now require updated CHANGELOG. Versions before this point will be documented in a best effort approach, going forward changelog entries are enforced.
- `slack-circleci-build` has an optional who-did-it parameter which allows overriding author information

## [1.0.11] - 2023-01-03

### Changed

- `slack-circleci-build` has an optional link parameter in case the default Circle URL does not work for your use case

## [1.0.10] - 2022-12-07

### Changed

- the long job canceller script has the following changes:
  - better handles failures on branches that have not been pushed to
  - handle situation where robot makes a commit and human merges it (page the human)
  - don't warn robots to take action

## [1.0.8] - 2022-11-30

### Changed

- build fix

## [1.0.7] - 2023-11-30

### Added

- enrich-mustache-folder command
- git-diff-set-parameters command
- enrich-mustache-from-path-filter job

### Changed

- better documentation for enrich-mustache command
