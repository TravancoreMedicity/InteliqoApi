const { getleaverequestdep, nopunchreq, halfrequst, getcompenoff,
    getlevereqmast, getlevereqdetl, gethalfdaydetl, getnopunchreq,
    compensatoryoffdata, inchargeapprv, inchargeapprvhalfday, inchargeapprvNopunch, inchargeapprvCoff,
    HodApprvlLeave, HodApprvlHalfday, HodApprvlNopunch, HodApprvlCoff,
    CEOApprvLeave, CEOHalfDay, CEONopunch, CEOCoff,
    HRLeaveApprv, HRhalfDay, HRhalfDayPuchMast, HRNopunch, HRCoff, getlevdetl, updateLeavePunchMast,
    getHalfdaylevdetl, updateHalfdayPunchMast, getNopunchlevdetl,
    updateNoPunchPunchMast, getCofflevdetl, InsertCoffLeaveCalculated, updateNoPunchOUTPunchMast,
    leaveReqCancel, HalfdayCancel, NopunchCancel, CoffCancel, getCeoPending, getHRpending,
    CeoHalfdayPending, HRHalfdayPending, CeoNopunchReq, HrNopunchReq, CeoCoffReq, HrCoffReq,
    CoffCancelUser, NopunchCancelUser, HalfdayCancelUser, leaveReqCancelUser,
    AllList, AllListHOD, AllListCeo, AllListHr,
    updateCasualLeaveDetlTable, updateNationalHolidayDetlTable, updateEarnLeaveDetlTable, updateCoffDetlTable,
    updatePunchMasterEsi, updatePunchMasterlwf, updatePunchMasterLeave, leaveReqRejectHr,
    leaveReqRejectHrDetl, HalfDayReqRejectHr, HalfDayHrRejectCl, HRNopunchMasterIn, HRNopunchMasterOut,
    NoPunchReqRejectHr, CoffReqRejectHr, InsertLeaveCalc, NoPunchReqCancelHr, NoPunchMasterCancel,
    HalfDayReqCancelHr, lveReqCanclHr, HalfDayHrCancelPunchMast,
    CoffReqCancelHr, CoffCancelHR,
    CancelHolidayLeave, CancelCasualyLeave, CancelEarnLeave, CancelCoffLeave, CancelCommonLeave,
    CancelpunchMastEsiLeave,
    CancelpunchMastLwfLeave, CancelpunchMastLeave
} = require('../LeaveRequestApproval/LeaveRequestApproval.service');
const { validationinchageapprv, validateotcancel } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    getleaverequestdep: (req, res) => {
        const body = req.body
        getleaverequestdep(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }


        });
    },
    getcompenoff: (req, res) => {
        const body = req.body
        getcompenoff(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }


        });
    },
    halfrequst: (req, res) => {
        const body = req.body
        halfrequst(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    nopunchreq: (req, res) => {
        const body = req.body

        nopunchreq(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });



    },
    getlevereqmast: (req, res) => {
        const id = req.params.id;
        getlevereqmast(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });



    },
    getlevereqdetl: (req, res) => {
        const id = req.params.id;
        getlevereqdetl(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });



    },
    gethalfdaydetl: (req, res) => {
        const id = req.params.id;
        gethalfdaydetl(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },

    getnopunchreq: (req, res) => {
        const id = req.params.id;
        getnopunchreq(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    compensatoryoffdata: (req, res) => {
        const id = req.params.id;
        compensatoryoffdata(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    inchargeapprv: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        inchargeapprv(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully",
                    data: results
                });
            }
        });
    },
    inchargeapprvhalfday: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        inchargeapprvhalfday(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    inchargeapprvNopunch: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        inchargeapprvNopunch(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    inchargeapprvCoff: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        inchargeapprvCoff(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    HodApprvlLeave: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        HodApprvlLeave(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    HodApprvlHalfday: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        HodApprvlHalfday(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    HodApprvlNopunch: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        HodApprvlNopunch(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    HodApprvlCoff: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        HodApprvlCoff(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    CEOApprvLeave: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        CEOApprvLeave(body, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    CEOHalfDay: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        CEOHalfDay(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    CEONopunch: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        CEONopunch(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    CEOCoff: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        CEOCoff(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    HRLeaveApprv: (req, res) => {
        const body = req.body;
        HRLeaveApprv(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results) {
                return res.status(200).json({
                    success: 1,
                    message: "Lve Master table Updated"
                });
            }

        });
    },
    HRhalfDay: (req, res) => {
        const body = req.body;
        HRhalfDay(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                HRhalfDayPuchMast(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else if (!results) {
                        return res.status(200).json({
                            success: 2,
                            message: "Record Not Found"
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 1,
                            message: "Lve Master table Updated"
                        });


                    }
                });

            }
        });
    },
    HRNopunch: (req, res) => {
        const body = req.body;
        HRNopunch(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {

                if (body.checkinflag === 1) {
                    HRNopunchMasterIn(body, (err, results) => {
                        if (err) {
                            logger.errorLogger(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }
                        else if (!results) {
                            return res.status(200).json({
                                success: 2,
                                message: "Record Not Found"
                            });
                        }
                        else {
                            return res.status(200).json({
                                success: 1,
                                message: "Lve Master table Updated"
                            });
                        }
                    });

                }
                else if (body.checkoutflag === 1) {

                    HRNopunchMasterOut(body, (err, results) => {
                        if (err) {
                            logger.errorLogger(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }
                        else if (!results) {
                            return res.status(200).json({
                                success: 2,
                                message: "Record Not Found"
                            });
                        }
                        else {
                            return res.status(200).json({
                                success: 1,
                                message: "Lve Master table Updated"
                            });
                        }
                    });
                }

            }
        });
    },
    HRCoff: (req, res) => {
        const body = req.body;

        HRCoff(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {

                InsertLeaveCalc(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else if (!results) {
                        return res.status(200).json({
                            success: 2,
                            message: "Record Not Found"
                        });
                    }
                    else {


                        return res.status(200).json({
                            success: 1,
                            message: "Lve Master table Updated"
                        });



                    }
                });




            }
        });
    },
    updateLeavePunchMast: (req, res) => {
        const body = req.body;
        const result = updateLeavePunchMast(body)
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
    updateHalfdayPunchMast: (req, res) => {
        const body = req.body;
        const result = updateHalfdayPunchMast(body)
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
    updateNoPunchPunchMast: (req, res) => {
        const body = req.body;
        const result = updateNoPunchPunchMast(body)
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
    InsertCoffLeaveCalculated: (req, res) => {
        const body = req.body;
        InsertCoffLeaveCalculated(body, (err, results) => {
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
    updateNoPunchOUTPunchMast: (req, res) => {
        const body = req.body;
        const result = updateNoPunchOUTPunchMast(body)
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
    leaveReqCancel: (req, res) => {
        const body = req.body;
        leaveReqCancel(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    HalfdayCancel: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        HalfdayCancel(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    NopunchCancel: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        NopunchCancel(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    CoffCancel: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        CoffCancel(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    getCeoPending: (req, res) => {
        getCeoPending((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getHRpending: (req, res) => {
        getHRpending((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    CeoHalfdayPending: (req, res) => {
        CeoHalfdayPending((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    HRHalfdayPending: (req, res) => {
        HRHalfdayPending((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    CeoNopunchReq: (req, res) => {
        CeoNopunchReq((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    HrNopunchReq: (req, res) => {
        HrNopunchReq((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    CeoCoffReq: (req, res) => {
        CeoCoffReq((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    HrCoffReq: (req, res) => {
        HrCoffReq((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    leaveReqCancelUser: (req, res) => {
        const body = req.body;
        const body_result = validationinchageapprv.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        leaveReqCancelUser(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    HalfdayCancelUser: (req, res) => {
        const body = req.body;
        HalfdayCancelUser(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    NopunchCancelUser: (req, res) => {
        const body = req.body;
        NopunchCancelUser(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    CoffCancelUser: (req, res) => {
        const body = req.body;
        CoffCancelUser(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Data Updated Successfully"
                });
            }
        });
    },
    AllList: (req, res) => {
        const body = req.body
        AllList(body, (err, results) => {
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
    AllListHOD: (req, res) => {
        const body = req.body
        AllListHOD(body, (err, results) => {
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
    AllListCeo: (req, res) => {
        AllListCeo((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    AllListHr: (req, res) => {
        AllListHr((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateCasualLeaveDetlTable: async (req, res) => {
        const body = req.body;

        updateCasualLeaveDetlTable(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    updateNationalHolidayDetlTable: async (req, res) => {
        const body = req.body;
        updateNationalHolidayDetlTable(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    updateEarnLeaveDetlTable: async (req, res) => {
        const body = req.body;
        updateEarnLeaveDetlTable(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    updateCoffDetlTable: async (req, res) => {
        const body = req.body;
        updateCoffDetlTable(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    //UPDATE PUNCH MASTER AFTER
    updatePunchMasterEsi: async (req, res) => {
        const body = req.body;
        updatePunchMasterEsi(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    updatePunchMasterlwf: async (req, res) => {
        const body = req.body;
        updatePunchMasterlwf(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    updatePunchMasterLeave: async (req, res) => {
        const body = req.body;
        updatePunchMasterLeave(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },

    leaveReqRejectHr: (req, res) => {
        const body = req.body;
        leaveReqRejectHr(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                leaveReqRejectHrDetl(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else if (!results) {
                        return res.status(200).json({
                            success: 2,
                            message: "Record Not Found"
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 1,
                            message: "Leave Request Rejected Successfully"
                        });
                    }
                });
            }
        });
    },
    HalfDayReqRejectHr: (req, res) => {
        const body = req.body;
        HalfDayReqRejectHr(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {

                HalfDayHrRejectCl(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else if (!results) {
                        return res.status(200).json({
                            success: 2,
                            message: "Record Not Found"
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 1,
                            message: "Leave Request Rejected Successfully"
                        });
                    }
                });
            }
        });
    },
    NoPunchReqRejectHr: (req, res) => {
        const body = req.body;
        NoPunchReqRejectHr(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Leave Request Rejected Successfully"
                });

            }
        });
    },
    CoffReqRejectHr: (req, res) => {
        const body = req.body;
        CoffReqRejectHr(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Leave Request Rejected Successfully"
                });

            }
        });
    },
    CoffReqCancelHr:
        (req, res) => {
            const body = req.body;
            CoffReqCancelHr(body, (err, results) => {
                if (err) {
                    logger.errorLogger(err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                else if (!results) {
                    return res.status(200).json({
                        success: 2,
                        message: "Record Not Found"
                    });
                }
                else if (body.hrstatus === 1) {
                    CoffCancelHR(body, (err, results) => {
                        if (err) {
                            logger.errorLogger(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }
                        else if (!results) {
                            return res.status(200).json({
                                success: 2,
                                message: "Record Not Found"
                            });
                        }
                        else {
                            return res.status(200).json({
                                success: 1,
                                message: "Leave Request Rejected Successfully"
                            });

                        }
                    });

                }
                else {
                    return res.status(200).json({
                        success: 1,
                        message: "Leave Request Rejected Successfully"
                    });

                }

            });
        },
    NoPunchReqCancelHr: (req, res) => {
        const body = req.body;
        NoPunchReqCancelHr(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else if (body.hrstatus === 1) {
                NoPunchMasterCancel(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else if (!results) {
                        return res.status(200).json({
                            success: 2,
                            message: "Record Not Found"
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 1,
                            message: "Leave Request Rejected Successfully"
                        });

                    }
                });

            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Leave Request Rejected Successfully"
                });

            }

        });
    },
    HalfDayReqCancelHr: (req, res) => {
        const body = req.body;
        HalfDayReqCancelHr(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else if (body.hrstatus === 2) {
                return res.status(200).json({
                    success: 1,
                    message: "Leave Request Rejected Successfully"
                });
            } else {

                HalfDayHrRejectCl(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else if (!results) {
                        return res.status(200).json({
                            success: 2,
                            message: "Record Not Found"
                        });
                    }
                    else {
                        HalfDayHrCancelPunchMast(body, (err, results) => {
                            if (err) {
                                logger.errorLogger(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            else if (!results) {
                                return res.status(200).json({
                                    success: 2,
                                    message: "Record Not Found"
                                });
                            }
                            else {
                                return res.status(200).json({
                                    success: 1,
                                    message: "Leave Request Rejected Successfully"
                                });

                            }
                        });

                    }
                });
            }

        });
    },
    lveReqCanclHr: (req, res) => {
        const body = req.body;
        lveReqCanclHr(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    message: "Leave Request Rejected Successfully"
                });
            }
        });
    },

    CancelHolidayLeave: async (req, res) => {
        const body = req.body;
        CancelHolidayLeave(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    CancelCasualyLeave: async (req, res) => {
        const body = req.body;
        CancelCasualyLeave(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    CancelEarnLeave: async (req, res) => {
        const body = req.body;
        CancelEarnLeave(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    CancelCoffLeave: async (req, res) => {
        const body = req.body;
        CancelCoffLeave(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    CancelpunchMastEsiLeave: async (req, res) => {
        const body = req.body;
        CancelpunchMastEsiLeave(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    CancelpunchMastLwfLeave: async (req, res) => {
        const body = req.body;
        CancelpunchMastLwfLeave(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    CancelpunchMastLeave: async (req, res) => {
        const body = req.body;
        CancelpunchMastLeave(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },

    CancelCommonLeave: async (req, res) => {
        const body = req.body;
        CancelCommonLeave(body).then(results => {
            return res.status(200).json({
                success: 1,
                message: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                success: 0,
                message: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
}