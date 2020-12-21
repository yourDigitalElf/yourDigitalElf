
require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DBPASSWORD,
    database: "digital_elf_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    // use_env_variable: "mysql://kiqzg2spkcevlmr2:d0txwx8rr5k72bw7@z3iruaadbwo0iyfp.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/lxchuga4oyu7ih12",
    username: process.env.DBusername,
    password: process.env.DBpassword,
    database: process.env.DBdatabase,
    host: process.env.DBhost,
    dialect: "mysql"
  }
}