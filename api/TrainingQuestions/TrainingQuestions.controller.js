
const { TrainingQuestionGetTopic, checkInsertVal, TrainingQuestionInsert, TrainingQuestionGet, TrainingQuestionUpdate, checkUpdateVal } = require('./TrainingQuestions.service');
const { logger } = require('../../logger/logger');
const { validateTrainingQuestions } = require('../../validation/validation_schema');
module.exports = {
    TrainingQuestionGetTopic: (req, res) => {

        TrainingQuestionGetTopic((err, results) => {

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

    TrainingQuestionInsert: (req, res) => {
        const body = req.body;
        const body_result = validateTrainingQuestions.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 0,
                message: body_result?.error?.details[0]?.message
            });
        }
        body.questions = body_result.value.questions;
        body.answers = body_result.value.answers;
        body.training_topics = body_result.value.training_topics;
        body.marks = body_result.value.marks;
        checkInsertVal(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {
                TrainingQuestionInsert(body, (err, result) => {
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
                            message: "Training Question Added Successfully"
                        });
                    }
                });
            }
            else {
                return res.status(200).json({
                    success: 10,
                    message: "Training Question is already exist"
                });
            }
        });
    },
    TrainingQuestionUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateTrainingQuestions.validate(body);
        if (body_result.error) {
            return res.status(200).JSON({
                success: 0,
                error: body_result?.details[0]?.error?.message
            });
        }
        body.questions = body_result.value.questions;
        body.answers = body_result.value.answers;
        body.training_topics = body_result.value.training_topics;
        body.marks = body_result.value.marks;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                TrainingQuestionUpdate(body, (err, results) => {

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
                        message: "Training Question Master Updated Successfully"
                    });

                });
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Training Question Already Exist"
                })
            }
        })
    },

    TrainingQuestionGet: (req, res) => {

        TrainingQuestionGet((err, results) => {

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
    }
}
