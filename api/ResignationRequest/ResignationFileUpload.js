const multer = require('multer');
const path = require('path');
const fs = require("fs")

const storageResignation = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'D:/DocMeliora/Inteliqo/ResignationReq')
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const newFileName = `Resignation_request_${Date.now()}${extension}`;
        cb(null, newFileName)
    }
})

const maxSize = 2 * 1024 * 1024

// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /pdf|jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Only .png, .jpg, .jpeg and .pdf files are allowed!');
    }
}


const uploadResignationReqFiles = multer({
    storage: storageResignation,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('file')

const storagemul = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'D:/DocMeliora/Inteliqo/FinalSettlement')
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const newFileName = `Final_settlement_${Date.now()}${extension}`;
        cb(null, newFileName)
    }
});


const uploadmul = multer({
    storage: storagemul,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('file')

const storageRetirement = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'D:/DocMeliora/Inteliqo/Retirement')
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const newFileName = `Retirement_${Date.now()}${extension}`;
        cb(null, newFileName)
    }
});


const uploadRetirmentFiles = multer({
    storage: storageRetirement,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('file')

module.exports = {
    uploadResignationReqFiles,
    uploadmul,
    uploadRetirmentFiles
}