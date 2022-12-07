const db = require("../config/db");

const recipeModel = {
	// router list
	// selectAll: (limit, offset) => {
	selectAll: () => {
		return new Promise((resolve, reject) => {
			db.query(
				// `SELECT * FROM recipe ORDER BY title ASC LIMIT ${limit} OFFSET ${offset}`,
				`SELECT * FROM recipe ORDER BY title ASC`,
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
	selectDetail: (id_recipe) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM recipe where id_recipe='${id_recipe}'`,
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
	selectUserRecipe: (iduser) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM recipe join users on users.id_user = recipe.iduser where iduser = '${iduser}'`,
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
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
				],
				(res, err) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
	update: (id_recipe, image, title, ingredients, video) => {
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
				[title, image, ingredients, video, id_recipe],
				(err, res) => {
					if (err) {
						reject(err);
					} else {
						resolve(res);
					}
				}
			);
		});
	},
	updateImage: (id_recipe, image) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			UPDATE recipe SET image = '${image}' WHERE id_recipe = ${id_recipe}`,
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
	destroy: (id_recipe) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        DELETE FROM recipe WHERE id_recipe = '${id_recipe}'
        `,
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});
	},
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
};

module.exports = recipeModel;
