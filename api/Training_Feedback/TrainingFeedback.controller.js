const { logger } = require('../../logger/logger');
const { InsertInductFeedback, checkFeedbackExistORNot, InsertInductFeedbackWithoutTest } = require('./TrainingFeedback.service');
module.exports = {

    InsertInductFeedback: (req, res) => {
        const body = req.body;
        checkFeedbackExistORNot(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {
                InsertInductFeedback(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 1,
                            message: "Thanks for your valuable feedback"
                        });
                    }
                });
            }
            else {
                return res.status(200).json({
                    success: 2,
                    message: "Feedback Already done"
                });
            }
        })
    },

    InsertInductFeedbackWithoutTest: (req, res) => {
        const body = req.body;
        InsertInductFeedbackWithoutTest(body, (err, results) => {
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
                });
            }

        });
    },
} 