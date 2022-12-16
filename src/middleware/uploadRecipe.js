// import multer
const multer = require("multer");
// import path
const path = require("path");

// management file
const multerUpload = multer({
	storage: multer.diskStorage({}),
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		if (
			ext === ".jpg" ||
			ext === ".png" ||
			ext === ".jpeg" ||
			ext === ".jfif"
		) {
			cb(null, true);
		} else {
			const error = {
				message: "File type is not supported",
			};
			cb(error, false);
		}
	},
});

// untuk middleware
const uploadRecipe = (req, res, next) => {
	const multerSingle = multerUpload.single("image");
	multerSingle(req, res, (err) => {
		if (err) {
			res.json({
				message: "err",
				error: err,
			});
		} else {
			next();
		}
	});
};

module.exports = uploadRecipe;
