const recipeModel = require("../model/recipe.model");
const { success, failed } = require("../helper/file.respons");
const { v4: uuidv4 } = require("uuid");
// const bcrypt = require("bcrypt");
// const jwtToken = require("../helper/generateJWT");

const recipeController = {
	// method
	list: (req, res) => {
		// const limit = parseInt(req.query.limit) || 2;
		// const page = parseInt(req.query.page) || 1;
		// const offset = (page - 1) * limit;
		recipeModel
			// .selectAll(limit, offset)
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
	insert: (req, res) => {
		// tangkap data dari body
		// const image = req.file.filename;
		const id = uuidv4();
		const { iduser, ingredients, video, title } = req.body;

		const data = {
			id_recipe: id,
			iduser,
			image: req.file ? req.file.filename : null,
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
	update: (req, res) => {
		// console.log(req.file);
		const { title, ingredients, video } = req.body;
		const id_recipe = req.params.id_recipe;
		const image = req.file.filename;
		recipeModel
			.update(id_recipe, image, title, ingredients, video)
			.then((results) => {
				res.json(results);
			})
			.catch((err) => {
				res.json(err);
			});
	},
	// updateImage: (req, res) => {
	// 	const image = req.file.filename;
	// 	const id_recipe = req.params.id_recipe;
	// 	recipeModel
	// 		.updateImage(id_recipe, image)
	// 		.then((results) => {
	// 			res.json(results);
	// 		})
	// 		.catch((err) => {
	// 			res.json(err);
	// 		});
	// },
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
};

module.exports = recipeController;
