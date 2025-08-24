#!/usr/bin/env bash
# Comprehensive Bash script showcasing all syntax highlighting features

# Variables and parameter expansion
name="$1"
user_home="$HOME"
args_count="$#"
all_args="$*"
script_name="$0"
exit_code="$?"

# Parameter expansion with defaults and transformations
default_name=${name:-"World"}
name_length=${#name}
name_upper=${name^^}
name_prefix=${name:0:3}

# Arithmetic expansion
result=$(( 5 + 3 * 2 ))
counter=$(( counter + 1 ))
math_result=$(( (10 + 5) / 3 ))

# Command substitution (both forms)
current_date=$(date +%Y-%m-%d)
files_count=`ls -1 | wc -l`
hostname_info=$(hostname -f)

# Test operators and conditionals
if [ -f "config.txt" ]; then
    echo "Config file exists"
elif [ -d "/tmp" ]; then
    echo "Temp directory exists" 
elif [ -z "$name" ]; then
    echo "Name is empty"
elif [ -n "$user_home" ]; then
    echo "Home directory is set"
fi

# Numeric comparisons
if [ "$counter" -eq 0 ]; then
    echo "Counter is zero"
elif [ "$result" -gt 10 ]; then
    echo "Result is greater than 10"
fi

# String comparisons
if [ "$name" == "admin" ]; then
    echo "Admin user detected"
elif [ "$hostname_info" != "localhost" ]; then
    echo "Remote host"
fi

# Loops and arrays
numbers=(1 2 3 4 5)
for num in 1 2 3 4 5; do
    total=$(( total + num ))
done

# While loop with test operators
counter=0
while [ "$counter" -lt 5 ]; do
    echo "Counter: $counter"
    counter=$(( counter + 1 ))
done

# Case statement
case "$name" in
    "admin"|"root")
        echo "Privileged user"
        ;;
    "guest")
        echo "Guest user"
        ;;
    *)
        echo "Regular user: $name"
        ;;
esac

# Functions
function greet() {
    local user="$1"
    local greeting="Hello, $user!"
    echo "$greeting"
}

# Function calls
greet "$default_name"

# Redirections and pipes
echo "Writing to file" > output.txt
echo "Appending to file" >> output.txt
ls -la | grep "txt" | wc -l
command 2> error.log
command &> all_output.log

# Here document (if supported)
cat << EOF
This is a here document
with multiple lines
containing $name
EOF

echo "Script completed successfully"
