<<<<<<< HEAD
module.exports = {
    "development": {
        "username": "root",
        "password": null,
        "database": "passport_demo",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
      }
}
=======
require("dotenv").config();

module.exports = {
	development: {
		username: "root",
		password: process.env.dbpassword,
		database: "digital_elf_db",
		host: "127.0.0.1",
		dialect: "mysql",
	},
	test: {
		username: "root",
		password: null,
		database: "database_test",
		host: "127.0.0.1",
		dialect: "mysql",
	},
	production: {
		//   "username": "root",
		//   "password": null,
		//   "database": "database_production",
		//   "host": "127.0.0.1",
		use_env_variable: "JAWSDB_URL",
		dialect: "mysql",
	},
};
>>>>>>> f3a381cc40d19a2362f4db6244f7ced28b43dc01
