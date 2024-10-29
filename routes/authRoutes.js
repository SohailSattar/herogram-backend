// backend/routes/authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = new User({ username, password });
		await user.save();
		res.json({ message: "User registered" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ error: "Invalid credentials" });
		}
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.json({ token, userId: user._id });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
