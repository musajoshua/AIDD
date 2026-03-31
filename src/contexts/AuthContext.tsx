"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import type { AuthUser } from "@/types";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapFirebaseUser(user: User): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ? mapFirebaseUser(firebaseUser) : null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signIn(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async function signOut(): Promise<void> {
    await firebaseSignOut(auth);
  }

  return (
    <AuthContext value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
