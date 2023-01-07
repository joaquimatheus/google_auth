module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("messages", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            message_text: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            users: {
                type: Sequelize.JSON,
            },
            sender_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("messages");
    },
};
