export const requestLocationPermission = (
    onSuccess: (position: GeolocationPosition) => void,
    onError: (error: GeolocationPositionError) => void
  ) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      onError(new GeolocationPositionError());
    }
  };
  
  export const requestNotificationPermission = (
    onSuccess: (permission: NotificationPermission) => void,
    onError: (error: string) => void
  ) => {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(onSuccess).catch(() => onError('Notification permission request failed'));
      } else {
        onSuccess(Notification.permission);
      }
    } else {
      onError('Notifications are not supported by your browser');
    }
  };
  