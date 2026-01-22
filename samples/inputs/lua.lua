-- Lua comprehensive sample demonstrating modern features

-- Simple variables
local name = "Lua"
local version = 5.4
local pi = 3.14159
local hex_value = 0xFF
local scientific = 1.5e-10
local is_active = true
local nothing = nil

-- String types
local single_quoted = 'Hello World'
local double_quoted = "Hello Lua"
local multi_line = [[
This is a
multi-line string
using long brackets
]]

local bracket_level = [==[
Bracket level 2
Can contain [[inner brackets]]
]==]

-- Tables (arrays and dictionaries)
local array = {1, 2, 3, 4, 5}
local dict = {
  name = "Alice",
  age = 30,
  city = "New York"
}

-- Mixed table
local mixed = {
  10, 20, 30,
  x = 100,
  y = 200,
  nested = {a = 1, b = 2}
}

-- Table access
print(array[1])  -- Lua arrays are 1-indexed
print(dict.name)
print(dict["age"])
print(mixed.nested.a)

-- Functions
function greet(name)
  return "Hello, " .. name
end

-- Local function
local function add(a, b)
  return a + b
end

-- Anonymous function
local multiply = function(a, b)
  return a * b
end

-- Multiple return values
function divmod(a, b)
  return math.floor(a / b), a % b
end

local quotient, remainder = divmod(17, 5)

-- Varargs
function sum(...)
  local args = {...}
  local total = 0
  for i = 1, #args do
    total = total + args[i]
  end
  return total
end

print(sum(1, 2, 3, 4, 5))

-- String concatenation
local greeting = "Hello" .. " " .. "World"
local repeated = "Ha" .. "Ha" .. "Ha"

-- Length operator
local text = "Hello"
print(#text)  -- 5

local numbers = {10, 20, 30}
print(#numbers)  -- 3

-- Arithmetic operators
local a = 10 + 5
local b = 10 - 5
local c = 10 * 5
local d = 10 / 5
local e = 10 % 3
local f = 2 ^ 10  -- Exponentiation
local g = 17 // 5  -- Floor division (Lua 5.3+)

-- Bitwise operators (Lua 5.3+)
local bit_and = 12 & 10
local bit_or = 12 | 10
local bit_xor = 12 ~ 10
local bit_not = ~12
local left_shift = 1 << 4
local right_shift = 16 >> 2

-- Comparison operators
local equals = (10 == 10)
local not_equals = (10 ~= 5)
local less = (5 < 10)
local greater = (10 > 5)
local less_equal = (5 <= 10)
local greater_equal = (10 >= 5)

-- Logical operators
local and_result = true and false
local or_result = true or false
local not_result = not true

-- Conditional statements
if version >= 5.4 then
  print("Modern Lua")
elseif version >= 5.1 then
  print("Older Lua")
else
  print("Ancient Lua")
end

-- Ternary-like with and/or
local status = (age >= 18) and "adult" or "minor"

-- While loop
local i = 1
while i <= 5 do
  print(i)
  i = i + 1
end

-- Repeat-until loop
local j = 1
repeat
  print(j)
  j = j + 1
until j > 5

-- Numeric for loop
for k = 1, 10 do
  print(k)
end

-- Numeric for loop with step
for k = 10, 1, -1 do
  print(k)
end

-- Generic for loop
for index, value in ipairs(array) do
  print(index, value)
end

-- Iterator over table keys
for key, value in pairs(dict) do
  print(key, value)
end

-- Break statement
for k = 1, 100 do
  if k > 10 then
    break
  end
  print(k)
end

-- Goto (Lua 5.2+)
for k = 1, 10 do
  if k % 2 == 0 then
    goto continue
  end
  print(k)
  ::continue::
end

-- Tables as objects
local person = {
  first_name = "John",
  last_name = "Doe",
  age = 30
}

function person.full_name()
  return person.first_name .. " " .. person.last_name
end

function person:birthday()
  self.age = self.age + 1
end

-- Colon syntax for methods (implicit self)
person:birthday()

-- Metatables
local vector = {x = 10, y = 20}

local vector_mt = {
  __add = function(v1, v2)
    return {x = v1.x + v2.x, y = v1.y + v2.y}
  end,
  
  __sub = function(v1, v2)
    return {x = v1.x - v2.x, y = v1.y - v2.y}
  end,
  
  __tostring = function(v)
    return "(" .. v.x .. ", " .. v.y .. ")"
  end,
  
  __index = function(t, key)
    if key == "magnitude" then
      return math.sqrt(t.x^2 + t.y^2)
    end
  end
}

setmetatable(vector, vector_mt)

local v1 = {x = 1, y = 2}
local v2 = {x = 3, y = 4}
setmetatable(v1, vector_mt)
setmetatable(v2, vector_mt)

local v3 = v1 + v2

-- Class-like pattern with metatables
function create_account(balance)
  local self = {balance = balance}
  
  local mt = {
    __index = {
      deposit = function(self, amount)
        self.balance = self.balance + amount
      end,
      
      withdraw = function(self, amount)
        if amount <= self.balance then
          self.balance = self.balance - amount
          return true
        end
        return false
      end,
      
      get_balance = function(self)
        return self.balance
      end
    }
  }
  
  return setmetatable(self, mt)
end

local account = create_account(100)
account:deposit(50)
account:withdraw(30)
print(account:get_balance())

-- Closures
function make_counter()
  local count = 0
  
  return function()
    count = count + 1
    return count
  end
end

local counter1 = make_counter()
local counter2 = make_counter()

print(counter1())  -- 1
print(counter1())  -- 2
print(counter2())  -- 1

-- Module pattern
local math_utils = {}

function math_utils.square(x)
  return x * x
end

function math_utils.cube(x)
  return x * x * x
end

function math_utils.factorial(n)
  if n <= 1 then
    return 1
  end
  return n * math_utils.factorial(n - 1)
end

-- Error handling
function safe_divide(a, b)
  if b == 0 then
    error("Division by zero")
  end
  return a / b
end

local success, result = pcall(safe_divide, 10, 2)
if success then
  print("Result:", result)
else
  print("Error:", result)
end

-- Custom error with level
function validate_age(age)
  if type(age) ~= "number" then
    error("Age must be a number", 2)
  end
  if age < 0 then
    error("Age must be positive", 2)
  end
  return age
end

-- Assert
local function process(value)
  assert(value ~= nil, "Value cannot be nil")
  assert(type(value) == "number", "Value must be a number")
  return value * 2
end

-- String library
local str = "Hello World"
print(string.upper(str))
print(string.lower(str))
print(string.len(str))
print(string.sub(str, 1, 5))
print(string.reverse(str))
print(string.rep("Ha", 3))

-- String pattern matching
local text = "The quick brown fox"
local pattern = "quick"
local found = string.find(text, pattern)

local matched = string.match(text, "quick")
local replaced = string.gsub(text, "fox", "dog")

-- Pattern classes
local digits = string.match("abc123def", "%d+")
local letters = string.match("abc123def", "%a+")

-- String formatting
local formatted = string.format("Pi is approximately %.2f", pi)
local formatted2 = string.format("Name: %s, Age: %d", "Alice", 30)

-- Table library
local fruits = {"apple", "banana", "cherry"}
table.insert(fruits, "date")
table.insert(fruits, 2, "blueberry")

local removed = table.remove(fruits)
local removed_at = table.remove(fruits, 2)

table.sort(fruits)

local joined = table.concat(fruits, ", ")

-- Math library
local abs_val = math.abs(-10)
local ceil_val = math.ceil(3.2)
local floor_val = math.floor(3.8)
local max_val = math.max(10, 20, 5, 15)
local min_val = math.min(10, 20, 5, 15)
local random = math.random()
local random_range = math.random(1, 100)
local sqrt_val = math.sqrt(16)
local sin_val = math.sin(math.pi / 2)
local cos_val = math.cos(0)

-- IO library
-- local file = io.open("test.txt", "w")
-- file:write("Hello Lua\n")
-- file:close()

-- local file = io.open("test.txt", "r")
-- local content = file:read("*all")
-- file:close()

-- OS library
local current_time = os.time()
local date_table = os.date("*t", current_time)
local formatted_date = os.date("%Y-%m-%d %H:%M:%S", current_time)
-- local exit_code = os.execute("ls -la")

-- Type checking
local t1 = type(10)           -- "number"
local t2 = type("hello")      -- "string"
local t3 = type({})           -- "table"
local t4 = type(function() end)  -- "function"
local t5 = type(true)         -- "boolean"
local t6 = type(nil)          -- "nil"

-- Pairs and ipairs
local data = {10, 20, 30, x = 100, y = 200}

for i, v in ipairs(data) do  -- Only array part
  print(i, v)
end

for k, v in pairs(data) do   -- All keys
  print(k, v)
end

-- Next function
local t = {a = 1, b = 2, c = 3}
local key = nil
repeat
  key = next(t, key)
  if key then
    print(key, t[key])
  end
until key == nil

-- Select function
local function first(...)
  return select(1, ...)
end

local function count_args(...)
  return select("#", ...)
end

-- Rawget and rawset (bypass metamethods)
local raw_table = {}
setmetatable(raw_table, {
  __index = function() return "default" end
})

local normal_get = raw_table.key     -- "default"
local raw_get = rawget(raw_table, "key")  -- nil

rawset(raw_table, "key", "value")

-- Load and loadstring
local code = "return 2 + 2"
local func = load(code)
local result = func()

-- Coroutines
function fibonacci()
  local a, b = 0, 1
  while true do
    coroutine.yield(a)
    a, b = b, a + b
  end
end

local co = coroutine.create(fibonacci)
for i = 1, 10 do
  local success, value = coroutine.resume(co)
  print(value)
end

-- Weak tables
local weak_table = setmetatable({}, {__mode = "k"})

-- Package system
-- require("module_name")
-- local my_module = require("my_module")

-- Global vs local
global_var = "I am global"
local local_var = "I am local"

-- Multiple assignment
local x, y, z = 10, 20, 30
x, y = y, x  -- Swap

-- Unpack (table.unpack in Lua 5.2+)
local coords = {10, 20, 30}
local x1, y1, z1 = table.unpack(coords)

-- Complex table manipulation
local matrix = {
  {1, 2, 3},
  {4, 5, 6},
  {7, 8, 9}
}

for i = 1, #matrix do
  for j = 1, #matrix[i] do
    print(matrix[i][j])
  end
end

-- Object-oriented programming example
local Animal = {}
Animal.__index = Animal

function Animal:new(name, sound)
  local instance = setmetatable({}, self)
  instance.name = name
  instance.sound = sound
  return instance
end

function Animal:speak()
  print(self.name .. " says " .. self.sound)
end

local Dog = setmetatable({}, Animal)
Dog.__index = Dog

function Dog:new(name)
  local instance = Animal.new(self, name, "Woof")
  return instance
end

function Dog:fetch()
  print(self.name .. " is fetching")
end

local dog = Dog:new("Buddy")
dog:speak()
dog:fetch()

-- Tail call optimization
function tail_recursive_sum(n, acc)
  acc = acc or 0
  if n <= 0 then
    return acc
  end
  return tail_recursive_sum(n - 1, acc + n)
end

-- Upvalues and closures
local function create_incrementor(step)
  return function(value)
    return value + step
  end
end

local inc_by_5 = create_incrementor(5)
local inc_by_10 = create_incrementor(10)

print(inc_by_5(10))   -- 15
print(inc_by_10(10))  -- 20

print("Lua sample complete!")
