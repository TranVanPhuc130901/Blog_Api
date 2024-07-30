'use strict'

const { cart } = require('../cart.model');

const findCartById = async(id) => {

    return await cart.findOne({ _id: id, cart_state: 'active' }).lean();
}

module.exports = {
    findCartById
}