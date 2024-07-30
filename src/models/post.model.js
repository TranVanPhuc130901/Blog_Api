'use strict'

const { model, Schema, Types, Collection, default: mongoose } = require('mongoose'); // Erase if already required


const DOCUMENT_NAME = 'Post';
const COLLECTION_NAME = 'Posts';

const postSchema = new Schema({
    PostTitle: {
        type: String,
        required: true,
    },
    PostDescription: {
        type: String,
        required: true,
        default: "No description"
    },
    // PostLink: {
    //     type: String,
    // },
    PostImage: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    // PostMetaTitle: {
    //     type: String,
    //     default: ""
    // },
    // PostMetaDescription: {
    //     type: String,
    //     default: ""
    // },
    // PostMetaKeyword: {
    //     type: String,
    //     default: ""
    // },
    // PostAuthor: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User', // Tham chiếu đến mô hình User
    // },
    PostTag: {
        type: String,
        default: ""
    },
    PostContent: {
        type: String,
        default: ""
    },
    PostStatus: {
        type: String,
        default: "1"
    },
    PostSortOrder: {
        type: String,
        default: "1"
    },
    PostTotalView: {
        type: String,
        default: "0"
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, { timestamps: true, collection: COLLECTION_NAME });

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, postSchema);