'user strict'

const postServices = require("../services/post.services.js");

const { OK, CREATED, SuccessResponse } = require('../core/success.response.js');


class PostController {

    async getPosts(req, res) {
        return new SuccessResponse({
            message: "Posts fetched successfully",
            metadata: await postServices.getPosts()
        }).send(res);
    }

    async getPostById(req, res) {
        return new SuccessResponse({
            message: "Post fetched successfully",
            metadata: await postServices.getPostById({
                PostId: req.params.idPost
            })
        }).send(res);
    }

    async getPostByCategoryId(req, res) {
        return new SuccessResponse({
            message: "Post fetched successfully",
            metadata: await postServices.getPostByCategoryId(req.query)
        }).send(res);
    }

    async updatePost(req, res) {
        return new SuccessResponse({
            message: "Post updated successfully",
            metadata: await postServices.updatePost(req.body)
        }).send(res);
    }

    async createPost(req, res) {
        return new SuccessResponse({
            message: "Post created successfully",
            metadata: await postServices.createPost(req.body)
        }).send(res);
    }

    async deletePost(req, res) {
        return new SuccessResponse({
            message: "Post deleted successfully",
            metadata: await postServices.deletePost(req.query)
        }).send(res);
    }

}

module.exports = new PostController()