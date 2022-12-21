const { faker } = require("@faker-js/faker");
const db = require("../../core/models/");

describe("test procedures in db", () => {
    beforeAll(async () => {
        await db.sequelize.authenticate();
    })

    it("can register a user in db?", async () => {
        const username = faker.name.firstName().toLowerCase();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        const user = await db.users.createUser(username, email, password);
    });

    it("get user by email", async () => {
        const username = faker.name.firstName().toLowerCase();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        await db.users.createUser(username, email, password);

        const user = db.users.getUserByEmail(email);
    })

    it("get user by id", async () => {
        const username = faker.name.firstName().toLowerCase();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        const newUser = await db.users.createUser(username, email, password);

        const userGetted = await db.users.getUserById(newUser.id);
    })

    it('login', async () => {
        const username = faker.name.firstName().toLowerCase();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        await db.users.createUser(username, email, password);

        const logged = await db.users.login(email, password);
    })

    it('delete a user', async () => {
        const username = faker.name.firstName().toLowerCase();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        const user = await db.users.createUser(username, email, password);

        await db.users.deleteUser(user.id);
    })

    it('update user', async () => {
        const username = faker.name.firstName().toLowerCase();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        const user = await db.users.createUser(username, email, password);

        const newUsername = faker.name.firstName().toLowerCase();
        const newEmail = faker.internet.email(newUsername);

        const changes = { username: newUsername, email: newEmail };

        await db.users.updateUser(changes, user.id);
    })

    it('generate login token', async () => {
        const username = faker.name.firstName().toLowerCase();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        await db.users.createUser(username, email, password);

        const token = await db.users.generateAuthToken(email);

        console.log(token);
    })

    it('validate login token', async () => {
        const username = faker.name.firstName().toLowerCase();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        await db.users.createUser(username, email, password);
        
        const token = await db.users.generateAuthToken(email);

        await db.users.validateLoginToken(token);
    })

    it('set new password', async () => {
        const username = faker.name.firstName().toLowerCase();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        const newPassword = faker.internet.password();

        await db.users.createUser(username, email, password);
        
        const token = await db.users.generateAuthToken(email);

        await db.users.validateLoginToken(token);

        await db.users.setNewPassword(token, password);
    })
});
