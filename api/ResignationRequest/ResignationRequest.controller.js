// @ts-nocheck
const multer = require('multer');
// @ts-nocheck
const { InsertResignationRequest, getInchargePending, getResignationRequestByID,
    ResignationApprovalIncahrge, getHoDPending, getResignationRequestHOdByID,
    ResignationApprovalHOD, getHRPending, getResignationRequestHRByID,
    getCEOPending, getCEOPendingById, ResignationApprovalCEO, ResignationApprovalHR,
    getResignCancel, ResignationCancelHR, InsertResignationRequestContractClose,
    getHRPendingList, getContractClosed, getFullSettlementEmp, insertResigSalaryDetails,
    checkResignationEntryExcist, InActiveEmpHR, getUnauthorizedAbsentee,
    insertFromActiveEmp, getResignationRequestByEmpId, insertFinalSettlement } = require('../ResignationRequest/ResignationRequest.service');
const { validateResignationRequest, validateResignationRequestApprovalHOD, validateResignationRequestApprovalCEO, validateResignationRequestCancel,
    validateResignationRequestApprovalINcharge, validateResignationRequestApprovalHR } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');
const { uploadResignationReqFiles, uploadFinalSettlement, uploadmul } = require('./ResignationFileUpload');
const { empLoginDeactivate, deleteByID } = require('../hrm_emp_master/empmast.service');
const { uploadManualreqst } = require('../ManualRequest/Manual.controller');


module.exports = {
    InsertResignationRequest: (req, res) => {
        // console.log(req.file)
        uploadResignationReqFiles(req, res, (err) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            } else {

                const body = req.body;
                const file = req.file;
                const fileName = file?.filename;
                const fileType = file?.mimetype;
                const postData = JSON.parse(JSON.parse(JSON.stringify(body))?.postData);
                postData.fileName = fileName
                postData.fileType = fileType

                checkResignationEntryExcist(postData, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 0,
                            message: error
                        });
                    }
                    if (results.length > 0) {
                        return res.status(200).json({
                            success: 0,
                            message: "Resignation Already Submitted"
                        });
                    } else {
                        InsertResignationRequest(postData, (error, results) => {
                            if (error) {
                                return res.status(200).json({
                                    success: 0,
                                    message: error
                                });
                            }
                            return res.status(200).json({
                                success: 1,
                                message: "Resignation Submitted SuccessFully"
                            })
                        })
                    }
                })

            }
        })

    },
    getInchargePending: (req, res) => {
        const body = req.body;
        getInchargePending(body, (err, results) => {
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
    getResignationRequestByID: (req, res) => {
        const id = req.params.id;
        getResignationRequestByID(id, (err, results) => {
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
    ResignationApprovalIncahrge: (req, res) => {
        const body = req.body;
        const body_result = validateResignationRequestApprovalINcharge.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        ResignationApprovalIncahrge(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Updated SuccessFully"
            })
        })
    },
    getHoDPending: (req, res) => {
        const body = req.body;
        getHoDPending(body, (err, results) => {
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
    getResignationRequestHOdByID: (req, res) => {
        const id = req.params.id;
        getResignationRequestHOdByID(id, (err, results) => {
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
    ResignationApprovalHOD: (req, res) => {
        const body = req.body;
        const body_result = validateResignationRequestApprovalHOD.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        ResignationApprovalHOD(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Updated SuccessFully"
            })
        })
    },
    getHRPending: (req, res) => {
        const body = req.body;
        getHRPending(body, (err, results) => {
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
    getResignationRequestHRByID: (req, res) => {
        const id = req.params.id;
        getResignationRequestHRByID(id, (err, results) => {
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
    getCEOPending: (req, res) => {
        getCEOPending((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    getCEOPendingById: (req, res) => {
        const id = req.params.id;
        getCEOPendingById(id, (err, results) => {
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
    ResignationApprovalCEO: (req, res) => {
        const body = req.body;
        const body_result = validateResignationRequestApprovalCEO.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        ResignationApprovalCEO(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Updated SuccessFully"
            })
        })
    },
    ResignationApprovalHR: (req, res) => {
        const body = req.body;
        const body_result = validateResignationRequestApprovalHR.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        ResignationApprovalHR(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Updated SuccessFully"
            })
        })
    },
    getResignCancel: (req, res) => {
        getResignCancel((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    ResignationCancelHR: (req, res) => {
        const body = req.body;
        const body_result = validateResignationRequestCancel.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        ResignationCancelHR(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Updated SuccessFully"
            })
        })
    },
    InsertResignationRequestContractClose: (req, res) => {
        const body = req.body;
        const body_result = validateResignationRequestApprovalHR.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        InsertResignationRequestContractClose(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Created SuccessFully"
            })
        })
    },
    getHRPendingList: (req, res) => {
        getHRPendingList((err, results) => {
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
    getContractClosed: (req, res) => {
        getContractClosed((err, results) => {
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
    getFullSettlementEmp: (req, res) => {
        getFullSettlementEmp((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    insertResigSalaryDetails: (req, res) => {
        const body = req.body;
        insertResigSalaryDetails(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Details Submitted SuccessFully"
            })
        })
    },
    InActiveEmpHR: (req, res) => {
        const body = req.body;
        InActiveEmpHR(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            } else {
                if (body.unauthorized_absent_status === 1) {
                    return res.status(200).json({
                        success: 2,
                        message: "Data Updated Successfully"
                    });
                } else {
                    empLoginDeactivate(body, (err, results) => {

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
                }
            }
        });
    },
    getUnauthorizedAbsentee: (req, res) => {
        getUnauthorizedAbsentee((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
    InactiveEmploee: (req, res) => {
        const body = req.body;
        deleteByID(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }

            if (!results) {
                return res.status(400).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Record Deleted Successfully"
            });
        });
    },
    insertFromActiveEmp: (req, res) => {
        const body = req.body;

        checkResignationEntryExcist(body, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: error
                });
            }
            if (results.length > 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Resignation Already Submitted"
                });
            } else {
                insertFromActiveEmp(body, (error, results) => {
                    if (error) {
                        return res.status(200).json({
                            success: 0,
                            message: error
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Resignation Submitted SuccessFully"
                    })
                })
            }
        })
    },
    getResignationRequestByEmpId: (req, res) => {
        const id = req.params.id;
        getResignationRequestByEmpId(id, (err, results) => {
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
    insertFinalSettlement: (req, res) => {
        const body = req.body;


        uploadmul(req, res, (err) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            } else {

                const body = req.body;
                const file = req.file;
                const fileName = file?.filename;
                const fileType = file?.mimetype;
                const postData = JSON.parse(JSON.parse(JSON.stringify(body))?.postData);

                console.log(postData);


                postData.fileName = fileName
                postData.fileType = fileType

                console.log("save");
                insertFinalSettlement(postData, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    if (results.length === 0) {
                        return res.status(200).json({
                            success: 0,
                            message: "No Record Found"
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        data: results,
                        message: "Insert Data Successfully!"
                    });
                })

            }
        })




    },
}
