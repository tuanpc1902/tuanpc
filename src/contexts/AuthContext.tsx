import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '~alias~/lib/firebase';
import { auditAuth } from '~alias~/lib/services/auditService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase is not configured');
    }
    await signInWithEmailAndPassword(auth, email, password);
    await auditAuth.login(email);
  };

  const signUp = async (email: string, password: string) => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase is not configured');
    }
    await createUserWithEmailAndPassword(auth, email, password);
    await auditAuth.login(email);
  };

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase is not configured');
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email || 'unknown';
    await auditAuth.login(email);
  };

  const logout = async () => {
    if (!isFirebaseConfigured()) {
      return;
    }
    try {
      const email = auth.currentUser?.email || 'unknown';
      await signOut(auth);
      // Audit log after sign out (may fail if user is already signed out, but that's ok)
      try {
        await auditAuth.logout(email);
      } catch (auditError) {
        // Don't fail logout if audit logging fails
        console.warn('Audit log failed during logout:', auditError);
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}