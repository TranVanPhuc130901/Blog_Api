'use strict'

const uploadServices = require("../services/upload.services.js");

const { OK, CREATED, SuccessResponse } = require('../core/success.response.js');


class UploadController {

    async uploadImageFromUrl(req, res) {
        return new SuccessResponse({
            message: "Posts from url fetched successfully",
            metadata: await uploadServices.uploadImageFromUrl(req.body)
        }).send(res);
    }

    async uploadImageFromLocal(req, res) {
        console.log(req.file.path)
        return new SuccessResponse({
            message: "Posts from local fetched successfully",
            metadata: await uploadServices.uploadImageFromLocal({
                PostImage: req.file.path,
                folderName: req.body.folderName
            })
        }).send(res);
    }

    async uploadImageFromLocalFiles(req, res) {
        return new SuccessResponse({
            message: "Posts from local files fetched successfully",
            metadata: await uploadServices.uploadImageFromLocalFiles(req.body)
        }).send(res);
    }

}

module.exports = new UploadController()