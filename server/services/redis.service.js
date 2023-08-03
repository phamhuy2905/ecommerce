const { setnx, expires } = require("../helper/redis");
const { reservationInventory } = require("../models/repositories/inventory.repo");
const { reservationProduct } = require("../models/repositories/product.repo");
// const redis = require("redis");
// const { promisify } = require("util");

// const redisClient = redis.createClient();

// const pexpire = promisify(redisClient.pExpire).bind(redisClient);
// const setnxAsyn = promisify(redisClient.setNX).bind(redisClient);

const inventoryLock = async ({ productId, quantity }) => {
    const loop = 10;
    const keyName = "lockproductKey";
    const time = 3000;

    for (let index = 0; index < loop; index++) {
        const result = await setnx(keyName, time);
        if (result === 1) {
            // chua ton tai se tra ve 1
            const isReservation = await reservationInventory({ productId, quantity });
            if (isReservation) {
                await reservationProduct({ productId, quantity });
                await expires(keyName, time);
                return keyName;
            }
            return null;
        } else {
            await new Promise((resolve) => setTimeout(resolve, 50));
        }
    }
};

module.exports = {
    inventoryLock,
};
