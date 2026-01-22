// Dart comprehensive sample demonstrating modern features

/// Documentation comment for a class
@deprecated
abstract class Animal {
  final String name;
  late int age;
  
  Animal(this.name, {required this.age});
  
  void makeSound();
  
  String get description => 'Animal: $name, age: $age';
}

/// A concrete class implementing Animal
class Dog extends Animal {
  final String breed;
  
  Dog(String name, {required int age, required this.breed}) 
      : super(name, age: age);
  
  @override
  void makeSound() {
    print('Woof! I am ${this.name}');
  }
  
  // Factory constructor
  factory Dog.puppy(String name, String breed) {
    return Dog(name, age: 0, breed: breed);
  }
}

// Mixin for flying behavior
mixin Flyable {
  double altitude = 0.0;
  
  void fly() {
    altitude += 100;
    print('Flying at $altitude meters');
  }
  
  void land() => altitude = 0;
}

// Extension methods
extension StringExtensions on String {
  String get reversed => split('').reversed.join('');
  
  bool get isValidEmail => contains('@') && contains('.');
  
  String capitalize() {
    if (isEmpty) return this;
    return '${this[0].toUpperCase()}${substring(1)}';
  }
}

// Enum with enhanced features
enum Status {
  pending('Pending'),
  processing('Processing'),
  completed('Completed'),
  failed('Failed');
  
  const Status(this.label);
  final String label;
}

// Generic class with type constraints
class Repository<T extends Object> {
  final List<T> _items = [];
  
  void add(T item) => _items.add(item);
  
  T? get(int index) {
    if (index < 0 || index >= _items.length) return null;
    return _items[index];
  }
  
  List<T> getAll() => List.unmodifiable(_items);
  
  // Method with nullable return
  T? findFirst(bool Function(T) predicate) {
    for (var item in _items) {
      if (predicate(item)) return item;
    }
    return null;
  }
}

// Async/await demonstration
Future<String> fetchData(String url) async {
  await Future.delayed(Duration(seconds: 2));
  return 'Data from $url';
}

// Stream example
Stream<int> countStream(int max) async* {
  for (int i = 1; i <= max; i++) {
    await Future.delayed(Duration(milliseconds: 500));
    yield i;
  }
}

void main() async {
  // Variable declarations with type inference
  var message = 'Hello, Dart!';
  final pi = 3.14159;
  const maxRetries = 3;
  
  // Late initialization
  late String lateValue;
  lateValue = 'Initialized later';
  
  // Null safety operators
  String? nullable;
  String withDefault = nullable ?? 'default value';
  int? length = nullable?.length;
  String forced = nullable!; // Throws if null
  
  // Collections
  var list = [1, 2, 3, 4, 5];
  var set = {1, 2, 3, 3}; // Duplicates removed
  var map = {'key1': 'value1', 'key2': 'value2'};
  
  // Collection if and for
  var numbers = [
    1,
    if (true) 2,
    for (var i in [3, 4, 5]) i,
  ];
  
  // Spread operator
  var moreNumbers = [...numbers, 6, 7, 8];
  var nullableList = <int>?[9, 10];
  var combined = [...?nullableList, ...moreNumbers];
  
  // String interpolation
  print('Message: $message');
  print('Length: ${message.length}');
  
  // Multi-line strings
  var multiLine = '''
    This is a
    multi-line
    string
  ''';
  
  // Raw strings (no escape sequences)
  var rawString = r'C:\Users\Documents\file.txt';
  
  // Numbers in different formats
  var decimal = 42;
  var hex = 0xFF;
  var scientific = 1.5e3;
  var floatNum = 3.14;
  
  // Control flow with pattern matching
  var value = 5;
  switch (value) {
    case 1:
      print('One');
      break;
    case 2:
    case 3:
      print('Two or three');
      break;
    default:
      print('Other: $value');
  }
  
  // Arrow functions
  var square = (int x) => x * x;
  var add = (int a, int b) => a + b;
  
  // Higher-order functions
  list.map((x) => x * 2).where((x) => x > 5).forEach(print);
  
  // Cascade notation
  var dog = Dog('Buddy', age: 3, breed: 'Labrador')
    ..makeSound()
    ..age = 4;
  
  // Nullable cascade
  Dog? nullableDog;
  nullableDog?..makeSound();
  
  // Extension method usage
  var email = 'test@example.com';
  print('Valid email: ${email.isValidEmail}');
  print('Reversed: ${email.reversed}');
  
  // Async/await
  try {
    var data = await fetchData('https://api.example.com');
    print('Fetched: $data');
  } catch (e) {
    print('Error: $e');
  } finally {
    print('Cleanup');
  }
  
  // Stream processing
  await for (var count in countStream(5)) {
    print('Count: $count');
  }
  
  // Generic repository usage
  var repo = Repository<String>()
    ..add('Item 1')
    ..add('Item 2')
    ..add('Item 3');
  
  var first = repo.findFirst((item) => item.contains('2'));
  print('Found: $first');
  
  // Type checking and casting
  Object obj = 'Hello';
  if (obj is String) {
    print('Length: ${obj.length}'); // Smart cast
  }
  
  // Ternary operator
  var result = value > 10 ? 'large' : 'small';
  
  // Assert in debug mode
  assert(value >= 0, 'Value must be non-negative');
  
  // Enum usage
  var status = Status.completed;
  print('Status: ${status.label}');
  
  // Anonymous functions
  var multiply = (int a, int b) {
    return a * b;
  };
  
  // Function as parameter
  void execute(Function callback) {
    callback();
  }
  
  execute(() => print('Callback executed'));
  
  // Null-aware assignment
  String? text;
  text ??= 'Default text';
  
  // Integer division operator
  var intDiv = 10 ~/ 3; // Result: 3
  
  // Bitwise operators
  var bitwiseAnd = 5 & 3;
  var bitwiseOr = 5 | 3;
  var bitwiseXor = 5 ^ 3;
  var leftShift = 5 << 1;
  var rightShift = 5 >> 1;
  var complement = ~5;
}
