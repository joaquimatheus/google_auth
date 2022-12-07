const bcrypt = require('bcrypt');
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static async createUser(username, email, password) {
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(password, salt)

            const userRow = await User.create({
                username, email, password: hashedPassword
            });

            return userRow;
        }

        static async getUserByEmail(email) {
            const user = await User.findOne({ where: { email }})
            if (!user) { throw new Error(`User: ${email} not found!`); }
            
            return user;
        }

        static async login(email, password) {
            const user = await this.getUserByEmail(email);
            const isValidPassword = await bcrypt.compare(password, user.password)
            
            if (!isValidPassword) {
                throw new Error(`Invalid password for: ${email}`);
            }

            return user;
        }

        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "users",
        }
    );
    return User;
};
