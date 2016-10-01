#!/bin/sh

VERSION=$1

[ ! -n "$VERSION" ] && set -e && echo "Enter release version: " && read VERSION

echo "Releasing $VERSION - are you sure? (y/n):" && read CONFIRM

if [ "$CONFIRM" = "y" ]; then
  npm run build
  # commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"

  # publish
  git push origin refs/tags/v$VERSION
  git push
  npm publish
fi
