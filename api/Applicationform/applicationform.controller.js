const { insertapplicationform, updateapplicationslno, vacancyList, getname, getvacancy, insertMsinterview, getselectionedu, insertJoining, getJoinpdfdata,
    getapplication, insertHodinterview, insertInchargeinterview, insertcallletter, insertinterview, getselectionStatus, getselectdesgstatus, insertJoinstatus,
    getquestion, getempdetails, insertshortlistapprove, getstatus, getstatusdata, insertDmsinterview, insertCeointerview, getempselect, getpdfdata, insertAppmtstatus,
    insertOperationinterview, insertHrinterview, getinitialstatus, getlogindata, getloginselect, insertselection, updateselection,
    insertappointmentdata, insertAppmtcancelstatus, insertjoincancelstatus, insertInterviewLevel } = require('../Applicationform/applicationform.service');
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

    getselectionedu: (req, res) => {
        const body = req.body

        getselectionedu(body, (err, results) => {
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
    getempselect: (req, res) => {
        getempselect((err, results) => {
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
    getlogindata: (req, res) => {
        const body = req.body
        // const { applicationno } = body

        getlogindata(body, (err, results) => {
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
    getloginselect: (req, res) => {
        const body = req.body
        // const { applicationno } = body

        getloginselect(body, (err, results) => {
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
    getselectionStatus: (req, res) => {
        const body = req.body
        // const { applicationno } = body

        getselectionStatus(body, (err, results) => {
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
    getselectdesgstatus: (req, res) => {
        const body = req.body
        getselectdesgstatus(body, (err, results) => {
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
    getinitialstatus: (req, res) => {
        const body = req.body


        getinitialstatus(body, (err, results) => {
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
    getstatusdata: (req, res) => {
        const body = req.body
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
    getquestion: (req, res) => {
        const id = req.params.desigid;
        getquestion(id, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    questionsuccess: 0,
                    message: res.err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    questionsuccess: 2,
                    message: "Record Not Found",
                    questiondata: []
                });
            }
            return res.status(200).json({
                questionsuccess: 1,
                questiondata: results
            });
        })
    },
    insertinterview: (req, res) => {
        const body = req.body
        insertinterview(body, (err, results) => {
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
    insertInchargeinterview: (req, res) => {
        const body = req.body
        insertInchargeinterview(body, (err, results) => {
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
    insertHodinterview: (req, res) => {
        const body = req.body
        insertHodinterview(body, (err, results) => {
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
    insertMsinterview: (req, res) => {
        const body = req.body
        insertMsinterview(body, (err, results) => {
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
    insertDmsinterview: (req, res) => {
        const body = req.body
        insertDmsinterview(body, (err, results) => {
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
    insertOperationinterview: (req, res) => {
        const body = req.body
        insertOperationinterview(body, (err, results) => {
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
    insertCeointerview: (req, res) => {
        const body = req.body
        insertCeointerview(body, (err, results) => {
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
    insertselection: (req, res) => {
        const body = req.body
        insertselection(body, (err, results) => {
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
    updateselection: (req, res) => {
        const body = req.body
        updateselection(body, (err, results) => {
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
    insertHrinterview: (req, res) => {
        const body = req.body
        insertHrinterview(body, (err, results) => {
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
    insertappointmentdata: (req, res) => {
        const body = req.body
        insertappointmentdata(body, (err, results) => {
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
                data: results,
            });
        })
    },
    getpdfdata: (req, res) => {
        const body = req.body
        getpdfdata(body, (err, results) => {
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
                pdfdata: results
            });
        })
    },
    insertJoining: (req, res) => {
        const body = req.body
        insertJoining(body, (err, results) => {
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
                data: results,
            });
        })
    },
    getJoinpdfdata: (req, res) => {
        const body = req.body
        getJoinpdfdata(body, (err, results) => {
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
    insertAppmtstatus: (req, res) => {
        const body = req.body
        insertAppmtstatus(body, (err, results) => {
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
    insertJoinstatus: (req, res) => {
        const body = req.body
        insertJoinstatus(body, (err, results) => {
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
    insertAppmtcancelstatus: (req, res) => {
        const body = req.body
        insertAppmtcancelstatus(body, (err, results) => {
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
    insertjoincancelstatus: (req, res) => {
        const body = req.body
        insertjoincancelstatus(body, (err, results) => {
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
    insertInterviewLevel: (req, res) => {
        const body = req.body
        insertInterviewLevel(body, (err, results) => {
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
                data: results,
                message: "Data Inserted Sucessfully",
            });
        })
    },
    insertcallletter: (req, res) => {
        const body = req.body;
        insertcallletter(body)
            .then((r) => {
                // Extract emails
                const emails = body.map(value => value.email);
                const date = body.map(value => value.date);
                const time = body.map(value => value.time);
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
                                Place:Travancore Medical College
                                Time: ${date}
                                Date:  ${time} `
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return res.status(500).json({ message: 'Failed to send email.' });
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
    },


};
