import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";
import db from "./firebase.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

// ✅ Allow all origins dynamically
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Middleware for error handling
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({ error: err.message || "Internal Server Error" });
};

// Check route
app.get("/", async (req, res, next) => {
    try {
        res.json({ message: "Pocket diary backend running successfully" });
    } catch (error) {
        next(error);
    }
});

// Get all diary entries
app.get("/entries", async (req, res, next) => {
    try {
        const snapshot = await db.collection("diaryEntries").get();
        const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(entries);
    } catch (error) {
        next(error);
    }
});

// Add a new entry
app.post("/entries", async (req, res, next) => {
    try {
        const { text, date } = req.body;
        if (!text || !date) {
            return res.status(400).json({ error: "Text and date are required" });
        }
        const newEntry = await db.collection("diaryEntries").add({ text, date });
        res.status(201).json({ id: newEntry.id, text, date });
    } catch (error) {
        next(error);
    }
});

// Delete an entry
app.delete("/entries/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const entryRef = db.collection("diaryEntries").doc(id);
        const entry = await entryRef.get();
        if (!entry.exists) {
            return res.status(404).json({ error: "Entry not found" });
        }
        await entryRef.delete();
        res.json({ message: "Entry deleted successfully" });
    } catch (error) {
        next(error);
    }
});

// Global error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
