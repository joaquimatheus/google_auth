const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Messages extends Model {
        static async getMessages(from, to) {
            const { sender } = from;

            const messages = await Messages.findAll({
                where: {
                    [Op.all]: [[from.toString(), to.toString()]],
                },
                order: [["updated_at", "ASC"]],
            });

            const projectedMessages = messages.map((msg) => ({
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }));

            return projectedMessages;
        }

        static async addMessage(from, to, msg) {
            const { sender } = from;

            const data = await Messages.create({
                message_text: msg,
                users: [ sender, to ],
                sender_id: from.id,
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
