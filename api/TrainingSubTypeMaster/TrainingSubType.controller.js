const { validateTrainingSubType } = require('../../validation/validation_schema');
const { TrainingSubTypeInsert, checkInsertVal, TrainingSubTypeGet, TrainingSubTypeUpdate, checkUpdateVal, TrainingSubTypeDelete } = require('./TrainingSubType.service');
const { logger } = require('../../logger/logger')

module.exports = {

    TrainingSubTypeInsert: (req, res) => {
        const body = req.body;
        const body_result = validateTrainingSubType.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 0,
                message: body_result?.error?.details[0]?.message
            });
        }
        body.training_type_no = body_result.value.training_type_no;
        body.subtype_name = body_result.value.subtype_name;
        checkInsertVal(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {
                TrainingSubTypeInsert(body, (err, result) => {
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
                            message: "Training SubType Added Successfully"
                        });
                    }
                })
            }
            else {
                return res.status(200).json({
                    success: 10,
                    message: "This SubType is already exist"
                })
            }
        })
    },

    TrainingSubTypeGet: (req, res) => {

        TrainingSubTypeGet((err, results) => {

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

    TrainingSubTypeUpdate: (req, res) => {
        const body = req.body;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                TrainingSubTypeUpdate(body, (err, results) => {
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
                        message: "SubType Updated Successfully"
                    });

                });
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Entered Training Subtype already exist"
                })
            }
        })
    },

    TrainingSubTypeDelete: (req, res) => {
        const body = req.body;
        TrainingSubTypeDelete(body, (err, results) => {
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
