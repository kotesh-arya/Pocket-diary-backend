import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json"));
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

app.listen(8080, () => console.log("Server running on port 8080"));
