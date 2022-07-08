const { create, update, createdetl, checkInsertVal, checkUpdateVal, updatefineslno, getFineByID,
    getFineBySlno, getFineByIDStatus, deletefinedetl } = require('../hrm_emp_fine/fine.service');
const { validatefinededuction } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createfine: (req, res) => {
        const body = req.body;
        const body_result = validatefinededuction.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.fine_type = body_result.value.fine_type;
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
                        updatefineslno(body, (err, results) => {
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
                                })
                            }
                        })
                    }

                });
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Fine Type Already Exist"
                })
            }
        })
    },
    updatefine: (req, res) => {

        const body = req.body;
        const body_result = validatefinededuction.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.fine_type = body_result.value.fine_type;
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
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Fine Type  Already Exist"
                })
            }
        })
    },
    getFineByID: (req, res) => {

        const id = req.params.id;
        getFineByID(id, (err, results) => {
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
    getFineBySlno: (req, res) => {

        const id = req.params.id;
        getFineBySlno(id, (err, results) => {
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

    getFineByIDStatus: (req, res) => {
        const body = req.body;
        getFineByIDStatus(body, (err, results) => {
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
    detailedtableinsert: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.fine_slno, value.fine_emp_no, value.fine_emp_id, value.fine_amount, value.fine_date,
            value.create_user]
        })

        createdetl(a1, (err, results) => {
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
    deletefinedetl: (req, res) => {
        const id = req.params.id;
        deletefinedetl(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Record Deleted Successfully"
            });
        });
    },
}