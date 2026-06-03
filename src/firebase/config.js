const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const requiredConfig = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
}

export const isFirebaseConfigured = Object.values(requiredConfig).every(Boolean)

let servicesPromise = null

export async function getFirebaseServices() {
  if (!isFirebaseConfigured) {
    return null
  }

  if (!servicesPromise) {
    servicesPromise = Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/firestore'),
      import('firebase/storage'),
      import('firebase/analytics'),
    ]).then(async ([appModule, authModule, firestoreModule, storageModule, analyticsModule]) => {
      const app = appModule.initializeApp(firebaseConfig)
      const analytics =
        firebaseConfig.measurementId && (await analyticsModule.isSupported())
          ? analyticsModule.getAnalytics(app)
          : null

      return {
        app,
        analytics,
        auth: authModule.getAuth(app),
        authModule,
        db: firestoreModule.getFirestore(app),
        storage: storageModule.getStorage(app),
      }
    })
  }

  return servicesPromise
}
