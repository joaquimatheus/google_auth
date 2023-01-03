require("../dotenv.js");

const { 
    DB_DATABASE, DB_PASSWORD, DB_USERNAME, DB_HOST,
    DB_TEST_DATABASE, DB_TEST_PASSWORD, DB_TEST_USERNAME, DB_TEST_HOST} = process.env;

const development = {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: "mariadb",
}

const test = {
    username: DB_TEST_USERNAME,
    password: DB_TEST_PASSWORD,
    database: DB_TEST_DATABASE,
    host: DB_TEST_HOST,
    dialect: "mariadb",
}

module.exports = { development, test };
