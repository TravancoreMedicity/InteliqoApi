// @ts-nocheck
const multer = require('multer');
// @ts-nocheck
const { InsertResignationRequest, getInchargePending, getResignationRequestByID,
    ResignationApprovalIncahrge, getHoDPending, getResignationRequestHOdByID,
    ResignationApprovalHOD, getHRPending, getResignationRequestHRByID,
    getCEOPending, getCEOPendingById, ResignationApprovalCEO, ResignationApprovalHR,
    getResignCancel, ResignationCancelHR, InsertResignationRequestContractClose,
    getHRPendingList, getContractClosed, getFullSettlementEmp, insertResigSalaryDetails } = require('../ResignationRequest/ResignationRequest.service');
const { validateResignationRequest, validateResignationRequestApprovalHOD, validateResignationRequestApprovalCEO, validateResignationRequestCancel,
    validateResignationRequestApprovalINcharge, validateResignationRequestApprovalHR } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');
const { uploadResignationReqFiles } = require('./ResignationFileUpload');


module.exports = {
    InsertResignationRequest: (req, res) => {
        // console.log(req.file)
        uploadResignationReqFiles(req, res, (err) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
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
}