const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
  VITE_MESSUREMNT_ID,
} = process.env;

const content = `const swEnv = {
    VITE_API_KEY: '${VITE_API_KEY}',
    VITE_PROJECT_ID: '${VITE_PROJECT_ID}',
    VITE_MESSAGING_SENDER_ID: '${VITE_MESSAGING_SENDER_ID}',
    VITE_APP_ID: '${VITE_APP_ID}',
    VITE_AUTH_DOMAIN: '${VITE_AUTH_DOMAIN}',
    VITE_STORAGE_BUCKET: '${VITE_STORAGE_BUCKET}',
    VITE_MESSUREMNT_ID: '${VITE_MESSUREMNT_ID}'
 }`;

fs.writeFileSync("./public/swEnv.js", content);