import { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFirebaseToken } from './utils/getToken';
import { onForegroundMessage } from './utils/foregroundMessageListener';
import ToastifyNotification from './components/ToastNotification';
import { SendNotification } from './utils/fcmTest';
import { MessagePayload } from 'firebase/messaging';
import { NotificationData } from './types/notification/type';
import NotificationBanner from './components/NotificationBanner';
import NotificationList from './components/NotificationList';
import { addNotificationToFirestore, fetchCollectionData, updateNotificationInFirestore } from './utils/firebaseUtils';

const App: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [showNotificationBanner, setShowNotificationBanner] = useState(Notification.permission === 'default');
  const [recipientToken, setRecipientToken] = useState<string>('');
  const [notificationArray, setNotificationArray] = useState<NotificationData[]>([]);

  const handleFetchCollectionData = useCallback(async () => {
    try {
      const notifications = await fetchCollectionData();
      setNotificationArray(notifications);
    } catch (error) {
      console.error(error)
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onForegroundMessage(async (payload: MessagePayload) => {
      if (payload?.messageId) {
        const newNotification: NotificationData = {
          messageId: payload.messageId,
          seen: false,
          notificationTitle: payload?.notification?.title,
          notificationBody: payload?.notification?.body,
        };

        try {
          await addNotificationToFirestore(newNotification);
          handleFetchCollectionData();
          console.log('Notification added to Firestore');
        } catch (error) {
          console.error('Error adding notification to Firestore: ', error);
        }
      }

      toast(
        <ToastifyNotification
          title={payload?.notification?.title}
          body={payload?.notification?.body}
        />
      );
    });

    return () => unsubscribe();
  }, [handleFetchCollectionData]);

  const handleGetFirebaseToken = useCallback(() => {
    getFirebaseToken()
      .then((firebaseToken) => {
        console.log('Firebase token: ', firebaseToken);
        if (firebaseToken) {
          setRecipientToken(firebaseToken);
          setShowNotificationBanner(false);
        }
      })
      .catch((err) => console.error('An error occurred while retrieving firebase token. ', err));
  }, []);

  useEffect(() => {
    handleFetchCollectionData();
  }, [handleFetchCollectionData]);

  useEffect(() => {
    handleGetFirebaseToken();
  }, [handleGetFirebaseToken]);

  const handleOnRead = useCallback(async (messageId: string) => {
    setLoading(true);
    const notifications = notificationArray.map((notification) => {
      if (notification.messageId === messageId) {
        return {
          ...notification,
          seen: true,
        };
      }
      return notification;
    });

    try {
      await updateNotificationInFirestore(notifications);
      handleFetchCollectionData();
      console.log('Notification updated in Firestore');
    } catch (error) {
      console.error('Error updating notification in Firestore: ', error);
    } finally {
      setLoading(false);
    }
  }, [notificationArray, handleFetchCollectionData]);

  return (
    <div className="bg-[#F6D6CA] p-0 m-0 h-screen w-screen flex flex-col justify-center items-center">
      {showNotificationBanner && <NotificationBanner onEnableNotifications={handleGetFirebaseToken} />}
      {notificationArray?.length > 0 && (
        <NotificationList
          notifications={notificationArray}
          loading={loading}
          onRead={handleOnRead}
        />
      )}
      <button
        className={`p-4 rounded-lg shodow-lg text-white font-bold ${!loading ? 'btn-primary bg-[#FD617E] bg-gradient-to-b from-[#FD617E] to-[#cd4c64]' : 'cursor-not-allowed  bg-gray-500 text-gray-300 btn-primary'}`}
        onClick={() => SendNotification(recipientToken, setLoading)}
      >
        Show toast notification
      </button>

      <ToastContainer hideProgressBar />
    </div>
  );
};

export default App;
