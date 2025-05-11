import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getMessaging, getToken } from 'firebase/messaging';

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

const rtdb = getDatabase(app);
const messaging = getMessaging(app);
export async function obtenerTokenFCM(registration: any): Promise<string | null> {
  // console.log('ESTA ES LA KEY DEK TOKEN', process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY);
  console.log('🔍 Service worker registration:', registration);

  const vapid_key =
    'BBH1PK-gbIo_gq8Hk_E2xs1XWJZyFrUMepYSPIuAbGuffy_EshYcDTNJ511zK5em9FMfaUq7GJfAUwWr_2Q261U';
  try {
    const token = await getToken(messaging, {
      vapidKey: vapid_key,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log('✅ Token FCM obtenido:', token);
      return token;
    } else {
      console.warn('⚠️ No se obtuvo token. El usuario podría haber bloqueado las notificaciones.');
      return null;
    }
  } catch (error) {
    console.error('❌ Error al obtener token:', error);
    return null;
  }
}

export { rtdb, messaging };
