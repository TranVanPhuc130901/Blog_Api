'use strict'

const cloudinary = require('../configs/cloudinary.config');

const uploadImageFromUrl = async(url) => {
    const urlImage = '';
    const folderName = 'Posts',
        newFileName = '';
    const result = await cloudinary.uploader.upload(url, {
        public_id: newFileName,
        folder: folderName
    });
    return result.url;
}

const uploadImageFromLocal = async({
        PostImage,
        folderName = 'Posts',
    }) => {
        console.log(PostImage, folderName)
        const result = await cloudinary.uploader.upload(PostImage, {
            public_id: 'thumb',
            folder: folderName
        });
        return {
            image_url: result.secure_url,
            thumbnail_url: await cloudinary.url(result.public_id, {
                height: 300,
                width: 300,
                format: 'jpg'
            })
        };
    }
    //
const uploadImageFromLocalFiles = async({
    files,
    folderName = 'Posts',
}) => {
    if (!files.length) return;

    const uploadedUrls = [];

    for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: folderName
        });

        uploadedUrls.push({
            image_url: result.secure_url,
            thumbnail_url: await cloudinary.url(result.public_id, {
                height: 300,
                width: 300,
                format: 'jpg'
            })
        });
    }

    return uploadedUrls;
}
module.exports = {
    uploadImageFromUrl,
    uploadImageFromLocal,
    uploadImageFromLocalFiles
}