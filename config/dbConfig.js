const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Database connected");
	} catch (error) {
		console.error("Database connection error:", error.message);
	}
};

module.exports = connectDB;
