import React from 'react';

interface NotificationBannerProps {
  onEnableNotifications: () => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ onEnableNotifications }) => (
  <div className="notification-banner">
    <span>The app needs permission to</span>
    <button
      type="button"
      className="notification-banner-link"
      onClick={onEnableNotifications}
    >
      enable push notifications.
    </button>
  </div>
);

export default NotificationBanner;
