
const { getTopicByNameId, getEmpNameById, TrainingEmployeeScheduleInsert, TrainingEmployeeScheduleGet, TrainingEmployeeScheduleUpdate } = require('./TrainingEmployeeSchedule.service');
const { logger } = require('../../logger/logger');
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
    },
    TrainingEmployeeScheduleGet: (req, res) => {

        TrainingEmployeeScheduleGet((err, results) => {

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
    TrainingEmployeeScheduleUpdate: (req, res) => {
        const body = req.body;
        TrainingEmployeeScheduleUpdate(body, (err, results) => {
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
    }
}
