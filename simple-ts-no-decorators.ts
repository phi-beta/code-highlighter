// Very simple TypeScript test
interface User {
  id: number;
  name: string;
}

type Status = 'active' | 'inactive';

function greet(user: User): string {
  return `Hello ${user.name}`;
}

const users: User[] = [];
