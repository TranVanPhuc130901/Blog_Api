'use strict'


const express = require('express');

const asyncHandler = require('../../helpers/asyncHandler');
const router = express.Router();
const categoryController = require('../../controllers/category.controller');

// Api Lấy tất cả danh mục
router.get('/', asyncHandler(categoryController.getCategories));
// Api Lấy tất cả danh mục
router.get('/:idCategory', asyncHandler(categoryController.getCategoryById));
// Api Thêm 1 danh mục
router.post('/', asyncHandler(categoryController.createCategory));
// Api Sửa 1 danh mục
router.put('/', asyncHandler(categoryController.updateCategory));
// Api Xóa 1 danh mục
router.delete('/', asyncHandler(categoryController.deleteCategory));


module.exports = router