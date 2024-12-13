require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../services/firebase");
const admin = require("firebase-admin");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const userRef = db.collection("users").doc(email);
        const user = await userRef.get();
        if (user.exists) return res.status(400).json({ message: "Email already registered" });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user in Firestore
        await userRef.set({
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Retrieve user from Firestore
        const userRef = db.collection("users").doc(email);
        const user = await userRef.get();
        if (!user.exists) return res.status(401).json({ message: "Email already in use" });

        const userData = user.data();

        // Compare passwords
        const isValidPassword = await bcrypt.compare(password, userData.password);
        if (!isValidPassword) return res.status(401).json({ message: "Invalid email or password" });

        // Generate JWT
        const token = jwt.sign({ userId: email }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.googleAuth = async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ error: "ID Token is required" });
    }

    try {
        // Verify the ID token with Firebase Admin
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email, name, picture } = decodedToken;

        // Check if user exists in Firestore
        const userRef = db.collection("users").doc(email);
        const user = await userRef.get();

        if (!user.exists) {
            // Save new user in Firestore
            await userRef.set({
                uid,
                email,
                displayName: name,
                photoURL: picture,
                createdAt: new Date().toISOString(),
            });
        }

        // Generate JWT
        const token = jwt.sign({ userId: email }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "User successfully logged in with Google",
            token,
            user: { email, displayName: name, photoURL: picture },
        });
    } catch (err) {
        console.error("Error authenticating user:", err);
        res.status(500).json({ error: "Authentication failed" });
    }
};

exports.helloWorld = (req, res) => {
    res.status(200).json({ message: "Hello, World!" });
};

exports.googleAuthTest = (req, res) => {
    res.status(200).json({ message: "Google Auth API is running." });
}

