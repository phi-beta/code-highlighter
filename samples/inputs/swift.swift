// Swift comprehensive sample demonstrating modern features

import Foundation

/// Documentation comment for a protocol
protocol Animal {
    var name: String { get }
    var age: Int { get set }
    func makeSound()
}

// Struct with protocol conformance
struct Dog: Animal {
    let name: String
    var age: Int
    let breed: String
    
    func makeSound() {
        print("Woof! I am \(name)")
    }
    
    mutating func birthday() {
        age += 1
    }
}

// Class with inheritance
class Pet {
    let name: String
    var owner: String?
    
    init(name: String) {
        self.name = name
    }
    
    deinit {
        print("\(name) is being deinitialized")
    }
    
    func describe() -> String {
        "Pet named \(name)"
    }
}

final class Cat: Pet {
    let lives: Int = 9
    
    override func describe() -> String {
        "\(super.describe()) with \(lives) lives"
    }
}

// Enum with associated values
enum Result<T, E: Error> {
    case success(T)
    case failure(E)
}

enum Status {
    case pending
    case processing(progress: Double)
    case completed(result: String)
    case failed(Error)
}

// Error handling
enum NetworkError: Error {
    case timeout
    case invalidURL
    case serverError(code: Int)
}

// Protocol with associated type
protocol Container {
    associatedtype Item
    var count: Int { get }
    mutating func append(_ item: Item)
    subscript(i: Int) -> Item { get }
}

// Generic struct
struct Stack<Element>: Container {
    private var items: [Element] = []
    
    var count: Int {
        items.count
    }
    
    mutating func append(_ item: Element) {
        items.append(item)
    }
    
    subscript(i: Int) -> Element {
        items[i]
    }
    
    mutating func push(_ item: Element) {
        items.append(item)
    }
    
    mutating func pop() -> Element? {
        items.popLast()
    }
}

// Extension with computed property
extension String {
    var isValidEmail: Bool {
        contains("@") && contains(".")
    }
    
    func capitalized() -> String {
        prefix(1).uppercased() + dropFirst()
    }
}

// Property wrappers
@propertyWrapper
struct Clamped<T: Comparable> {
    private var value: T
    private let range: ClosedRange<T>
    
    var wrappedValue: T {
        get { value }
        set { value = min(max(range.lowerBound, newValue), range.upperBound) }
    }
    
    init(wrappedValue: T, _ range: ClosedRange<T>) {
        self.range = range
        self.value = min(max(range.lowerBound, wrappedValue), range.upperBound)
    }
}

// Class with property observers
class ProgressTracker {
    @Clamped(0...100)
    var progress: Int = 0 {
        willSet {
            print("Progress will change from \(progress) to \(newValue)")
        }
        didSet {
            print("Progress changed from \(oldValue) to \(progress)")
        }
    }
    
    lazy var expensive: String = {
        print("Computing expensive value")
        return "Expensive"
    }()
}

// Actor for concurrency (Swift 5.5+)
actor Counter {
    private var value: Int = 0
    
    func increment() {
        value += 1
    }
    
    func getValue() -> Int {
        value
    }
}

// Async/await functions
func fetchData(from url: String) async throws -> String {
    // Simulate network delay
    try await Task.sleep(nanoseconds: 1_000_000_000)
    
    guard !url.isEmpty else {
        throw NetworkError.invalidURL
    }
    
    return "Data from \(url)"
}

func processMultipleRequests() async {
    async let data1 = fetchData(from: "https://api1.com")
    async let data2 = fetchData(from: "https://api2.com")
    
    do {
        let results = try await [data1, data2]
        print("Results: \(results)")
    } catch {
        print("Error: \(error)")
    }
}

// Main demonstration
func demonstrateSwift() {
    // Variable declarations
    let constant = "Hello, Swift!"
    var variable = 42
    var optional: String? = nil
    
    // Optional binding
    if let value = optional {
        print("Has value: \(value)")
    } else {
        print("No value")
    }
    
    // Guard statement
    guard let unwrapped = optional else {
        print("Early return")
        return
    }
    
    // Nil coalescing
    let defaultValue = optional ?? "default"
    let optionalChaining = optional?.count ?? 0
    
    // Force unwrapping (use with caution)
    // let forced = optional!
    
    // Implicitly unwrapped optional
    var implicitOptional: String! = "Value"
    
    // Arrays
    let numbers = [1, 2, 3, 4, 5]
    var mutableArray = [Int]()
    mutableArray.append(10)
    
    // Dictionaries
    let dict = ["key1": "value1", "key2": "value2"]
    var mutableDict: [String: Int] = [:]
    mutableDict["count"] = 100
    
    // Sets
    let set: Set = [1, 2, 3, 3] // Duplicates removed
    
    // Tuples
    let tuple = (1, "two", 3.0)
    let (first, second, third) = tuple
    let named = (x: 10, y: 20)
    print("X: \(named.x), Y: \(named.y)")
    
    // Ranges
    let closedRange = 1...5
    let halfOpenRange = 1..<5
    
    // For loops
    for i in 1...5 {
        print(i)
    }
    
    for (index, value) in numbers.enumerated() {
        print("\(index): \(value)")
    }
    
    // While loops
    var count = 0
    while count < 5 {
        count += 1
    }
    
    repeat {
        count -= 1
    } while count > 0
    
    // Switch statement with pattern matching
    let status = Status.processing(progress: 0.5)
    switch status {
    case .pending:
        print("Pending")
    case .processing(let progress) where progress < 0.5:
        print("Just started")
    case .processing(let progress):
        print("Processing: \(progress * 100)%")
    case .completed(let result):
        print("Completed: \(result)")
    case .failed(let error):
        print("Failed: \(error)")
    }
    
    // Closures
    let square = { (x: Int) -> Int in
        x * x
    }
    
    let doubled = numbers.map { $0 * 2 }
    let evens = numbers.filter { $0 % 2 == 0 }
    let sum = numbers.reduce(0, +)
    
    // Trailing closure syntax
    let sorted = numbers.sorted { $0 > $1 }
    
    // Capturing values
    func makeIncrementer(by amount: Int) -> () -> Int {
        var total = 0
        return {
            total += amount
            return total
        }
    }
    
    let incrementByTwo = makeIncrementer(by: 2)
    print(incrementByTwo())
    print(incrementByTwo())
    
    // Escaping closure
    func performAsync(completion: @escaping () -> Void) {
        DispatchQueue.main.async {
            completion()
        }
    }
    
    // Autoclosure
    func assert(_ condition: @autoclosure () -> Bool, message: String) {
        if !condition() {
            print("Assertion failed: \(message)")
        }
    }
    
    // Generics
    func swapValues<T>(_ a: inout T, _ b: inout T) {
        let temp = a
        a = b
        b = temp
    }
    
    var x = 10
    var y = 20
    swapValues(&x, &y)
    
    // Type constraints
    func findIndex<T: Equatable>(of value: T, in array: [T]) -> Int? {
        for (index, item) in array.enumerated() {
            if item == value {
                return index
            }
        }
        return nil
    }
    
    // Protocol extensions
    extension Collection {
        func customMap<T>(_ transform: (Element) -> T) -> [T] {
            var result: [T] = []
            for element in self {
                result.append(transform(element))
            }
            return result
        }
    }
    
    // Error handling
    do {
        let data = try fetchDataSync()
        print("Success: \(data)")
    } catch NetworkError.timeout {
        print("Request timed out")
    } catch NetworkError.serverError(let code) {
        print("Server error: \(code)")
    } catch {
        print("Unknown error: \(error)")
    }
    
    // Try? for optional result
    let optionalResult = try? fetchDataSync()
    
    // Try! to disable error propagation (use with caution)
    // let forcedResult = try! fetchDataSync()
    
    // Defer statement
    func processFile() {
        print("Opening file")
        defer {
            print("Closing file")
        }
        print("Processing file")
        // File closes automatically when function exits
    }
    
    processFile()
    
    // Access control
    public class PublicClass {
        private var privateProperty = 0
        fileprivate var fileprivateProperty = 0
        internal var internalProperty = 0
        public var publicProperty = 0
        
        private func privateMethod() {}
        public func publicMethod() {}
    }
    
    // Computed properties
    struct Rectangle {
        var width: Double
        var height: Double
        
        var area: Double {
            width * height
        }
        
        var perimeter: Double {
            get {
                2 * (width + height)
            }
        }
    }
    
    // Type casting
    let pet: Pet = Cat(name: "Whiskers")
    if let cat = pet as? Cat {
        print("It's a cat with \(cat.lives) lives")
    }
    
    // Type checking
    if pet is Cat {
        print("This pet is a cat")
    }
    
    // String interpolation
    let name = "Swift"
    let version = 5
    print("Welcome to \(name) \(version)")
    
    // Multi-line strings
    let multiLine = """
        This is a
        multi-line
        string
        """
    
    // Raw strings (Swift 5+)
    let regex = #"^\d{3}-\d{3}-\d{4}$"#
    
    // Numbers in different bases
    let decimal = 42
    let binary = 0b101010
    let octal = 0o52
    let hex = 0x2A
    let float = 3.14
    let scientific = 1.5e3
    
    // Underscores in numbers for readability
    let million = 1_000_000
    
    // Type aliases
    typealias StringMap = [String: String]
    let map: StringMap = ["key": "value"]
    
    // Weak and unowned references
    class Person {
        let name: String
        weak var apartment: Apartment?
        
        init(name: String) {
            self.name = name
        }
    }
    
    class Apartment {
        let unit: String
        unowned let building: Building
        
        init(unit: String, building: Building) {
            self.unit = unit
            self.building = building
        }
    }
    
    class Building {
        let address: String
        
        init(address: String) {
            self.address = address
        }
    }
    
    // Subscripts
    struct Matrix {
        let rows: Int, columns: Int
        var grid: [Double]
        
        init(rows: Int, columns: Int) {
            self.rows = rows
            self.columns = columns
            grid = Array(repeating: 0.0, count: rows * columns)
        }
        
        subscript(row: Int, column: Int) -> Double {
            get {
                grid[(row * columns) + column]
            }
            set {
                grid[(row * columns) + column] = newValue
            }
        }
    }
    
    // Operator overloading
    struct Vector2D {
        var x: Double
        var y: Double
        
        static func + (left: Vector2D, right: Vector2D) -> Vector2D {
            Vector2D(x: left.x + right.x, y: left.y + right.y)
        }
        
        static func - (left: Vector2D, right: Vector2D) -> Vector2D {
            Vector2D(x: left.x - right.x, y: left.y - right.y)
        }
    }
    
    let v1 = Vector2D(x: 1, y: 2)
    let v2 = Vector2D(x: 3, y: 4)
    let v3 = v1 + v2
    
    // Identity operators
    let cat1 = Cat(name: "Fluffy")
    let cat2 = Cat(name: "Mittens")
    let cat3 = cat1
    
    if cat1 === cat3 {
        print("Same instance")
    }
    
    if cat1 !== cat2 {
        print("Different instances")
    }
}

// Synchronous version for demonstration
func fetchDataSync() throws -> String {
    throw NetworkError.timeout
}

// Run demonstration
demonstrateSwift()
