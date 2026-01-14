import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Cloud Function: Auto-create audit log on write operations
 * Note: This triggers AFTER the document is written.
 * Validation should be done in Security Rules.
 */
export const createAuditLogOnProjectsWrite = functions.firestore
  .document('projects/{projectId}')
  .onWrite(async (change, context) => {
    const userId = context.auth?.uid;
    const userEmail = context.auth?.token.email;
    const projectId = context.params.projectId;

    let action: string;
    let beforeData: any = null;
    let afterData: any = null;

    if (!change.before.exists && change.after.exists) {
      // Created
      action = 'create';
      afterData = change.after.data();
    } else if (change.before.exists && !change.after.exists) {
      // Deleted
      action = 'delete';
      beforeData = change.before.data();
    } else if (change.before.exists && change.after.exists) {
      // Updated
      action = 'update';
      beforeData = change.before.data();
      afterData = change.after.data();
    } else {
      // No-op
      return null;
    }

    // Create audit log
    const auditLog = {
      action,
      resourceType: 'project',
      resourceId: projectId,
      userId,
      userEmail,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      changes: {
        before: beforeData,
        after: afterData,
      },
      metadata: {
        collection: 'projects',
        documentId: projectId,
      },
    };

    try {
      await admin.firestore().collection('audit_logs').add(auditLog);
    } catch (error) {
      // Don't throw - audit logging should not break the application
      console.error('Error creating audit log:', error);
    }

    return null;
  });

export const createAuditLogOnTranslationsWrite = functions.firestore
  .document('translations/main')
  .onWrite(async (change, context) => {
    const userId = context.auth?.uid;
    const userEmail = context.auth?.token.email;

    let action: string;
    let beforeData: any = null;
    let afterData: any = null;

    if (!change.before.exists && change.after.exists) {
      action = 'create';
      afterData = change.after.data();
    } else if (change.before.exists && !change.after.exists) {
      action = 'delete';
      beforeData = change.before.data();
    } else if (change.before.exists && change.after.exists) {
      action = 'update';
      beforeData = change.before.data();
      afterData = change.after.data();
    } else {
      return null;
    }

    const auditLog = {
      action,
      resourceType: 'translation',
      resourceId: 'main',
      userId,
      userEmail,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      changes: {
        before: beforeData,
        after: afterData,
      },
      metadata: {
        collection: 'translations',
        documentId: 'main',
      },
    };

    try {
      await admin.firestore().collection('audit_logs').add(auditLog);
    } catch (error) {
      console.error('Error creating audit log:', error);
    }

    return null;
  });

export const createAuditLogOnConstantsWrite = functions.firestore
  .document('constants/main')
  .onWrite(async (change, context) => {
    const userId = context.auth?.uid;
    const userEmail = context.auth?.token.email;

    let action: string;
    let beforeData: any = null;
    let afterData: any = null;

    if (!change.before.exists && change.after.exists) {
      action = 'create';
      afterData = change.after.data();
    } else if (change.before.exists && !change.after.exists) {
      action = 'delete';
      beforeData = change.before.data();
    } else if (change.before.exists && change.after.exists) {
      action = 'update';
      beforeData = change.before.data();
      afterData = change.after.data();
    } else {
      return null;
    }

    const auditLog = {
      action,
      resourceType: 'constant',
      resourceId: 'main',
      userId,
      userEmail,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      changes: {
        before: beforeData,
        after: afterData,
      },
      metadata: {
        collection: 'constants',
        documentId: 'main',
      },
    };

    try {
      await admin.firestore().collection('audit_logs').add(auditLog);
    } catch (error) {
      console.error('Error creating audit log:', error);
    }

    return null;
  });

/**
 * Cloud Function: Rate limiting check (callable function)
 * Call this from client before write operations to check rate limit
 */
export const checkRateLimit = functions.https.onCall(async (data, context) => {
  const userId = context.auth?.uid;
  if (!userId) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxOperations = 50;

  // Get user's rate limit data
  const rateLimitRef = admin.firestore().doc(`rate_limits/${userId}`);
  const rateLimitDoc = await rateLimitRef.get();

  let rateLimitData: any = { operations: [], lastCleanup: now };

  if (rateLimitDoc.exists) {
    rateLimitData = rateLimitDoc.data() || { operations: [], lastCleanup: now };
  }

  // Clean up old operations
  rateLimitData.operations = rateLimitData.operations.filter(
    (op: number) => now - op < windowMs
  );

  // Check rate limit
  if (rateLimitData.operations.length >= maxOperations) {
    const oldestOp = Math.min(...rateLimitData.operations);
    const resetTime = oldestOp + windowMs;
    const waitSeconds = Math.ceil((resetTime - now) / 1000);

    return {
      allowed: false,
      remaining: 0,
      resetAt: resetTime,
      waitSeconds,
    };
  }

  // Add current operation
  rateLimitData.operations.push(now);
  rateLimitData.lastCleanup = now;

  // Save rate limit data
  await rateLimitRef.set(rateLimitData, { merge: true });

  return {
    allowed: true,
    remaining: maxOperations - rateLimitData.operations.length,
    resetAt: now + windowMs,
  };
});

/**
 * Cloud Function: Sanitize project data (runs after write)
 * Note: This is optional - Security Rules already validate data structure
 */
export const sanitizeProjectOnWrite = functions.firestore
  .document('projects/{projectId}')
  .onWrite(async (change, context) => {
    if (!change.after.exists) {
      return null;
    }

    const data = change.after.data();
    if (!data) {
      return null;
    }

    // Sanitize string fields
    const sanitizeString = (str: string): string => {
      if (typeof str !== 'string') return str;
      return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim();
    };

    const sanitizedData = {
      ...data,
      name: sanitizeString(data.name || ''),
      description: sanitizeString(data.description || ''),
      category: sanitizeString(data.category || ''),
      tags: Array.isArray(data.tags)
        ? data.tags.map((tag: any) => sanitizeString(String(tag)))
        : [],
    };

    // Only update if data changed
    const needsUpdate = 
      sanitizedData.name !== data.name ||
      sanitizedData.description !== data.description ||
      sanitizedData.category !== data.category ||
      JSON.stringify(sanitizedData.tags) !== JSON.stringify(data.tags);

    if (needsUpdate) {
      try {
        await change.after.ref.update(sanitizedData);
      } catch (error) {
        console.error('Error sanitizing project:', error);
      }
    }

    return null;
  });
