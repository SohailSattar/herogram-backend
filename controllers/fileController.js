const File = require("../models/File");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

exports.uploadFile = async (req, res) => {
	console.log(req.file);
	const fileExtension = path.extname(req.file.originalname);

	const { userId } = req.user;
	const tags = req.body.tags?.split(",");
	const fileData = {
		filename: req.file.filename + fileExtension,
		userId,
		tags,
		shareToken: uuidv4(), // Unique share token
		views: 0,
	};

	// Create the file record in the database
	const file = await File.create(fileData);
	res.json({ file });
};

exports.getAllImages = async (req, res) => {
	try {
		const files = await File.find({ userId: req.user.userId });
		const baseUrl = `${req.protocol}://${req.get("host")}/storage/`;

		const filesWithUrl = files.map((file) => ({
			...file.toObject(),
			url: `${baseUrl}${file.filename}`,
		}));

		res.json({ files: filesWithUrl });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getSharedFile = async (req, res) => {
	try {
		const file = await File.findOne({ shareToken: req.params.shareToken });
		if (!file) return res.status(404).json({ error: "File not found" });

		file.views += 1;
		await file.save();
		res.json({ file });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateTotalViews = async (req, res) => {
	try {
		const file = await File.findOne({ _id: req.params.fileId });
		if (!file) return res.status(404).json({ error: "File not found" });

		// Increment the views by one
		file.views += 1;
		await file.save();
		res.json({ file });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
