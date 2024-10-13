export const getAuthToken = async (): Promise<string | null> => {
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
        return storedToken;
    }

    try {
        const tokenResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/token`);
        const { token } = await tokenResponse.json();
        
        if (token) {
            localStorage.setItem('authToken', token);
            return token;
        } else {
            throw new Error('Token fetch failed');
        }
    } catch (error) {
        console.error('Error fetching token:', error);
        return null;
    }
};
