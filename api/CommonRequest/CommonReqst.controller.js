const logger = require('../../logger/logger')
const { create, checkInsertVal, createGenralRq, createOndutyRequest, createEnableMispunchRqst,
    getOneHourReqst, getOndutyRequest, getenableMisspunchRequest, inchargeEnable,
    inchargeOneHour, inchargeOnDuty, hodEnable, hodOnDuty, hodOneHour, ceoEnable,
    ceoonduty, ceoOnehour, hrEnable, hrOnduty, hrOnehour, getGeneralReqstAll,
    addHrComment, checkingAttendanceMarking, HRNopunchMasterIn, HRNopunchMasterOut,
    checkMispunchRequest, checksEnableRq, punchdataEntry, HROnDutyPunchMaster,
    checkAttendanceProcess, generalHRapproval, cancelEnable, enableOnduty, cancelOnehour,
    cancelgeneral, checkPunchMarkingHR
} = require('../CommonRequest/CommonReqst.service')
const { validateOneHourReqst } = require('../../validation/validation_schema')

module.exports = {
    create: (req, res) => {
        const body = req.body;
        const body_result = validateOneHourReqst.validate(body);
        body.reason = body_result.value.reason;

        let dataSecond = {
            month: body.attendance_marking_month,
            section: body.dept_sect_id
        }

        checkPunchMarkingHR(dataSecond, (err, results) => {

            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (JSON.parse(results).length === 0) {
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
                            return res.status(200).json({
                                success: 1,
                                message: "One Hour Request Submitted Successfully"
                            });
                        });
                    } else {
                        return res.status(200).json({
                            success: 2,
                            message: "Based On Policy Only 1 One Hour Request is Allowed"
                        })
                    }
                })
            }
            else {
                return res.status(200).json({
                    success: 2,
                    message: "Attendance Marking Is Done, Can't Apply One Hour request"
                });
            }
        })


    },
    createGenralRq: (req, res) => {
        const body = req.body;
        createGenralRq(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "General Request Submitted Successfully"
            });
        });
    },
    createOndutyRequest: (req, res) => {
        const body = req.body;
        var values = body.map((value) => {
            return [value.em_id, value.em_no, value.dept_id, value.dept_sect_id,
            value.request_date, value.on_duty_date, value.shift_id, value.in_time, value.out_time,
            value.onduty_reason, value.incharge_req_status, value.incharge_approval_status,
            value.incharge_approval_comment, value.incharge_approval_date, value.hod_req_status,
            value.hod_approval_status, value.hod_approval_comment, value.hod_approval_date,
            value.ceo_req_status, value.hr_req_status]
        })

        createOndutyRequest(values, (err, results) => {
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
    createEnableMispunchRqst: (req, res) => {
        const body = req.body;
        let dataSecond = {
            fromDate: body.miss_punch_day,
            empNo: body.em_no
        }
        checkingAttendanceMarking(dataSecond, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (JSON.parse(results).length === 0) {
                checksEnableRq(body, (err, results) => {
                    const value = JSON.parse(JSON.stringify(results))
                    if (Object.keys(value).length === 0) {
                        createEnableMispunchRqst(body, (err, results) => {

                            if (err) {
                                logger.errorLogger(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            return res.status(200).json({
                                success: 1,
                                message: "Enable Miss Punch Request Submitted Successfully"
                            });
                        });
                    } else {
                        return res.status(200).json({
                            success: 2,
                            message: "Request Already Submitted"
                        })
                    }
                })
            }
            else {
                return res.status(200).json({
                    success: 2,
                    message: "Attendance Marking Is Done, Contact HRD!!"
                });
            }
        })
        // createEnableMispunchRqst(body, (err, results) => {

        //     if (err) {
        //         logger.errorLogger(err)
        //         return res.status(200).json({
        //             success: 0,
        //             message: err
        //         });
        //     }
        //     if (!results) {
        //         return res.status(200).json({
        //             success: 0,
        //             message: "No Results Found"
        //         });
        //     }
        //     return res.status(200).json({
        //         success: 1,
        //         message: "One Hour Request Submitted Successfully"
        //     });
        // });
    },
    getOneHourReqst: (req, res) => {
        getOneHourReqst((err, results) => {
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
    getOndutyRequest: (req, res) => {
        getOndutyRequest((err, results) => {
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
    getenableMisspunchRequest: (req, res) => {
        getenableMisspunchRequest((err, results) => {
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
    getGeneralReqstAll: (req, res) => {
        getGeneralReqstAll((err, results) => {
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
    inchargeEnable: (req, res) => {
        const body = req.body;
        inchargeEnable(body, (err, results) => {
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
                    message: "Miss punch Enable Request Rejected Successfully"
                });

            }
        });
    },
    inchargeOneHour: (req, res) => {
        const body = req.body;
        inchargeOneHour(body, (err, results) => {
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
                    message: "One Hour Request Rejected Successfully"
                });

            }
        });
    },
    inchargeOnDuty: (req, res) => {
        const body = req.body;
        inchargeOnDuty(body, (err, results) => {
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
                    message: "One Hour Request Rejected Successfully"
                });

            }
        });
    },
    hodEnable: (req, res) => {
        const body = req.body;
        hodEnable(body, (err, results) => {
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
                    message: "Miss punch Enable Request Rejected Successfully"
                });

            }
        });
    },
    hodOnDuty: (req, res) => {
        const body = req.body;
        hodOnDuty(body, (err, results) => {
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
                    message: "Miss punch Enable Request Rejected Successfully"
                });

            }
        });
    },
    hodOneHour: (req, res) => {
        const body = req.body;
        hodOneHour(body, (err, results) => {
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
                    message: "Miss punch Enable Request Rejected Successfully"
                });

            }
        });
    },
    ceoEnable: (req, res) => {
        const body = req.body;
        ceoEnable(body, (err, results) => {
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
                    message: "Miss punch Enable Request Rejected Successfully"
                });

            }
        });
    },
    ceoonduty: (req, res) => {
        const body = req.body;
        ceoonduty(body, (err, results) => {
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
                    message: "Miss punch Enable Request Rejected Successfully"
                });

            }
        });
    },
    ceoOnehour: (req, res) => {
        const body = req.body;
        ceoOnehour(body, (err, results) => {
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
                    message: "Miss punch Enable Request Rejected Successfully"
                });

            }
        });
    },
    hrEnable: (req, res) => {
        const body = req.body;
        hrEnable(body, (err, results) => {
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
                    message: "Miss punch Enable Request Rejected Successfully"
                });

            }
        });
    },
    hrOnduty: (req, res) => {
        const body = req.body;
        hrOnduty(body, (err, results) => {
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
                    message: "Miss punch Enable Request Rejected Successfully"
                });

            }
        });
    },
    hrOnehour: (req, res) => {
        const body = req.body;
        hrOnehour(body, (err, results) => {
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
                    message: "Miss punch Enable Request Rejected Successfully"
                });

            }
        });
    },
    addHrComment: (req, res) => {
        const body = req.body;
        addHrComment(body, (err, results) => {
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
    checkMispunchRequest: (req, res) => {
        const body = req.body;
        checkMispunchRequest(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found",
                    data: []
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
    hrEnableComment: (req, res) => {
        const body = req.body;
        hrEnable(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                punchdataEntry(body, (err, results) => {

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 2,
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
                        success: 1,
                        message: "Data Updated Successfully"
                    });

                });

            }
        });
    },
    hrOndutyComment: (req, res) => {
        const body = req.body;
        hrOnduty(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                HROnDutyPunchMaster(body, (err, results) => {

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 2,
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
                        success: 1,
                        message: "Data Updated Successfully"
                    });

                });

            }
        });
    },
    checkAttendanceProcess: (req, res) => {
        const body = req.body;
        checkAttendanceProcess(body, (err, results) => {
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
                    data: results
                });

            }
        });
    },
    generalHRapproval: (req, res) => {
        const body = req.body;
        generalHRapproval(body, (err, results) => {
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
                    message: "HR Approved Successfully"
                });

            }
        });
    },
    cancelEnable: (req, res) => {
        const body = req.body;
        cancelEnable(body, (err, results) => {
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
                    message: "Request Cancelled successfully"
                });

            }
        });
    },
    enableOnduty: (req, res) => {
        const body = req.body;
        enableOnduty(body, (err, results) => {
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
                    message: "Request Cancelled successfully"
                });

            }
        });
    },
    cancelOnehour: (req, res) => {
        const body = req.body;
        cancelOnehour(body, (err, results) => {
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
                    message: "Request Cancelled successfully"
                });

            }
        });
    },
    cancelgeneral: (req, res) => {
        const body = req.body;
        cancelgeneral(body, (err, results) => {
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
                    message: "Request Cancelled successfully"
                });

            }
        });
    },
}