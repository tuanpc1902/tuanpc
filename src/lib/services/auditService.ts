import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth, isFirebaseConfigured } from '~alias~/lib/firebase';

// Audit log collection name
const AUDIT_COLLECTION = 'audit_logs';

// Audit action types
export enum AuditAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  READ = 'read',
  LOGIN = 'login',
  LOGOUT = 'logout',
  RESET = 'reset',
}

// Resource types
export enum ResourceType {
  PROJECT = 'project',
  TRANSLATION = 'translation',
  CONSTANT = 'constant',
  AUTH = 'auth',
}

interface AuditLog {
  action: AuditAction;
  resourceType: ResourceType;
  resourceId?: string;
  userId?: string;
  userEmail?: string;
  timestamp: any;
  ipAddress?: string;
  userAgent?: string;
  changes?: {
    before?: any;
    after?: any;
  };
  metadata?: Record<string, any>;
}

/**
 * Log an audit event to Firestore
 */
export const logAudit = async (
  action: AuditAction,
  resourceType: ResourceType,
  options: {
    resourceId?: string;
    changes?: { before?: any; after?: any };
    metadata?: Record<string, any>;
  } = {}
): Promise<void> => {
  if (!isFirebaseConfigured()) {
    // Log to console if Firestore is not available
    console.log('[Audit Log]', {
      action,
      resourceType,
      ...options,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  try {
    const user = auth.currentUser;
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent : undefined;

    // Get IP address (client-side, not 100% accurate)
    const ipAddress = await getClientIP();

    const auditLog: AuditLog = {
      action,
      resourceType,
      resourceId: options.resourceId,
      userId: user?.uid,
      userEmail: user?.email || undefined,
      timestamp: serverTimestamp(),
      ipAddress,
      userAgent,
      changes: options.changes,
      metadata: options.metadata,
    };

    // Only log if user is authenticated (optional - you can remove this check)
    if (user) {
      await addDoc(collection(db, AUDIT_COLLECTION), auditLog);
    } else {
      // Still log but mark as anonymous
      await addDoc(collection(db, AUDIT_COLLECTION), {
        ...auditLog,
        userId: 'anonymous',
      });
    }
  } catch (error) {
    console.error('Error logging audit event:', error);
    // Don't throw - audit logging should not break the application
  }
};

/**
 * Get client IP address (client-side approximation)
 * Note: This is not 100% accurate and only works in some scenarios
 */
const getClientIP = async (): Promise<string | undefined> => {
  try {
    // Try to get IP from a public API (only for audit purposes)
    // You can use services like ipify.org, ipapi.co, etc.
    // For production, consider using server-side IP detection
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    // Fallback: return undefined if IP detection fails
    return undefined;
  }
};

/**
 * Log project operations
 */
export const auditProjects = {
  create: (projectId: string, project: any) =>
    logAudit(AuditAction.CREATE, ResourceType.PROJECT, {
      resourceId: projectId,
      changes: { after: project },
    }),

  update: (projectId: string, before: any, after: any) =>
    logAudit(AuditAction.UPDATE, ResourceType.PROJECT, {
      resourceId: projectId,
      changes: { before, after },
    }),

  delete: (projectId: string, project: any) =>
    logAudit(AuditAction.DELETE, ResourceType.PROJECT, {
      resourceId: projectId,
      changes: { before: project },
    }),
};

/**
 * Log translation operations
 */
export const auditTranslations = {
  update: (lang: string, key: string, before: any, after: any) =>
    logAudit(AuditAction.UPDATE, ResourceType.TRANSLATION, {
      resourceId: `${lang}.${key}`,
      changes: { before, after },
      metadata: { language: lang, key },
    }),
};

/**
 * Log constant operations
 */
export const auditConstants = {
  update: (key: string, before: any, after: any) =>
    logAudit(AuditAction.UPDATE, ResourceType.CONSTANT, {
      resourceId: key,
      changes: { before, after },
    }),
};

/**
 * Log authentication operations
 */
export const auditAuth = {
  login: (email: string) =>
    logAudit(AuditAction.LOGIN, ResourceType.AUTH, {
      metadata: { email },
    }),

  logout: (email: string) =>
    logAudit(AuditAction.LOGOUT, ResourceType.AUTH, {
      metadata: { email },
    }),
};