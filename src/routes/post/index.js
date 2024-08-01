'use strict'


const express = require('express');

const asyncHandler = require('../../helpers/asyncHandler');
const postController = require('../../controllers/post.controller');
const { uploadDisk } = require('../../configs/multer.config');
const router = express.Router();


router.get('/', asyncHandler(postController.getPosts));

router.get('/:idPost', asyncHandler(postController.getPostById));

router.get('/postByCategory/:idCategory', asyncHandler(postController.getPostByCategoryId));

router.post('/', asyncHandler(postController.createPost));

router.put('/', asyncHandler(postController.updatePost));

router.delete('/', asyncHandler(postController.deletePost));


module.exports = router