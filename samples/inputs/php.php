<?php
// PHP comprehensive sample demonstrating modern features

declare(strict_types=1);

namespace App\Example;

use DateTime;
use Exception;
use Iterator;

// Type declarations
interface UserInterface
{
    public function getName(): string;
    public function getAge(): int;
    public function setName(string $name): void;
}

// Abstract class
abstract class Animal
{
    protected string $name;
    protected int $age;
    
    public function __construct(string $name, int $age)
    {
        $this->name = $name;
        $this->age = $age;
    }
    
    abstract public function makeSound(): string;
    
    public function getInfo(): string
    {
        return "{$this->name} is {$this->age} years old";
    }
}

// Concrete class extending abstract
class Dog extends Animal
{
    private string $breed;
    
    public function __construct(string $name, int $age, string $breed)
    {
        parent::__construct($name, $age);
        $this->breed = $breed;
    }
    
    public function makeSound(): string
    {
        return 'Woof!';
    }
    
    public function getBreed(): string
    {
        return $this->breed;
    }
}

// Trait
trait Timestampable
{
    private ?DateTime $createdAt = null;
    private ?DateTime $updatedAt = null;
    
    public function setCreatedAt(DateTime $date): void
    {
        $this->createdAt = $date;
    }
    
    public function setUpdatedAt(DateTime $date): void
    {
        $this->updatedAt = $date;
    }
    
    public function getCreatedAt(): ?DateTime
    {
        return $this->createdAt;
    }
}

// Class with trait
class Post
{
    use Timestampable;
    
    private string $title;
    private string $content;
    
    public function __construct(string $title, string $content)
    {
        $this->title = $title;
        $this->content = $content;
        $this->setCreatedAt(new DateTime());
    }
    
    public function getTitle(): string
    {
        return $this->title;
    }
}

// Variables
$string = "Hello World";
$integer = 42;
$float = 3.14159;
$boolean = true;
$null_var = null;

// String interpolation
$name = "PHP";
$version = 8.3;
echo "Welcome to {$name} {$version}\n";
echo "Math: 2 + 2 = " . (2 + 2) . "\n";

// Heredoc
$heredoc = <<<EOT
This is a heredoc string.
It can span multiple lines.
Variables like $name are interpolated.
EOT;

// Nowdoc (no interpolation)
$nowdoc = <<<'EOT'
This is a nowdoc string.
Variables like $name are NOT interpolated.
EOT;

// Arrays
$indexed = [1, 2, 3, 4, 5];
$associative = [
    'name' => 'Alice',
    'age' => 30,
    'city' => 'New York'
];

// Multi-dimensional array
$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Array destructuring
[$first, $second, $third] = $indexed;
['name' => $userName, 'age' => $userAge] = $associative;

// Functions
function add(int $a, int $b): int
{
    return $a + $b;
}

function greet(string $name, string $greeting = 'Hello'): string
{
    return "{$greeting}, {$name}!";
}

// Variadic function
function sum(int ...$numbers): int
{
    return array_sum($numbers);
}

echo sum(1, 2, 3, 4, 5) . "\n";

// Return types
function divide(float $a, float $b): float|false
{
    if ($b == 0) {
        return false;
    }
    return $a / $b;
}

// Anonymous function (closure)
$multiply = function(int $a, int $b): int {
    return $a * $b;
};

echo $multiply(5, 3) . "\n";

// Arrow function (PHP 7.4+)
$square = fn($x) => $x * $x;
echo $square(5) . "\n";

// Closures with use
$factor = 10;
$multiplyByFactor = function($x) use ($factor) {
    return $x * $factor;
};

// Conditional statements
$age = 25;

if ($age >= 18) {
    echo "Adult\n";
} elseif ($age >= 13) {
    echo "Teenager\n";
} else {
    echo "Child\n";
}

// Ternary operator
$status = $age >= 18 ? 'adult' : 'minor';

// Null coalescing operator
$username = $_GET['user'] ?? 'guest';
$config = $settings['debug'] ?? false;

// Nullsafe operator (PHP 8.0+)
$address = $user?->getProfile()?->getAddress()?->getCity();

// Match expression (PHP 8.0+)
$status_code = 200;
$message = match ($status_code) {
    200, 201 => 'Success',
    404 => 'Not Found',
    500 => 'Internal Server Error',
    default => 'Unknown Status'
};

// Switch statement
switch ($status_code) {
    case 200:
        echo "OK\n";
        break;
    case 404:
        echo "Not Found\n";
        break;
    default:
        echo "Other\n";
}

// Loops
for ($i = 0; $i < 5; $i++) {
    echo $i . "\n";
}

$counter = 0;
while ($counter < 5) {
    echo $counter . "\n";
    $counter++;
}

do {
    echo $counter . "\n";
    $counter++;
} while ($counter < 10);

// Foreach
foreach ($indexed as $value) {
    echo $value . "\n";
}

foreach ($associative as $key => $value) {
    echo "{$key}: {$value}\n";
}

// Break and continue
for ($i = 0; $i < 10; $i++) {
    if ($i == 5) {
        continue;
    }
    if ($i == 8) {
        break;
    }
    echo $i . "\n";
}

// Error handling
try {
    $result = divide(10, 0);
    if ($result === false) {
        throw new Exception('Division by zero');
    }
} catch (Exception $e) {
    echo "Error: {$e->getMessage()}\n";
} finally {
    echo "Cleanup\n";
}

// Custom exception
class ValidationException extends Exception {}

function validateAge(int $age): void
{
    if ($age < 0) {
        throw new ValidationException('Age must be positive');
    }
    if ($age > 150) {
        throw new ValidationException('Age must be reasonable');
    }
}

// Array functions
$numbers = [1, 2, 3, 4, 5];

$doubled = array_map(fn($n) => $n * 2, $numbers);
$evens = array_filter($numbers, fn($n) => $n % 2 == 0);
$sum = array_reduce($numbers, fn($carry, $n) => $carry + $n, 0);

// Array manipulation
array_push($numbers, 6);
$last = array_pop($numbers);
array_unshift($numbers, 0);
$first = array_shift($numbers);

// Array searching
$exists = in_array(3, $numbers);
$key = array_search(4, $numbers);
$keys = array_keys($associative);
$values = array_values($associative);

// Array merging
$arr1 = [1, 2, 3];
$arr2 = [4, 5, 6];
$merged = array_merge($arr1, $arr2);
$spread = [...$arr1, ...$arr2];

// String functions
$text = "Hello World";
echo strtoupper($text) . "\n";
echo strtolower($text) . "\n";
echo strlen($text) . "\n";
echo substr($text, 0, 5) . "\n";
echo str_replace('World', 'PHP', $text) . "\n";
echo trim("  spaces  ") . "\n";
echo str_repeat('Ha', 3) . "\n";
echo strrev($text) . "\n";

// String splitting
$parts = explode(' ', $text);
$joined = implode('-', $parts);

// String position
$pos = strpos($text, 'World');
$contains = str_contains($text, 'Hello');
$starts = str_starts_with($text, 'Hello');
$ends = str_ends_with($text, 'World');

// Regular expressions
$pattern = '/\d+/';
$subject = 'abc123def456';

if (preg_match($pattern, $subject, $matches)) {
    print_r($matches);
}

$replaced = preg_replace('/\d+/', 'X', $subject);
$parts = preg_split('/\d+/', $subject);

// Type checking
$var = 42;
echo gettype($var) . "\n";
echo is_int($var) ? 'int' : 'not int' . "\n";
echo is_string($text) ? 'string' : 'not string' . "\n";
echo is_array($numbers) ? 'array' : 'not array' . "\n";
echo is_bool($boolean) ? 'bool' : 'not bool' . "\n";
echo is_null($null_var) ? 'null' : 'not null' . "\n";

// Type casting
$str_num = "42";
$int_num = (int) $str_num;
$float_num = (float) $str_num;
$bool_val = (bool) $str_num;
$array_val = (array) $str_num;

// Superglobals
// $_GET, $_POST, $_REQUEST, $_COOKIE, $_SESSION
// $_SERVER, $_FILES, $_ENV, $_GLOBALS

$query_param = $_GET['page'] ?? 1;
$post_data = $_POST['username'] ?? '';
$server_name = $_SERVER['SERVER_NAME'] ?? 'localhost';

// Constants
define('APP_NAME', 'MyApp');
const VERSION = '1.0.0';

echo APP_NAME . " v" . VERSION . "\n";

// Magic constants
echo __FILE__ . "\n";
echo __LINE__ . "\n";
echo __DIR__ . "\n";
echo __FUNCTION__ . "\n";
echo __CLASS__ . "\n";
echo __METHOD__ . "\n";
echo __NAMESPACE__ . "\n";

// Static methods and properties
class Counter
{
    private static int $count = 0;
    
    public static function increment(): void
    {
        self::$count++;
    }
    
    public static function getCount(): int
    {
        return self::$count;
    }
}

Counter::increment();
Counter::increment();
echo Counter::getCount() . "\n";

// Class constants
class Config
{
    public const DB_HOST = 'localhost';
    public const DB_PORT = 3306;
    private const SECRET_KEY = 'secret';
}

echo Config::DB_HOST . "\n";

// Magic methods
class MagicClass
{
    private array $data = [];
    
    public function __construct()
    {
        echo "Constructor called\n";
    }
    
    public function __destruct()
    {
        echo "Destructor called\n";
    }
    
    public function __get(string $name)
    {
        return $this->data[$name] ?? null;
    }
    
    public function __set(string $name, $value): void
    {
        $this->data[$name] = $value;
    }
    
    public function __isset(string $name): bool
    {
        return isset($this->data[$name]);
    }
    
    public function __unset(string $name): void
    {
        unset($this->data[$name]);
    }
    
    public function __toString(): string
    {
        return json_encode($this->data);
    }
    
    public function __invoke(...$args)
    {
        return "Invoked with: " . implode(', ', $args);
    }
}

$magic = new MagicClass();
$magic->name = 'Test';
echo $magic->name . "\n";
echo $magic . "\n";
echo $magic('arg1', 'arg2') . "\n";

// Generators
function fibonacci(int $limit): Iterator
{
    $a = 0;
    $b = 1;
    
    for ($i = 0; $i < $limit; $i++) {
        yield $a;
        [$a, $b] = [$b, $a + $b];
    }
}

foreach (fibonacci(10) as $num) {
    echo $num . " ";
}
echo "\n";

// Yield from
function generator1(): Iterator
{
    yield 1;
    yield 2;
}

function generator2(): Iterator
{
    yield from generator1();
    yield 3;
    yield 4;
}

// Reference parameters
function increment(int &$value): void
{
    $value++;
}

$num = 5;
increment($num);
echo $num . "\n";

// Named arguments (PHP 8.0+)
function createUser(string $name, int $age, string $email): array
{
    return compact('name', 'age', 'email');
}

$user = createUser(name: 'Alice', age: 30, email: 'alice@example.com');

// Attributes (PHP 8.0+)
#[Deprecated('Use newMethod() instead')]
function oldMethod(): void
{
    echo "Old method\n";
}

// Union types (PHP 8.0+)
function processValue(int|float|string $value): string
{
    return "Processing: {$value}";
}

// Readonly properties (PHP 8.1+)
class ReadonlyExample
{
    public function __construct(
        public readonly string $id,
        public readonly string $name
    ) {}
}

// Enums (PHP 8.1+)
enum Status: string
{
    case PENDING = 'pending';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';
    
    public function label(): string
    {
        return match($this) {
            self::PENDING => 'Pending Approval',
            self::APPROVED => 'Approved',
            self::REJECTED => 'Rejected',
        };
    }
}

$status = Status::PENDING;
echo $status->value . "\n";
echo $status->label() . "\n";

// Operators
$a = 10;
$b = 5;

// Arithmetic
echo $a + $b . "\n";
echo $a - $b . "\n";
echo $a * $b . "\n";
echo $a / $b . "\n";
echo $a % $b . "\n";
echo $a ** $b . "\n";  // Power

// Comparison
var_dump($a == $b);   // Equal
var_dump($a === $b);  // Identical
var_dump($a != $b);   // Not equal
var_dump($a !== $b);  // Not identical
var_dump($a > $b);
var_dump($a < $b);
var_dump($a >= $b);
var_dump($a <= $b);
var_dump($a <=> $b);  // Spaceship

// Logical
var_dump($a && $b);
var_dump($a || $b);
var_dump(!$a);
var_dump($a and $b);
var_dump($a or $b);
var_dump($a xor $b);

// Bitwise
echo ($a & $b) . "\n";
echo ($a | $b) . "\n";
echo ($a ^ $b) . "\n";
echo (~$a) . "\n";
echo ($a << 1) . "\n";
echo ($a >> 1) . "\n";

// Assignment operators
$x = 10;
$x += 5;   // $x = $x + 5
$x -= 3;   // $x = $x - 3
$x *= 2;   // $x = $x * 2
$x /= 2;   // $x = $x / 2
$x %= 3;   // $x = $x % 3
$x **= 2;  // $x = $x ** 2
$x .= '!'; // String concatenation

// Increment/Decrement
$i = 0;
$i++;
++$i;
$i--;
--$i;

// Instanceof
$dog = new Dog('Buddy', 3, 'Labrador');
var_dump($dog instanceof Dog);
var_dump($dog instanceof Animal);

// Clone
$dog2 = clone $dog;

// Namespace and use
use function array_map as map;
use const PHP_VERSION;

$mapped = map(fn($x) => $x * 2, [1, 2, 3]);
echo PHP_VERSION . "\n";

// Include/require
// include 'file.php';
// include_once 'file.php';
// require 'file.php';
// require_once 'file.php';

// isset and empty
$var = 42;
var_dump(isset($var));
var_dump(empty($var));

// unset
$temp = 'temporary';
unset($temp);

// List destructuring
$coords = [10, 20, 30];
list($x, $y, $z) = $coords;

// Spread operator in arrays
$arr1 = [1, 2, 3];
$arr2 = [...$arr1, 4, 5, 6];

// Backticks (shell execution)
// $output = `ls -la`;

// Error suppression with @
$value = @file_get_contents('nonexistent.txt');

// Final classes and methods
final class FinalClass
{
    public function normalMethod(): void {}
    
    final public function finalMethod(): void {}
}

// Readonly classes (PHP 8.2+)
readonly class Point
{
    public function __construct(
        public float $x,
        public float $y
    ) {}
}

echo "PHP sample complete!\n";
