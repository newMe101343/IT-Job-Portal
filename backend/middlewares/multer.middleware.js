const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary.config');

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'applicant_uploads', // Folder in your Cloudinary account
        allowed_formats: ['jpg', 'png', 'jpeg'], // Specify allowed file formats
    },
});

const upload = multer({ storage });

module.exports = upload;
