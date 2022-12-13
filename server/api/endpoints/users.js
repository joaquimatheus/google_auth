require("../../dotenv.js");
const express = require("express");
const { buildHandler } = require("../utils");
const db = require("../../core/models");
const logger = require("../../helpers/logger");

const jwt = require("jsonwebtoken");
const { HTTP_SECRET } = process.env;

module.exports = function (app) {
    app.post(
        "/api/v1/users",
        express.json(),
        buildHandler(async function (req, res) {
            const username = req.string("username");
            const email = req.string("email");
            const password = req.string("password");

            const userRow = await db.users.createUser(
                username,
                email,
                password
            );

            if (userRow)
                logger.info(
                    `The new user is created! ${userRow.dataValues.id}`
                );

            res.status(200).json({
                type: "users",
                data: userRow,
            });
        })
    );

    app.post(
        "/api/v1/users/login",
        express.json(),
        buildHandler(async function (req, res) {
            const email = req.string("email");
            const password = req.string("password");

            const userRow = await db.users.login(email, password);

            if (userRow)
                logger.info(
                    `The new user is logged ${email}`
                )

            const token = jwt.sign(userRow.dataValues, HTTP_SECRET);

            res.status(200).json({
                ok: true,
                token,
            });
        })
    );

    app.post(
        "/api/v1/recover/forget-password",
        express.json(),
        buildHandler(async function (req, res) {
            const email = req.string('email');
            
            const user = await db.users.generateAuthToken(email);

            // TODO
            // -> Send an email to user
            // /recover-password?token=${user.login_token};

            res.end(JSON.stringify({ ok: true, token: user }))
        })
    );

    app.get(
        "/api/v1/recover/validate",
        buildHandler(async function(req, res) {
            const token = req.query.token;
1
            const isValid = await db.users.validateLoginToken(token);

            res.end(JSON.stringify({ ok: true }))
        })
    )

    app.post('/api/v1/recover/set-new-password',
        express.json(),
        buildHandler(async function(req, res) {
            const token = req.string('token');
            const password = req.string('password');

            db.users.setNewPassword(token, password);

            res.end(JSON.stringify({ ok: true }));
        })
    )
};
