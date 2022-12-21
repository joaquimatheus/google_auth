const { faker } = require("@faker-js/faker");
const db = require("../core/models/");

describe("test procedures in db", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true, match: /_test$/ });
    })

    it("should succed connection", async () => {
        await db.sequelize.authenticate();
    });
});
