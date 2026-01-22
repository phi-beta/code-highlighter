// Kotlin sample code demonstrating various language features
package com.example.app

import kotlin.math.*

// Data class
data class Person(
    val name: String,
    val age: Int,
    var email: String? = null
) {
    // Secondary constructor
    constructor(name: String) : this(name, 0)
    
    // Member function
    fun greet() = println("Hello, I'm $name")
    
    // Computed property
    val isAdult: Boolean
        get() = age >= 18
}

// Sealed class hierarchy
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

// Interface
interface Repository<T> {
    suspend fun get(id: Int): T?
    suspend fun getAll(): List<T>
    fun save(item: T)
}

// Generic class with constraints
class InMemoryRepository<T : Any>(
    private val items: MutableList<T> = mutableListOf()
) : Repository<T> {
    
    override suspend fun get(id: Int): T? {
        return items.getOrNull(id)
    }
    
    override suspend fun getAll(): List<T> {
        return items.toList()
    }
    
    override fun save(item: T) {
        items.add(item)
    }
}

// Extension function
fun String.isValidEmail(): Boolean {
    return this.contains("@") && this.contains(".")
}

// Extension property
val String.wordCount: Int
    get() = this.split("\\s+".toRegex()).size

// Object declaration (singleton)
object AppConfig {
    const val VERSION = "1.0.0"
    const val DEBUG = true
    
    fun initialize() {
        println("App initialized")
    }
}

// Companion object
class Logger {
    companion object {
        private const val TAG = "Logger"
        
        fun log(message: String) {
            println("[$TAG] $message")
        }
        
        fun debug(message: String) {
            if (AppConfig.DEBUG) {
                println("[$TAG] DEBUG: $message")
            }
        }
    }
}

// Enum class
enum class Status(val code: Int) {
    PENDING(0),
    APPROVED(1),
    REJECTED(2);
    
    fun isComplete() = this != PENDING
}

// Higher-order functions and lambdas
fun main() {
    // Variable declarations
    val immutable = 42
    var mutable = 10
    
    // Nullable types
    var nullable: String? = null
    nullable = "Not null anymore"
    
    // Safe call and Elvis operator
    val length = nullable?.length ?: 0
    
    // Non-null assertion
    val definitelyNotNull = nullable!!
    
    // Different number formats
    val hexValue = 0xFF
    val binaryValue = 0b1010
    val longValue = 1000L
    
    // Floating point numbers
    val floatNum = 3.14f
    val doubleNum = 2.71828
    
    // Character and strings
    val char = 'A'
    val string = "Hello, Kotlin!"
    val multilineString = """
        This is a
        multi-line
        string
    """.trimIndent()
    
    // String templates
    val name = "Alice"
    val greeting = "Hello, $name!"
    val expression = "2 + 2 = ${2 + 2}"
    
    // Collections
    val list = listOf(1, 2, 3, 4, 5)
    val mutableList = mutableListOf("a", "b", "c")
    val set = setOf(1, 2, 3)
    val map = mapOf("key1" to "value1", "key2" to "value2")
    
    // Array
    val array = arrayOf(1, 2, 3, 4, 5)
    val intArray = intArrayOf(1, 2, 3)
    
    // Ranges
    val range = 1..10
    val rangeUntil = 1 until 10
    val downTo = 10 downTo 1
    val step = 1..10 step 2
    
    // When expression (like switch)
    val result = when (immutable) {
        in 1..10 -> "Small"
        in 11..100 -> "Medium"
        else -> "Large"
    }
    
    // When with type checking
    fun describe(obj: Any): String = when (obj) {
        is String -> "String of length ${obj.length}"
        is Int -> "Integer: $obj"
        is List<*> -> "List with ${obj.size} elements"
        else -> "Unknown"
    }
    
    // If as expression
    val max = if (immutable > mutable) immutable else mutable
    
    // For loops
    for (i in 1..5) {
        println(i)
    }
    
    for (item in list) {
        println(item)
    }
    
    for ((index, value) in list.withIndex()) {
        println("$index: $value")
    }
    
    // While loops
    var counter = 0
    while (counter < 5) {
        println(counter)
        counter++
    }
    
    do {
        println(counter)
        counter--
    } while (counter > 0)
    
    // Lambda expressions
    val sum = { x: Int, y: Int -> x + y }
    println(sum(3, 5))
    
    // Higher-order functions
    val numbers = listOf(1, 2, 3, 4, 5)
    val doubled = numbers.map { it * 2 }
    val evens = numbers.filter { it % 2 == 0 }
    val total = numbers.reduce { acc, n -> acc + n }
    
    // Function types
    val operation: (Int, Int) -> Int = { a, b -> a + b }
    
    // Trailing lambda syntax
    numbers.forEach { println(it) }
    
    // let, run, with, apply, also
    val person = Person("Bob", 30).apply {
        email = "bob@example.com"
    }
    
    person.let {
        println("Name: ${it.name}")
        println("Age: ${it.age}")
    }
    
    // Destructuring
    val (name1, age1) = person
    val (first, second) = Pair(1, 2)
    
    // Try-catch expression
    val parsed = try {
        "123".toInt()
    } catch (e: NumberFormatException) {
        0
    }
    
    // Elvis with throw
    val required = nullable ?: throw IllegalArgumentException("Value required")
    
    // Operators
    var x = 10
    x += 5   // Compound assignment
    x++      // Increment
    ++x      // Pre-increment
    x--      // Decrement
    --x      // Pre-decrement
    
    // Comparison operators
    val equal = (x == 10)
    val notEqual = (x != 0)
    val lessThan = (x < 100)
    val greaterThan = (x > 5)
    val lessOrEqual = (x <= 10)
    val greaterOrEqual = (x >= 10)
    
    // Identity operators
    val same = (person === person)
    val notSame = (person !== Person("Other", 20))
    
    // Range operators
    val inRange = x in 1..100
    val notInRange = x !in 1..10
    
    // Bitwise operators
    val bitwiseAnd = 0xFF and 0x0F
    val bitwiseOr = 0xFF or 0x0F
    val bitwiseXor = 0xFF xor 0x0F
    val leftShift = 1 shl 3
    val rightShift = 16 shr 2
    val unsignedRightShift = -16 ushr 2
    
    // Logical operators
    val and = true && false
    val or = true || false
    val not = !true
    
    // Labels and jumps
    loop@ for (i in 1..5) {
        for (j in 1..5) {
            if (j == 3) continue@loop
            println("$i, $j")
        }
    }
    
    // Inline function with lambda
    inline fun <T> measureTime(block: () -> T): T {
        val start = System.currentTimeMillis()
        val result = block()
        val end = System.currentTimeMillis()
        println("Time: ${end - start}ms")
        return result
    }
    
    measureTime {
        Thread.sleep(100)
    }
    
    // Coroutines (basic example - requires kotlinx.coroutines)
    // suspend fun fetchData(): String {
    //     delay(1000)
    //     return "Data"
    // }
    
    // Using sealed class
    fun handleResult(result: Result<String>) {
        when (result) {
            is Result.Success -> println("Success: ${result.data}")
            is Result.Error -> println("Error: ${result.message}")
            Result.Loading -> println("Loading...")
        }
    }
    
    /* Multi-line comment
       demonstrating Kotlin
       language features */
    
    println("Kotlin sample completed!")
}
