/**
 * Centralized error handling utilities
 */

export enum ErrorLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

interface LogOptions {
  level?: ErrorLevel;
  context?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Log error with proper formatting and context
 */
export function logError(
  message: string,
  error?: unknown,
  options: LogOptions = {}
): void {
  const { level = ErrorLevel.ERROR, context, metadata } = options;
  
  const prefix = context ? `[${context}]` : '';
  const fullMessage = `${prefix} ${message}`;
  
  if (level === ErrorLevel.INFO) {
    console.info(fullMessage, error, metadata);
  } else if (level === ErrorLevel.WARN) {
    console.warn(fullMessage, error, metadata);
  } else {
    console.error(fullMessage, error, metadata);
  }
}

/**
 * Extract meaningful error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.toLowerCase().includes('network') ||
      error.message.toLowerCase().includes('fetch') ||
      error.message.toLowerCase().includes('timeout')
    );
  }
  return false;
}

/**
 * Check if error is a quota exceeded error (localStorage)
 */
export function isQuotaExceededError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.name === 'QuotaExceededError' ||
      error.message.toLowerCase().includes('quota')
    );
  }
  return false;
}
