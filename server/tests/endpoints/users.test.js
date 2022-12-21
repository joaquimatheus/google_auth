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

    it('should delete updatedUser', async () => {
        // TODO TOMORROW! 
    })
})
