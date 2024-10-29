// backend/routes/fileRoutes.js
const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/fileController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", authenticateToken, fileController.getAllImages);
router.post(
	"/upload",
	authenticateToken,
	upload.single("file"),
	fileController.uploadFile
);
router.get("/share/:shareToken", fileController.getSharedFile);

// router.post("/share", authenticateToken, fileController.generateShareToken);

module.exports = router;
