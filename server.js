import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";
import db from "./firebase.js"
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

// ✅  Allow all origins dynamically
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin); // Allow specific origins dynamically
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});




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
