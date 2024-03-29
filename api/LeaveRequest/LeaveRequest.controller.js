const { createmastleave, createdetlleave, updateserialnum, gethafdayshift, getfirsthalf,
    getsecondhalf, inserthalfdayreque, insertnopunchrequest, insertcompensatyoff,
    getLeaveCancelEmpdetl, getPunchMasterSlno, checkMispunchRequest, updatePunchSlno, getLeaveCount,
    updateCommonLeave, updateCasualLeave, updateCompansatoryOff, updateEarnLeave, updateNationalHoliday, halfDayRequestCheck,
    updateHaldayValueInTable, getHolidayStatus, checkPunchMarkingHR } = require('../LeaveRequest/LeaveRequest.service');
// const { validateleavetype } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');
const { attMarkingExcistFrLveReq } = require('../attendance_marking_save/attendance_marking_save.service');
module.exports = {
    createmastleave: (req, res) => {
        const body = req.body;
        //check for between || selected date have already a request

        let dateCheck = {
            fromDate: `${body.leavefrom_date} 00:00:00`,
            toDate: `${body.leavetodate} 23:59:59`,
            em_no: body.em_no
        }

        let dataSecond = {
            month: body.attendance_marking_month,
            section: body.em_dept_section
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
                getLeaveCount(dateCheck, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    if (results) {

                        let sinbgleLeaveCount = JSON.parse(JSON.stringify(results));
                        let count = sinbgleLeaveCount[0]?.CNT;
                        if (count === 0) {
                            //insert function
                            createmastleave(body, (err, results) => {
                                if (err) {
                                    logger.errorLogger(err)
                                    return res.status(200).json({
                                        success: 0,
                                        message: err
                                    });
                                }

                                return res.status(200).json({
                                    success: 1,
                                    message: "Leave Request Created Successfully"
                                });

                            });

                        } else {
                            // duplicate no insert
                            return res.status(200).json({
                                success: 3,
                                message: "Selected Date, Already Have a Leave Request"
                            });
                        }
                    }
                })
            } else {
                return res.status(200).json({
                    success: 2,
                    message: "Attendance Marking Is Done, Can't Apply Leave Request"
                });
            }

        })

    },
    inserthalfdayreque: (req, res) => {
        const body = req.body;

        let dataSecond = {
            month: body.attendance_marking_month,
            section: body.em_dept_section
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

                //FOR CHECKING ALREADY A HALF LEAVE REQUEST
                halfDayRequestCheck(body, (err, results) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    const rowData = JSON.parse(JSON.stringify(results));
                    if (rowData.length > 0) {
                        return res.status(200).json({
                            success: 2,
                            message: "Selected Date, Already Have a Leave Request"
                        });
                    } else {
                        inserthalfdayreque(body, (err, results) => {
                            if (err) {
                                logger.errorLogger(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }

                            //UPDATE CASUAL LEAVE TABLE FOR HALF DAY 
                            if (results) {

                                updateHaldayValueInTable(body, (err, results) => {

                                    if (err) {
                                        logger.errorLogger(err)
                                        return res.status(200).json({
                                            success: 0,
                                            message: err
                                        });
                                    }

                                    return res.status(200).json({
                                        success: 1,
                                        message: "Half Day Leave Requested Created Successfully"
                                    });

                                })
                            }
                        });
                    }

                })
            } else {
                return res.status(200).json({
                    success: 2,
                    message: "Attendance Marking Is Done, Can,t Apply halfday Request"
                });
            }
        })



    },
    insertcompensatyoff: (req, res) => {
        const body = req.body;
        insertcompensatyoff(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results) {
                //update punch slno in punch master data
                updatePunchSlno(body, (err, results) => {
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
                })
            }


        });
    },
    insertnopunchrequest: (req, res) => {
        const body = req.body;
        const data = { em_id: body.em_id, date: body.nopunchdate }
        //CHECKING FOR ATTENDANCE MARKED

        let dataSecond = {
            month: body.attendance_marking_month,
            section: body.em_dept_section
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

                checkMispunchRequest(data, (err, results) => {
                    if (Object.keys(results)?.length === 0) {
                        getPunchMasterSlno(data, (err, results) => {
                            if (err) {
                                logger.errorLogger(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }

                            if (Object.keys(results)?.length === 0) {
                                return res.status(200).json({
                                    success: 2,
                                    message: "Contact EDP"
                                });
                            }

                            if (results) {
                                const punchSlno = JSON.parse(JSON.stringify(results));
                                const postData = { ...body, punch_slno: punchSlno?.[0]?.punch_slno }
                                insertnopunchrequest(postData, (err, results) => {
                                    if (err) {
                                        logger.errorLogger(err)
                                        return res.status(200).json({
                                            success: 0,
                                            message: err
                                        });
                                    }
                                    return res.status(200).json({
                                        success: 1,
                                        message: "MissPunch Requested Created Successfully"
                                    });

                                });
                            }

                        })
                    } else {
                        return res.status(200).json({
                            success: 2,
                            message: "Based On Policy Only One MissPunchRequest Allowed"
                        });
                    }
                })
            } else {
                return res.status(200).json({
                    success: 2,
                    message: "Attendance Marking Is Done, Can't Apply No punch Request"
                });
            }
        })


    },
    createdetlleave: (req, res) => {
        const body = req.body;
        var a1 = body.map((value, index) => {
            return [
                value.leaveid,
                value.lveDate,
                value.caulmnth,
                value.lveType,
                value.status,
                value.levtypename,
                value.leave,
                value.nof_leave,
                value.singleleave
            ]
        })
        createdetlleave(a1, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else {
                //update all the leave table aginst the employee
                try {
                    //common leave ( ML -> 2 ,LOP -> 5 , ESI -> 6 , SL -> 7 )
                    //CL -> 1 NH -> 3 // FL -> 4 // EL -> 8 //C-OFF -> 11

                    // FIND THE COMMON LEAVES
                    const commnlvArray = body?.filter(val => val.lveType == 5 || val.lveType == 6 || val.lveType == 7 || val.lveType == 2)
                    if (commnlvArray?.length > 0) {
                        const newCommnArray = [
                            { type: 5, em_no: commnlvArray[0].empNo, count: commnlvArray?.filter(e => e.lveType == 5).length },
                            { type: 6, em_no: commnlvArray[0].empNo, count: commnlvArray?.filter(e => e.lveType == 6).length },
                            { type: 7, em_no: commnlvArray[0].empNo, count: commnlvArray?.filter(e => e.lveType == 7).length },
                            { type: 2, em_no: commnlvArray[0].empNo, count: commnlvArray?.filter(e => e.lveType == 2).length }
                        ]
                        updateCommonLeave(newCommnArray, (err) => {
                            return err
                        })
                    }
                    // CASUAL LEAVES
                    const casLvArray = body?.filter(val => val.lveType == 1);
                    if (casLvArray?.length > 0) {
                        updateCasualLeave(casLvArray, (err) => {
                            return err;
                        })
                    }
                    //NATIONAL HOLIDAY  || FESTIVAL LEAVE
                    const nlLvArray = body?.filter(val => val.lveType == 3 || val.lveType == 4);
                    if (nlLvArray?.length > 0) {
                        updateNationalHoliday(nlLvArray, (err) => {
                            return err;
                        })
                    }

                    //EARN LEAVE
                    const elLvArray = body?.filter(val => val.lveType == 8);
                    if (elLvArray?.length > 0) {
                        updateEarnLeave(elLvArray, (err) => {
                            return err;
                        })
                    }
                    //COMPANSATORY OFF
                    const coffLvArray = body?.filter(val => val.lveType == 11);
                    if (coffLvArray?.length > 0) {
                        updateCompansatoryOff(coffLvArray, (err) => {
                            return err;
                        })
                    }

                    //UPDATE SERIAL NUMBER
                    updateserialnum((err, results) => {
                        if (err) {
                            logger.errorLogger(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }

                        return res.status(200).json({
                            success: 1,
                            message: "Leave Request Created Successfully"
                        });

                    });

                } catch (error) {
                    logger.errorLogger(error)
                    return res.status(200).json({
                        success: 0,
                        message: error
                    });
                }

            }
        });
    },
    gethafdayshift: (req, res) => {
        const body = req.body;
        gethafdayshift(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            else if (results?.length === 0) {
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
    getfirsthalf: (req, res) => {
        getfirsthalf((err, results) => {
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
    getsecondhalf: (req, res) => {
        getsecondhalf((err, results) => {
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
    getLeaveCancelEmpdetl: (req, res) => {
        const id = req.params.id;
        getLeaveCancelEmpdetl(id, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results?.length === 0) {
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
    getHolidayStatus: (req, res) => {
        const body = req.body;
        getPunchMasterSlno(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results?.length === 0) {
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
}