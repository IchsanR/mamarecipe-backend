const recipeModel = require("../model/recipe.model");
const { success, failed } = require("../helper/file.respons");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../helper/cloudinary");

const recipeController = {
	list: (req, res) => {
		recipeModel
			.selectAll()
			.then((results) => {
				success(res, results.rows, "success", "get all recipe success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "get all recipe failed");
			});
	},

	detail: (req, res) => {
		const id_recipe = req.params.id_recipe;
		recipeModel
			.selectDetail(id_recipe)
			.then((results) => {
				success(res, results.rows, "success", "get recipe success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "get recipe failed");
			});
	},

	userRecipe: (req, res) => {
		const user = req.params.iduser;
		recipeModel
			.selectUserRecipe(user)
			.then((result) => {
				success(res, result.rows, "success", "get user products success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "failed to get user products");
			});
	},

	searching: (req, res) => {
		const query = req.query;
		const title = query.title;
		const sortOrd = query.sortOrd || "asc";
		const page = parseInt(query.page) || 1;
		const limit = parseInt(query.limit) || 2;
		const offset = (page - 1) * limit;

		const data = {
			title: title,
			sortOrd: sortOrd,
			page: page,
			limit: limit,
			offset: offset,
		};

		recipeModel
			.searching(data)
			.then((results) => {
				success(res, results.rows, "success", "get recipe success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "get recipe failed");
			});
	},

	insert: async (req, res) => {
		const id = uuidv4();
		const { iduser, ingredients, video, title } = req.body;
		const image = await cloudinary.uploader.upload(req.file.path);

		const data = {
			id_recipe: id,
			iduser,
			image: `${image.secure_url}|&&|${image.public_id}`,
			ingredients,
			video,
			title,
		};

		recipeModel
			.store(data)
			.then((results) => {
				res.json(results);
			})
			.catch((err) => {
				res.json(err);
			});
	},

	update: async (req, res) => {
		const { title, ingredients, video } = req.body;
		const id_recipe = req.params.id_recipe;
		const image = req.file
			? await cloudinary.uploader.upload(req.file.path)
			: null;
		recipeModel
			.update(id_recipe, image, title, ingredients, video)
			.then((results) => {
				res.json(results);
			})
			.catch((err) => {
				res.json(err);
			});
	},

	destroy: (req, res) => {
		const id_recipe = req.params.id_recipe;
		recipeModel
			.destroy(id_recipe)
			.then((results) => {
				res.json(results);
			})
			.catch((err) => {
				res.json(err);
			});
	},

	likedRecipe: (req, res) => {
		const iduser = req.params.iduser;

		recipeModel
			.likedRecipe(iduser)
			.then((result) => {
				success(res, result.rows, "success", "Get liked recipe success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "Get liked recipe failed");
			});
	},

	insertLiked: (req, res) => {
		const body = req.body;
		const data = {
			iduser: body.iduser,
			idrecipe: body.idrecipe,
		};

		recipeModel
			.checkLike(data.iduser, data.idrecipe)
			.then((results) => {
				if (results.rowCount == 0) {
					recipeModel
						.insertLiked(data)
						.then((result) => {
							success(res, result.rows, "success", "liked recipe success");
						})
						.catch((err) => {
							failed(res, err.message, "failed", "liked recipe failed");
						});
				}

				if (results.rowCount > 0) {
					failed(res, null, "failed", "resep sudah pernah disukai");
				}
			})
			.catch((error) => {
				res.json(error);
			});
	},

	destroyLike: (req, res) => {
		const id_recipe = req.params.id_recipe;
		recipeModel
			.destroyLike(id_recipe)
			.then((results) => {
				res.json(results);
			})
			.catch((err) => {
				res.json(err);
			});
	},

	savedRecipe: (req, res) => {
		const iduser = req.params.iduser;

		recipeModel
			.savedRecipe(iduser)
			.then((result) => {
				success(res, result.rows, "success", "Get saved recipe success");
			})
			.catch((err) => {
				failed(res, err.message, "failed", "Get saved recipe failed");
			});
	},

	insertSaved: (req, res) => {
		const body = req.body;
		const data = {
			iduser: body.iduser,
			idrecipe: body.idrecipe,
		};

		recipeModel
			.checkSaved(data.iduser, data.idrecipe)
			.then((results) => {
				if (results.rowCount == 0) {
					recipeModel
						.insertSaved(data)
						.then((result) => {
							success(res, result.rows, "success", "saved recipe success");
						})
						.catch((err) => {
							failed(res, err.message, "failed", "saved recipe failed");
						});
				}

				if (results.rowCount > 0) {
					failed(res, null, "failed", "resep sudah pernah disimpan");
				}
			})
			.catch((error) => {
				res.json(error);
			});
	},

	destroySaved: (req, res) => {
		const id_recipe = req.params.id_recipe;
		recipeModel
			.destroySaved(id_recipe)
			.then((results) => {
				res.json(results);
			})
			.catch((err) => {
				res.json(err);
			});
	},
};

module.exports = recipeController;
