# Release

This project uses [semantic-release](https://github.com/semantic-release/semantic-release)
with [conventional commits](https://www.conventionalcommits.org/) to trigger releases.

To trigger a release in this project, merge a commit to `main` prefixed with:

1. `fix:` to trigger a patch release,
1. `feat:` to trigger minor, or
1. Use `<type>!:` or the `BREAKING CHANGES: <change>` footer to trigger major

Pre-releases can be made by pushing to an `rc/*` branch.

For more details, see the [Semantic Release](https://illuminate.atlassian.net/wiki/spaces/PENG/pages/17952735277/Semantic+Release) documentation.
