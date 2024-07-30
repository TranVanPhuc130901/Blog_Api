'use strict'

const { text } = require("body-parser");
const { product, electronic, clothing, furniture } = require("../../models/product.model");
const { Types } = require('mongoose');
const { getSelectData, unGetSelectData } = require("../../untils");

const searchProductByUser = async({ keySearch }) => {
    const regexSearch = new RegExp(keySearch);
    const results = await product.find({
            isPublished: false,
            $text: { $search: regexSearch }
        }, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: "textScore" } }).lean();
    return results;
}

const findAllProduct = async({ limit, sort, page, filter, select }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: 1 } : { _id: -1 };
    const products = await product.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean();
    return products;
}

const findProductDetail = async({ product_id, unSelect }) => {
    return await product.findById(product_id)
        .select(unGetSelectData(unSelect))
}

const findAllDraftsForShop = async({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip })
}



const findAllPublishForShop = async({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip })
}

const publishProductByShop = async({ product_shop, product_id }) => {
    const foundShop = await product.findOne({
        product_shop: product_shop,
        _id: product_id
    })
    console.log('ads', foundShop)
    if (!foundShop) throw new Error('Shop not found');
    foundShop.isDraft = false;
    foundShop.isPublished = true;

    const { modifiedCount } = await foundShop.updateOne(foundShop);

    return modifiedCount;
}


const unPublishProductByShop = async({ product_shop, product_id }) => {
    const foundShop = await product.findOne({
        product_shop: product_shop,
        _id: product_id
    })
    if (!foundShop) throw new Error('Shop not found');
    foundShop.isDraft = true;
    foundShop.isPublished = false;
    const { modifiedCount } = await foundShop.updateOne(foundShop);

    return modifiedCount;
}


const findProduct = async({ product_id, unSelect }) => {
    return await product.findById(product_id)
        .select(unGetSelectData(unSelect))
}

const updateProductById = async({ productId, bodyUpdate, model, isNew = true }) => {
    console.log('model', bodyUpdate)
    return await model.findByIdAndUpdate(productId, bodyUpdate, { new: isNew })
}

const queryProduct = async({ query, limit, skip }) => {
    return await product.find(query)
        .populate('product_shop', 'name email -_id')
        .sort({ updateAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
}


const getProductById = async(productId) => {
    return await product.findOne({ _id: productId }).lean();
}

const checkProductByServer = async(products) => {
    return await Promise.all(products.map(async product => {
        const foundProduct = await getProductById(product.product_id)
        if (foundProduct) {
            return {
                price: foundProduct.product_price,
                quanlity: foundProduct.product_quanlity,
                productId: foundProduct.productId
            }
        }

    }))
}

module.exports = {
    findAllDraftsForShop,
    publishProductByShop,
    findAllPublishForShop,
    unPublishProductByShop,
    searchProductByUser,
    findAllProduct,
    findProductDetail,
    updateProductById,
    getProductById,
    checkProductByServer,
    findProduct
}