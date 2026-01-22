// C++ Test File - Comprehensive Language Features
#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <algorithm>

// Preprocessor directives
#define MAX_SIZE 100
#define MIN(a, b) ((a) < (b) ? (a) : (b))

// Namespace
namespace MyNamespace {
    // Template class
    template<typename T>
    class Container {
    private:
        std::vector<T> data;
        int size;
        
    public:
        // Constructor
        Container() : size(0) {}
        
        // Destructor
        virtual ~Container() {}
        
        // Member functions
        void push(const T& item) {
            data.push_back(item);
            size++;
        }
        
        T& operator[](int index) {
            return data[index];
        }
        
        // Const member function
        int getSize() const {
            return size;
        }
    };
}

// Function with various features
int calculateValue(int x, int y) {
    // Local variables
    int result = 0;
    float multiplier = 1.5f;
    double precision = 3.14159;
    
    // Hex, binary, octal numbers
    int hexValue = 0xFF;
    int binValue = 0b1010;
    int octValue = 0755;
    
    // Control flow
    if (x > y) {
        result = x * 2;
    } else if (x == y) {
        result = x + y;
    } else {
        result = y - x;
    }
    
    // Loops
    for (int i = 0; i < 10; i++) {
        result += i;
    }
    
    while (result < 100) {
        result++;
    }
    
    // Switch statement
    switch (result) {
        case 0:
            return -1;
        case 100:
            return 0;
        default:
            break;
    }
    
    return result;
}

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
        std::cout << "Woof!" << std::endl;
    }
    
    void fetch() {
        std::cout << name << " is fetching!" << std::endl;
    }
};

// Lambda expressions and modern C++ features
void modernCppFeatures() {
    // Auto keyword
    auto lambda = [](int x, int y) -> int {
        return x + y;
    };
    
    // Smart pointers
    std::unique_ptr<Dog> myDog = std::make_unique<Dog>("Buddy", "Golden Retriever");
    std::shared_ptr<Animal> animal = std::make_shared<Dog>("Max", "Labrador");
    
    // Range-based for loop
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    for (const auto& num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // nullptr usage
    int* ptr = nullptr;
    if (ptr == nullptr) {
        std::cout << "Pointer is null" << std::endl;
    }
    
    // Raw string literals
    std::string rawStr = R"(This is a
    multi-line
    raw string)";
    
    // String literals with prefixes
    const char* str = "Regular string";
    const wchar_t* wstr = L"Wide string";
    const char* u8str = u8"UTF-8 string";
    
    // Character literals
    char ch = 'a';
    wchar_t wch = L'β';
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
    bool isTrue = true;
    bool isFalse = false;
    
    // Different types
    int i = 42;
    long l = 1000L;
    unsigned int ui = 100u;
    long long ll = 1000000LL;
    
    // Floating point
    float f = 3.14f;
    double d = 2.71828;
    
    // Operators
    int sum = i + 10;
    int diff = i - 5;
    int product = i * 2;
    int quotient = i / 2;
    int remainder = i % 3;
    
    // Bitwise operators
    int bitwiseAnd = i & 0xFF;
    int bitwiseOr = i | 0x0F;
    int bitwiseXor = i ^ 0xAA;
    int leftShift = i << 2;
    int rightShift = i >> 1;
    
    // Logical operators
    bool logicalAnd = isTrue && isFalse;
    bool logicalOr = isTrue || isFalse;
    bool logicalNot = !isTrue;
    
    // Comparison operators
    bool equal = (i == 42);
    bool notEqual = (i != 0);
    bool lessThan = (i < 100);
    bool greaterThan = (i > 10);
    bool lessEqual = (i <= 42);
    bool greaterEqual = (i >= 42);
    
    // Increment/decrement
    i++;
    ++i;
    i--;
    --i;
    
    // Assignment operators
    i += 5;
    i -= 2;
    i *= 2;
    i /= 3;
    i %= 7;
    
    // Call functions
    int value = calculateValue(10, 20);
    modernCppFeatures();
    
    // Using template
    int maxInt = max(5, 10);
    double maxDouble = max(3.14, 2.71);
    
    // Constexpr
    constexpr int fact5 = factorial(5);
    
    // Comments
    // This is a single-line comment
    
    /* This is a
       multi-line
       comment */
    
    std::cout << "Hello, C++!" << std::endl;
    
    return 0;
}
