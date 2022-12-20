require('../dotenv.js');
const { faker } = require('@faker-js/faker');
const { HTTP_PORT } = process.env
const url = `http://localhost:${HTTP_PORT}`

function createRandomUser() {
    const username = faker.name.firstName().toLowerCase();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    return {
        username,
        email,
        password
    }
}

const user = createRandomUser();

async function sendRequest(data, method, endpoint) {
    const response = await fetch(`${url}/${endpoint}`, {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json();
}

(async () => {
    console.log(user);
    const request = await sendRequest(user, 'post', 'api/v1/users');
    console.log(request);
})()
