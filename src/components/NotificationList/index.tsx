import React from 'react';
import { NotificationData } from '../../types/notification/type';
import { EyeIcon } from 'lucide-react';

interface NotificationListProps {
  notifications: NotificationData[];
  loading: boolean;
  onRead: (messageId: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, onRead }) => (
  <div className="w-[50%] bg-white rounded-lg shadow-lg mb-5 p-12 mx-auto">
    <div className="flex items-center gap-x-2 mb-3">
      <h1 className="font-bold text-3xl">Notifications</h1>
      <span className='bg-pink-400 text-white px-2 rounded-sm'>{notifications.filter(i => !i.seen).length} new</span>
    </div>
    <div className="overflow-y-auto h-[400px] pb-5">
      {
        notifications.map((notification, index) => (
          <div key={index} className={`flex flex-row items-center justify-between border border-slate-300 rounded-lg mb-3 shadow-md p-4 ${!notification.seen ? 'bg-green-50 border-green-500 shadow-green-100 cursor-pointer' : ''}`}>
            <div className="flex flex-row items-center">
              <div>
                <h2 className="text-lg font-semibold italic">{notification.notificationTitle}</h2>
                <p className="text-sm">{notification.notificationBody}</p>
              </div>
            </div>
            {!notification.seen &&
              <EyeIcon className="text-amber-500 size-5.5" onClick={() => onRead(notification.messageId)} />
            }
          </div>
        )).reverse()
      }
    </div>
  </div>
);

export default NotificationList;
