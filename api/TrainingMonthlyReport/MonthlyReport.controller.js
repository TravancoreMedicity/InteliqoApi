const { logger } = require('../../logger/logger');
const { GetTrainingList, GetscheduledDetails, GetMonthlyReportByMonth, GetDepartmentNames, getDeptTopicsByDepartId, GetDepartmentSecNames, GetDepartmentalTrainingTopics, GetDepartmentNamesById, GetDepartmentSecNamesById, getDeptTopicsById, getAllotedTrainingEmpReports, getTrainingCompletionEmpReports, getTrainingPendingEmpReports, getTrainingRetestEmpReports } = require('./MonthlyReport.service');
module.exports = {

    GetMonthlyReportByMonth: (req, res) => {
        const body = req.body;
        GetMonthlyReportByMonth(body, (err, results) => {
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
    GetTrainingList: (req, res) => {
        const body = req.body;
        GetTrainingList(body, (err, results) => {
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
    GetscheduledDetails: (req, res) => {
        const body = req.body;
        GetscheduledDetails(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    Status: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    Status: 0,
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                Status: 2,
                datas: results,
            });
        });
    },

    GetDepartmentNames: (req, res) => {
        GetDepartmentNames((err, results) => {
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

    GetDepartmentSecNames: (req, res) => {
        const body = req.body
        GetDepartmentSecNames(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    GetDepartmentalTrainingTopics: (req, res) => {
        const body = req.body
        GetDepartmentalTrainingTopics(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    //department by id
    GetDepartmentNamesById: (req, res) => {
        const body = req.body;
        GetDepartmentNamesById(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    GetDepartmentSecNamesById: (req, res) => {
        const body = req.body;
        GetDepartmentSecNamesById(body, (err, results) => {
            if (err) {
                // logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    getDeptTopicsById: (req, res) => {
        const body = req.body
        getDeptTopicsById(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getDeptTopicsByDepartId: (req, res) => {
        const id = req.params.id;
        getDeptTopicsByDepartId(id, (err, results) => {
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
    getAllotedTrainingEmpReports: (req, res) => {
        const body = req.body;
        getAllotedTrainingEmpReports(body, (err, results) => {
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
    getTrainingPendingEmpReports: (req, res) => {
        const body = req.body;
        getTrainingPendingEmpReports(body, (err, results) => {
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
    getTrainingRetestEmpReports: (req, res) => {
        const body = req.body;
        getTrainingRetestEmpReports(body, (err, results) => {
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

