const express = require('express');

const { buildHandler } = require('../utils');
const db = require('../../core/models')

module.exports = function (app) {
    app.post("/api/v1/users", 
        express.json(),
        buildHandler(async function (req, res) {
            const username = req.string('username');
            const email = req.string('email');
            const password = req.string('email');

            const userRow = db.users.create({
                username,
                email,
                password
            })

            console.log(userRow)

            res.status(200).json({
                type: 'users',
                data: { username, email, password }
            })
        })
    )
}
