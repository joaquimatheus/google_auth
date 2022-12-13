const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { Model } = require("sequelize");

function getGenerateAuthToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(32, function (err, buf) {
            if (err) {
                return reject(err);
            }

            resolve(buf.toString("hex"));
        });
    });
}

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static async createUser(username, email, password) {
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(password, salt);

            const userRow = await User.create({
                username,
                email,
                password: hashedPassword,
            });
            return userRow;
        }

        static async getUserByEmail(email) {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error(`User: ${email} not found!`);
            }

            return user;
        }

        static async login(email, password) {
            const user = await this.getUserByEmail(email);
            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!isValidPassword) {
                throw new Error(`Invalid password for: ${email}`);
            }

            return user;
        }

        static async generateAuthToken(email) {
            const user = await this.getUserByEmail(email);
            const token = await getGenerateAuthToken();

            const { id } = user;

            await User.update({ login_token: token }, { where: { id } });

            // The token is returned by function but
            // it's only in dev env, it's dangerous if this 
            // behavior continues in prod env 

            return token;
        }

        static async validateLoginToken(token) {
            const user = await User.findOne({ where: { login_token: token } });

            if (user == null) {
                throw new Error("Invalid token");
            }

            return user;
        }

        static async setNewPassword(loginToken, password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = User.update(
                { password: hashedPassword, login_token: null },
                { where: { login_token: loginToken } }
            );

            if (!user) { throw new Error('Token is null') }

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
            login_token: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "users",
        }
    );
    return User;
};
