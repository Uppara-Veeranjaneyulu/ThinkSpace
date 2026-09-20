import { describe, it, expect } from 'vitest';
import { cn, formatCount, getInitials, truncate, slugify } from './utils';

describe('Frontend utils', () => {
  it('cn merges tailwind classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('formatCount formats numbers cleanly', () => {
    expect(formatCount(42)).toBe('42');
    expect(formatCount(1200)).toBe('1.2K');
    expect(formatCount(2500000)).toBe('2.5M');
  });

  it('getInitials extracts initials from names', () => {
    expect(getInitials('John Doe')).toBe('JD');
    expect(getInitials('Alice')).toBe('A');
  });

  it('truncate shortens strings with ellipsis', () => {
    expect(truncate('Hello world', 5)).toBe('Hello…');
    expect(truncate('Hello', 10)).toBe('Hello');
  });

  it('slugify formats URL slugs', () => {
    expect(slugify('Hello World! 2026')).toBe('hello-world-2026');
  });
});
