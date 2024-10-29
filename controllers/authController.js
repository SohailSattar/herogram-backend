const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	session({
		secret: "your_secret_key",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }, // Set to true if using HTTPS
	})
);

// // Dummy user data for demonstration purposes
// const users = [
// 	{
// 		id: 1,
// 		username: "user1",
// 		password: "$2b$10$7QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8",
// 	}, // password is 'password' hashed
// ];

// // Login route
// router.post("/login", async (req, res) => {
// 	const { username, password } = req.body;
// 	const user = users.find((u) => u.username === username);

// 	if (user && (await bcrypt.compare(password, user.password))) {
// 		req.session.userId = user.id;
// 		res.send("Login successful");
// 	} else {
// 		res.status(401).send("Invalid username or password");
// 	}
// });

// Logout route
router.post("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).send("Could not log out.");
		} else {
			res.send("Logout successful");
		}
	});
});

// Middleware to protect routes
function authMiddleware(req, res, next) {
	if (req.session.userId) {
		next();
	} else {
		res.status(401).send("You need to log in first");
	}
}

// Protected route example
router.get("/dashboard", authMiddleware, (req, res) => {
	res.send("Welcome to your dashboard");
});

app.use("/auth", router);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
