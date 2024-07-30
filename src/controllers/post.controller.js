'user strict'

const postServices = require("../services/post.services.js");

const { OK, CREATED, SuccessResponse } = require('../core/success.response.js');


class PostController {

    async getPosts(req, res) {
        return new SuccessResponse({ message: "Posts fetched successfully", data: "get success" }).send(res);
    }

    async createPost(req, res) {
        return new SuccessResponse({
            message: "Post created successfully",
            data: await postServices.createPost(req.body)
        }).send(res);
    }

}

module.exports = new PostController()