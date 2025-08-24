# Comprehensive Python showcase for syntax highlighting
"""
Multi-line string (docstring) demonstrating
triple-quote syntax for documentation
"""

# Imports and from statements
import os
import sys
from typing import List, Dict, Optional
from collections import defaultdict

# Variables and basic data types
name = "Python"
version = 3.9
is_awesome = True
is_boring = False
nothing = None

# String types (single, double, f-string, raw, triple)
single_quote = 'Single quoted string'
double_quote = "Double quoted string"
f_string = f"F-string with {name} version {version}"
raw_string = r"Raw string with \n literal backslashes"
triple_string = '''Triple quoted
multi-line string'''

# Numbers (int, float)
integer_num = 42
float_num = 3.14159
scientific = 2.5e10

# Collections
numbers = [1, 2, 3, 4, 5]
coordinates = (10, 20)
user_data = {"name": "Alice", "age": 30}
unique_items = {1, 2, 3, 4, 5}

# List comprehensions and generator expressions
squares = [x**2 for x in range(10)]
even_squares = [x**2 for x in range(10) if x % 2 == 0]
gen_expr = (x**2 for x in range(10))

# Function definitions with type hints
def calculate_area(length: float, width: float) -> float:
    """Calculate area of a rectangle."""
    return length * width

def process_data(items: List[int]) -> Dict[str, int]:
    result = defaultdict(int)
    for item in items:
        result[f"item_{item}"] = item * 2
    return dict(result)

# Classes and inheritance
class Animal:
    def __init__(self, name: str, species: str):
        self.name = name
        self.species = species
    
    def speak(self) -> str:
        return f"{self.name} makes a sound"

class Dog(Animal):
    def __init__(self, name: str, breed: str):
        super().__init__(name, "Canine")
        self.breed = breed
    
    def speak(self) -> str:
        return f"{self.name} barks loudly!"

# Control flow structures
if version >= 3.8:
    print("Modern Python version")
elif version >= 3.6:
    print("Decent Python version")
else:
    print("Old Python version")

# Loops and iteration
for i in range(5):
    if i == 2:
        continue
    if i == 4:
        break
    print(f"Iteration {i}")

counter = 0
while counter < 3:
    counter += 1
    print(f"Counter: {counter}")

# Exception handling
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
finally:
    print("Cleanup code here")

# Context managers
with open("example.txt", "w") as file:
    file.write("Hello, World!")

# Lambda functions
square = lambda x: x**2
numbers_squared = list(map(lambda x: x**2, numbers))

# Simple function definition
def simple_function():
    return "Function result"

# Boolean operations
result = True and False
result = True or False
result = not True

# Comparison operators
is_equal = (5 == 5)
is_not_equal = (5 != 3)
is_identity = (name is not None)
is_membership = ("Py" in name)

# Main execution guard
if __name__ == "__main__":
    # Create instances
    dog = Dog("Buddy", "Golden Retriever")
    
    # Function calls
    area = calculate_area(10.5, 20.0)
    processed = process_data([1, 2, 3, 4, 5])
    
    # Print results
    print(f"Dog says: {dog.speak()}")
    print(f"Area: {area}")
    print(f"Processed data: {processed}")
    print(f"Squares: {squares}")
    
    # Call simple function
    simple_function()
    
    print("Python showcase complete!")
