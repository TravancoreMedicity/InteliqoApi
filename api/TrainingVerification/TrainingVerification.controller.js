const { logger } = require('../../logger/logger')
const { GetInductList, GetInductAllData, UpdateVerification, GetDeptTrainingEmpList, UpdateDeptVerification, GetDeptTrainings, GetDeptPreMark, GetDeptPostMark } = require('./TrainingVerification.service')
module.exports = {
    GetInductList: (req, res) => {
        GetInductList((err, results) => {
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
    GetInductAllData: (req, res) => {
        const id = req.params.id;
        GetInductAllData(id, (err, results) => {
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

    UpdateVerification: (req, res) => {
        const body = req.body;
        const result = UpdateVerification(body)
            .then((r) => {
                return res.status(200).json({
                    success: 1,
                    message: "Verified Successfully"
                });
            }).catch((e) => {
                return res.status(200).json({
                    success: 0,
                    message: "Error"
                });
            })
    },
    GetDeptTrainings: (req, res) => {
        GetDeptTrainings((err, results) => {
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

    GetTrainingEmpList: (req, res) => {
        GetTrainingEmpList((err, results) => {
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

    // GetDeptTrainingEmpList: (req, res) => {
    //     GetDeptTrainingEmpList((err, results) => {
    //         if (err) {
    //             return res.status(400).json({
    //                 success: 0,
    //                 message: "Error"
    //             })
    //         }
    //         if (results === 0) {
    //             return res.status(400).json({
    //                 success: 1,
    //                 message: "No Record Found"
    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             data: results
    //         })
    //     })
    // },

    GetDeptTrainingEmpList: (req, res) => {
        const body = req.body;
        GetDeptTrainingEmpList(body, (err, results) => {
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

    GetDeptPreMark: (req, res) => {
        const body = req.body;
        GetDeptPreMark(body, (err, results) => {
            if (err) {
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

    GetDeptPostMark: (req, res) => {
        const body = req.body;
        GetDeptPostMark(body, (err, results) => {
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
    // UpdateDeptVerification: (req, res) => {
    //     const body = req.body;
    //     UpdateDeptVerification(body, (err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         else {
    //             return res.status(200).json({
    //                 success: 1,
    //                 message: "Verified Successfully"
    //             });
    //         }
    //     });
    // },
    UpdateDeptVerification: (req, res) => {
        const body = req.body;
        const result = UpdateDeptVerification(body)
            .then((r) => {
                return res.status(200).json({
                    success: 1,
                    message: "Verified Successfully"
                });
            }).catch((e) => {
                return res.status(200).json({
                    success: 0,
                    message: "Error"
                });
            })
    },
}