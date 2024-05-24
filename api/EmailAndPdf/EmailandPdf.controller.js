const nodemailer = require('nodemailer');
const { insertofferletter, insertrejectemp, insertrejectstatus, insertSelectstatus, insertem_noUpdate } = require('../EmailAndPdf/EmailandPdf.service');
const logger = require('../../logger/logger');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
module.exports = {
    insertofferletter: async (req, res) => {

        // Use multer middleware to handle the file upload
        upload.single('pdf')(req, res, async (err) => {
            if (err) {
                console.error('Error handling file upload:', err);
                return res.status(500).json({ success: 0, error: 'Internal Server Error' });
            }

            const body = req.body;
            const pdfData = req.file ? req.file.buffer.toString('base64') : null;
            const { email } = req.body;
            insertofferletter(body, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: err
                    });
                }
                if (!results) {
                    return res.status(500).json({
                        success: 0,
                        message: "No Results Found"
                    });
                }

                // Send email
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'amalhero1@gmail.com',
                        pass: 'asgl rzvt rcfp keip'
                    }
                });

                const mailOptions = {
                    to: email,
                    subject: 'Offer Letter from Travancore Medicity',
                    text: 'Please Read the Following Attachment,',
                    attachments: [
                        {
                            filename: 'offer_letter.pdf',
                            content: pdfData,
                            encoding: 'base64',
                        },
                    ],
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return res.status(500).json({ message: 'Failed to send email.' });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: 'Data Submitted Successfully and Please Check the Email!'
                    });
                });
            });
        });

    },

    insertrejectemp: (req, res) => {
        const body = req.body
        insertrejectemp(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                    data1: []

                });
            }

            return res.status(200).json({
                success: 1,
                data1: results
            });
        })
    },

    insertrejectstatus: (req, res) => {
        const body = req.body
        insertrejectstatus(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                    data1: []

                });
            }

            return res.status(200).json({
                success: 1,
                data1: results
            });
        })
    },
    insertSelectstatus: (req, res) => {
        const body = req.body
        insertSelectstatus(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                    data1: []

                });
            }

            return res.status(200).json({
                success: 1,
                data1: results
            });
        })
    },
    insertem_noUpdate: (req, res) => {
        const body = req.body
        insertem_noUpdate(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                    data1: []

                });
            }

            return res.status(200).json({
                success: 1,
                data1: results,
                message: "Successfully Inserted",
            });
        })
    },
};




