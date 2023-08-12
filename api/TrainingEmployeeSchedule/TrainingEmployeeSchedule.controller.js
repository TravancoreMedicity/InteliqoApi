
const { getTopicByNameId, getEmpNameById, TrainingEmployeeScheduleInsert } = require('./TrainingEmployeeSchedule.service');
const { logger } = require('../../logger/logger');
const { validateTrainingQuestions } = require('../../validation/validation_schema');
module.exports = {

    getTopicByNameId: (req, res) => {
        const id = req.params.id;
        getTopicByNameId(id, (err, results) => {
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
                success: 1,
                data: results,
            });
        });
    },

    getEmpNameById: (req, res) => {
        const id = req.params.id;
        getEmpNameById(id, (err, results) => {
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
                success: 1,
                data: results,
            });
        });
    },

    TrainingEmployeeScheduleInsert: (req, res) => {
        const body = req.body;
        TrainingEmployeeScheduleInsert(body, (err, result) => {
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
                    message: "Employee Training Scheduled Successfully"
                });
            }
        })
    }
}
