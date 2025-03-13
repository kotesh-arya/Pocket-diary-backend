import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin SDK
const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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

// Check route
app.get("/", async (req, res) => {
    res.json({ message: "Pocket diary backend running successfully" });
});

// Get all diary entries
app.get("/entries", async (req, res) => {
    const snapshot = await db.collection("diaryEntries").get();
    const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(entries);
});

// Add a new entry
app.post("/entries", async (req, res) => {
    const { text, date } = req.body;
    const newEntry = await db.collection("diaryEntries").add({ text, date });
    res.json({ id: newEntry.id, text, date });
});

// Delete an entry
app.delete("/entries/:id", async (req, res) => {
    const { id } = req.params;
    await db.collection("diaryEntries").doc(id).delete();
    res.json({ message: "Entry deleted" });
});

app.listen(port, () => console.log("Server running on port 8080"));
