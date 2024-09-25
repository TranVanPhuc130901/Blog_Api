'use strict'

const categoryModel = require("../models/category.model")
const { BadRequestError, ConflictRequestError, AuthFailureError, ForbiddenError } = require("../core/error.response");


class CategoryServices {
    static async getCategories() {
        const categories = await categoryModel.find();
        return categories
    }

    static async getCategoryById({ CategoryId }) {
        const category = await categoryModel.findOne({ CategoryId })
        if (!category) {
            throw new BadRequestError("Category not found")
        }
        return category
    }

    static async createCategory({
        cate_name,
        cate_description,
        cate_image
    }) {

        const foundCategory = await categoryModel.findOne({ cate_name })
        if (foundCategory) {
            throw new ConflictRequestError("Category already exists")
        }
        // if (!cate_name) {
        //     throw new BadRequestError("Category name is required")
        // }
        const category = await categoryModel.create({
            cate_name,
            cate_description,
            cate_image
        })
        return category
    }

    static async updateCategory({ _id, cate_name, cate_description, cate_image }) {
        const foundCategory = await categoryModel.findOne({ _id })
        if (!foundCategory) {
            throw new BadRequestError("Category not found")
        }
        const category = await categoryModel.findOneAndUpdate({ _id }, {
            cate_name,
            cate_description,
            cate_image
        }, { new: true })
        return category
    }

    static async deleteCategory({ _id }) {
        const foundCategory = await categoryModel.findOne({ _id })
        if (!foundCategory) {
            throw new BadRequestError("Category not found")
        }
        const category = await categoryModel.findOneAndDelete({ _id })
        return category
    }
}

module.exports = CategoryServices