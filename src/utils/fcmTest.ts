import { toast } from "react-toastify";
import { getAuthToken } from "./getAuthToken";
import { generateRandomPhoneNumber } from "./randomGenerator";
import { greetings } from "../constants";

export const SendNotification = async (
    recipientToken: string, 
    setLoading: (loading: boolean) => void
): Promise<void> => {

    const randomIndex = Math.floor(Math.random() * greetings.length);
    const randomPhoneNumber = generateRandomPhoneNumber();

    const notificationPayload = {
        message: {
            token: recipientToken,
            notification: {
                title: `New message from ${randomPhoneNumber}`,
                body: greetings[randomIndex],
            }
        }
    };

    if (!recipientToken) {
        toast.error('Recipient token is missing. Please enable push notifications.');
        return;
    }

    setLoading(true);

    try {
        let authToken = await getAuthToken();

        if (!authToken) {
            throw new Error('Failed to retrieve Bearer token please try again');
        }

        // Make API call to FCM
        const response = await fetch(`https://fcm.googleapis.com/v1/projects/${import.meta.env.VITE_PROJECT_ID}/messages:send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`, 
            },
            body: JSON.stringify(notificationPayload),
        });

        if (!response.ok) {
            throw new Error('Failed to send notification');
        }

        const text = await response.text();

        try {
            const data = JSON.parse(text);
            console.log('Notification sent:', data);
        } catch (error) {
            console.error('Response is not valid JSON:', text, error);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        toast.error('Failed to send notification. Please try again.');
    } finally {
        setLoading(false);
    }
};
