const { ValidateTrainingType } = require('../../validation/validation_schema');
const { TrainingTypeInsert, TrainingTypeGet, TrainingTypeUpdate, TrainingTypeDelete, checkInsertVal, checkUpdateVal } = require('./TrainingType.service');
const { logger } = require('../../logger/logger');

module.exports = {

    TrainingTypeInsert: (req, res) => {
        const body = req.body;
        //validate Training Type Instert function
        const body_result = ValidateTrainingType.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result?.error?.details[0]?.message
            });
        }
        // compare
        body.type_name = body_result.value.type_name;
        body.type_status = body_result.value.type_status;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                TrainingTypeInsert(body, (err, results) => {
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
                            message: "Training Type Name Created"
                        });
                    }

                });
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Training Type Name Already Exist"
                })
            }
        })
    },
    //update
    TrainingTypeUpdate: (req, res) => {
        const body = req.body;
        const body_result = ValidateTrainingType.validate(body);
        if (body_result.error) {
            return res.status(200).JSON({
                success: 2,
                error: body_result?.error?.details[0]?.message
            });
        }
        body.type_name = body_result.value.type_name;
        body.type_status = body_result.value.type_status;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (object.keys(value).length === 0) {
                TrainingTypeUpdate(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).JSON({
                            success: 0,
                            message: err
                        });
                    }
                    if (!results) {
                        return res.status(200).JSON({
                            success: 1,
                            message: "No Record Found"
                        });
                    }
                    return res.status(200).JSON({
                        success: 2,
                        message: "Training Type Name Added Successfully"
                    });

                });
            }
            else {
                return res.status(200).JSON({
                    success: 10,
                    message: "Training Type Name Already Exist"
                })
            }
        })
    },

    TrainingTypeGet: (req, res) => {

        TrainingTypeGet((err, results) => {

            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Error"
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Record Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

    TrainingTypeUpdate: (req, res) => {
        const body = req.body;
        TrainingTypeUpdate(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Records Found"
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully"
            })
        })
    },
    TrainingTypeDelete: (req, res) => {
        const body = req.body;
        TrainingTypeDelete(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(400).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Data Deleted Successfully"
            })
        })

    }
}
