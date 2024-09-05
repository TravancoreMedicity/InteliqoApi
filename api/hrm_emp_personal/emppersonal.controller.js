const { create, update, getDataById, getDataBySlno, checkpersonaldata,
    createFamilyDetails, getDetailsbyId, deleteRow, checkLangabyEmp,
    updateLanguage, createLanguagesKnown, getLangaugesByEmpno, checkAccountExist
} = require('../hrm_emp_personal/emppersonal.service');
const { validateeemployeepersonal } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createEmpPers: (req, res) => {

        const body = req.body;
        const body_result = validateeemployeepersonal.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        checkAccountExist(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                checkpersonaldata(body, (err, results) => {
                    const value = JSON.parse(JSON.stringify(results))
                    if (Object.keys(value).length === 0) {
                        create(body, (err, results) => {
                            if (err) {
                                logger.errorLogger(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            return res.status(200).json({
                                success: 1,
                                message: "Data Created Successfully"
                            });
                        });
                    } else {
                        update(body, (err, results) => {
                            if (err) {
                                logger.errorLogger(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }

                            if (!results) {
                                return res.status(200).json({
                                    success: 2,
                                    message: "Record Not Found"
                                });
                            }

                            return res.status(200).json({
                                success: 1,
                                message: "Data Updated Successfully"
                            });
                        });
                    }
                })
            } else {
                return res.status(200).json({
                    success: 2,
                    message: "Account Number Already Exist!"
                });
            }
        })
    },
    updateEmpPers: (req, res) => {

        const body = req.body;
        const body_result = validateeemployeepersonal.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 0,
                message: body_result.error.details[0].message
            });
        }

        update(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Data Updated Successfully"
            });

        });
    },
    getEmpPersonalByID: (req, res) => {

        const id = req.params.id;
        getDataById(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },
    getEmpPersonalBySlno: (req, res) => {

        const id = req.params.id;
        getDataBySlno(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },
    createFamilyDetails: (req, res) => {
        const body = req.body;
        createFamilyDetails(body, (err, results) => {
            if (err) {
                //logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
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
                message: "Data Created Successfully"
            });

        });
    },
    getDetailsbyId: (req, res) => {
        const id = req.params.id;
        getDetailsbyId(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    deleteRow: (req, res) => {
        const id = req.params.id;
        deleteRow(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }

            if (!results) {
                return res.status(400).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Record Deleted Successfully"
            });
        });
    },
    createLanguageKnwon: (req, res) => {
        const body = req.body;
        checkLangabyEmp(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                createLanguagesKnown(body, (err, results) => {
                    if (err) {
                        //logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
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
                        message: "Data Created Successfully"
                    });

                });
            } else {
                updateLanguage(body, (err, results) => {

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    if (!results) {
                        return res.status(200).json({
                            success: 0,
                            message: "Record Not Found"
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Data Updated Successfully"
                    });

                });
            }
        })
    },
    getLangaugesByEmpno: (req, res) => {
        const id = req.params.id;
        getLangaugesByEmpno(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },
}