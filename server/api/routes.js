const logger = require('../helpers/logger');

function allowCrossDomain(req, res, next) {

    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method == 'OPTIONS') { return res.sendStatus(200); }

    next();
}

module.exports = (app) => {
    app.use(allowCrossDomain);

    const _get = app.get;
    const _post = app.post;
    const _put = app.put;
    const _delete = app.delete;

    app.post = function(route) {
        logger.info(`Binding route: {POST} ${route}`)
        return _post.apply(this, arguments);
    };

    app.get = function(route) {
        logger.info(`Binding route: {GET} ${route}`);
        return _get.apply(this, arguments);
    };

    app.put = function(route) {
        logger.info(`Binding route: {PUT} ${route}`);
        return _put.apply(this, arguments);
    };

    app.delete = function(route) {
        logger.info(`Binding route: {DELETE} ${route}`);
        return _delete.apply(this, arguments);
    }

    // below here put the endpoints
    require('./endpoints/users')(app)

    app.get = _get;
    app.post = _post;
    app.put = _put;
    app.delete = app.delete;

    app.use((req, res) => {
        res.status(404).json({
            code: 404,
            error: true,
            msg: 'URL not found'
        });
    });

    app.use((err, req, res, next) => {
        logger.error(err);
        const statusCode = err.statusCode || 500;

        res.status(statusCode).json({
            error: true,
            code: statusCode,
            msg: err.msg || err.message || err
        });
    });
};
