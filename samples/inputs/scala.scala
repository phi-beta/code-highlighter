// Scala comprehensive sample demonstrating modern features

/** Documentation comment for a trait */
trait Animal {
  def name: String
  def age: Int
  def makeSound(): Unit
  
  def description: String = s"Animal: $name, age: $age"
}

// Case class with companion object
case class Dog(name: String, age: Int, breed: String) extends Animal {
  override def makeSound(): Unit = println(s"Woof! I am $name")
  
  def wagTail(): Unit = println(s"$name is wagging tail")
}

object Dog {
  def apply(name: String, breed: String): Dog = Dog(name, 0, breed)
  
  def puppy(name: String, breed: String): Dog = Dog(name, breed)
}

// Sealed trait for pattern matching
sealed trait Status
case object Pending extends Status
case object Processing extends Status
case object Completed extends Status
case class Failed(error: String) extends Status

// Abstract class with generics
abstract class Container[T] {
  protected val items: scala.collection.mutable.ArrayBuffer[T] = 
    scala.collection.mutable.ArrayBuffer.empty[T]
    
  def add(item: T): Unit = items += item
  def get(index: Int): Option[T] = items.lift(index)
  def getAll: Seq[T] = items.toSeq
  
  // Higher-order function
  def findFirst(predicate: T => Boolean): Option[T] = items.find(predicate)
}

// Concrete implementation
class Repository[T] extends Container[T] {
  def count: Int = items.length
  
  def isEmpty: Boolean = items.isEmpty
  
  def clear(): Unit = items.clear()
}

// Implicit class for extension methods
implicit class StringExtensions(val str: String) extends AnyVal {
  def reversed: String = str.reverse
  
  def isValidEmail: Boolean = str.contains("@") && str.contains(".")
  
  def capitalize: String = 
    if (str.isEmpty) str
    else s"${str.head.toUpper}${str.tail}"
}

// Object with main method
object ScalaDemo extends App {
  // Variable declarations
  val immutable = "Hello, Scala!"
  var mutable = 42
  lazy val lazyValue = {
    println("Computing lazy value")
    100
  }
  
  // Type inference
  val numbers = List(1, 2, 3, 4, 5)
  val doubled = numbers.map(_ * 2)
  val evens = numbers.filter(_ % 2 == 0)
  
  // For comprehension
  val pairs = for {
    x <- 1 to 3
    y <- 1 to 3
    if x < y
  } yield (x, y)
  
  // Pattern matching
  def describe(status: Status): String = status match {
    case Pending => "Waiting to start"
    case Processing => "In progress"
    case Completed => "All done"
    case Failed(error) => s"Error: $error"
  }
  
  // Option handling
  val maybeValue: Option[Int] = Some(42)
  val result = maybeValue.map(_ * 2).getOrElse(0)
  
  // Collections
  val list = List(1, 2, 3)
  val set = Set(1, 2, 3, 3) // Duplicates removed
  val map = Map("key1" -> "value1", "key2" -> "value2")
  val vector = Vector(1, 2, 3, 4, 5)
  val array = Array(1, 2, 3)
  
  // String interpolation
  val name = "Scala"
  val version = 3
  println(s"Welcome to $name $version")
  println(f"Pi is approximately ${math.Pi}%.2f")
  println(raw"Path: C:\Users\Documents")
  
  // Multi-line strings
  val multiLine = """This is a
    |multi-line
    |string""".stripMargin
  
  // Tuple and destructuring
  val tuple = (1, "two", 3.0)
  val (first, second, third) = tuple
  
  // Higher-order functions
  def applyTwice(f: Int => Int, x: Int): Int = f(f(x))
  val increment = (x: Int) => x + 1
  val incremented = applyTwice(increment, 5)
  
  // Partial application
  def add(x: Int, y: Int): Int = x + y
  val addFive = add(5, _: Int)
  val sum = addFive(10) // 15
  
  // Currying
  def multiply(x: Int)(y: Int): Int = x * y
  val double = multiply(2) _
  val quadruple = multiply(4) _
  
  // Anonymous functions
  val square = (x: Int) => x * x
  val cube = (x: Int) => x * x * x
  
  // Function composition
  val addOne = (x: Int) => x + 1
  val timesTwo = (x: Int) => x * 2
  val composed = addOne andThen timesTwo
  val reversed = addOne compose timesTwo
  
  // By-name parameters
  def time[T](block: => T): T = {
    val start = System.nanoTime()
    val result = block
    val end = System.nanoTime()
    println(s"Execution time: ${(end - start) / 1000000}ms")
    result
  }
  
  // Implicits
  implicit val defaultTimeout: Int = 5000
  
  def fetchData(url: String)(implicit timeout: Int): String = {
    println(s"Fetching $url with timeout $timeout")
    "data"
  }
  
  val data = fetchData("https://api.example.com")
  
  // Case class usage
  val dog = Dog("Buddy", 3, "Labrador")
  val puppy = Dog.puppy("Max", "Beagle")
  
  // Pattern matching on case classes
  dog match {
    case Dog(n, a, b) if a < 5 => println(s"$n is a young $b")
    case Dog(n, _, _) => println(s"$n is older")
  }
  
  // Sealed trait pattern matching
  val status: Status = Processing
  val description = describe(status)
  
  // Option pattern matching
  maybeValue match {
    case Some(value) => println(s"Got value: $value")
    case None => println("No value")
  }
  
  // Try/catch
  try {
    val x = 10 / 0
  } catch {
    case e: ArithmeticException => println("Division by zero")
    case e: Exception => println(s"Error: ${e.getMessage}")
  } finally {
    println("Cleanup")
  }
  
  // Extension methods
  val email = "test@example.com"
  println(s"Valid email: ${email.isValidEmail}")
  println(s"Reversed: ${email.reversed}")
  
  // Generic repository
  val repo = new Repository[String]
  repo.add("Item 1")
  repo.add("Item 2")
  repo.add("Item 3")
  
  val found = repo.findFirst(_.contains("2"))
  println(s"Found: $found")
  
  // List operations
  val concatenated = list ::: List(4, 5, 6)
  val prepended = 0 :: list
  val appended = list :+ 4
  
  // Map operations
  val mapped = list.map(_ * 2)
  val filtered = list.filter(_ > 2)
  val folded = list.foldLeft(0)(_ + _)
  val reduced = list.reduce(_ + _)
  
  // FlatMap
  val nested = List(List(1, 2), List(3, 4))
  val flattened = nested.flatten
  val flatMapped = nested.flatMap(_.map(_ * 2))
  
  // Zip
  val zipped = list.zip(List("a", "b", "c"))
  
  // Grouping
  val grouped = numbers.groupBy(_ % 2)
  
  // Partitioning
  val (even, odd) = numbers.partition(_ % 2 == 0)
  
  // Symbol literals
  val symbol = 'identifier
  
  // Backtick identifiers for reserved words or special names
  val `type` = "String"
  val `match` = 42
  
  // Underscore usage
  val sum1 = list.reduce(_ + _)
  val sum2 = list.sum
  val _ = println("Ignored return value")
  
  // Type bounds
  def maximum[T <: Comparable[T]](x: T, y: T): T = 
    if (x.compareTo(y) > 0) x else y
  
  // View bounds (deprecated but still seen)
  // def printSorted[T <% Ordered[T]](seq: Seq[T]): Unit = 
  //   seq.sorted.foreach(println)
  
  // Context bounds
  def sort[T: Ordering](list: List[T]): List[T] = list.sorted
  
  // Multiple parameter lists
  def foldList[T, U](list: List[T])(zero: U)(f: (U, T) => U): U = 
    list.foldLeft(zero)(f)
  
  // Type aliases
  type StringMap = Map[String, String]
  type IntPair = (Int, Int)
  
  val stringMap: StringMap = Map("a" -> "A", "b" -> "B")
  val intPair: IntPair = (1, 2)
  
  // Structural types
  type HasClose = { def close(): Unit }
  
  def using[T <: HasClose, R](resource: T)(block: T => R): R = {
    try {
      block(resource)
    } finally {
      resource.close()
    }
  }
  
  // Self-type annotation
  trait Logger {
    def log(msg: String): Unit = println(s"[LOG] $msg")
  }
  
  trait Service { self: Logger =>
    def doWork(): Unit = {
      log("Starting work")
      // work implementation
      log("Work completed")
    }
  }
  
  // Operators as methods
  class Complex(val real: Double, val imag: Double) {
    def +(that: Complex): Complex = 
      new Complex(this.real + that.real, this.imag + that.imag)
    
    def *(that: Complex): Complex = 
      new Complex(
        this.real * that.real - this.imag * that.imag,
        this.real * that.imag + this.imag * that.real
      )
    
    override def toString: String = s"$real + ${imag}i"
  }
  
  val c1 = new Complex(1, 2)
  val c2 = new Complex(3, 4)
  val sum_complex = c1 + c2
  val product = c1 * c2
  
  println(s"Sum: $sum_complex")
  println(s"Product: $product")
}
