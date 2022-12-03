const db = require('./index');
const { Model, DataTypes } = require('sequelize');

class Users extends Model {}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        unique: truem
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    db.sequelize,
    modelName: "users",
    timestamps: true,
});

module.exports = Users;
