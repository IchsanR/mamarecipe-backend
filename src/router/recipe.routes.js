const express = require("express");

const {
	list,
	searching,
	detail,
	insert,
	destroy,
	update,
	userRecipe,
	likedRecipe,
	insertLiked,
	destroyLike,
	savedRecipe,
	insertSaved,
	destroySaved,
} = require("../controller/recipe.controller");
const deleteFile = require("../middleware/deleteRecipe");

const uploadRecipe = require("../middleware/uploadRecipe");

const recipeRouter = express.Router();

recipeRouter
	.get("/recipe", list)
	.get("/recipe/detail/:id_recipe", detail)
	.get("/recipe/user/:iduser", userRecipe)
	.get("/recipe/search", searching)
	.put("/recipe/update/:id_recipe", uploadRecipe, update)
	.delete("/recipe/:id_recipe", destroy)

	// insert
	.post("/recipe", uploadRecipe, insert)
	// liked
	.post("/recipe/liked", insertLiked)
	.get("/recipe/liked/:iduser", likedRecipe)
	.delete("/recipe/liked/:id_recipe", destroyLike)
	// saved
	.post("/recipe/saved", insertSaved)
	.get("/recipe/saved/:iduser", savedRecipe)
	.delete("/recipe/saved/:id_recipe", destroySaved);

module.exports = recipeRouter;
