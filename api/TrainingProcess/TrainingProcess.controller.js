const { logger } = require('../../logger/logger')
const { GetTrainingProcess, AttendanceMarking, GetDepartmentalTrainings, UpdatePretestStatus, InsertpostTest, UpdatePosttestStatus, GetTopicAssignToEmp, GetQuestionDetails, UpdateQuestionCount, GetDataBasedOnCount, InsertPretest, UpdateTrainingDate } = require('./TrainingProcess.service')
module.exports = {
    GetTrainingProcess: (req, res) => {
        GetTrainingProcess((err, results) => {
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
    AttendanceMarking: (req, res) => {
        const body = req.body;
        AttendanceMarking(body, (err, results) => {
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
            else {
                return res.status(200).json({
                    success: 2,
                    message: "Attendance Marked Successfully"
                });
            }
        });
    },
    GetDepartmentalTrainings: (req, res) => {
        GetDepartmentalTrainings((err, results) => {
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

    GetTopicAssignToEmp: (req, res) => {
        const id = req.params.id;
        GetTopicAssignToEmp(id, (err, results) => {
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
    GetQuestionDetails: (req, res) => {
        const id = req.params.id;
        GetQuestionDetails(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    UpdateQuestionCount: (req, res) => {
        const body = req.body;
        UpdateQuestionCount(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Inserted successfully"
                });
            }
        });
    },
    GetDataBasedOnCount: (req, res) => {
        const body = req.body;
        GetDataBasedOnCount(body, (err, results) => {
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
    InsertPretest: (req, res) => {
        const body = req.body;
        InsertPretest(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            else {
                UpdatePretestStatus(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 1,
                            message: "PreTest over Successfully"
                        });
                    }
                });
            }
        });
    },
    InsertpostTest: (req, res) => {
        const body = req.body;
        InsertpostTest(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                UpdatePosttestStatus(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 1,
                            message: "PostTest over Successfully"
                        });
                    }
                });
            }
        });
    },

    UpdateTrainingDate: (req, res) => {
        const body = req.body;
        UpdateTrainingDate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Updated successfully"
                });
            }
        });
    },

}