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
    )
}
