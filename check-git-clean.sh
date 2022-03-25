#!/bin/bash -e

if ! git diff --quiet; then echo "

The CI build resulted in additional changed files.
Typically this is due to not running yarn build locally before
submitting a pull request.

The following changes were found:
";

  git diff --exit-code;
fi;
