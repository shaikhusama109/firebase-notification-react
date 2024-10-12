// run this script to get the Bearer token for the FCM POST calls and paste it in .env VITE_AUTH_TOKEN
const { GoogleAuth } = require('google-auth-library');
const path = require('path');

const keyFilePath = path.resolve('./notification-firebase.json');

const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

async function getAccessToken() {
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    return accessToken;
}

getAccessToken()
.then((res)=> console.log(res))
.catch(console.error);
