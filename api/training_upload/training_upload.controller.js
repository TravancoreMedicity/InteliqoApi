const multer = require('multer');
const path = require('path');
const fs = require("fs")
const logger = require('../../logger/logger');
const { log } = require('winston');
const { updateUploadStatus } = require('./training_upload.service');


// for multiple file upload
const storagemul = multer.diskStorage({
    destination: (req, file, cb) => {

        const Topic_id = req.body.training;
        const filepath = path.join('D:/DocMeliora/Inteliqo/', "Training", `${Topic_id}`);
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }
        cb(null, filepath);
    },
});
const maxSize = 2 * 1024 * 1024

const uploadmul = multer({
    storage: storagemul,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "application/pdf" // Add PDF mimetype
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg, .jpeg, and .pdf format allowed!'));
        }
    },
    limits: { fileSize: maxSize }
}).array('files', 10);


module.exports = {

    uploadtrainingFiles: (req, res) => {
        uploadmul(req, res, async (err) => {
            const body = req.body;

            if (err instanceof multer.MulterError) {
                return res.status(200).json({
                    status: 0,
                    message: "Max file size 2MB allowed!",
                });
            } else if (err) {
                logger.errorLogger(err);
                return res.status(200).json({
                    status: 0,
                    message: err.message,
                });
            } else {
                try {
                    const Image_Id = body.imgId
                    const files = req.files;
                    const Topic_id = body.training
                    const insetId = body.img;

                    const Topic_folder = path.join('D:/DocMeliora/Inteliqo/', "Training", `${Topic_id}`, `${insetId}`);

                    // Create the em_id folder if it doesn't exist
                    if (!fs.existsSync(Topic_folder)) {
                        fs.mkdirSync(Topic_folder, { recursive: true });
                    }

                    for (let i = 0; i < files.length; i++) {
                        const id = files[i];
                        const Img_Id = Image_Id[i];
                        const extension = '.jpg';
                        const filename = `${Img_Id}${extension}`;
                        const destinationPath = path.join(Topic_folder, filename);
                        fs.renameSync(id.path, destinationPath);
                    }

                    const data = {
                        q_slno: insetId
                    }

                    // Insert the qsl_no into the database using the reusable function
                    updateUploadStatus(data, (err, results) => {
                        if (err) {
                            logger.errorLogger(err);
                            return res.status(200).json({
                                success: 0,
                                message: err,
                            });
                        }

                        return res.status(200).json({
                            success: 1,
                            message: "Data Successfully Inserted",
                        });
                    });
                } catch (error) {
                    logger.errorLogger(error);
                    return res.status(200).json({
                        success: 0,
                        message: "An error occurred during file upload.",
                    });
                }
            }
        });
    },

    // for getting the file
    selectUploads: (req, res) => {
        const { topic_slno, checklistid } = req.body;
        const folderPath = `D:/DocMeliora/Inteliqo/Training/${topic_slno}/${checklistid}`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                data: files
            });
        });

    }
}