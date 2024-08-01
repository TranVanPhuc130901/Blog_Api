'use strict'


// const productServicesP2 = require("../services/product.services.past2.js");

const { OK, CREATED, SuccessResponse } = require('../core/success.response.js');
const CategoryServices = require("../services/category.services.js");


class CategoryController {

    /**
     * API POST Thêm mới 1 danh mục
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async createCategory(req, res, next) {
        return new SuccessResponse({
            message: "Create category successfully",
            metadata: await CategoryServices.createCategory(req.body)
        }).send(res)
    }


    async getCategories(req, res, next) {
        return new SuccessResponse({
            message: "Get categories successfully",
            metadata: await CategoryServices.getCategories()
        }).send(res)
    }

    async getCategoryById(req, res, next) {
        return new SuccessResponse({
            message: "Get category successfully",
            metadata: await CategoryServices.getCategoryById(req.query)
        }).send(res)
    }

    async updateCategory(req, res, next) {
        return new SuccessResponse({
            message: "Update category successfully",
            metadata: await CategoryServices.updateCategory(req.body)
        }).send(res)
    }

    async deleteCategory(req, res, next) {
        return new SuccessResponse({
            message: "Delete category successfully",
            metadata: await CategoryServices.deleteCategory(req.query)
        }).send(res)
    }

}


module.exports = new CategoryController()