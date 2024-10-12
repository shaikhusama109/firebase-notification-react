import { getToken } from "firebase/messaging";
import { getOrRegisterServiceWorker } from "./serviceWorker";
import { messaging } from "./firebase";

export const getFirebaseToken = async (): Promise<string | undefined> => {
  try {
    const serviceWorkerRegistration = await getOrRegisterServiceWorker();
    if (!serviceWorkerRegistration) {
      console.log('Service Worker registration failed or was not found');
      return;
    }
    const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY, serviceWorkerRegistration });
    return token;
  } catch (error) {
    console.error("An error occurred while retrieving the Firebase token:", error);
    return undefined;
  }
};
