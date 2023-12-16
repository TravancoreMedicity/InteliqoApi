const { insertapplicationform, updateapplicationslno, vacancyList, getname, getvacancy, getapplication, insertcallletter, getempdetails, insertshortlistapprove, getstatus, getstatusdata } = require('../Applicationform/applicationform.service');
const nodemailer = require('nodemailer');
const { Application_form } = require('../../validation/validation_schema')
const logger = require('../../logger/logger')
module.exports = {
    insertapplicationform: (req, res) => {
        const body = req.body;
        const { email, applicationSlno } = req.body;
        const body_result = Application_form.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        // Insert application form data
        insertapplicationform(body, (err, results) => {

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
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'amalhero1@gmail.com',    //this is sender email id
                    pass: 'asgl rzvt rcfp keip'     //if 2 factor authentication is on there is a password in the authentication that password is needed
                }
            });

            let mailOptions = {
                // from: 'amalambro1234@gmail.com',
                to: email,
                subject: 'Application details from Travancore Medicity',
                text: `Application Submitted Sucessfully .Your Registration No is : ${applicationSlno}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ message: 'Failed to send email.' });
                }
                // Update application serial number
                updateapplicationslno(body, (err, results) => {
                    if (err) {

                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Submitted Successfully and Please Check the Email!"
                    });
                });
            });
        });
    },
    vacancyList: (req, res) => {
        const body = req.body
        vacancyList(body, (err, results) => {
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
                    data: []

                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getname: (req, res) => {
        const body = req.body
        getname(body, (err, results) => {
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
                    data: []

                });
            }

            return res.status(200).json({
                success: 1,
                data1: results
            });
        })
    },
    getvacancy: (req, res) => {
        getvacancy((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getapplication: (req, res) => {
        getapplication((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data1: results
            });
        });
    },
    getempdetails: (req, res) => {
        const body = req.body
        // const { applicationno } = body

        getempdetails(body, (err, results) => {
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
                    data: []

                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    insertshortlistapprove: (req, res) => {
        const body = req.body
        // const { applicationno } = body

        insertshortlistapprove(body, (err, results) => {
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
                    data: []

                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    getstatus: (req, res) => {
        const body = req.body
        // const { applicationno } = body

        getstatus(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success1: 0,
                    message: res.err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success1: 2,
                    message: "Record Not Found",
                    data1: []

                });
            }

            return res.status(200).json({
                success1: 1,
                data1: results
            });
        })
    },
    getstatusdata: (req, res) => {
        const body = req.body
        // const { applicationno } = body

        getstatusdata(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success1: 0,
                    message: res.err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success1: 2,
                    message: "Record Not Found",
                    data1: []

                });
            }

            return res.status(200).json({
                success1: 1,
                data1: results
            });
        })
    },


    insertcallletter: (req, res) => {
        const body = req.body;
        insertcallletter(body)
            .then((r) => {
                // Extract emails
                const emails = body.map(value => value.email);

                // Send emails
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'amalhero1@gmail.com',
                        pass: 'asgl rzvt rcfp keip'
                    }
                });

                emails.forEach(email => {
                    let mailOptions = {
                        // Configure your mail options here
                        to: email,
                        subject: 'Application details from Travancore Medicity',
                        text: `You are selected For the First round interview ,Further details are attached to this email 
                                Place:
                                Time:
                                Date:  `
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error(error);
                        }
                    });
                });

                return res.status(200).json({
                    success: 1,
                    message: "Data Submitted Successfully"
                });
            }).catch((e) => {
                return res.status(500).json({
                    success: 0,
                    message: e.sqlMessage || 'Failed to process request.'
                });
            });
    }
};
