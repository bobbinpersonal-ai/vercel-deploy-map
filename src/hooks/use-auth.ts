import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsLoading(false);
    });
  }, []);

  async function signIn(method: string, formData?: FormData) {
    const email = String(formData?.get("email") ?? "").trim();
    const password = String(formData?.get("password") ?? "");
    if (!email || password.length < 6) {
      throw new Error("Enter an email and a password with at least 6 characters.");
    }
    if (method === "signUp") {
      return createUserWithEmailAndPassword(auth, email, password);
    }
    return signInWithEmailAndPassword(auth, email, password);
  }

  return {
    isLoading,
    isAuthenticated: user !== null,
    user,
    signIn,
    signOut: () => firebaseSignOut(auth),
  };
}
