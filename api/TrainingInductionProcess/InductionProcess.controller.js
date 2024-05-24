const { logger } = require('../../logger/logger')
const { GetTodaysInductions, GetAttendanceList, UpdateQuestionCount, GetInductionCompletedList, GetPendingEmpList, checkTopicExistORNot, InsertScheduleTable, UpdateTrainingDate, GetbelowAvgEmp, InsertRetestEmps, UpdateReTestDate, GetInductCalenderDetails, UpdateTrainingOnly } = require('./InductionProcess.service')
module.exports = {
    GetTodaysInductions: (req, res) => {
        GetTodaysInductions((err, results) => {
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


    GetAttendanceList: (req, res) => {
        const id = req.params.id;
        GetAttendanceList(id, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
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

    UpdateQuestionCount: (req, res) => {
        const body = req.body;
        const result = UpdateQuestionCount(body)
            .then((r) => {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }).catch((e) => {
                return res.status(200).json({
                    success: 1,
                    message: "Inserted successfully"
                });
            })
    },
    UpdateTrainingOnly: (req, res) => {
        const body = req.body;
        const result = UpdateTrainingOnly(body)
            .then((r) => {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }).catch((e) => {
                return res.status(200).json({
                    success: 1,
                    message: "Inserted successfully"
                });
            })
    },

    GetInductionCompletedList: (req, res) => {
        GetInductionCompletedList((err, results) => {
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

    GetPendingEmpList: (req, res) => {
        GetPendingEmpList((err, results) => {
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


    UpdateTrainingDate: (req, res) => {
        const body = req.body;
        checkTopicExistORNot(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {
                InsertScheduleTable(body, (err, results) => {

                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
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
                                    message: "Updated successfully",
                                });
                            }
                        });

                    }
                });
            }
            else {
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

            }
        })
    },
    GetbelowAvgEmp: (req, res) => {
        GetbelowAvgEmp((err, results) => {
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
    InsertRetestEmps: (req, res) => {
        const body = req.body;
        InsertRetestEmps(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                UpdateReTestDate(body, (err, results) => {
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
            }
        });
    },
    GetInductCalenderDetails: (req, res) => {
        GetInductCalenderDetails((err, results) => {
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
}