const { validateotrequest, validateotrequestupdate, validateotincharge, validateothod, validateothr,
    validateotceo, validatecoffupdate, validateotcancel } = require('../../validation/validation_schema');
const { checkInsertVal, create, getOtByID, getOtBySlno, update, getIncharge, getinchargeBySlno,
    inchargeApprove, getHod, gethodBySlno, hodApprove, getHr, hrApprove, gethrBySlno, getceo,
    ceoApprove, getceoBySlno, inactiveOTRequest, getcoff, insertcoff, updatecoff, getOTforCalculation,
    insertLeaveCalculated, updatecoffslno, updateOTslno, inchargecancel, updatepunchmaster } = require('../overtimeRequest/otRequest.service')

module.exports = {
    createotRequest: (req, res) => {
        const body = req.body;
        const body_result = validateotrequest.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.ot_date = body_result.value.ot_date;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                create(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        updatepunchmaster(body, (err, results) => {
                            if (err) {
                                logger.errorLogger(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            return res.status(200).json({
                                success: 1,
                                message: "Over Time Requested Successfully"
                            });
                        })
                    }
                });
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Already requested for OT"
                })
            }
        })
    },
    updateotRequest: (req, res) => {
        const body = req.body;
        const body_result = validateotrequestupdate.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        update(body, (err, results) => {
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
                message: "Request Updated Successfully"
            });
        });
    },

    getOtByID: (req, res) => {
        const id = req.params.id;
        getOtByID(id, (err, results) => {
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
                    message: "no Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getOtBySlno: (req, res) => {
        const id = req.params.id;
        getOtBySlno(id, (err, results) => {
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
        });
    },
    //Incharge Approval
    getIncharge: (req, res) => {
        const body = req.body;
        getIncharge(body, (err, results) => {
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
    getinchargeBySlno: (req, res) => {
        const id = req.params.id;
        getinchargeBySlno(id, (err, results) => {
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
        });
    },
    inchargeApprove: (req, res) => {
        const body = req.body;
        const body_result = validateotincharge.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        inchargeApprove(body, (err, results) => {
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
                message: "Incharge approved Successfully"
            });
        });
    },
    //HOD Approval
    getHod: (req, res) => {
        const body = req.body;
        getHod(body, (err, results) => {
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
    gethodBySlno: (req, res) => {
        const id = req.params.id;
        gethodBySlno(id, (err, results) => {
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
        });
    },
    hodApprove: (req, res) => {
        const body = req.body;
        const body_result = validateothod.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        hodApprove(body, (err, results) => {
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
                message: "HOD approved Successfully"
            });
        });
    },
    //HR Approval
    getHr: (req, res) => {
        const body = req.body;
        getHr(body, (err, results) => {
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
    gethrBySlno: (req, res) => {
        const id = req.params.id;
        gethrBySlno(id, (err, results) => {
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
        });
    },
    hrApprove: (req, res) => {
        const body = req.body;
        const body_result = validateothr.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        hrApprove(body, (err, results) => {

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
                message: "HR approved Successfully"
            });

        });
    },
    //CEO Approval
    getceo: (req, res) => {
        getceo((err, results) => {
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
    getceoBySlno: (req, res) => {
        const id = req.params.id;
        getceoBySlno(id, (err, results) => {
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
        });

    },
    ceoApprove: (req, res) => {
        const body = req.body;
        const body_result = validateotceo.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        ceoApprove(body, (err, results) => {
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
                message: "CEO approved Successfully"
            });
        });
    },
    inactiveOTRequest: (req, res) => {
        const id = req.params.id;
        inactiveOTRequest(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Record Deleted Successfully"
            });
        });
    },
    //Get OT for calculation (Approval)
    getOTforCalculation: (req, res) => {
        const body = req.body;
        getOTforCalculation(body, (err, results) => {
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
                    // message: "No OT Added against this employee"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },

    insertLeaveCalculated: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [value.emp_id, value.credited, value.lvetype_slno, value.credited_date,
            value.approver_user, value.ot_slno]
        })
        insertLeaveCalculated(a1, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    messagee: err
                });
            }
            return res.status(200).json({
                success: 1,
                messagee: "Coff Creadited Successfully"
            });
        });
    },
    updateCoffTable: (req, res) => {
        const body = req.body;
        const body_result = validatecoffupdate.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.ot_coff_slno = body_result.value.ot_coff_slno;
        getcoff(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                insertcoff(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "C off inserted Successfully"
                    });
                });
            } else {
                updatecoff(body, (err, results) => {

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
                        message: "Coff Updated Successfully"
                    });
                });
            }
        })
    },
    updatecoffslno: (req, res) => {
        const body = req.body;
        const result = updatecoffslno(body)
            .then((r) => {
                const result1 = updateOTslno(body)
                    .then((r) => {
                        return res.status(200).json({
                            succes: 1,
                            messagee: r
                        });
                    }).catch((e) => {
                        return res.status(200).json({
                            succes: 0,
                            messagee: e.sqlMessage
                        })
                    })
            }).catch((e) => {
                return res.status(200).json({
                    succes: 0,
                    messagee: e.sqlMessage
                })
            })

    },
    inchargecancel: (req, res) => {
        const body = req.body;
        const body_result = validateotcancel.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        inchargecancel(body, (err, results) => {
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
                message: "Over Time Request Cancel Succesfully"
            });
        });
    },
}
