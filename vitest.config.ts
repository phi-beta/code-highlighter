/**
 * Vitest configuration: picks up all test files under tests/ with .test.ts suffix.
 */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts']
  }
});
