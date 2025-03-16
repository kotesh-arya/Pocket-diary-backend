import { initializeApp } from "firebase/app";
import dotenv from "dotenv";
import admin from "firebase-admin";
dotenv.config();

// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvFhXVKMkd7ZGZAgJqtFsEtJSThWNmLOc",
    authDomain: "pocket-diary-45945.firebaseapp.com",
    projectId: "pocket-diary-45945",
    storageBucket: "pocket-diary-45945.firebasestorage.app",
    messagingSenderId: "291321164621",
    appId: "1:291321164621:web:0f963ea2f282c56a53fd04",
    measurementId: "G-ZB4QJLJX18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore


// Initialize Firebase Admin SDK
const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

export default db;