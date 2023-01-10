const { faker } = require('@faker-js/faker');
const db = require('../../core/models/');

describe("Model Message", () => {
    beforeAll(async () => {
        await db.sequelize.authenticate();
    })

    it('can create a new message in db', async() => {
        const sender = faker.name.firstName().toLowerCase();
        const id = faker.random.numeric()

        const from = { sender, id }

        const to = faker.name.firstName().toLowerCase();
        const msg = faker.lorem.sentence(5);

        const newMsg = await db.messages.addMessage(from, to, msg);

        console.log(newMsg.dataValues);
    })

    it('can get a message', async() => {
        const sender = faker.name.firstName().toLowerCase();
        const id = faker.random.numeric()

        const from = { sender, id };

        const to = faker.name.firstName().toLowerCase();
        const msg = faker.lorem.sentence(5);

        const newMsg = await db.messages.addMessage(from, to, msg);
        const message = await db.messages.getMessages(from, to);

        console.log(message);
    })
})
