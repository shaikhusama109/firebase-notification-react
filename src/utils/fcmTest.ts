import { toast } from "react-toastify";

// Generates a random phone number
const generateRandomPhoneNumber = (): string => {
    const areaCode = Math.floor(Math.random() * 900) + 100; // 3 digits
    const prefix = Math.floor(Math.random() * 900) + 100; // 3 digits
    const lineNumber = Math.floor(Math.random() * 9000) + 1000; // 4 digits
    return `(${areaCode}) ${prefix}-${lineNumber}`;
};

export const SendNotification = async (
    recipientToken: string, 
    setLoading: (loading: boolean) => void
): Promise<void> => {
    const greetings = [
        "Hello, how are you today?",
        "Hi there! Hope you're having a great day.",
        "Good morning! What can I do for you?",
        "Hey! How's it going?",
        "Greetings! How can I assist you?",
        "Hello! Nice to see you.",
        "Hi! What’s up?",
        "Welcome! How may I help you today?",
        "Hey there! Need any help?",
        "Good evening! How are you feeling today?",
        "Howdy! What’s new with you?",
        "Hi! It’s great to see you.",
        "Hello there! How’s everything?",
        "Hey! How can I make your day better?",
        "Greetings! What brings you here today?",
        "Hello! What’s on your mind?",
        "Hi there! What’s happening?",
        "Good day! How can I support you?",
        "Hey! Got any plans for today?",
        "Welcome back! How’s it going?",
        "Hello! What can I do for you right now?",
        "Hi! How can I be of service?",
    ];

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
        // Fetch Bearer token from backend
        const tokenResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/token`);
        const { token } = await tokenResponse.json();

        if (!token) {
            throw new Error('Failed to retrieve Bearer token');
        }

        // Make API call to FCM
        const response = await fetch(`https://fcm.googleapis.com/v1/projects/${import.meta.env.VITE_PROJECT_ID}/messages:send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
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
