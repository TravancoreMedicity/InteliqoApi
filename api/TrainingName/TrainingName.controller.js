
const { TrainingNameInsert, TrainingNameGet, TrainingNameUpdate, TrainingNameDelete, checkInsertVal, checkUpdateVal, TrainingNameDetailsGet } = require('./TrainingName.Service');
const { logger } = require('../../logger/logger');
const { validateTrainingName } = require('../../validation/validation_schema');
module.exports = {

    TrainingNameInsert: (req, res) => {
        const body = req.body;
        const body_result = validateTrainingName.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 0,
                message: body_result?.error?.details[0]?.message
            });
        }
        body.training_name = body_result.value.training_name;
        checkInsertVal(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {
                TrainingNameInsert(body, (err, result) => {
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
                            message: "Training Name Added Successfully"
                        });
                    }
                })
            }
            else {
                return res.status(200).json({
                    success: 10,
                    message: "Training Name is already exist"
                })
            }
        })
    },
    TrainingNameUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateTrainingName.validate(body);
        if (body_result.error) {
            return res.status(200).JSON({
                success: 0,
                error: body_result?.details[0]?.error?.message
            });
        }
        body.training_name = body_result.value.training_name;

        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                TrainingNameUpdate(body, (err, results) => {

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
                        message: "Training Name Updated Successfully"
                    });

                });
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Training Name Already Exist"
                })
            }
        })
    },

    TrainingNameGet: (req, res) => {

        TrainingNameGet((err, results) => {

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

    TrainingNameDelete: (req, res) => {
        const body = req.body;
        TrainingNameDelete(body, (err, results) => {
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
    },

}
