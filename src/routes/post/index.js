'use strict'


const express = require('express');

const asyncHandler = require('../../helpers/asyncHandler');
const postController = require('../../controllers/post.controller');
const { uploadDisk } = require('../../configs/multer.config');
const router = express.Router();


router.get('/', asyncHandler(postController.getPosts));
router.post('/', asyncHandler(postController.createPost));


module.exports = router