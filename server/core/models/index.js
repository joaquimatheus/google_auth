const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require('../../config/config.js')[env];
const db = {};

console.log(config)

let sequelize;
if (config.use_env_variable) {
    console.log('is here?')
    sequelize = new Sequelize(`config`, config);
} else {
    console.log('is here?--- ')
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}


console.log('arrived here?')
fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        console.log('arrived here?------')
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
