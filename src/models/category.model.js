'use strict'


const { uniqueId } = require('lodash');
const { model, Schema, Types } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Category';
const COLLECTION_NAME = 'Categories';

const categorySchema = new Schema({
    cate_name: {
        type: String,
        required: true,
        unique: true
    },
    cate_description: {
        type: String,
        required: false
    },
    cate_image: {
        type: String,
        required: false,
        default: "https://example.com/default-category-image.jpg"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});


module.exports = model(DOCUMENT_NAME, categorySchema)