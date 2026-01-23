import type { Project } from '~alias~/lib/projects';
import { isQuotaExceededError, logError, ErrorLevel } from './errorHandler';

/**
 * Validation utilities for data integrity
 */

// Rate limiting storage key
const RATE_LIMIT_STORAGE_KEY = 'admin_rate_limit';

// Rate limit configuration
const RATE_LIMIT = {
  MAX_OPERATIONS: 50, // Max operations per time window
  TIME_WINDOW: 60000, // 1 minute in milliseconds
  CLEANUP_INTERVAL: 300000, // Clean up old entries every 5 minutes
} as const;

interface RateLimitEntry {
  timestamp: number;
  count: number;
}

/**
 * Check rate limiting for write operations
 */
export const checkRateLimit = (): { allowed: boolean; remaining: number; resetAt: number } => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    const now = Date.now();
    const entries: RateLimitEntry[] = stored ? JSON.parse(stored) : [];

    // Clean up old entries (older than time window)
    const recentEntries = entries.filter(
      (entry) => now - entry.timestamp < RATE_LIMIT.TIME_WINDOW
    );

    // Get entries in current time window
    const currentWindowEntries = recentEntries.filter(
      (entry) => now - entry.timestamp < RATE_LIMIT.TIME_WINDOW
    );

    // Count total operations in current window
    const totalOperations = currentWindowEntries.reduce((sum, entry) => sum + entry.count, 0);

    if (totalOperations >= RATE_LIMIT.MAX_OPERATIONS) {
      // Find the oldest entry in current window to calculate reset time
      const oldestEntry = currentWindowEntries.length > 0
        ? Math.min(...currentWindowEntries.map((e) => e.timestamp))
        : now;
      const resetAt = oldestEntry + RATE_LIMIT.TIME_WINDOW;

      return {
        allowed: false,
        remaining: 0,
        resetAt,
      };
    }

    // Add current operation
    const updatedEntries = [
      ...recentEntries,
      {
        timestamp: now,
        count: 1,
      },
    ];

    // Save updated entries with QuotaExceededError handling
    try {
      localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(updatedEntries));
    } catch (storageError) {
      if (isQuotaExceededError(storageError)) {
        // Clear old entries and try again
        localStorage.removeItem(RATE_LIMIT_STORAGE_KEY);
        logError('localStorage quota exceeded, cleared rate limit data', storageError, {
          level: ErrorLevel.WARN,
          context: 'RateLimit',
        });
      }
    }

    return {
      allowed: true,
      remaining: RATE_LIMIT.MAX_OPERATIONS - totalOperations - 1,
      resetAt: now + RATE_LIMIT.TIME_WINDOW,
    };
  } catch (error) {
    logError('Rate limit check error', error, {
      level: ErrorLevel.WARN,
      context: 'RateLimit',
    });
    // Allow operation if rate limit check fails
    return {
      allowed: true,
      remaining: RATE_LIMIT.MAX_OPERATIONS,
      resetAt: Date.now() + RATE_LIMIT.TIME_WINDOW,
    };
  }
};

/**
 * Validate project data
 */
export const validateProject = (project: Partial<Project>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields
  if (!project.name || project.name.trim().length === 0) {
    errors.push('Project name is required');
  } else if (project.name.length > 200) {
    errors.push('Project name must be less than 200 characters');
  }

  if (!project.description || project.description.trim().length === 0) {
    errors.push('Project description is required');
  } else if (project.description.length > 1000) {
    errors.push('Project description must be less than 1000 characters');
  }

  if (!project.icon || project.icon.trim().length === 0) {
    errors.push('Project icon is required');
  }

  if (!project.category || project.category.trim().length === 0) {
    errors.push('Project category is required');
  }

  // Validate tags
  if (!Array.isArray(project.tags)) {
    errors.push('Tags must be an array');
  } else {
    if (project.tags.length > 10) {
      errors.push('Maximum 10 tags allowed');
    }
    project.tags.forEach((tag, index) => {
      if (typeof tag !== 'string') {
        errors.push(`Tag at index ${index} must be a string`);
      } else if (tag.trim().length === 0) {
        errors.push(`Tag at index ${index} cannot be empty`);
      } else if (tag.length > 50) {
        errors.push(`Tag at index ${index} must be less than 50 characters`);
      }
    });
  }

  // Validate links
  if (project.link && typeof project.link === 'string' && project.link.length > 0) {
    try {
      // Allow relative paths and absolute URLs
      if (!project.link.startsWith('/') && !project.link.startsWith('http')) {
        errors.push('Link must be a valid URL or relative path');
      }
    } catch {
      errors.push('Link must be a valid URL or relative path');
    }
  }

  if (project.github && typeof project.github === 'string' && project.github.length > 0) {
    try {
      if (!project.github.startsWith('http')) {
        errors.push('GitHub URL must be a valid URL');
      }
    } catch {
      errors.push('GitHub URL must be a valid URL');
    }
  }

  // Validate boolean fields
  if (project.featured !== undefined && typeof project.featured !== 'boolean') {
    errors.push('Featured must be a boolean');
  }

  if (project.pinned !== undefined && typeof project.pinned !== 'boolean') {
    errors.push('Pinned must be a boolean');
  }

  if (project.hidden !== undefined && typeof project.hidden !== 'boolean') {
    errors.push('Hidden must be a boolean');
  }

  // Validate order
  if (project.order !== undefined && (typeof project.order !== 'number' || project.order < 0)) {
    errors.push('Order must be a non-negative number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate translation key/value
 */
export const validateTranslation = (key: string, value: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!key || key.trim().length === 0) {
    errors.push('Translation key is required');
  } else if (key.length > 100) {
    errors.push('Translation key must be less than 100 characters');
  }

  if (value === undefined || value === null) {
    errors.push('Translation value is required');
  } else if (typeof value !== 'string') {
    errors.push('Translation value must be a string');
  } else if (value.length > 5000) {
    errors.push('Translation value must be less than 5000 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate constant key/value
 */
export const validateConstant = (key: string, value: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!key || key.trim().length === 0) {
    errors.push('Constant key is required');
  } else if (key.length > 100) {
    errors.push('Constant key must be less than 100 characters');
  }

  if (value === undefined || value === null) {
    errors.push('Constant value is required');
  } else if (typeof value !== 'string') {
    errors.push('Constant value must be a string');
  } else if (value.length > 1000) {
    errors.push('Constant value must be less than 1000 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitize string input (basic XSS prevention)
 */
export const sanitizeString = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};