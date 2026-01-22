// Go sample code demonstrating various features
package main

import (
	"fmt"
	"sync"
	"time"
)

// User represents a user with basic information
type User struct {
	Name  string
	Age   int
	Email string
}

// Printable is an interface for types that can be printed
type Printable interface {
	Print()
}

// Print implements the Printable interface for User
func (u User) Print() {
	fmt.Printf("%s is %d years old\n", u.Name, u.Age)
}

// Generic function (Go 1.18+)
func Max[T int | float64](a, b T) T {
	if a > b {
		return a
	}
	return b
}

// Function with multiple return values
func divide(a, b float64) (float64, error) {
	if b == 0.0 {
		return 0, fmt.Errorf("division by zero")
	}
	return a / b, nil
}

// Function demonstrating various number types
func calculate() {
	// Integer types
	var x int = 42
	var hex uint32 = 0xFF
	var bin uint8 = 0b1010
	var oct int64 = 0o777

	// Float types
	var pi float64 = 3.14159
	var e float32 = 2.71828

	// Complex numbers
	var c complex128 = 1 + 2i
	var d complex64 = complex(3, 4)

	// Using underscores in numbers
	var million int = 1_000_000

	fmt.Println(x, hex, bin, oct, pi, e, c, d, million)
}

// Goroutine example with channels
func worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
	defer wg.Done()

	for job := range jobs {
		fmt.Printf("Worker %d processing job %d\n", id, job)
		time.Sleep(time.Second)
		results <- job * 2
	}
}

// Function with variadic parameters
func sum(nums ...int) int {
	total := 0
	for _, num := range nums {
		total += num
	}
	return total
}

// Switch statement examples
func classifyNumber(n int) string {
	switch {
	case n < 0:
		return "negative"
	case n == 0:
		return "zero"
	case n > 0:
		return "positive"
	default:
		return "unknown"
	}
}

// Type switch
func describe(i interface{}) string {
	switch v := i.(type) {
	case int:
		return fmt.Sprintf("Integer: %d", v)
	case string:
		return fmt.Sprintf("String: %s", v)
	case bool:
		return fmt.Sprintf("Boolean: %t", v)
	default:
		return "Unknown type"
	}
}

// Defer example
func deferExample() {
	defer fmt.Println("This prints last")
	defer fmt.Println("This prints second")
	fmt.Println("This prints first")
}

// Map and slice operations
func collections() {
	// Slice
	numbers := []int{1, 2, 3, 4, 5}
	numbers = append(numbers, 6, 7, 8)

	// Map
	ages := make(map[string]int)
	ages["Alice"] = 30
	ages["Bob"] = 25

	// Iterating
	for i, num := range numbers {
		fmt.Printf("Index %d: %d\n", i, num)
	}

	for name, age := range ages {
		fmt.Printf("%s is %d years old\n", name, age)
	}
}

// Anonymous function and closure
func closureExample() func() int {
	count := 0
	return func() int {
		count++
		return count
	}
}

// Panic and recover
func riskyOperation() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered from:", r)
		}
	}()

	panic("Something went wrong!")
}

// Main function
func main() {
	// Create a user
	user := User{
		Name:  "Alice",
		Age:   30,
		Email: "alice@example.com",
	}
	user.Print()

	// Short variable declaration
	message := "Hello, Go!"
	fmt.Println(message)

	// String literals
	raw := `This is a raw string
with multiple lines`
	fmt.Println(raw)

	// Rune literal
	var ch rune = 'A'
	fmt.Printf("Character: %c (code: %d)\n", ch, ch)

	// Goroutines and channels
	var wg sync.WaitGroup
	jobs := make(chan int, 10)
	results := make(chan int, 10)

	// Start workers
	for w := 1; w <= 3; w++ {
		wg.Add(1)
		go worker(w, jobs, results, &wg)
	}

	// Send jobs
	for j := 1; j <= 5; j++ {
		jobs <- j
	}
	close(jobs)

	// Wait and collect results
	go func() {
		wg.Wait()
		close(results)
	}()

	for result := range results {
		fmt.Println("Result:", result)
	}

	// Generic function
	fmt.Println("Max int:", Max(10, 20))
	fmt.Println("Max float:", Max(3.14, 2.71))

	// Variadic function
	fmt.Println("Sum:", sum(1, 2, 3, 4, 5))

	// Closure
	counter := closureExample()
	fmt.Println(counter()) // 1
	fmt.Println(counter()) // 2
	fmt.Println(counter()) // 3
}
