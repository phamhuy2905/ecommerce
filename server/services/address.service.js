const Address = require("../models/address.model");

class AddressService {
    static async getAddress(req, res, next) {
        return await Address.find({ addressUser: req.userId }).lean();
    }
    static async getAddressDefault(req, res, next) {
        return await Address.findOne({ addressUser: req.userId, isDefault: true }).lean();
    }
    static async addAddress(req, res, next) {
        const { isDefault } = req.body;
        if (isDefault) {
            await Address.findOneAndUpdate(
                { addressUser: req.userId, isDefault: true },
                { isDefault: false },
                { new: true }
            );
        }
        const newAddress = await Address.create({ ...req.body, addressUser: req.userId });
        return newAddress;
    }
    static async updateAddress(req, res, next) {
        const { isDefault } = req.body;
        if (isDefault) {
            await Address.findOneAndUpdate(
                { addressUser: req.userId, isDefault: true },
                { isDefault: false },
                { new: true }
            );
        }
        const address = Address.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        return address;
    }
}

module.exports = AddressService;
