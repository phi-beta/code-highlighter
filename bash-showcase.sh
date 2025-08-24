#!/bin/bash
# Comprehensive Bash syntax showcase

# Variables and expansions
name="World"
count=${#name}
default_val=${name:-"default"}
upper_name=${name^^}

# Arithmetic expansion
result=$(( 5 + 3 * 2 ))
echo "Result: $result"

# Command substitution
current_date=$(date +%Y-%m-%d)
files=`ls *.sh`

# Parameter expansion
echo "Name: ${name}"
echo "Length: ${#name}"
echo "Default: ${name:-Unknown}"

# Test operators
if [ -f "script.sh" ]; then
    echo "File exists"
elif [ -d "/tmp" ]; then
    echo "Directory exists"
fi

# Arrays and loops
numbers=(1 2 3 4 5)
for num in "${numbers[@]}"; do
    echo "Number: $num"
done

# Functions
function greet() {
    local user="$1"
    echo "Hello, $user!"
}

greet "$name"
