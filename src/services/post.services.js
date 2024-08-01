'use strict'

const postModel = require("../models/post.model")
const { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenError } = require("../core/error.response");


class PostServices {
    static async getPosts() {
        const posts = await postModel.find();
        return posts
    }

    static async getPostsByCategoryId({ categoryId }) {
        const posts = await postModel.find({ categories: categoryId });
        return posts
    }

    static async getPostById({ PostId }) {
        const post = await postModel.findOne({ _id: PostId });
        return post
    }

    static async createPost({
        PostTitle,
        PostDescription,
        PostImage,
        PostTag,
        PostContent,
        PostStatus,
        PostSortOrder,
        categories = []
    }) {
        const foundPost = await postModel.findOne({ PostTitle });
        if (foundPost) {
            throw new ConflictRequestError("Post already exists");
        }

        const post = await postModel.create({
            PostTitle,
            PostDescription,
            PostImage,
            PostTag,
            PostContent,
            PostStatus,
            PostSortOrder,
            categories
        })

        return post
    }

    static async updatePost({ PostId, PostTitle, PostDescription, PostImage, PostTag, PostContent, PostStatus, PostSortOrder, categories = [] }) {
        const foundPost = await postModel.findOne({ _id: PostId });
        if (!foundPost) {
            throw new BadRequestError("Post not found");
        }
        const post = await postModel.findOneAndUpdate({ _id: PostId }, {
            PostTitle,
            PostDescription,
            PostImage,
            PostTag,
            PostContent,
            PostStatus,
            PostSortOrder,
            categories
        }, { new: true })
        return post
    }

    static async deletePost({ PostId }) {
        const foundPost = await postModel.findOne({ _id: PostId });
        if (!foundPost) {
            throw new BadRequestError("Post not found");
        }
        const post = await postModel.findOneAndDelete({ _id: PostId })
        return post
    }

}

module.exports = PostServices