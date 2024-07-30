'use strict'

const postModel = require("../models/post.model")
const { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenError } = require("../core/error.response");


class PostServices {
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
        if (!post_title) {
            throw new BadRequestError("Post title is required")
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

}

module.exports = PostServices