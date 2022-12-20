require("../../dotenv.js");
const express = require('express');
const { buildHandler } = require('../utils');
const db = require("../../core/models");
const logger = require("../../helpers/logger");

const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID
})

module.exports = function (app) {
    app.post(
        "/api/v1/google/auth",
        express.json(),
        buildHandler(async function (req, res) {
            const token = req.string('token');

            const ticket = await googleClient.verifyIdToken({
                idToken: token,
                audient: `${process.env.GOOGLE_CLIENT_ID}`,
            });

            const payload = ticket.getPayload();
            const { name, email, picture } = payload;

            const user = await db.oauth.createUser(
                name,
                email,
                picture
            )
            
            res.status(200).json({
                ok: true,
                user,
                token
            });
        })
    );

    app.post(
        "/api/v1/oauth/google/login",
        express.json(),
        buildHandler(async function(req, res) {
            const token = req.string('token');

            const ticket = await googleClient.verifyIdToken({
                idToken: token,
                audient: `${process.env.GOOGLE_CLIENT_ID}`
            });

            const payload = ticket.getPayload();
            const { email } = payload;

            res.status(200).json({
                type: 'oauth',
                data: email,
                token,
                ok: true,
            })
        })
    );

    app.get(
       "/api/v1/oauth",
        buildHandler(async function (req, res) {
            const allUsers = await db.oauth.findAll();

            res.status(200).json({
                data: { allUsers },
                ok: true,
            })
        })
    );

    app.delete(
        "/api/v1/oauth/:userId",
        buildHandler(async function(req, res) {
            const userId = req.string('userId');
            const deletedUser = await db.oauth.deleteUser(userId)

            res.status(200).json({
                type: 'users',
                data: userId,
                ok: true
            })
        })
    );
    
    app.put(
        "/api/v1/oauth/:userId",
        express.json(),
        buildHandler(async function(req, res) {
            const userId = req.string('userId');
            const changes = req.arg("changes");

            const updatedUser = await db.oauth.updateUser(changes, userId);

            res.status(200).json({
                type: 'oauth',
                data: userId, changes,
                ok: true
            })
        })
    );

}
