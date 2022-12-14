const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OAuth extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OAuth.init(
        {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            picture: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "oauth",
        }
    );
    return OAuth;
};
