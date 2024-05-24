
const { TrainingTopicInsert, TrainingTopicGet, TrainingTopicUpdate, TrainingTypeWiseTopic, TrainingTopicByTypeGet } = require('./TrainingTopic.service');
const { logger } = require('../../logger/logger');
const { validationTrainingTopic } = require('../../validation/validation_schema');
module.exports = {

    TrainingTopicInsert: (req, res) => {
        const body = req.body;
        TrainingTopicInsert(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Training Topic Added Successfully",
                    insetId: results.insertId
                });
            }

        });
    },

    TrainingTypeWiseTopic: (req, res) => {
        const id = req.params.id;
        TrainingTypeWiseTopic(id, (err, results) => {
            const datas = results.map((val) => {
                const obj = {
                    topic_slno: val.topic_slno,
                    training_topic_name: val.training_topic_name,
                    training_name: val.training_name,
                    name_slno: val.name_slno,
                    type_slno: val.type_slno,
                    trainers: JSON.parse(val.trainers),
                    trainers_name: val.trainers_name

                }
                return obj
            })
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
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                success: 2,
                data: datas,
            });
        });
    },

    TrainingTopicUpdate: (req, res) => {
        const body = req.body;
        TrainingTopicUpdate(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated successfully"
                });
            }

        });
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
    },
    TrainingTopicByTypeGet: (req, res) => {
        const id = req.params.id;
        TrainingTopicByTypeGet(id, (err, results) => {
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
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results,
            });
        });
    },
}
