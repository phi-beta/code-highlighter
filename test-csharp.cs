using System;

namespace HelloWorld
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Variables
            int number = 42;
            string message = "Hello, C#!";
            
            // String interpolation
            Console.WriteLine($"The answer is {number}");
            Console.WriteLine(message);
        }
    }
}
