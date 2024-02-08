const redis = require("redis");
const { redis: redisConfig } = require("../config/config.mongodb");
const client = redis.createClient(redisConfig.port, redisConfig.host);

const get = async (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const set = async (key, count) => {
    return new Promise((resolve, reject) => {
        client.set(key, count, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const incrBy = async (key, count) => {
    return new Promise((resolve, reject) => {
        client.incrby(key, count, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const decrBy = async (key, count) => {
    return new Promise((resolve, reject) => {
        client.decrBy(key, count, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const setnx = async (key, count) => {
    return new Promise((resolve, reject) => {
        client.setnx(key, count, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const exists = async (key) => {
    return new Promise((resolve, reject) => {
        client.exists(key, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const del = async (key) => {
    return new Promise((resolve, reject) => {
        client.del(key, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};
const expires = async (key, time) => {
    return new Promise((resolve, reject) => {
        client.expire(key, time, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    get,
    set,
    incrBy,
    decrBy,
    setnx,
    exists,
    del,
    expires,
};
