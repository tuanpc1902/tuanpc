import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '~alias~/lib/firebase';

export enum AnalyticsEventType {
  CV_OPEN = 'cv_open',
  CV_DOWNLOAD = 'cv_download',
  PROJECT_CLICK = 'project_click',
  PROJECT_GITHUB_CLICK = 'project_github_click',
  PROFILE_GITHUB_CLICK = 'profile_github_click',
}

interface AnalyticsEvent {
  type: AnalyticsEventType;
  timestamp: any;
  metadata?: Record<string, any>;
  userAgent?: string;
  path?: string;
}

const ANALYTICS_COLLECTION = 'analytics_events';

export const logAnalyticsEvent = async (
  type: AnalyticsEventType,
  metadata: Record<string, any> = {}
): Promise<void> => {
  const event: AnalyticsEvent = {
    type,
    timestamp: serverTimestamp(),
    metadata,
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
    path: typeof window !== 'undefined' ? window.location.pathname : undefined,
  };

  if (!isFirebaseConfigured()) {
    console.log('[Analytics]', {
      ...event,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  try {
    await addDoc(collection(db, ANALYTICS_COLLECTION), event);
  } catch (error) {
    console.error('Error logging analytics event:', error);
  }
};
