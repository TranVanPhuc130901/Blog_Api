'use strict'

const uploadServices = require("../services/upload.services.js");

const { OK, CREATED, SuccessResponse } = require('../core/success.response.js');


class UploadController {

    async uploadImageFromUrl(req, res) {
        return new SuccessResponse({
            message: "Posts from url fetched successfully",
            data: await uploadServices.uploadImageFromUrl(req.body)
        }).send(res);
    }

    async uploadImageFromLocal(req, res) {
        return new SuccessResponse({
            message: "Posts from local fetched successfully",
            data: await uploadServices.uploadImageFromLocal(req.body)
        }).send(res);
    }

    async uploadImageFromLocalFiles(req, res) {
        return new SuccessResponse({
            message: "Posts from local files fetched successfully",
            data: await uploadServices.uploadImageFromLocalFiles(req.body)
        }).send(res);
    }

}

module.exports = new UploadController()