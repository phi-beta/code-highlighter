// Simple TypeScript test with basic decorators
@Component
class TestClass {
  @Property
  name: string = 'test';
  
  @Method
  getValue(): string {
    return this.name;
  }
}

// Basic types
interface User {
  id: number;
  name: string;
}

type Status = 'active' | 'inactive';

// Function with generic
function process<T>(data: T): T {
  return data;
}
