const { TrainingNameGet, TrainingScheduleInsert, TrainingScheduleGet, TrainingScheduleUpdate, GetDeptWiseTrainings } = require('./TrainingSchedule.service');

module.exports = {
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

    TrainingScheduleInsert: (req, res) => {
        const body = req.body;
        TrainingScheduleInsert(body, (err, result) => {
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
                    message: "Training Schedule Added Successfully"
                });
            }
        })
    },

    TrainingScheduleGet: (req, res) => {
        TrainingScheduleGet((err, results) => {
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
    TrainingScheduleUpdate: (req, res) => {
        const body = req.body;
        TrainingScheduleUpdate(body, (err, results) => {
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
                message: "Training Schedule Updated Successfully"
            });
        });
    },
    GetDeptWiseTrainings: (req, res) => {
        const id = req.params.id;
        GetDeptWiseTrainings(id, (err, results) => {
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
