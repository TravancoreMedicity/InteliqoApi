const { logger } = require('../../logger/logger');
const { GetDatewiseEmps, ScheduleInductionTrainings, InsertInductionEmps } = require('./TrainingInduction.service');
module.exports = {

    GetDatewiseEmps: (req, res) => {
        const body = req.body;
        GetDatewiseEmps(body, (err, results) => {
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

    ScheduleInductionTrainings: (req, res) => {
        const body = req.body;
        ScheduleInductionTrainings(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Successfully Inserted",
                    insertId: results.insertId
                });
            }

        });
    },

    InsertInductionEmps: (req, res) => {
        const body = req.body;
        var values = body.map((value, index) => {
            return [value.schedule_Slno, value.em_id, value.dept_id, value.sect_id, value.type, value.topic, value.scheduledDate,
            value.create_user]
        })
        InsertInductionEmps(values, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Successfully Inserted"
                });
            }

        });
    },
} 