const { logger } = require('../../logger/logger')
const { GetTrainingProcess, AttendanceMarking, EmpVerification, GetDepartmentalTrainings, UpdatePretestStatus,
    InsertpostTest, UpdatePosttestStatus, GetTopicAssignToEmp, GetQuestionDetails, UpdateQuestionCount,
    GetDataBasedOnCount, InsertPretest, UpdateTrainingDate, GetTrainingCompletedList, GetTodaysTrainingList,
    GetAttendanceList, GetTrainingEmpDetailsAll, GetTrainingEmp, checkTopicExistORNot, InsertScheduleTable, AllotToPostTest,
    GetpreTestEmpListAll, GetpostTestEmpListAll, checkPreeTestEntryExistORNot, checkPostTestEntryExistORNot, UpdateOnlineMode, UpdateOfflineMode } = require('./TrainingProcess.service')
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
        const body = req.body;
        GetQuestionDetails(body, (err, results) => {
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
        checkPreeTestEntryExistORNot(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {
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
            }
            else {
                return res.status(200).json({
                    success: 2,
                    message: "You Already Attend the Test"
                });
            }
        })
    },
    InsertpostTest: (req, res) => {
        const body = req.body;
        checkPostTestEntryExistORNot(body, (err, result) => {
            const value = JSON.parse(JSON.stringify(result))
            if (Object.keys(value).length === 0) {
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
                                    message: "Post-Test over Successfully"
                                });
                            }
                        });
                    }
                });
            }
            else {
                return res.status(200).json({
                    success: 2,
                    message: "You Already Attend the Test"
                });
            }
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
                                    message: "Updated successfully"
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

    EmpVerification: (req, res) => {
        const body = req.body;
        EmpVerification(body, (err, results) => {
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
                    message: "Employee Verified Successfully"
                });
            }
        });
    },
    ////New
    GetTrainingCompletedList: (req, res) => {
        const id = req.params.id;
        GetTrainingCompletedList(id, (err, results) => {
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
    GetTodaysTrainingList: (req, res) => {
        const id = req.params.id;
        GetTodaysTrainingList(id, (err, results) => {
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


    GetTrainingEmpDetailsAll: (req, res) => {
        const id = req.params.id;
        GetTrainingEmpDetailsAll(id, (err, results) => {
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
    GetTrainingEmp: (req, res) => {
        const id = req.params.id;
        GetTrainingEmp(id, (err, results) => {
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
    AllotToPostTest: (req, res) => {
        AllotToPostTest((err, results) => {
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
    GetpreTestEmpListAll: (req, res) => {
        GetpreTestEmpListAll((err, results) => {
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
    GetpostTestEmpListAll: (req, res) => {
        GetpostTestEmpListAll((err, results) => {
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

    UpdateOnlineMode: (req, res) => {
        const body = req.body;
        UpdateOnlineMode(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Online status updated successfully"
                });
            }

        })
    },

    UpdateOfflineMode: (req, res) => {
        const body = req.body;
        UpdateOfflineMode(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Offline status updated successfully"
                });
            }

        })
    },

}