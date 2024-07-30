
'use strict'

const inventory  = require("../../models/inventory.model");

const insertInventory = async({
    productId, shopid, stock, location = 'unKnow'
}) => {
    return await inventory.create({
        inven_productId: productId,
        inven_shopId: shopid,
        inven_stock: stock,
        inven_location: location
    })
}

const reservationInventory = async({productId, quanlity, cartId}) => {
    const query = {
        inven_productId: productId,
        inven_stock: {$gte: quanlity}
    }, updateSet = {
        $inc: {
            inven_stock: -quanlity
        },
        $push: {
            inven_reservations: {
                quanlity,
                cartId,
                createOn: new Date()
            }
        }
    }, options = {
        upsert: true, new: true}

        return await inventory.updateOne(query, updateSet)
}

module.exports = {
    insertInventory,
    reservationInventory
}