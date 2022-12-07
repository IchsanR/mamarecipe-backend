const db = require("../config/db");

const userModel = {
	// router list
	selectAll: () => {
		return new Promise((resolve, reject) => {
			db.query("SELECT * FROM users", (err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		});
	},
	// router - detail
	selectDetail: (id_user) => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM users where id_user='${id_user}'`, (err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		});
	},
	// router - register
	register: ({ id_user, name, email, password, phone, profile_pic }) => {
		return new Promise((resolve, reject) => {
			db.query(
				`INSERT INTO users (id_user, name, email, password, phone, profile_pic)
      VALUES
      ($1, $2, $3, $4, $5, $6)`,
				[id_user, name, email, password, phone, profile_pic],
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
	// login
	checkEmail: (email) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        SELECT * FROM users WHERE email = '${email}'
        `,
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
	// update user
	update: ({ id_user, name, email, password, phone }) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
        UPDATE users SET
        name = COALESCE ($1, name),
        email = COALESCE ($2, email),
        password = COALESCE ($3, password),
        phone = COALESCE ($4, phone)
        WHERE id_user = $5
        `,
				[name, email, password, phone, id_user],
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},

	updatePass: ({ email, password }) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
      UPDATE users SET password = '${password}' WHERE email = '${email}'`,
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},

	updateImage: (id_user, profile_pic) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			UPDATE users SET profile_pic = '${profile_pic}' WHERE id_user = '${id_user}'`,
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},

	destroy: (id_user) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
      DELETE FROM users WHERE id_user = '${id_user}'
      `,
				(err, res) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	},
};

module.exports = userModel;
