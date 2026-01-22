// Rust sample code demonstrating various features
use std::collections::HashMap;

/// A documented struct with lifetime annotations
#[derive(Debug, Clone)]
pub struct User<'a> {
    name: &'a str,
    age: u32,
    email: String,
}

impl<'a> User<'a> {
    /// Creates a new User instance
    pub fn new(name: &'a str, age: u32, email: String) -> Self {
        User { name, age, email }
    }
    
    pub fn greet(&self) -> String {
        format!("Hello, I'm {} and I'm {} years old!", self.name, self.age)
    }
}

// Enum with various variants
enum Result<T, E> {
    Ok(T),
    Err(E),
}

// Traits and implementations
trait Printable {
    fn print(&self);
}

impl<'a> Printable for User<'a> {
    fn print(&self) {
        println!("{:?}", self);
    }
}

// Async function
async fn fetch_data(url: &str) -> Result<String, String> {
    // Simulate async operation
    Ok(format!("Data from {}", url))
}

// Function with various number types
fn calculate(x: i32, y: f64) -> f64 {
    let hex_val = 0xFF;
    let bin_val = 0b1010;
    let oct_val = 0o777;
    
    (x as f64) * y + hex_val as f64
}

// Pattern matching
fn match_example(value: Option<i32>) -> i32 {
    match value {
        Some(x) if x > 0 => x * 2,
        Some(x) => -x,
        None => 0,
    }
}

// Closures and iterators
fn iterator_example() {
    let numbers = vec![1, 2, 3, 4, 5];
    let doubled: Vec<i32> = numbers
        .iter()
        .map(|&x| x * 2)
        .filter(|&x| x > 4)
        .collect();
    
    println!("Doubled and filtered: {:?}", doubled);
}

// Ownership and borrowing
fn ownership_example() {
    let mut data = vec![1, 2, 3];
    let reference = &mut data;
    reference.push(4);
    
    let slice = &data[1..3];
    println!("Slice: {:?}", slice);
}

// Macro usage
macro_rules! create_function {
    ($func_name:ident) => {
        fn $func_name() {
            println!("Function {:?} called", stringify!($func_name));
        }
    };
}

create_function!(foo);
create_function!(bar);

// Main function with error handling
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let user = User::new("Alice", 30, "alice@example.com".to_string());
    user.print();
    
    let result = match_example(Some(42));
    assert_eq!(result, 84);
    
    // Raw string literal
    let path = r#"C:\Users\Alice\Documents"#;
    println!("Path: {}", path);
    
    // Lifetime and references
    let s1 = String::from("hello");
    let s2 = "world";
    let result = longest(&s1, s2);
    println!("Longest: {}", result);
    
    Ok(())
}

// Generic function with lifetimes
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// Unsafe code
unsafe fn dangerous() {
    static mut COUNTER: i32 = 0;
    COUNTER += 1;
}

// Constants
const MAX_POINTS: u32 = 100_000;
static LANGUAGE: &str = "Rust";
