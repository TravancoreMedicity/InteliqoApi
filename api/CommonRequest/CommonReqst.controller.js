const logger = require('../../logger/logger')
const { create, checkInsertVal, createGenralRq, createOndutyRequest, createEnableMispunchRqst,
    getOneHourReqst, getOndutyRequest, getenableMisspunchRequest, inchargeEnable,
    inchargeOneHour, inchargeOnDuty, hodEnable, hodOnDuty, hodOneHour, ceoEnable,
    ceoonduty, ceoOnehour, hrEnable, hrOnduty, hrOnehour, getGeneralReqstAll,
    addHrComment, checkingAttendanceMarking, HRNopunchMasterIn, HRNopunchMasterOut,
    checkMispunchRequest, checksEnableRq, punchdataEntry, HROnDutyPunchMaster,
    checkAttendanceProcess, generalHRapproval, cancelEnable, enableOnduty, cancelOnehour,
    cancelgeneral, checkPunchMarkingHR, onDutyReport, HrApprovedOneHourData, HrApprovedOnDutyData,
    getEmpwiseOnduty, getEmpwiseOneHour, getSectWiseOneHour, getSectWiseOnDuty, OneHourForApprovalHR,
    OndutyForApprovalHR,
    CheckOndutyExistorNot
} = require('../CommonRequest/CommonReqst.service')
const { InsertLeaveCalc, HRhalfDayPuchMast } = require('../LeaveRequestApproval/LeaveRequestApproval.service')
const { validateOneHourReqst } = require('../../validation/validation_schema');
const { deletePunchMasterSingleRow } = require('../attendance_updation/attendance.service');
const { disableDutyplanData, activeDoffDutyplanData } = require('../OFFRequest/OffRequest.service');

module.exports = {
    create: (req, res) => {
        const body = req.body;
        const body_result = validateOneHourReqst.validate(body);
        body.reason = body_result.value.reason;

        checkInsertVal(body, (err, results) => {
            if (Object.keys(results)?.length === 0) {
                create(body, (err, results) => {

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
                    disableDutyplanData(body, (err, results) => {
                        if (err) {
                            logger.errorLogger(err)
                            return res.status(400).json({
                                susc: 0,
                                message: err
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "One Hour Request Submitted Successfully"
                        });
                    });
                });
            } else {
                return res.status(200).json({
                    success: 2,
                    message: "Based On Policy Only 1 One Hour Request is Allowed"
                })
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
        const { postArray } = body;
        var values = postArray?.map((value) => {
            return [value.em_id, value.em_no, value.dept_id, value.dept_sect_id,
            value.request_date, value.on_duty_date, value.shift_id, value.in_time, value.out_time,
            value.onduty_reason, value.incharge_req_status, value.incharge_approval_status,
            value.incharge_approval_comment, value.incharge_approval_date, value.hod_req_status,
            value.hod_approval_status, value.hod_approval_comment, value.hod_approval_date,
            value.ceo_req_status, value.hr_req_status, value.incharge_empid, value.hod_empid]
        })

        CheckOndutyExistorNot(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
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
                        success: 3,
                        message: "Data Submitted Successfully"
                    });
                });
            } else {
                return res.status(200).json({
                    success: 2,
                    message: "A Request is already Exist In This Date!"
                })
            }
        });
    },
    createEnableMispunchRqst: (req, res) => {
        const body = req.body;
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
                    message: " Request Updated Successfully"
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
                    message: "One Hour Request Updated Successfully"
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
                    message: "On Duty Request Updated Successfully"
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
                    message: "Miss punch Enable Request Updated Successfully"
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
                    message: "On Duty Request updated Successfully"
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
                    message: "One Hour Request Updated Successfully"
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
                    message: "Miss punch Enable Request Updated Successfully"
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
                    message: "On Duty Request Updated Successfully"
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
            activeDoffDutyplanData(body, (err, results) => {
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
                        message: "One Hour Request Updated Successfully"
                    });

                }
            });
        });
    },
    addHrComment: (req, res) => {
        const body = req.body;
        // if (body.checkinflag === 1) {
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
                    return res.status(200).json({
                        success: 1,
                        message: "Lve Master table Updated"
                    });
                })
            }
        });

        // }
        // else if (body.checkoutflag === 1) {

        //     HRNopunchMasterOut(body, (err, results) => {
        //         if (err) {
        //             logger.errorLogger(err)
        //             return res.status(200).json({
        //                 success: 0,
        //                 message: err
        //             });
        //         }
        //         else if (!results) {
        //             return res.status(200).json({
        //                 success: 2,
        //                 message: "Record Not Found"
        //             });
        //         }
        //         else {
        //             addHrComment(body, (err, results) => {
        //                 if (err) {
        //                     logger.errorLogger(err)
        //                     return res.status(200).json({
        //                         success: 0,
        //                         message: err
        //                     });
        //                 }
        //                 else if (!results) {
        //                     return res.status(200).json({
        //                         success: 2,
        //                         message: "Record Not Found"
        //                     });
        //                 }
        //                 return res.status(200).json({
        //                     success: 1,
        //                     message: "Lve Master table Updated"
        //                 });
        //             })
        //         }
        //     });
        // }
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
            else {
                hrOnduty(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 1,
                            message: "Data Updated Successfully"
                        });
                    }
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
    onDutyReport: (req, res) => {
        const body = req.body;
        onDutyReport(body, (err, results) => {
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
                    message: "Request Cancelled successfully",
                    data: results
                });

            }
        });
    },
    HrApprovedOneHourData: (req, res) => {
        HrApprovedOneHourData((err, results) => {
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
    HrApprovedOnDutyData: (req, res) => {
        HrApprovedOnDutyData((err, results) => {
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
    cancelApprovedOneHour: (req, res) => {
        const body = req.body;
        deletePunchMasterSingleRow(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
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
                activeDoffDutyplanData(body, (err, results) => {
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
                            message: "Onehour Request Cancelled Successfully"
                        });

                    }
                });
            });
        });
    },
    cancelApprovedOnDuty: (req, res) => {
        const body = req.body;
        deletePunchMasterSingleRow(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
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
        });
    },
    getEmpwiseOnduty: (req, res) => {
        const body = req.body;
        getEmpwiseOnduty(body, (err, results) => {
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
                    message: "Request Cancelled successfully",
                    data: results
                });

            }
        });
    },
    getEmpwiseOneHour: (req, res) => {
        const body = req.body;
        getEmpwiseOneHour(body, (err, results) => {
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
                    message: "Request Cancelled successfully",
                    data: results
                });

            }
        });
    },
    getSectWiseOneHour: (req, res) => {
        const body = req.body;
        getSectWiseOneHour(body, (err, results) => {
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
                    message: "Request Cancelled successfully",
                    data: results
                });

            }
        });
    },
    getSectWiseOnDuty: (req, res) => {
        const body = req.body;
        getSectWiseOnDuty(body, (err, results) => {
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
                    message: "Request Cancelled successfully",
                    data: results
                });

            }
        });
    },
    OneHourForApprovalHR: (req, res) => {
        OneHourForApprovalHR((err, results) => {
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
    OndutyForApprovalHR: (req, res) => {
        OndutyForApprovalHR((err, results) => {
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
    holidayOnduty: (req, res) => {
        const body = req.body;
        InsertLeaveCalc(body, (err, results) => {
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
    inactiveInchargeOneHour: (req, res) => {
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
            activeDoffDutyplanData(body, (err, results) => {
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
        });
    },
    inactiveHodOneHour: (req, res) => {
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
            activeDoffDutyplanData(body, (err, results) => {
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
        });
    },
}