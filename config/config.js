
require("dotenv").config();

module.exports = {
    "development": {
        "username": "root",
        "password": process.env.dbpassword,
        "database": "digital_elf_db",
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
        "use_env_variable": "JAWS_DB_URL",
        "dialect": "mysql"
      }
}