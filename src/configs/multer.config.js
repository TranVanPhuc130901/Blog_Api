'use strict'

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../configs/cloudinary.config');

const uploadMemory = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})


// Tạo Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Post', // Thư mục trên Cloudinary
        format: async(req, file) => 'jpg', // Định dạng tệp (có thể thay đổi tùy theo nhu cầu)
        public_id: (req, file) => Date.now().toString() + '-' + file.originalname, // Tên tệp duy nhất
    },
});

const uploadDisk = multer({
    storage: storage
})

// const uploadDisk = multer({
//     storage: multer.diskStorage({
//         destination: function(req, file, cb) {
//             cb(null, 'uploads')
//         },
//         filename: function(req, file, cb) {
//             cb(null, file.originalname)
//         }
//     })
// })

module.exports = { uploadMemory, uploadDisk }