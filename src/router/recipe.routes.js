const express = require("express");

const {
	list,
	searching,
	detail,
	insert,
	destroy,
	update,
	userRecipe,
} = require("../controller/recipe.controller");
const deleteFile = require("../middleware/deleteRecipe");

const uploadRecipe = require("../middleware/uploadRecipe");

const recipeRouter = express.Router();

recipeRouter
	.get("/recipe", list)
	.get("/recipe/detail/:id_recipe", detail)
	.get("/recipe/user/:iduser", userRecipe)
	.get("/recipe/search", searching)
	// .get("/recipe/search/:title", searching)
	.put("/recipe/update/:id_recipe", uploadRecipe, update)
	// .put("/recipe/image/:id_recipe", uploadRecipe, deleteFile, updateImage)
	.delete("/recipe/:id_recipe", destroy)

	// insert
	.post("/recipe", uploadRecipe, insert);

module.exports = recipeRouter;
