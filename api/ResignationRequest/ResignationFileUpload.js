const multer = require('multer');

const storageResignation = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'D:/PersonalRecords/ResignationReq')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


const uploadResignationReqFiles = multer({
    storage: storageResignation
}).single('file')


module.exports = {
    uploadResignationReqFiles
}