// backend/models/File.js
const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
	filename: { type: String, required: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	tags: [String],
	views: { type: Number, default: 0 },
	shareToken: { type: String, unique: true },
});

module.exports = mongoose.model("File", FileSchema);
