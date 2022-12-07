const config = {}
const isDev = process.env.NODE_ENV === 'development';

if (isDev || window.location.hostname === 'localhost') {
    config.baseApiUrl = 'http://localhost:4000/api/v1';
} else {

}

config.isDev = isDev;

export default config;
