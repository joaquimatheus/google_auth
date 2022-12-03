require("../dotenv.js");

const { DB_DATABASE, DB_PASSWORD, DB_USERNAME, DB_HOST } = process.env;

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOST,
        dialect: "mariadb",
    },
};
