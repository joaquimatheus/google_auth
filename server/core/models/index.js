const fs = require("fs");
const { faker } = require('@faker-js/faker');
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "test";
const config = require('../../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(`config`, config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
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

(async () => {
    const sender = faker.name.firstName().toLowerCase();
    const id = faker.random.numeric()

    const from = { sender, id };

    const to = faker.name.firstName().toLowerCase();
    const msg = faker.lorem.sentence(5);

    const newMsg = await db.messages.addMessage(from, to, msg);
    const message = await db.messages.getMessages(from, to);

    console.log(message);
})()

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
