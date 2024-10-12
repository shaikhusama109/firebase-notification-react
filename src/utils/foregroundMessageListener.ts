import { MessagePayload, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

// Define the type for the message payload if known

export const onForegroundMessage = (callback: (payload: MessagePayload) => void) => {
  return onMessage(messaging, callback );
};