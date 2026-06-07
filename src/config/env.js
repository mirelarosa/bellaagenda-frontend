export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'mock-key',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'mock.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'mock-project',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || 'mock-app'
  }
};
