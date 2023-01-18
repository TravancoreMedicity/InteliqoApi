const {
    getProbationEndList,
    getAnnualList,
    getTrainingList,
    getContractEndList,
    getLevel2Hierarchy,
    getLevel1Hierarchy,
    getIdOnly,
    createAppraisal,
    getInchargeAppraisalList,
    getHODAppraisalList,
    getCEODepartments,
    getContractRenewList,
    create,
    checkIdExist,
    updatePerformanceAppraisal,
    getDataAll,
    getHodData,
    getInchargeData,
    getExistDetails,
    createCompetencyAssessment,
    getTrainingNeed,
    createPerformanceAssessment,
    getCeoData,
    getPerfAssById,
    createPerformanceScore,
    inchargeCareerAdvancement,
    careerEmpIdExist,
    hodCareerAdvancement,
    updateHodCareer,
    ceoCareerAdvancement,
    updateCeoCareer,
    createExistDetl,
    updatePerformanceAssessment,
    getCompetencyAll,
    updateComptencyAssessment,
    updateEmpStatus,
    getHRAPpraisalList,
    completedAppraisal,
    pendigAppraisal,
    updateLastAppraisalDate,
    trainingPending,
    probationPending,
    permanentPending,
    empCareerAdvancement,
    updateInchargeStatus,
    empIdExistCareerAdvance,
    updateEmployeeStatus,
    contractPending,
    updateCeoStatus,
    updateInchargeRemark,
    updateHodStatus,
    getScoreDtails,
    updateScoreDetl,
    getEmployeeStatus
} = require('../PerformanceAppraisal/PerformanceAppraisal.service')

module.exports = {
    getProbationEndList: (req, res) => {
        getProbationEndList((err, results) => {
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
        });
    },
    getAnnualList: (req, res) => {
        getAnnualList((err, results) => {
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
        });
    },
    getTrainingList: (req, res) => {
        getTrainingList((err, results) => {
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
        });
    },
    getContractEndList: (req, res) => {
        getContractEndList((err, results) => {
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
        });
    },
    getLevel2Hierarchy: (req, res) => {
        const id = req.params.id;
        getLevel2Hierarchy(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(400).json({
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
    getLevel1Hierarchy: (req, res) => {
        const id = req.params.id;
        getLevel1Hierarchy(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(400).json({
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
    getIdOnly: (req, res) => {
        getIdOnly((err, results) => {
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
        });
    },
    createAppraisal: (req, res) => {
        const body = req.body;
        createAppraisal(body, (err, results) => {
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
                message: "Data Created Successfully"
            });

        });
    },
    getInchargeAppraisalList: (req, res) => {
        const body = req.body
        getInchargeAppraisalList(body, (err, results) => {
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
    getHODAppraisalList: (req, res) => {
        const body = req.body
        getHODAppraisalList(body, (err, results) => {
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
    getCEODepartments: (req, res) => {
        getCEODepartments((err, results) => {
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
        });
    },
    getContractRenewList: (req, res) => {
        getContractRenewList((err, results) => {
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
        });
    },

    //new appraisal entry

    createPerformanceAppraisal: (req, res) => {
        const body = req.body;
        // var a1 = body.map((value, index) => {
        //     return [value.em_id,
        //     value.em_no,
        //     value.dept_id,
        //     value.sect_id,
        //     value.incharge_id,
        //     value.hod_id,
        //     value.ceo_id,
        //     value.appraisal_status,
        //     value.last_appraisal_date]
        // })
        create(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                updateLastAppraisalDate(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
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
                        message: "Data Created Successfully"
                    });

                });

            }
        })
    },






    // createPerformanceAppraisal: (req, res) => {
    //     const body = req.body;
    //     create(body, (err, results) => {
    //         if (err) {
    //             //logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         if (!results) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "No Results Found"
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             message: "Data Created Successfully"
    //         });
    //     });
    // },

    checkIdExist: (req, res) => {
        const body = req.body;
        checkIdExist(body, (err, results) => {

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
                data: results,
                message: "Data Updated Successfully"
            });

        });
    },

    // updatePerformanceAppraisal: (req, res) => {
    //     const body = req.body;
    //     updatePerformanceAppraisal(body, (err, results) => {

    //         if (err) {
    //             logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }

    //         if (!results) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 message: "Record Not Found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 2,
    //             message: "Data Updated Successfully"
    //         });

    //     });
    // },

    getDataAll: (req, res) => {
        getDataAll((err, results) => {
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
        });
    },

    getHodData: (req, res) => {
        const id = req.params.id;
        getHodData(id, (err, results) => {
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
    getInchargeData: (req, res) => {
        const id = req.params.id;
        getInchargeData(id, (err, results) => {
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
        });
    },
    getExistDetails: (req, res) => {
        const id = req.params.id;
        getExistDetails(id, (err, results) => {
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
    createCompetencyAssessment: (req, res) => {
        const body = req.body;
        var values = body.map((value, index) => {
            return [value.key_result_area, value.kra_desc, value.competency_slno, value.competency_desc, value.emid]
        })
        createCompetencyAssessment(values, (err, results) => {
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
    getCompetencyAll: (req, res) => {
        const id = req.params.id;
        getCompetencyAll(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err,
                    data: results
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found",
                    data: results
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateComptencyAssessment: (req, res) => {
        const body = req.body;
        updateComptencyAssessment(body, (err, results) => {
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
    getTrainingNeed: (req, res) => {
        const id = req.params.id;
        getTrainingNeed(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
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
    createPerformanceAssessment: (req, res) => {
        const body = req.body;
        var values = body.map((value, index) => {
            return [value.key_result_area, value.kra_desc, value.specification_slno, value.kpi, value.emid]
        })

        createPerformanceAssessment(values, (err, results) => {
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
    getPerfAssById: (req, res) => {
        const id = req.params.id;
        getPerfAssById(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err,
                    data: results
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found",
                    data: results
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updatePerformanceAssessment: (req, res) => {
        const body = req.body;
        const result = updatePerformanceAssessment(body)
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
    getCeoData: (req, res) => {
        getCeoData((err, results) => {
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
        });
    },

    createPerformanceScore: (req, res) => {
        const body = req.body;
        createPerformanceScore(body, (err, results) => {
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
                message: "Data Saved Succeddfully"
            });
        });
    },
    inchargeCareerAdvancement: (req, res) => {
        const body = req.body;
        inchargeCareerAdvancement(body, (err, results) => {
            if (err) {
                //logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                updateInchargeStatus(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
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
                        message: "Data Created Successfully"
                    });

                });
            }
        });
    },
    updateInchargeRemark: (req, res) => {
        const body = req.body;
        updateInchargeRemark(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            else {
                updateInchargeStatus(body, (err, results) => {
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
                            message: "Record Not Found"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Submitted Successfully"
                    });

                });
            }
        });
    },
    careerEmpIdExist: (req, res) => {
        const id = req.params.id;
        careerEmpIdExist(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found",
                    data: results
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    hodCareerAdvancement: (req, res) => {
        const body = req.body;
        hodCareerAdvancement(body, (err, results) => {
            if (err) {
                //logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                updateHodStatus(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
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
                        message: "Data Created Successfully"
                    });

                });
            }
        });
    },
    updateHodCareer: (req, res) => {
        const body = req.body;
        updateHodCareer(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                updateHodStatus(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
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
                        message: "Data Created Successfully"
                    });

                });
            }

        });
    },
    ceoCareerAdvancement: (req, res) => {
        const body = req.body;
        ceoCareerAdvancement(body, (err, results) => {
            if (err) {
                //logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                updateCeoStatus(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
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
                        message: "Data Created Successfully"
                    });

                });
            }
        });
    },
    updateCeoCareer: (req, res) => {
        const body = req.body;
        updateCeoCareer(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                updateCeoStatus(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
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
                        message: "Data Created Successfully"
                    });

                });
            }

        });
    },
    createExistDetl: (req, res) => {
        const body = req.body;
        createExistDetl(body, (err, results) => {
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
                message: "Data Created Successfully"
            });
        });
    },
    updateEmpStatus: (req, res) => {
        const body = req.body;
        updateEmpStatus(body, (err, results) => {
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
    getHRAPpraisalList: (req, res) => {
        getHRAPpraisalList((err, results) => {
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
        });
    },
    completedAppraisal: (req, res) => {
        completedAppraisal((err, results) => {
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
        });
    },
    pendigAppraisal: (req, res) => {
        pendigAppraisal((err, results) => {
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
        });
    },
    trainingPending: (req, res) => {
        trainingPending((err, results) => {
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
        });
    },
    probationPending: (req, res) => {
        probationPending((err, results) => {
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
        });
    },
    permanentPending: (req, res) => {
        permanentPending((err, results) => {
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
        });
    },
    contractPending: (req, res) => {
        contractPending((err, results) => {
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
        });
    },
    empCareerAdvancement: (req, res) => {
        const body = req.body;
        empCareerAdvancement(body, (err, results) => {
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
                message: "Data Submitted Succeddfully"
            });
        });
    },
    empIdExistCareerAdvance: (req, res) => {
        const id = req.params.id;
        empIdExistCareerAdvance(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found",
                    data: results
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateEmployeeStatus: (req, res) => {
        const body = req.body;
        updateEmployeeStatus(body, (err, results) => {
            if (err) {
                //logger.errorLogger(err)
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
    getScoreDtails: (req, res) => {
        const id = req.params.id;
        getScoreDtails(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found",
                    data: results
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateScoreDetl: (req, res) => {
        const body = req.body;
        updateScoreDetl(body, (err, results) => {
            if (err) {
                //logger.errorLogger(err)
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
    getEmployeeStatus: (req, res) => {
        const id = req.params.id;
        getEmployeeStatus(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found",
                    data: results
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
}