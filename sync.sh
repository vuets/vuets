#!/bin/sh

[ ! -n "$1" ] && echo "1st arg (target_dir) is required." && exit 0

rsync -avh --progress \
      --include 'src/***' --include 'lib/***' --exclude '*' \
      . $1/node_modules/vuets
