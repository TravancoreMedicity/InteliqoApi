const { createCarry, getCarry, updateCarry, getCarryById, checkInsertVal, checkUpdateVal, getData, getDataById, getSelect } = require('./carryforward.service');
const { validatecarryforward } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createCarry: (req, res) => {
        const body = req.body;
        const body_result = validatecarryforward.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.dept_sec = body_result.value.dept_sec;

        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                createCarry(body, (err, results) => {
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
                    success: 3,
                    message: "Carryforward Details Already Given"
                })
            }
        })
    },
    updateCarry: (req, res) => {

        const body = req.body;
        const body_result = validatecarryforward.validate(body);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                updateCarry(body, (err, results) => {

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    if (!results) {
                        logger.infoLogger("No Records Found")
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
                    message: "Carryforward Details Already Given"
                })
            }
        })
    },

    getCarry: (req, res) => {

        getCarry((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
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
    getCarryById: (req, res) => {

        const id = req.params.id;
        getCarryById(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infoLogger("No Records Found")
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
}