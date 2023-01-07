const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Messages extends Model {
        static async getMessages(from, to) {
            const messages = await Message.findAll({
                where: {
                    users: {
                        $contains: from,
                    },
                    users: {
                        $contains: to,
                    },
                },
                order: [["updated_at", "ASC"]],
            });

            const projectedMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                };
            });

            return projectedMessages;
        }

        static async addMessage(from, to, msg) {
            const data = await Message.create({
                message_text: msg,
                users: {from, to},
                sender_id: from,
            });

            return data;
        }

        static associate(models) {}
    }
    Messages.init(
        {
            message_text: DataTypes.STRING,
            users: DataTypes.JSON,
            sender_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "messages",
        }
    );
    return Messages;
};
