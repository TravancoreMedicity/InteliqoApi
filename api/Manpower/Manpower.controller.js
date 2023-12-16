const { getEmpByDeptAndSection, insertmanpowerplanning, getData, getname, getdesignation, updateannouncement, getapprovalhod, updateHodapproval, getapprove, getvacancy, checkInsertVal, updateHrapproval, getapproval, updateDataManpowerapproval, updatemanpowerplanning, insertmanpowerrequest } = require('../Manpower/Manpower.service');
const { ManpowerRequest } = require('../../validation/validation_schema')
const logger = require('../../logger/logger')
module.exports = {
    getDepartAndSectionEmpDetl: (req, res) => {
        const body = req.body
        getEmpByDeptAndSection(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    insertmanpowerplanning: (req, res) => {
        const body = req.body;
        var values = body.map((value, index) => {
            return [value.dept_id, value.sect_id, value.em_designation_number, value.MinCount, value.MaxCount, value.salaryfrom, value.salaryto]
        })
        insertmanpowerplanning(values, (err, results) => {
            if (err) {
                //logger.errorLogger(err)
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
                message: "Data Submitted Successfully"
            });
        });
    },
    getname: (req, res) => {
        const body = req.body
        getname(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getdesignation: (req, res) => {
        const body = req.body
        getdesignation(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                    data: []

                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    // update data

    updatemanpowerplanning: (req, res) => {
        const body = req.body;
        const result = updatemanpowerplanning(body)
            .then((r) => {
                return res.status(200).json({
                    success: 1,
                    message: 'Update Successfully'
                });
            }).catch((e) => {
                return res.status(200).json({
                    success: 0,
                    message: e.sqlMessage
                });
            })
    },

    getData: (req, res) => {
        const body = req.body
        getData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                    data: []

                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    insertmanpowerrequest: (req, res) => {
        const body = req.body;
        const body_result = ManpowerRequest.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                insertmanpowerrequest(body, (err, results) => {
                    if (err) {
                        //logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (!results) {
                        return res.status(200).json({
                            success: 0,
                            message: "error while inserting"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Submitted Successfully"
                    });
                });
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "ManPower Request Exit Against On Designation Already Exist "
                })
            }
        })
    },

    // for approval
    getapproval: (req, res) => {
        getapproval((err, results) => {
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
    getapprovalhod: (req, res) => {
        const body = req.body

        getapprovalhod(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                    data: []

                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    updateDataManpowerapproval: (req, res) => {
        const body = req.body;
        updateDataManpowerapproval(body, (err, results) => {
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
                message: "Data Submitted Successfully"
            });

        });
    },
    updateHodapproval: (req, res) => {
        const body = req.body;
        updateHodapproval(body, (err, results) => {
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
                message: "Data Submitted Successfully"
            });

        });
    },
    updateHrapproval: (req, res) => {
        const body = req.body;
        updateHrapproval(body, (err, results) => {
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
                message: "Data Submitted Successfully"
            });

        });
    },
    getapprove: (req, res) => {
        const body = req.body
        getapprove(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getvacancy: (req, res) => {
        const body = req.body
        getvacancy(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: res.err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    updateannouncement: (req, res) => {
        const body = req.body;
        updateannouncement(body, (err, results) => {
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
                message: "Data Submitted Successfully"
            });

        });
    },
}