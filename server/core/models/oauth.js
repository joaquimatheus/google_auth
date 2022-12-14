const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OAuth extends Model {

        static async createUser(username, email, picture) {
            let user = await this.getUserByEmail(email);

            if(!user) {
                user = await OAuth.create({
                    username, email, picture
                })  
            }

            return user;
        }

        static async getUserByEmail(email) {
            const user = await OAuth.findOne({ where: { email } });
            if (user === null) {
                return;
            }

            return user;
        }

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
