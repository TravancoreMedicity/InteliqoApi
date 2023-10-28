
const { TrainingTopicInsert, TrainingTopicGet, TrainingTopicUpdate, checkInsertVal, checkUpdateVal } = require('./TrainingTopic.service');
const { logger } = require('../../logger/logger');
const { validationTrainingTopic } = require('../../validation/validation_schema');
module.exports = {

    TrainingTopicInsert: (req, res) => {
        const body = req.body;
        const body_result = validationTrainingTopic.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 0,
                message: body_result?.error?.details[0]?.message
            });
        }
        body.training_topic_name = body_result.value.training_topic_name;
        body.training_name = body_result.value.training_name;
        body.hours = body_result.value.hours;
        body.training_status = body_result.value.training_status;
        body.tutorial_status = body_result.value.tutorial_status;
        body.medical_status = body_result.value.medical_status;
        body.non_medical_status = body_result.value.non_medical_status;
        body.pretest_status = body_result.value.pretest_status;
        body.post_test_status = body_result.value.post_test_status;
        checkInsertVal(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {
                TrainingTopicInsert(body, (err, result) => {
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
                            message: "Training Topic Added Successfully"
                        });
                    }
                });
            }
            else {
                return res.status(200).json({
                    success: 10,
                    message: "Training Topic is already exist"
                });
            }
        });
    },
    TrainingTopicUpdate: (req, res) => {
        const body = req.body;
        const body_result = validationTrainingTopic.validate(body);
        if (body_result.error) {
            return res.status(200).JSON({
                success: 0,
                error: body_result?.details[0]?.error?.message
            });
        }
        body.training_topic_name = body_result.value.training_topic_name;
        body.training_name = body_result.value.training_name;
        body.hours = body_result.value.hours;
        body.training_status = body_result.value.training_status;
        body.tutorial_status = body_result.value.tutorial_status;
        body.medical_status = body_result.value.medical_status;
        body.non_medical_status = body_result.value.non_medical_status;
        body.pretest_status = body_result.value.pretest_status;
        body.post_test_status = body_result.value.post_test_status;

        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                TrainingTopicUpdate(body, (err, results) => {

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
                        message: "Training Topic Updated Successfully"
                    });

                });
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Training Topic Already Exist"
                })
            }
        })
    },

    TrainingTopicGet: (req, res) => {

        TrainingTopicGet((err, results) => {

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
