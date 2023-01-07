const { faker } = require('@faker-js/faker');
const db = require('../../core/models/');

describe("Model Message", () => {
    beforeAll(async () => {
        await db.sequelizee.authenticate();
    })

    it('can create a new message in db', async() => {
        const from = faker.name.firstName().toLowerCase();
        const to = faker.name.firstName().toLowerCase();
        const msg = faker.lorem.sentence(5);

        const newMsg = db.messages.addMessage(from, to,  msg);

        console.log(newMsg);
    })
})
