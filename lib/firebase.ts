import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getMessaging, getToken } from 'firebase/messaging';

const app = initializeApp({
  apiKey: 'AIzaSyDY0au5x6QgwjHw8UhpBEJDVC6-ASKAOFI',
  authDomain: 'unired-55098.firebaseapp.com',
  databaseURL: 'https://unired-55098-default-rtdb.firebaseio.com',
  projectId: 'unired-55098',
  storageBucket: 'unired-55098.firebasestorage.app',
  messagingSenderId: '1062171130331',
  appId: '1:1062171130331:web:f54f6222788d1627124ffe',
  measurementId: 'G-0CW2WETLQ2',
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
