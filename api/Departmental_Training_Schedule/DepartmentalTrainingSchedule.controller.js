const { DepartmentalTrainingScheduleInsert, DepartmentalTrainingScheduleGet, DepartmentalTrainingScheduleUpdate, getTopicByTNameID } = require('./DepartmentalTrainingSchedule.service');
const { logger } = require('../../logger/logger');

module.exports = {

    DepartmentalTrainingScheduleInsert: (req, res) => {
        const body = req.body;
        DepartmentalTrainingScheduleInsert(body, (err, result) => {
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
                    message: "Departmental Training Scheduled Successfully"
                });
            }
        })
    },

    DepartmentalTrainingScheduleGet: (req, res) => {

        DepartmentalTrainingScheduleGet((err, results) => {

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

    DepartmentalTrainingScheduleUpdate: (req, res) => {
        const body = req.body;
        DepartmentalTrainingScheduleUpdate(body, (err, results) => {
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
    getTopicByTNameID: (req, res) => {
        const id = req.params.id;
        getTopicByTNameID(id, (err, results) => {
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

}
