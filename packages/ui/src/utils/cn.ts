import { clsx, type ClassValue } from 'clsx';

/**
 * Combines class names conditionally. This helper wraps the popular `clsx`
 * library to ensure that falsy values are ignored and that strings are
 * concatenated intelligently.
 *
 * @param inputs A list of class names or objects.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
