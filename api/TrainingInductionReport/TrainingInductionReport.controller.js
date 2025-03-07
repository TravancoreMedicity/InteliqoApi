const { logger } = require('../../logger/logger');
const { GetInductCalenderReport, GetInductionCompletedList, GetinductPendingList, GetinductReTestList, GetInductionPendingList, GetInductionPassedEmpList, GetInductionFailedEmpList, GetinductionGeneralList, GetTrainerTrainingInductDatas, GetTrainerTrainingDeptDatas, GetInductTrainingTopicWise, GetInductionDeptWiseTrainings, GetInductionAllStaffReports, GetScheduledDeptTrainingList, getTrainingCompletionEmpReports, getDeptPendingEmpReports, GetDeptStaffExamPassedReport, GetDeptStaffExamFailledReport, GetYearWiseDepartmentalTrainingList } = require('./TrainingInduction.service');
module.exports = {

    GetInductCalenderReport: (req, res) => {
        const body = req.body;
        GetInductCalenderReport(body, (err, results) => {
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
    // GetInductionCompletedList: (req, res) => {
    //     const body = req.body;
    //     GetInductionCompletedList(body, (err, results) => {
    //         if (err) {
    //             // logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         if (results.length == 0) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "no Record Found"
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results,
    //         });
    //     });
    // },

    GetInductionCompletedList: (req, res) => {
        const body = req.body;
        GetInductionCompletedList(body, (err, results) => {
            const datas = results?.map((val) => {
                const obj = {
                    serialno: val.serialno,
                    indct_emp_no: val.indct_emp_no,
                    induct_emp_dept: val.induct_emp_dept,
                    induct_detail_date: val.induct_detail_date,
                    em_no: val.em_no,
                    em_name: val.em_name,
                    dept_name: val.dept_name,
                    schedule_topic: val.schedule_topic,
                    pretest_status: val.pretest_status,
                    posttest_status: val.posttest_status,
                    training_topic_name: val.training_topic_name,
                    subtype_no: JSON.parse(val.subtype_no),
                }
                return obj
            })
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
                data: datas
            })
        })
    },

    GetInductionPendingList: (req, res) => {
        const body = req.body;
        GetInductionPendingList(body, (err, results) => {
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
    GetInductionPassedEmpList: (req, res) => {
        const body = req.body;
        GetInductionPassedEmpList(body, (err, results) => {
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
    GetInductionFailedEmpList: (req, res) => {
        const body = req.body;
        GetInductionFailedEmpList(body, (err, results) => {
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
    GetinductionGeneralList: (req, res) => {
        const body = req.body;
        GetinductionGeneralList(body, (err, results) => {
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

    GetinductPendingList: (req, res) => {
        const body = req.body;
        GetinductPendingList(body, (err, results) => {
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

    GetinductReTestList: (req, res) => {
        const body = req.body;
        GetinductReTestList(body, (err, results) => {
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
    GetTrainerTrainingInductDatas: (req, res) => {
        const id = req.params.id;
        GetTrainerTrainingInductDatas(id, (err, results) => {
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
    GetTrainerTrainingDeptDatas: (req, res) => {
        const id = req.params.id;
        GetTrainerTrainingDeptDatas(id, (err, results) => {
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
    GetInductTrainingTopicWise: (req, res) => {
        const body = req.body;
        GetInductTrainingTopicWise(body, (err, results) => {
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
    GetInductionDeptWiseTrainings: (req, res) => {
        const body = req.body;
        GetInductionDeptWiseTrainings(body, (err, results) => {
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
    GetInductionAllStaffReports: (req, res) => {
        const body = req.body;
        GetInductionAllStaffReports(body, (err, results) => {
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
    GetScheduledDeptTrainingList: (req, res) => {
        const body = req.body;
        GetScheduledDeptTrainingList(body, (err, results) => {
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
    getTrainingCompletionEmpReports: (req, res) => {
        const body = req.body;
        getTrainingCompletionEmpReports(body, (err, results) => {
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
    getDeptPendingEmpReports: (req, res) => {
        const body = req.body;
        getDeptPendingEmpReports(body, (err, results) => {
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

    GetDeptStaffExamPassedReport: (req, res) => {
        const body = req.body;
        GetDeptStaffExamPassedReport(body, (err, results) => {
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
    GetDeptStaffExamFailledReport: (req, res) => {
        const body = req.body;
        GetDeptStaffExamFailledReport(body, (err, results) => {
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
    GetYearWiseDepartmentalTrainingList: (req, res) => {
        const body = req.body;
        GetYearWiseDepartmentalTrainingList(body, (err, results) => {
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
}

