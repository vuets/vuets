#!/bin/sh

set -e

VERSION=$1

[ ! -n "$VERSION" ] && echo "Enter release version: " && read VERSION

echo "Releasing $VERSION - are you sure? (y/n):" && read CONFIRM && [ "$CONFIRM" != "y" ] && exit 0

npm run build

# commit
git add -A
git commit -m "[build] $VERSION"
npm version $VERSION --message "[release] $VERSION"

# publish
git push origin refs/tags/v$VERSION
git push
npm publish
echo "Released $VERSION"
