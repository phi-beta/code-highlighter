// C# sample code demonstrating various language features
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

#region Namespace Declaration
namespace MyCompany.Application
{
    // Attributes
    [Serializable]
    [Obsolete("Use NewClass instead")]
    public class OldClass
    {
    }

    /// <summary>
    /// A sample class demonstrating C# features
    /// </summary>
    public class Person
    {
        // Properties with various access modifiers
        public int Id { get; set; }
        public string Name { get; private set; }
        public int Age { get; init; }
        private string _email;
        
        // Auto-implemented property with initializer
        public bool IsActive { get; set; } = true;
        
        // Expression-bodied property
        public string DisplayName => $"{Name} (Age: {Age})";
        
        // Constructor
        public Person(string name, int age)
        {
            Name = name;
            Age = age;
        }
        
        // Method with nullable reference type
        public void SetEmail(string? email)
        {
            _email = email ?? "no-email@example.com";
        }
        
        // Expression-bodied method
        public override string ToString() => DisplayName;
    }

    // Record type (C# 9.0+)
    public record Employee(string Name, string Department, decimal Salary);
    
    // Record with additional members
    public record Manager(string Name, string Department, decimal Salary, int TeamSize) 
        : Employee(Name, Department, Salary)
    {
        public string GetTeamInfo() => $"Manages {TeamSize} people";
    }

    // Interface
    public interface IRepository<T> where T : class
    {
        Task<T> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
    }

    // Generic class with constraints
    public class Repository<T> : IRepository<T> where T : class, new()
    {
        private readonly List<T> _data = new();
        
        public async Task<T> GetByIdAsync(int id)
        {
            await Task.Delay(10); // Simulate async operation
            return _data.FirstOrDefault();
        }
        
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            await Task.Delay(10);
            return _data;
        }
        
        public async Task AddAsync(T entity)
        {
            await Task.Delay(10);
            _data.Add(entity);
        }
        
        public async Task UpdateAsync(T entity)
        {
            await Task.Delay(10);
            // Update logic here
        }
        
        public async Task DeleteAsync(int id)
        {
            await Task.Delay(10);
            // Delete logic here
        }
    }

    // Enum
    public enum Status
    {
        None = 0,
        Pending = 1,
        Approved = 2,
        Rejected = 3
    }

    // Delegate
    public delegate void MessageHandler(string message);

    // Event
    public class EventPublisher
    {
        public event MessageHandler OnMessage;
        
        public void RaiseEvent(string msg)
        {
            OnMessage?.Invoke(msg);
        }
    }

    public static class Program
    {
        public static async Task Main(string[] args)
        {
            // Variable declarations
            int number = 42;
            long bigNumber = 1000000L;
            float floatNum = 3.14f;
            double doubleNum = 2.71828;
            decimal money = 99.99m;
            bool isTrue = true;
            char letter = 'A';
            
            // Different number formats
            int hexValue = 0xFF;
            int binaryValue = 0b1010;
            
            // String literals
            string regularString = "Hello, World!";
            string verbatimString = @"C:\Users\Name\Documents";
            string interpolatedString = $"Number is {number}";
            string rawString = """
                Multi-line
                raw string literal
                """;
            
            // Nullable types
            int? nullableInt = null;
            string? nullableString = null;
            
            // Null-coalescing operators
            int value = nullableInt ?? 0;
            nullableString ??= "default";
            
            // Pattern matching
            object obj = "test";
            if (obj is string str)
            {
                Console.WriteLine($"String: {str}");
            }
            
            // Switch expression
            var result = number switch
            {
                < 0 => "Negative",
                0 => "Zero",
                > 0 and <= 100 => "Positive and small",
                _ => "Large"
            };
            
            // Collection initializers
            var list = new List<int> { 1, 2, 3, 4, 5 };
            var dict = new Dictionary<string, int>
            {
                ["one"] = 1,
                ["two"] = 2,
                ["three"] = 3
            };
            
            // LINQ queries
            var evenNumbers = from n in list
                             where n % 2 == 0
                             select n;
            
            // Lambda expressions
            var squared = list.Select(x => x * x);
            var filtered = list.Where(x => x > 2);
            
            // Anonymous types
            var person = new { Name = "John", Age = 30 };
            
            // Tuples
            (string name, int age) tuple = ("Alice", 25);
            var (personName, personAge) = tuple;
            
            // Range and index
            var array = new[] { 1, 2, 3, 4, 5 };
            var lastItem = array[^1];
            var range = array[1..4];
            
            // Using statement
            using (var stream = new System.IO.MemoryStream())
            {
                // Use stream
            }
            
            // Try-catch-finally
            try
            {
                int zero = 0;
                int div = 10 / zero;
            }
            catch (DivideByZeroException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            catch (Exception ex) when (ex.Message.Contains("error"))
            {
                Console.WriteLine("Filtered exception");
            }
            finally
            {
                Console.WriteLine("Cleanup");
            }
            
            // Async/await
            await DoWorkAsync();
            
            // Yield return (iterator)
            foreach (var num in GetNumbers())
            {
                Console.WriteLine(num);
            }
            
            // Record usage
            var employee = new Employee("Bob", "IT", 75000m);
            var manager = new Manager("Alice", "Engineering", 100000m, 5);
            
            // Record with-expression
            var updatedEmployee = employee with { Salary = 80000m };
            
            // Operators
            int sum = 10 + 5;
            int diff = 10 - 5;
            int product = 10 * 5;
            int quotient = 10 / 5;
            int remainder = 10 % 3;
            
            // Bitwise operators
            int bitwiseAnd = 0xFF & 0x0F;
            int bitwiseOr = 0xFF | 0x0F;
            int bitwiseXor = 0xFF ^ 0x0F;
            int leftShift = 1 << 3;
            int rightShift = 16 >> 2;
            
            // Logical operators
            bool and = true && false;
            bool or = true || false;
            bool not = !true;
            
            // Comparison operators
            bool equal = (10 == 10);
            bool notEqual = (10 != 5);
            bool lessThan = (5 < 10);
            bool greaterThan = (10 > 5);
            bool lessOrEqual = (5 <= 10);
            bool greaterOrEqual = (10 >= 5);
            
            // Increment/decrement
            number++;
            ++number;
            number--;
            --number;
            
            // Compound assignment
            number += 5;
            number -= 2;
            number *= 3;
            number /= 2;
            number %= 7;
            
            /* Multi-line comment
               demonstrating various
               C# language features */
            
            Console.WriteLine("Program completed!");
        }
        
        // Async method
        private static async Task DoWorkAsync()
        {
            await Task.Delay(100);
            Console.WriteLine("Work completed");
        }
        
        // Iterator method
        private static IEnumerable<int> GetNumbers()
        {
            for (int i = 1; i <= 5; i++)
            {
                yield return i;
            }
        }
    }
}
#endregion
