const userModel = require("../model/user.model");
const { success, failed, successWithToken } = require("../helper/file.respons");
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");
const jwtToken = require("../helper/generateJWT");

const userController = {
	// method
	list: (req, res) => {
		userModel
			.selectAll()
			.then((results) => {
				success(res, results.rows, "success", "get all user success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "get all user failed");
			});
	},
	detail: (req, res) => {
		const id_user = req.params.id_user;
		userModel
			.selectDetail(id_user)
			.then((results) => {
				success(res, results.rows, "success", "get user success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "get all user failed");
			});
	},
	register: (req, res) => {
		try {
			const { name, email, password, phone } = req.body;
			const id_user = uuidv4();
			bcrypt.hash(password, 10, (err, hash) => {
				if (err) {
					failed(res, err.message, "failed", "fail hash password");
				}

				const data = {
					id_user,
					name,
					email,
					password: hash,
					phone,
					profile_pic: "avatar.png",
				};

				userModel.checkEmail(email).then((result) => {
					if (result.rowCount == 0) {
						userModel
							.register(data)
							.then((result) => {
								success(res, result, "success", "register success");
							})
							.catch((err) => {
								failed(res, err.message, "failed", "register failed");
							});
					}

					if (result.rowCount > 0) {
						failed(res, null, "failed", "email telah terdaftar");
					}
				});
			});
		} catch (err) {
			failed(res, err.message, "failed", " internal server error");
		}
	},
	login: (req, res) => {
		const { email, password } = req.body;
		userModel
			.checkEmail(email)
			.then((result) => {
				const user = result.rows[0];
				if (result.rowCount > 0) {
					bcrypt
						.compare(password, result.rows[0].password)
						.then(async (result) => {
							if (result) {
								const token = await jwtToken({
									email: user.email,
								});
								success(res, { token, data: user }, "success", "login success");
							} else {
								// ketika pass salah
								failed(res, null, "failed", "email atau password salah");
							}
						});
				} else {
					// ketika name salah
					failed(res, null, "failed", "email atau password salah");
				}
			})
			.catch((err) => {
				failed(res, err.message, "failed", "internal server error");
			});
	},
	update: (req, res) => {
		// tangkap data dari body
		const id_user = req.params.id_user;
		const { name, email, phone, level } = req.body;

		const data = {
			id_user,
			name,
			email,
			phone,
			level,
		};

		userModel
			.update(data)
			.then((results) => {
				res.json(results);
			})
			.catch((err) => {
				res.json(err);
			});
	},
	updatePass: (req, res) => {
		const { email, password } = req.body;
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) {
				failed(res, err.message, "failed", "fail hash password");
			}

			const data = {
				email,
				password: hash,
			};

			userModel
				.updatePass(data)
				.then((results) => {
					res.json(results);
				})
				.catch((err) => {
					res.json(err);
				});
		});
	},
	updateImage: (req, res) => {
		const profile_pic = req.file.filename;
		const id_user = req.params.id_user;
		userModel
			.updateImage(id_user, profile_pic)
			.then((results) => {
				res.json(results);
			})
			.catch((err) => {
				res.json(err);
			});
	},
	destroy: (req, res) => {
		const id = req.params.id_user;
		userModel
			.destroy(id)
			.then((results) => {
				res.json(results);
			})
			.catch((err) => {
				res.json(err);
			});
	},
};

module.exports = userController;
