import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { NotificationData } from '../types/notification/type';

export const fetchCollectionData = async (): Promise<NotificationData[]> => {
  const querySnapshot = await getDocs(collection(db, 'notifications'));
  const notifications: NotificationData[] = [];
  querySnapshot.forEach((doc) => {
    notifications.push(...doc.data().notifications);
  });
  return notifications;
};

export const addNotificationToFirestore = async (notification: NotificationData) => {
  const docRef = doc(db, 'notifications', 'notificationArrayDoc');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      notifications: arrayUnion(notification),
    });
  } else {
    await setDoc(docRef, {
      notifications: [notification],
    });
  }
};

export const updateNotificationInFirestore = async (updatedNotifications: NotificationData[]) => {
  const docRef = doc(db, 'notifications', 'notificationArrayDoc');
  await updateDoc(docRef, {
    notifications: updatedNotifications,
  });
};