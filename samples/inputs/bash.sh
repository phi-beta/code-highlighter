#!/usr/bin/env bash
# Sample Bash script for highlighting tests
name="$1"
if [ -z "$name" ]; then
  name="World"
fi
printf "Hello, %s!\n" "$name"

# arithmetic & loop
total=0
for i in 1 2 3; do
  total=$(( total + i ))
done
echo "Total=$total"
