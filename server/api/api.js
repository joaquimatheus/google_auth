const path = require('path'); require('../dotenv.js');
const express = require('express')
const app = express();

process.env.TZ = 'UTC';

let hasInitializedServer = false;
let httpServer;

function fatalHandler(err) {
    console.error(err, { FATAL: true })
    process.exit(1);
}

process.on('uncaughtException', fatalHandler);
process.on('unhandleRejection', fatalHandler);

app.use((req, res, next) => {
    const { ip, method, url, statusCode } = req;

    const prevStart = new Date().getTime();
    const msg = `[${ip} ${method} ${prevStart} - receiving {${url}}]`

    console.log(msg);

    res.on('close', () => {
        const start = new Date() - prevStart;
        console.log(`[${ip}{${method} ${prevStart} - }]` + 
            `closed: ${url} ${statusCode} ${start}ms`)
    })

    next();
})

function listen() {
    httpSever = app.listen(process.env.HTTP_PORT, () => {
        if (hasInitializedServer) { return }

        hasInitializedServer = true;
        console.log(`it's alive http://localhost:${process.env.HTTP_PORT}`)
    }).on('error', (err) => {
        console.error(err);
        process.exit(1);
    })
}

require('./routes')(app);

listen();
