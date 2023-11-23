
const { TrainingQuestionGetTopic, TrainingQuestionInsert, TrainingQuestionGet, TrainingQuestionUpdate, GetlastEntryDatas } = require('./TrainingQuestions.service')

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
        TrainingQuestionInsert(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Training Question Added Successfully",
                    insetId: results.insertId
                });
            }

        });
    },


    TrainingQuestionUpdate: (req, res) => {
        const body = req.body;
        TrainingQuestionUpdate(body, (err, results) => {
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
    },
    GetlastEntryDatas: (req, res) => {
        const body = req.body;
        GetlastEntryDatas(body, (err, results) => {
            if (err) {

                return res.status(200).json({
                    success: 0,
                    message: err
                });
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

        });
    },
}

