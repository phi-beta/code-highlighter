// C++ sample code demonstrating various language features
#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <algorithm>

// Preprocessor directives
#define MAX_SIZE 100
#define MIN(a, b) ((a) < (b) ? (a) : (b))

// Namespace declaration
namespace MyApp {

// Template class
template<typename T>
class Container {
private:
    std::vector<T> data;
    size_t capacity;
    
public:
    // Constructor with initializer list
    Container(size_t cap = 10) : capacity(cap) {
        data.reserve(capacity);
    }
    
    // Move constructor
    Container(Container&& other) noexcept 
        : data(std::move(other.data)), capacity(other.capacity) {}
    
    // Member functions
    void push(const T& item) {
        if (data.size() < capacity) {
            data.push_back(item);
        }
    }
    
    T& operator[](size_t index) {
        return data[index];
    }
    
    size_t size() const noexcept {
        return data.size();
    }
};

} // namespace MyApp

// Class with inheritance
class Animal {
protected:
    std::string name;
    int age;
    
public:
    Animal(const std::string& n) : name(n), age(0) {}
    
    virtual void speak() const {
        std::cout << "Animal sound" << std::endl;
    }
    
    virtual ~Animal() = default;
};

class Dog : public Animal {
private:
    std::string breed;
    
public:
    Dog(const std::string& n, const std::string& b) 
        : Animal(n), breed(b) {}
    
    void speak() const override {
        std::cout << "Woof! I'm " << name << std::endl;
    }
};

// Modern C++ features
void modernFeatures() {
    // Auto type deduction
    auto lambda = [](int x, int y) -> int {
        return x + y;
    };
    
    // Smart pointers
    std::unique_ptr<Dog> myDog = std::make_unique<Dog>("Buddy", "Retriever");
    std::shared_ptr<Animal> animal = std::make_shared<Dog>("Max", "Labrador");
    
    // Range-based for loop
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    for (const auto& num : numbers) {
        std::cout << num << " ";
    }
    
    // nullptr
    int* ptr = nullptr;
    if (ptr == nullptr) {
        std::cout << "Pointer is null" << std::endl;
    }
    
    // Raw string literal
    std::string rawStr = R"(Multi-line
    raw string
    with "quotes")";
}

// Template function
template<typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

// Constexpr function
constexpr int factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}

// Main function
int main(int argc, char* argv[]) {
    // Boolean values
    bool isActive = true;
    bool isDeleted = false;
    
    // Different integer types
    int i = 42;
    long l = 1000L;
    unsigned int ui = 100u;
    long long ll = 1000000LL;
    
    // Floating point numbers
    float f = 3.14f;
    double d = 2.71828;
    
    // Different number formats
    int hexValue = 0xFF;
    int binValue = 0b1010;
    int octValue = 0755;
    
    // String literals
    const char* str = "Regular string";
    const wchar_t* wstr = L"Wide string";
    std::string cppStr = "C++ string";
    
    // Character literals
    char ch = 'A';
    wchar_t wch = L'β';
    
    // Control flow
    if (i > 0) {
        std::cout << "Positive" << std::endl;
    } else if (i == 0) {
        std::cout << "Zero" << std::endl;
    } else {
        std::cout << "Negative" << std::endl;
    }
    
    // Loop constructs
    for (int j = 0; j < 10; ++j) {
        if (j % 2 == 0) continue;
        std::cout << j << " ";
    }
    
    while (i < 50) {
        i++;
    }
    
    // Switch statement
    switch (i) {
        case 0:
            break;
        case 42:
            std::cout << "The answer!" << std::endl;
            break;
        default:
            break;
    }
    
    // Operators
    int sum = i + 10;
    int product = i * 2;
    int quotient = i / 3;
    int remainder = i % 7;
    
    // Bitwise operators
    int bitwiseAnd = i & 0xFF;
    int bitwiseOr = i | 0x0F;
    int leftShift = i << 2;
    int rightShift = i >> 1;
    
    // Logical operators
    bool result = (isActive && !isDeleted) || (i > 0);
    
    // Comparison operators
    bool equal = (i == 42);
    bool notEqual = (i != 0);
    bool lessThan = (i < 100);
    
    // Increment/decrement
    i++;
    --i;
    
    // Compound assignment
    i += 5;
    i *= 2;
    
    // Using templates
    int maxInt = max(5, 10);
    double maxDouble = max(3.14, 2.71);
    
    // Constexpr usage
    constexpr int fact5 = factorial(5);
    
    // Call modern features
    modernFeatures();
    
    /* Multi-line comment
       explaining the return value */
    return 0;
}
