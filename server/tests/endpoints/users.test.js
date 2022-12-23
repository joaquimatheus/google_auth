require('../../dotenv.js');
const { HTTP_PORT } = process.env;

const request = require('supertest');
const apiUrl = `http://localhost:${HTTP_PORT}`;
const { faker } = require('@faker-js/faker');

describe('User API', () => {
    it('should show all users', async () => {
        const res = await request(apiUrl).get('/api/v1/users');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    })

    it('should create a user', () => {
        const username = faker.name.firstName().toLowerCase();
        const email    = faker.internet.email(username);
        const password = faker.internet.password();

        const data = { username, email, password };

        return request(apiUrl)
            .post("/api/v1/users")
            .send(data)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('data');
                expect(res.body.ok).toEqual(true);
            })
    })

    it('should delete a user', async () => {
        const response = await fetch(`${apiUrl}/api/v1/users`, {
            method: "GET"
        }) 

        const users = await response.json();
        const lastUser = await users.data.pop();
        const { id } = lastUser;

        return await request(apiUrl)
            .delete(`/api/v1/users/${id}`)
            expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('data')
                expect(res.body).toHaveProperty('id')
                expect(res.body.ok).toEqual(true)
            })
    })

    it('should updatedUser', async () => {
        const username  = faker.name.firstName().toLowerCase();
        const email = faker.internet.email(username);

        const data = { "changes": { username, email } };
        
        const response = await fetch(`${apiUrl}/api/v1/users`, {
            method: "GET"
        }) 

        const users = await response.json();
        const lastUser = await users.data.pop();
        const { id } = lastUser;

        return await request(apiUrl)
            .put(`/api/v1/users/${id}`)
            .expect(200) 
            .send(data)
            .then(res => {
                expect(res.body).toHaveProperty('data')
                expect(res.body.data.userId).toEqual(id.toString())
                expect(res.body.ok).toEqual(true)
            })
    })

    it('should login', async () => {
        const username = faker.name.firstName().toLowerCase();
        const email    = faker.internet.email(username);
        const password = faker.internet.password()

        const data = { username, email, password };

        const response = await fetch(`${apiUrl}/api/v1/users`, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

        delete data.username;

        return await request(apiUrl)
            .post(`/api/v1/users/login`)
            .expect(200)
            .send(data)
            .then(res => {
                expect(res.body).toHaveProperty('token')
                expect(res.body.ok).toEqual(true)
            })
    })

    it('shoud forget-password', async () => {
        const username = faker.name.firstName().toLowerCase();
        const email    = faker.internet.email(username);
        const password = faker.internet.password()

        const data = { username, email, password };

        const response = await fetch(`${apiUrl}/api/v1/users`, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

        delete data.password;
        delete data.username;

        return await request(apiUrl)
            .post('/api/v1/recover/forget-password')
            .expect(200)
            .send(data)
            .then(res => {
                expect(res.body.ok).toEqual(true)
                expect(res.body).toHaveProperty('login_token')
            })
    })

    it('shoud validate the token', async () => {
        const username = faker.name.firstName().toLowerCase();
        const email    = faker.internet.email(username);
        const password = faker.internet.password()

        const data = { username, email, password };

        const newUser = await fetch(`${apiUrl}/api/v1/users`, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

        delete data.password;
        delete data.username;

        const responseToken = await fetch(`${apiUrl}/api/v1/recover/forget-password`, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

        const dataToken = await responseToken.json();
        const { login_token } = dataToken;

        return await request(apiUrl)
            .get(`/api/v1/recover/validate?token=${login_token}`)
            .expect(200)
            .then( res => {
                expect(res.body.ok).toEqual(true)
            })
    })

    it('shoud set new password', async () => {
        const username = faker.name.firstName().toLowerCase();
        const email    = faker.internet.email(username);
        const password = faker.internet.password()

        const data = { username, email, password };

        const newUser = await fetch(`${apiUrl}/api/v1/users`, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

        delete data.password;
        delete data.username;

        const responseToken = await fetch(`${apiUrl}/api/v1/recover/forget-password`, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

        const dataToken = await responseToken.json();
        const { login_token } = dataToken;

        const validateToken = await fetch(`${apiUrl}/api/v1/recover/validate?token=${login_token}`, { method: "GET" })

        data.password = password; 
        data.token = login_token;

        delete data.email;

        return await request(apiUrl)
            .post(`/api/v1/recover/set-new-password`)
            .expect(200)
            .send(data)
            .then( res => {
                expect(res.body.ok).toEqual(true)
            })
    })
})
