const { createJobSummary, CheckInsertValue, createJobDuties, getjobId,
    createJobSpecification, createJobQualification, createJobGeneric,
    getJobSummary, getJobDuties, getJobSpecification, getJobGeneric, getJobQualification,
    createJobCompetency, getJobSummarydetl, updatejobsummarydetl, getjobcompetency,
    getjobDescView, updateDutiesEach, checkalreadyinsert, deleteduties, updateCompeteEach,
    deletecompetency, deletePerformance, updatePerforEach, deleteQualifi, updateGeneric, getKPIScore } = require('../JobSummary/JobSummary.service');
// const { validatereligion } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    createJobSummary: (req, res) => {
        const body = req.body;
        CheckInsertValue(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                createJobSummary(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Data Created Successfully"
                    });

                });
            }
            else {
                return res.status(200).json({
                    success: 7,
                    message: "Job Description Already Added"
                })
            }
        })
    },
    CheckInsertValue: (req, res) => {
        const body = req.body
        CheckInsertValue(body, (err, results) => {
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
        });

    },
    createJobDuties: (req, res) => {
        const body = req.body;
        // var a1 = body.map((value, index) => {
        //     return [value.jobdescid, value.dept_id, value.designation, value.dutiesandres, value.duties_id]
        // })
        // checkalreadyinsert(a1, (err, results) => {
        //     const value = JSON.parse(JSON.stringify(results))
        //     if (Object.keys(value).length === 0) {
        createJobDuties(body, (err, results) => {
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
                message: "Data Created Successfully"
            });
        });
    },
    createJobSpecification: (req, res) => {
        const body = req.body;
        // var a1 = body.map((value, index) => {
        //     return [value.job_id, value.kra, value.kpi, value.kpi_score,
        //     value.dept_id, value.designation, value.kpi_id]
        // })
        createJobSpecification(body, (err, results) => {
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
                message: "Data Created Successfully"
            });
        });
    },
    createJobQualification: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.job_id, value.course, value.specialization, value.dept_id, value.designation, value.qualification_id, value.sect_id]
        })
        createJobQualification(a1, (err, results) => {
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
                message: "Data Created Successfully"
            });
        });
    },
    getjobId: (req, res) => {
        getjobId((err, results) => {
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
        });

    },
    createJobGeneric: (req, res) => {
        const body = req.body;
        createJobGeneric(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Data Created Successfully"
            });

        });
    },
    getJobSummary: (req, res) => {
        const body = req.body
        getJobSummary(body, (err, results) => {
            console.log(results);
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
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },
    getJobDuties: (req, res) => {
        const body = req.body
        getJobDuties(body, (err, results) => {
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
        });

    },
    getJobSpecification: (req, res) => {
        const body = req.body
        getJobSpecification(body, (err, results) => {
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
        });

    },
    getJobGeneric: (req, res) => {
        const body = req.body
        getJobGeneric(body, (err, results) => {
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
        });

    },
    getJobQualification: (req, res) => {
        const body = req.body
        getJobQualification(body, (err, results) => {
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
        });

    },
    createJobCompetency: (req, res) => {
        const body = req.body;
        // var a1 = body.map((value, index) => {
        //     return [value.job_id, value.key_result_area, value.competency_desc, value.dept_id, value.designation, value.competency_id]
        // })
        createJobCompetency(body, (err, results) => {
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
                message: "Data Created Successfully"
            });
        });
    },
    getJobSummarydetl: (req, res) => {
        const id = req.params.id;
        getJobSummarydetl(id, (err, results) => {
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
    updatejobsummarydetl: (req, res) => {
        const body = req.body;
        updatejobsummarydetl(body, (err, results) => {

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
    getjobcompetency: (req, res) => {
        const body = req.body
        getjobcompetency(body, (err, results) => {
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
        });

    },
    getjobDescView: (req, res) => {
        getjobDescView((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateDutiesEach: (req, res) => {
        const body = req.body;
        updateDutiesEach(body, (err, results) => {
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
    deleteduties: (req, res) => {
        const id = req.params.id;
        deleteduties(id, (err, results) => {
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
                success: 5,
                message: "Data Delete Successfully"
            });
        });
    },
    updateCompeteEach: (req, res) => {
        const body = req.body;
        updateCompeteEach(body, (err, results) => {
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
                success: 4,
                message: "Data Updated Successfully"
            });

        });
    },
    deletecompetency: (req, res) => {
        const id = req.params.id;
        deletecompetency(id, (err, results) => {
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
                success: 5,
                message: "Data Delete Successfully"
            });
        });
    },
    deletePerformance: (req, res) => {
        const id = req.params.id;
        deletePerformance(id, (err, results) => {
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
                success: 5,
                message: "Data Delete Successfully"
            });
        });
    },
    updatePerforEach: (req, res) => {
        const body = req.body;
        updatePerforEach(body, (err, results) => {
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
                success: 4,
                message: "Data Updated Successfully"
            });

        });
    },
    deleteQualifi: (req, res) => {
        const id = req.params.id;
        deleteQualifi(id, (err, results) => {
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
                success: 5,
                message: "Data Delete Successfully"
            });
        });
    },
    updateGeneric: (req, res) => {
        const body = req.body;
        updateGeneric(body, (err, results) => {

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
    getKPIScore: (req, res) => {
        const body = req.body
        console.log(body);
        getKPIScore(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    succ: 0,
                    msg: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    succ: 0,
                    msg: "No Record Found"
                });
            }

            return res.status(200).json({
                succ: 1,
                datas: results
            });
        });

    },
}