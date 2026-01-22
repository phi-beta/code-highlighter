# Ruby comprehensive sample demonstrating modern features

require 'json'
require_relative 'helper'

# Class with inheritance and mixins
class Animal
  attr_accessor :name, :age
  attr_reader :species
  
  @@count = 0
  
  def initialize(name, age, species)
    @name = name
    @age = age
    @species = species
    @@count += 1
  end
  
  def self.total_count
    @@count
  end
  
  def speak
    raise NotImplementedError, 'Subclasses must implement speak'
  end
  
  def description
    "#{@name} is a #{@age}-year-old #{@species}"
  end
end

# Module for mixins
module Flyable
  def fly
    puts "#{name} is flying!"
  end
  
  def altitude=(value)
    @altitude = value
  end
  
  def altitude
    @altitude || 0
  end
end

# Class with mixin
class Bird < Animal
  include Flyable
  
  def initialize(name, age)
    super(name, age, 'bird')
  end
  
  def speak
    'Chirp chirp!'
  end
end

# Struct for simple data structures
Person = Struct.new(:first_name, :last_name, :age) do
  def full_name
    "#{first_name} #{last_name}"
  end
  
  def adult?
    age >= 18
  end
end

# Symbol literals
status_pending = :pending
status_completed = :completed
symbols_hash = { success: true, message: 'Done' }

# String interpolation
name = 'Ruby'
version = 3.2
puts "Welcome to #{name} #{version}"
puts "Math: 2 + 2 = #{2 + 2}"

# Multi-line strings
multi_line = <<~HEREDOC
  This is a
  multi-line string
  with heredoc
HEREDOC

# Regular expressions
email_regex = /^[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+$/i
phone_regex = %r{^\d{3}-\d{3}-\d{4}$}

if 'test@example.com' =~ email_regex
  puts 'Valid email'
end

# Percent literals
words = %w[apple banana cherry]
symbols = %i[red green blue]
shell_command = %x{ls -la}

# Arrays and ranges
numbers = [1, 2, 3, 4, 5]
range = (1..10)
exclusive_range = (1...10)

# Array operations
doubled = numbers.map { |n| n * 2 }
evens = numbers.select { |n| n.even? }
sum = numbers.reduce(0) { |acc, n| acc + n }
sum_shorthand = numbers.reduce(:+)

# Hash
person = {
  name: 'Alice',
  age: 30,
  city: 'New York'
}

# Hash with string keys
config = {
  'host' => 'localhost',
  'port' => 3000,
  'debug' => true
}

# Blocks and iterators
numbers.each do |n|
  puts n
end

# Single-line block
squares = numbers.map { |n| n ** 2 }

# Block with multiple parameters
hash = { a: 1, b: 2, c: 3 }
hash.each { |key, value| puts "#{key}: #{value}" }

# Proc and Lambda
my_proc = Proc.new { |x| x * 2 }
my_lambda = ->(x) { x * 2 }
lambda_alt = lambda { |x| x * 2 }

puts my_proc.call(5)
puts my_lambda.call(5)

# Method definition with default parameters
def greet(name, greeting: 'Hello', punctuation: '!')
  "#{greeting}, #{name}#{punctuation}"
end

puts greet('World')
puts greet('Ruby', greeting: 'Hi', punctuation: '!!')

# Splat operator
def sum_all(*numbers)
  numbers.reduce(:+)
end

puts sum_all(1, 2, 3, 4, 5)

# Double splat for keyword arguments
def configure(**options)
  options.each { |k, v| puts "#{k} = #{v}" }
end

configure(host: 'localhost', port: 3000, debug: true)

# Conditional statements
age = 25

if age >= 18
  puts 'Adult'
elsif age >= 13
  puts 'Teenager'
else
  puts 'Child'
end

# Unless statement
unless age < 18
  puts 'Can vote'
end

# Ternary operator
status = age >= 18 ? 'adult' : 'minor'

# Case statement
grade = 'B'

case grade
when 'A'
  puts 'Excellent'
when 'B', 'C'
  puts 'Good'
when 'D'
  puts 'Pass'
else
  puts 'Fail'
end

# Case with ranges
score = 85

case score
when 90..100
  puts 'A'
when 80..89
  puts 'B'
when 70..79
  puts 'C'
else
  puts 'F'
end

# Loops
i = 0
while i < 5
  puts i
  i += 1
end

until i >= 10
  puts i
  i += 1
end

# For loop
for num in 1..5
  puts num
end

# Loop with break and next
loop do
  i += 1
  next if i.even?
  break if i > 20
  puts i
end

# Error handling
begin
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "Error: #{e.message}"
rescue StandardError => e
  puts "Unexpected error: #{e.message}"
ensure
  puts "Cleanup code"
end

# Raise exception
def validate_age(age)
  raise ArgumentError, 'Age must be positive' if age < 0
  raise ArgumentError, 'Age must be reasonable' if age > 150
  age
end

# Retry mechanism
attempts = 0
begin
  attempts += 1
  puts "Attempt #{attempts}"
  raise 'Random error' if rand < 0.7
  puts 'Success!'
rescue
  retry if attempts < 3
  puts 'Failed after 3 attempts'
end

# Method visibility
class Example
  def public_method
    'Public'
  end
  
  private
  
  def private_method
    'Private'
  end
  
  protected
  
  def protected_method
    'Protected'
  end
end

# Class methods and instance methods
class Calculator
  def self.add(a, b)
    a + b
  end
  
  def multiply(a, b)
    a * b
  end
end

puts Calculator.add(5, 3)
calc = Calculator.new
puts calc.multiply(5, 3)

# Singleton methods
obj = Object.new

def obj.special_method
  'This is a singleton method'
end

puts obj.special_method

# Method aliasing
class String
  alias_method :original_reverse, :reverse
  
  def reverse
    "Reversed: #{original_reverse}"
  end
end

# Global variables
$global_var = 'I am global'
$stdin
$stdout
$stderr

# Special global variables
puts $0          # Current script name
puts __FILE__    # Current file name
puts __LINE__    # Current line number

# Constants
PI = 3.14159
MAX_SIZE = 100

module Constants
  VERSION = '1.0.0'
  API_URL = 'https://api.example.com'
end

# Class variables vs instance variables
class Counter
  @@class_count = 0
  
  def initialize
    @instance_count = 0
    @@class_count += 1
  end
  
  def increment
    @instance_count += 1
  end
  
  def self.class_count
    @@class_count
  end
  
  def instance_count
    @instance_count
  end
end

# Method chaining
result = [1, 2, 3, 4, 5]
  .map { |n| n * 2 }
  .select { |n| n > 5 }
  .reduce(:+)

# Safe navigation operator
user = nil
city = user&.address&.city

# Hash default values
hash_with_default = Hash.new(0)
hash_with_default[:count] += 1

# String methods
text = 'hello world'
puts text.upcase
puts text.capitalize
puts text.reverse
puts text.include?('world')
puts text.split(' ')

# Array methods
arr = [1, 2, 3, 4, 5]
puts arr.first
puts arr.last
puts arr.length
puts arr.empty?
puts arr.include?(3)
puts arr.join(', ')

# Enumerable methods
numbers = [1, 2, 3, 4, 5, 6]

all_positive = numbers.all? { |n| n > 0 }
any_even = numbers.any? { |n| n.even? }
none_negative = numbers.none? { |n| n < 0 }
first_even = numbers.find { |n| n.even? }
evens_only = numbers.select { |n| n.even? }
odds_only = numbers.reject { |n| n.even? }

# Zip and transpose
a = [1, 2, 3]
b = ['a', 'b', 'c']
zipped = a.zip(b)

# Pattern matching (Ruby 3.0+)
case [1, 2, 3]
in [1, 2, 3]
  puts 'Exact match'
in [1, *, 3]
  puts 'First and last match'
else
  puts 'No match'
end

# Hash pattern matching
case { name: 'Alice', age: 30 }
in { name: 'Alice', age: }
  puts "Alice is #{age} years old"
end

# Endless method definition (Ruby 3.0+)
def square(x) = x * x

# Numbered parameters
result = [1, 2, 3].map { _1 * 2 }

# Rightward assignment (Ruby 3.0+)
42 => answer

# Multiple assignment
x, y = 10, 20
x, y = y, x  # Swap

# Splat in assignment
first, *middle, last = [1, 2, 3, 4, 5]

# Operator overloading
class Point
  attr_accessor :x, :y
  
  def initialize(x, y)
    @x = x
    @y = y
  end
  
  def +(other)
    Point.new(@x + other.x, @y + other.y)
  end
  
  def -(other)
    Point.new(@x - other.x, @y - other.y)
  end
  
  def to_s
    "(#{@x}, #{@y})"
  end
end

p1 = Point.new(1, 2)
p2 = Point.new(3, 4)
p3 = p1 + p2
puts p3

# Method missing
class DynamicAttributes
  def method_missing(method, *args)
    method_name = method.to_s
    if method_name.end_with?('=')
      instance_variable_set("@#{method_name.chop}", args.first)
    else
      instance_variable_get("@#{method_name}")
    end
  end
  
  def respond_to_missing?(method, include_private = false)
    true
  end
end

obj = DynamicAttributes.new
obj.name = 'Ruby'
puts obj.name

# Tap method for debugging
result = [1, 2, 3, 4, 5]
  .tap { |arr| puts "Original: #{arr}" }
  .map { |n| n * 2 }
  .tap { |arr| puts "Doubled: #{arr}" }
  .select { |n| n > 5 }
  .tap { |arr| puts "Filtered: #{arr}" }

puts "Final result: #{result}"
