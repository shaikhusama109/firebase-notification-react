export const getOrRegisterServiceWorker = async (): Promise<ServiceWorkerRegistration> => {
    if ('serviceWorker' in navigator) {
      const serviceWorker = await window.navigator.serviceWorker
        .getRegistration('/firebase-push-notification-scope');
      if (serviceWorker) return serviceWorker;
      return window.navigator.serviceWorker.register('./firebase-messaging-sw.js', {
        scope: '/firebase-push-notification-scope',
      });
    }
    throw new Error('The browser doesn`t support service worker.');
  };