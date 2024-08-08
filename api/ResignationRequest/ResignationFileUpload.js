const multer = require('multer');
const path = require('path');

const storageResignation = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'D:/PersonalRecords/ResignationReq')
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
    const filetypes = /pdf|doc|docx|jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'].includes(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Only .png, .jpg, .jpeg, .pdf, .doc, and .docx files are allowed!');
    }
}


const uploadResignationReqFiles = multer({
    storage: storageResignation,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('file')


module.exports = {
    uploadResignationReqFiles
}