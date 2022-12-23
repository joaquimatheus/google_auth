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
                ok: true,
            });
        })
    );

    app.get("/api/v1/users", 
        express.json(), 
        buildHandler(async function (req, res) {
            const allUsers = await db.users.findAll()

            res.status(200).json({
                type: "users",
                data: allUsers,
                ok: true,
            })
        })
    );

    app.delete("/api/v1/users/:userId", 
        buildHandler(async function (req, res) {
            const userId = req.string('userId');
            const deletedUser = await db.users.deleteUser(userId);

            res.status(200).json({
                type: 'users',
                data: { userId, deletedUser },
                ok: true,
            })
        })
    );

    app.put("/api/v1/users/:userId",
        express.json(),
        buildHandler(async function(req, res) {
            const userId = req.string('userId');
            const changes = req.arg('changes');

            const updatedUser = await db.users.updateUser(changes, userId);

            res.status(200).json({
                type: 'users',
                data: { userId, changes, updatedUser },
                ok: true,
            })
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

            res.status(200).json({
                login_token: user,
                ok: true
            })
        })
    );

    app.get(
        "/api/v1/recover/validate",
        buildHandler(async function(req, res) {
            const token = req.query.token;

            const isValid = await db.users.validateLoginToken(token);

            res.status(200).json({
                ok: true
            })
        })
    )

    app.post('/api/v1/recover/set-new-password',
        express.json(),
        buildHandler(async function(req, res) {
            const token = req.string('token');
            const password = req.string('password');

            db.users.setNewPassword(token, password);

            res.status(200).json({
                ok: true
            })
        })
    )
};
