const dev = {
    app: {
        port: process.env.DEV_APP_PORT,
    },
    db: {
        name: process.env.DEV_DB_NAME,
        port: process.env.DEV_DB_PORT,
        host: process.env.DEV_DB_HOST,
    },
};

const pro = {
    app: {
        port: process.env.PRO_APP_PORT,
    },
    db: {
        name: process.env.PRO_DB_NAME,
        port: process.env.PRO_DB_PORT,
        host: process.env.PRO_DB_HOST,
    },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
