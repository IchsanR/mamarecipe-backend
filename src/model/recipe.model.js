const db = require("../config/db");

const recipeModel = {
	selectAll: () => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM recipe ORDER BY title ASC`)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	selectDetail: (id_recipe) => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM recipe where id_recipe='${id_recipe}'`)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	selectUserRecipe: (iduser) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM recipe join users on users.id_user = recipe.iduser where iduser = '${iduser}'`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	// store recipe
	store: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
				INSERT INTO recipe (id_recipe, iduser, image, ingredients, video, title)
				VALUES
      ($1, $2, $3, $4, $5, $6)
      `,
				[
					data.id_recipe,
					data.iduser,
					data.image,
					data.ingredients,
					data.video,
					data.title,
				]
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	update: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        UPDATE recipe SET
        title = COALESCE ($1, title),
        image = COALESCE ($2, title),
        ingredients = COALESCE ($3, ingredients),
        video = COALESCE ($4, video)
        WHERE id_recipe = $5
        `,
				[data.title, data.image, data.ingredients, data.video, data.id_recipe]
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	updateImage: (id_recipe, image) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			UPDATE recipe SET image = '${image}' WHERE id_recipe = '${id_recipe}'`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// delete recipe
	destroy: (id_recipe) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        DELETE FROM recipe WHERE id_recipe = '${id_recipe}'
        `
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// search recipe
	searching: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM recipe WHERE title ilike '%${data.title}%' ORDER by title ${data.sortOrd} LIMIT ${data.limit} OFFSET ${data.offset}`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// get liked recipe
	likedRecipe: (iduser) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			SELECT recipe.* from liked join recipe on liked.idrecipe = recipe.id_recipe join users on liked.iduser = users.id_user where liked.iduser = '${iduser}'
			`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// inser like recipe
	insertLiked: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			INSERT INTO liked (iduser, idrecipe)
			VALUES
			($1, $2)`,
				[data.iduser, data.idrecipe]
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// check liked
	checkLike: (iduser, idrecipe) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			SELECT * FROM liked WHERE iduser = '${iduser}' AND idrecipe = '${idrecipe}'`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// delete liked
	destroyLike: (id_recipe) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        DELETE FROM liked WHERE idrecipe = '${id_recipe}'
        `
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// get saved recipe
	savedRecipe: (iduser) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			SELECT recipe.* from saved join recipe on saved.idrecipe = recipe.id_recipe join users on saved.iduser = users.id_user where saved.iduser = '${iduser}'
			`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// insert saved
	insertSaved: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			INSERT INTO saved (iduser, idrecipe)
			VALUES
			($1, $2)`,
				[data.iduser, data.idrecipe]
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// check liked
	checkSaved: (iduser, idrecipe) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			SELECT * FROM saved WHERE iduser = '${iduser}' AND idrecipe = '${idrecipe}'`
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// delete liked
	destroySaved: (id_recipe) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        DELETE FROM saved WHERE idrecipe = '${id_recipe}'
        `
			)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
};

module.exports = recipeModel;
