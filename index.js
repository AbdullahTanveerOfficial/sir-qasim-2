require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const enquiryModel = require("./models/enquiry.model");

const app = express();
app.use(express.json());
app.use(express.static("public"));


mongoose.connect(process.env.DBURL)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error("Database connection error:", err));

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // Change this in production

// ➤ **Sign-Up Route**
app.post("/api/signup", async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ status: 0, message: "All fields are required!" });
    }

    try {
        // Check if user already exists
        let existingUser = await enquiryModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 0, message: "Email is already registered. Please log in." });
        }

        // Create and save user
        let newUser = new enquiryModel({ name, email, phone, password });
        await newUser.save();

        res.status(201).json({ status: 1, message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ status: 0, message: "Error signing up", error: err.message });
    }
});

// ➤ **Login Route**
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: 0, message: "Email and password are required!" });
    }

    try {
        // Check if user exists
        let user = await enquiryModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 0, message: "User not found. Please sign up first." });
        }

        // Compare passwords
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: 0, message: "Incorrect password!" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ status: 1, message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ status: 0, message: "Error logging in", error: err.message });
    }
});

// ➤ **Start Server**
app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
