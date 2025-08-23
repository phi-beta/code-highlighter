#!/usr/bin/env bash
# Sample Bash script for highlighting tests
name="$1"
if [ -z "$name" ]; then
  name="World"
fi
printf "Hello, %s!\n" "$name"
