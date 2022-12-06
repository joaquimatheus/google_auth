const express = require('express');

const { buildHandler } = require('../utils');
const db = require('../../core/models')

module.exports = function (app) {
    app.post("/api/v1/users", 
        express.json(),
        buildHandler(async function (req, res) {
            const username = req.string('username');
            const email = req.string('email');
            const password = req.string('password');

            const userRow = await db.users.createUser(username, email, password)

            res.status(200).json({
                type: 'users',
                data: userRow
            })
        })
    )

    app.post("/api/v1/users/login",
        express.json(),
        buildHandler(async function (req, res) {
            const email = req.string('email');
            const password = req.string('password');

            const userRow = await db.users.login(email, password);

            res.status(200).json({
                user: userRow
            })
        })
    )
}
