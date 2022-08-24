const { createrights, selectrights, getAppraisalRightByID, update,
    employeeByDepartment, HodInchargeNames, employeeByID, HODInsert,
    selecthod, getAppraisalRightByHOD, updatehod, getUserRights, createPerformanceAppraisal } = require('../performanceappriasalrights/performanceappriasalrights.service');
const { validatePerformanceAppraisalRights } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createrights: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.dept_id, value.em_id, JSON.stringify(value.rights_needed)]
        })
        createrights(a1, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
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
                message: "Data Created Successfully"
            });

        });
    },
    selectrights: (req, res) => {

        selectrights((err, results) => {
            if (err) {
                logger.errorLogger(err)
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
    getAppraisalRightByID: (req, res) => {
        const id = req.params.id;
        getAppraisalRightByID(id, (err, results) => {
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
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    update: (req, res) => {

        const body = req.body;
        const result = update(body)
            .then((r) => {
                return res.status(200).json({
                    success: 1,
                    message: r
                });
            }).catch((e) => {
                return res.status(200).json({
                    success: 0,
                    message: e.sqlMessage
                });
            })
    },
    employeeByDepartment: (req, res) => {
        const id = req.params.id;
        employeeByDepartment(id, (err, results) => {
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
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    HodInchargeNames: (req, res) => {

        HodInchargeNames((err, results) => {
            if (err) {
                logger.errorLogger(err)
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
    employeeByID: (req, res) => {
        const id = req.params.id;
        employeeByID(id, (err, results) => {
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
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    HODInsert: (req, res) => {
        const body = req.body;
        HODInsert(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
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
                message: "Data Created Successfully"
            });

        });
    },
    selecthod: (req, res) => {
        selecthod((err, results) => {
            if (err) {
                logger.errorLogger(err)
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
    getAppraisalRightByHOD: (req, res) => {
        const id = req.params.id;
        getAppraisalRightByHOD(id, (err, results) => {
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
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    updatehod: (req, res) => {
        const body = req.body;
        updatehod(body, (err, results) => {

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
                message: "Data Updated Successfully"
            });

        });
    },
    getUserRights: (req, res) => {
        const id = req.params.id;
        getUserRights(id, (err, results) => {
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
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    createPerformanceAppraisal: (req, res) => {
        const body = req.body;
        createPerformanceAppraisal(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
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
                message: "Data Created Successfully"
            });

        });
    },
}