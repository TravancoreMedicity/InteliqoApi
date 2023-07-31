const { create, update, checkInsertVal, checkUpdateVal, deleteByID, getDataById,
    getDataBySlno, createWageLog, updateWageLog, GetFixedAndEarningWage,
    getDataByEmpno, createEmpsalRyContractRenew, getFixedWage,
    getEarning, getDeduction, getEmpDataByEmno, getALLData, updateEmpGrossSalary,
    newRecommended, getTotalGrosssalaryById } = require('../employeEarnDeduction/earnDeduction.service');
const { validateearndeduction } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createearndeduction: (req, res) => {
        const body = req.body;
        const body_result = validateearndeduction.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.em_salary_desc = body_result.value.em_salary_desc;

        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                // Insert the values
                create(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        createWageLog(body, (err, results) => {
                            if (err) {
                                logger.errorLogger(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            else {
                                return res.status(200).json({
                                    success: 1,
                                    message: "Data Created Successfully"
                                });
                            }
                        })
                    }
                });
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Salary Description Already Exist"
                })
            }
        })
    },
    updateearndeduction: (req, res) => {

        const body = req.body;
        const body_result = validateearndeduction.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.em_salary_desc = body_result.value.em_salary_desc;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                update(body, (err, results) => {

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else if (!results) {
                        return res.status(200).json({
                            success: 1,
                            message: "Record Not Found"
                        });
                    }
                    else {
                        updateWageLog(body, (err, results) => {
                            if (err) {
                                logger.errorLogger(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            else {
                                return res.status(200).json({
                                    success: 2,
                                    message: "Data Updated Successfully"
                                });
                            }

                        });
                    }

                })
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Salary Description Already Exist"
                })
            }
        })
    },
    getEarnDeductByID: (req, res) => {

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
    inactiveEarnDeduct: (req, res) => {

        const body = req.body;

        deleteByID(body, (err, results) => {
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
    getEarnDeductBySlno: (req, res) => {

        const id = req.params.id;
        getDataBySlno(id, (err, results) => {
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
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    GetFixedAndEarningWage: (req, res) => {
        const body = req.body;
        GetFixedAndEarningWage(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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

    getDataByEmpno: (req, res) => {

        const id = req.params.id;
        getDataByEmpno(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
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
    createEmpsalRyContractRenew: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.em_no, value.em_id, value.em_salary_desc,
            value.em_earning_type, value.em_amount, value.em_start_date,
            value.em_end_date, value.create_user]
        })

        createEmpsalRyContractRenew(a1, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success1: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success1: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success1: 1,
                message: "Data Created Successfully"
            });
        });
    },
    getFixedWage: (req, res) => {
        const body = req.body;
        getFixedWage(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getEarning: (req, res) => {
        const body = req.body;
        getEarning(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getDeduction: (req, res) => {
        const body = req.body;
        getDeduction(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getEmpDataByEmno: (req, res) => {
        const id = req.params.id;
        getEmpDataByEmno(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
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
    getALLData: (req, res) => {
        const body = req.body;
        getALLData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    updateEmpGrossSalary: (req, res) => {
        const body = req.body;
        updateEmpGrossSalary(body, (err, results) => {
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
                message: "Data Added Successfully"
            });
        });
    },

    newRecommended: (req, res) => {
        newRecommended((err, results) => {
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
    getTotalGrosssalaryById: (req, res) => {
        const id = req.params.id;
        getTotalGrosssalaryById(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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