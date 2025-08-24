// Debug test to trace the full token transformation pipeline
import { describe, test, expect } from 'vitest';
import { highlight } from '../src/index.js';

describe('debug token transformation pipeline', () => {
  test('traces task list token transformation', () => {
    const input = '- [x] Completed task';
    
    // Mock console to capture logs
    const originalLog = console.log;
    const logs: string[] = [];
    console.log = (...args) => logs.push(args.join(' '));
    
    try {
      const result = highlight(input, { language: 'markdown' });
      
      // Restore console
      console.log = originalLog;
      
      console.log('Input:', JSON.stringify(input));
      console.log('Result HTML:', result);
      console.log('Captured logs:', logs);
      
      // Check if we have task-list class
      expect(result).toContain('tok-task-list');
    } finally {
      console.log = originalLog;
    }
  });
});
