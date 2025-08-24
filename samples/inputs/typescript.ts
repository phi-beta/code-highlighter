// TypeScript comprehensive feature demonstration
// This file showcases all the syntax highlighting capabilities for TypeScript

// 1. Import and export statements
import { Component, OnInit } from '@angular/core';
import type { User, ApiResponse } from './types';
import * as Utils from './utils';
export { Component, User };
export default class MyClass {};

// 2. Type definitions and interfaces
interface UserProfile {
  id: number;
  name: string;
  email?: string;
  readonly createdAt: Date;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

type Status = 'pending' | 'approved' | 'rejected';
type GenericResponse<T> = {
  data: T;
  status: Status;
  message?: string;
};

// 3. Classes with access modifiers and decorators
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
class UserService implements OnInit {
  private readonly apiUrl: string = 'https://api.example.com';
  protected users: UserProfile[] = [];
  public static instance: UserService;

  constructor(private httpClient: HttpClient) {}

  @Override
  public async ngOnInit(): Promise<void> {
    await this.loadUsers();
  }

  @Deprecated('Use getUserById instead')
  private findUser(id: number): UserProfile | undefined {
    return this.users.find(user => user.id === id);
  }

  public getUserById<T extends UserProfile>(id: number): T | null {
    return this.users.find(user => user.id === id) as T || null;
  }
}

// 4. Functions with various signatures
async function fetchData<T>(url: string): Promise<GenericResponse<T>> {
  const response = await fetch(url);
  return response.json() as GenericResponse<T>;
}

const processUsers = (users: UserProfile[]): Promise<void> => {
  return Promise.all(users.map(async (user) => {
    await validateUser(user);
  })).then(() => undefined);
};

// 5. Advanced types and utilities
type PartialUser = Partial<UserProfile>;
type RequiredUser = Required<UserProfile>;
type UserKeys = keyof UserProfile;
type UserValues = UserProfile[UserKeys];

// 6. Conditional types and mapped types
type NonNullable<T> = T extends null | undefined ? never : T;
type ReadonlyUser = {
  readonly [K in keyof UserProfile]: UserProfile[K];
};

// 7. String literal types and template literals
type Theme = 'light' | 'dark' | 'auto';
type EventName = `on${Capitalize<string>}`;
const eventHandler: EventName = 'onClick';

// 8. Numbers - various formats
const decimal = 42;
const float = 3.14159;
const scientific = 1.5e-5;
const hexadecimal = 0xFF;
const binary = 0b1010;
const octal = 0o755;
const bigint = 9007199254740991n;

// 9. String types and template literals
const singleQuote = 'Hello World';
const doubleQuote = "TypeScript Rocks";
const templateLiteral = `User: ${singleQuote}, Language: ${doubleQuote}`;
const multilineTemplate = `
  This is a multiline
  template literal with ${decimal} interpolations
  and ${float} expressions.
`;

// 10. Regular expressions
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gi;
const phonePattern = /\(\d{3}\)\s\d{3}-\d{4}/;

// 11. Arrays and objects with type annotations
const userIds: number[] = [1, 2, 3, 4, 5];
const users: Array<UserProfile> = [];
const userMap: Map<number, UserProfile> = new Map();
const userSet: Set<string> = new Set(['admin', 'user', 'guest']);

// 12. Destructuring with types
const { id, name, email = 'unknown' }: UserProfile = users[0];
const [first, second, ...rest]: number[] = userIds;

// 13. Optional chaining and nullish coalescing
const userName = users[0]?.name ?? 'Anonymous';
const userEmail = users[0]?.email?.toLowerCase();
const config = {
  timeout: undefined as number | undefined,
  retries: null as number | null
};
const timeout = config.timeout ?? 5000;
const retries = config.retries || 3;

// 14. Type guards and assertions
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: string | number): void {
  if (isString(value)) {
    console.log(value.toUpperCase()); // TypeScript knows it's a string
  } else {
    console.log(value.toFixed(2)); // TypeScript knows it's a number
  }
}

// 15. Namespace and module declarations
declare namespace NodeJS {
  interface Global {
    customProperty: string;
  }
}

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}

// 16. Enums
enum Color {
  Red = '#ff0000',
  Green = '#00ff00',
  Blue = '#0000ff'
}

const enum Direction {
  Up,
  Down,
  Left,
  Right
}

// 17. Generic constraints and conditional types
interface Identifiable {
  id: number;
}

function updateEntity<T extends Identifiable>(entity: T, updates: Partial<T>): T {
  return { ...entity, ...updates };
}

// 18. Utility types in action
type UserUpdate = Pick<UserProfile, 'name' | 'email'>;
type UserSummary = Omit<UserProfile, 'preferences'>;
type UserRecord = Record<string, UserProfile>;

// 19. Error handling with custom types
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// 20. Comments and documentation
/**
 * Calculates the total score for a user
 * @param user - The user profile
 * @param multiplier - Score multiplier (default: 1)
 * @returns The calculated total score
 */
function calculateScore(user: UserProfile, multiplier: number = 1): number {
  // Simple calculation based on user ID
  return user.id * multiplier; // inline comment
}

/* Multi-line comment
   spanning multiple lines
   with different content */

// 21. Boolean and null values
const isActive: boolean = true;
const isDisabled: boolean = false;
const nullValue: null = null;
const undefinedValue: undefined = undefined;
const voidFunction = (): void => {};

// 22. Symbol and unique symbol
const sym1: symbol = Symbol('description');
const sym2: unique symbol = Symbol('unique');

// 23. Never type and exhaustive checks
function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}

function processStatus(status: Status): string {
  switch (status) {
    case 'pending':
      return 'Processing...';
    case 'approved':
      return 'Completed';
    case 'rejected':
      return 'Failed';
    default:
      return assertNever(status);
  }
}

// 24. This parameter and function overloads
interface Calculator {
  add(this: Calculator, x: number, y: number): number;
}

function createCalculator(): Calculator {
  return {
    add(this: Calculator, x: number, y: number): number {
      return x + y;
    }
  };
}

// 25. Advanced operators and expressions
const result = userIds
  .filter((id): id is number => id > 0)
  .map(id => ({ id, processed: true }))
  .reduce((acc, item) => ({ ...acc, [item.id]: item }), {} as Record<number, any>);

// End of comprehensive TypeScript demonstration
