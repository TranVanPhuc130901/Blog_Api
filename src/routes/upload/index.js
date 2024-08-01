'use strict'


const express = require('express');

const asyncHandler = require('../../helpers/asyncHandler');
const uploadController = require('../../controllers/upload.controller');
const { uploadDisk } = require('../../configs/multer.config');
const router = express.Router();



router.post('/post', asyncHandler(uploadController.uploadImageFromUrl));

router.post('/post/thumb', uploadDisk.single('PostImage'), asyncHandler(uploadController.uploadImageFromLocal));
router.post('/post/mutiple', uploadDisk.array('PostImage', 7), asyncHandler(uploadController.uploadImageFromLocalFiles));


router.post('/category', asyncHandler(uploadController.uploadImageFromUrl));

router.post('/category/thumb', uploadDisk.single('CategoryImage'), asyncHandler(uploadController.uploadImageFromLocal));

module.exports = router