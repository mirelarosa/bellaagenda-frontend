import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { env } from './env';

const isMock = env.firebase.apiKey === 'mock-key' || import.meta.env.MODE === 'test';

let auth = null;

if (!isMock) {
  const app = initializeApp(env.firebase);
  auth = getAuth(app);
}

const mockUser = {
  uid: 'mock-uid',
  email: 'user@test.com',
  getIdToken: async () => 'mock-token'
};

export async function loginWithEmail(email, password) {
  if (isMock) {
    return { user: { ...mockUser, email } };
  }
  return signInWithEmailAndPassword(auth, email, password);
}

export async function registerWithEmail(email, password) {
  if (isMock) {
    return { user: { ...mockUser, email } };
  }
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function logoutFirebase() {
  if (isMock) return;
  return signOut(auth);
}

export function subscribeAuth(callback) {
  if (isMock) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

export async function getIdToken(forceRefresh = false) {
  if (isMock) return 'mock-token';
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken(forceRefresh);
}

export { auth, isMock };
