const { create, update, checkInsertVal, checkUpdateVal, deleteByID, getData, getDataById, getSelect } = require('../specialization/special.service');
const { validatespecialization } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createSecial: (req, res) => {
        const body = req.body;
        const body_result = validatespecialization.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.spec_desc = body_result.value.spec_desc;

        checkInsertVal(body, (err, results) => {
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
                return res.status(200).json({
                    success: 7,
                    message: "Specialization Already Exist"
                })
            }
        })
    },
    updateSpecial: (req, res) => {

        const body = req.body;
        const body_result = validatespecialization.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        body.spec_desc = body_result.value.spec_desc;

        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length !== 0) {
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
                    message: "Specialization Already Exist"
                })
            }
        })
    },
    inactiveSpecial: (req, res) => {

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
    getSpecial: (req, res) => {

        getData((err, results) => {
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
    getSpecialByID: (req, res) => {

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
    getSelectSpecial: (req, res) => {

        getSelect((err, results) => {
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
}