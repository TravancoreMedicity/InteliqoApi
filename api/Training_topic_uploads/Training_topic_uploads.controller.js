const multer = require('multer');
const path = require('path');
const fs = require("fs")
const logger = require('../../logger/logger');
const { log } = require('winston');
const { updateUploadStatus } = require('./Training_topic_uploads.service');


// for multiple file upload
const storagemul = multer.diskStorage({
    destination: (req, file, cb) => {
        const insetId = req.body.insertID;
        const filepath = path.join('D:/DocMeliora/Inteliqo/', "TrainingTopicUploads", `${insetId}`);
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
                    const files = req.files;
                    const insetId = body.insertID;
                    const Upload_folder = path.join(`D:/DocMeliora/Inteliqo/`, "TrainingTopicUploads", `${insetId}`);

                    // Create the em_id folder if it doesn't exist
                    if (!fs.existsSync(Upload_folder)) {
                        fs.mkdirSync(Upload_folder, { recursive: true });
                    }

                    for (const file of files) {
                        // Process each file individually
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        const extension = path.extname(file.originalname);
                        const filename = 'TopicUploads' + uniqueSuffix + extension;

                        // Move the file to the destination folder
                        const destinationPath = path.join(Upload_folder, filename);
                        fs.renameSync(file.path, destinationPath);
                    }

                    const data = {
                        topic_slno: insetId
                    }

                    // Insert the topic_slno into the database using the reusable function
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
        const { topic_slno } = req.body;
        const folderPath = `D:/DocMeliora/Inteliqo/TrainingTopicUploads/${topic_slno}`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                // logger.errorLogger(err)
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