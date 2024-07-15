const { createmastleave, createdetlleave, updateserialnum, gethafdayshift, getfirsthalf,
    getsecondhalf, inserthalfdayreque, insertnopunchrequest, insertcompensatyoff,
    getLeaveCancelEmpdetl, getPunchMasterSlno, checkMispunchRequest, updatePunchSlno, getLeaveCount,
    updateCommonLeave, updateCasualLeave, updateCompansatoryOff, updateEarnLeave, updateNationalHoliday, halfDayRequestCheck,
    updateHaldayValueInTable, checkPunchMarkingHR, leaveRequestUniquNumer, saveLeaveRequestMasterTable,
    saveDetailedTableFun, getLeaveExcistOrNot, checkLeaveexist,
    cancelLeaveReqMasterTable
} = require('../LeaveRequest/LeaveRequest.service');
// const { validateleavetype } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');
const { attMarkingExcistFrLveReq } = require('../attendance_marking_save/attendance_marking_save.service');
const pool = require('../../config/database');
const { InsertLeaveCalc } = require('../LeaveRequestApproval/LeaveRequestApproval.service');
const { format } = require('date-fns');
module.exports = {
    createmastleave: (req, res) => {
        const body = req.body;
        //check for between || selected date have already a request

        let dateCheck = {
            fromDate: `${body.leavefrom_date} 00:00:00`,
            toDate: `${body.leavetodate} 23:59:59`,
            em_no: body.em_no
        }
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
    },
    inserthalfdayreque: (req, res) => {
        const body = req.body;

        //FOR CHECKING ALREADY A HALF LEAVE REQUEST

        const updateData = {
            leavedate: format(new Date(body.leavedate), 'yyyy-MM-dd'),
            em_no: body.em_no
        }

        halfDayRequestCheck(updateData, (err, results) => {
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
    modifiedLeaveRequest: async (req, res) => {
        const requestBodyData = req.body;

        //GET THE UNIQUE NUMBER FOR THE LEAVE REQUIEST
        const getUniqueSerilNumber = await leaveRequestUniquNumer();
        const { status, data } = getUniqueSerilNumber;
        if (status === 1) {
            const uniqNo = data;
            const { masterPostData, detlPostSata } = requestBodyData;
            //LEAVE REQUEST MASTER TABLE
            const leaveRequestMasterData = {
                ...masterPostData,
                leaveid: uniqNo
            }
            //LEAVE REQUEST DETAILS TABLE
            const leaveRequestDetlData = detlPostSata?.map((e) => {
                return {
                    ...e,
                    leaveid: uniqNo
                }
            })

            const detlPostData = leaveRequestDetlData?.map((e) => [e.leaveid, e.lveDate, e.leave_processid, e.leave_typeid, e.status, e.leavetype_name, e.leave_name, e.leaveCount, e.singleleave, e.leaveCount])

            // console.log(leaveRequestMasterData);

            let dateCheck = {
                fromDate: format(new Date(leaveRequestMasterData.leavefrom_date), "yyyy-MM-dd"),
                toDate: format(new Date(leaveRequestMasterData.leavetodate), "yyyy-MM-dd"),
                em_no: leaveRequestMasterData.em_no
            }

            const leaveExist = await checkLeaveexist(dateCheck)
            const { status, data: leaveCount } = await leaveExist;
            if (status === 1) {
                let count = leaveCount[0]?.CNT;
                if (count === 0) {
                    //SAVE MASTER TABLE ==> hrm_leave_request
                    const saveResult = await saveLeaveRequestMasterTable(leaveRequestMasterData)
                    const { status, message } = await saveResult;
                    if (status === 1) {
                        //DETAILED TABLE ENTRY  ==> hrm_leave_request_detl
                        const saveDetailedTable = await saveDetailedTableFun(detlPostData)
                        const { status, message } = saveDetailedTable;
                        if (status === 1) {
                            //if ==> success 
                            //COMMON LEAVE TYPE

                            //common leave ( ML -> 2 ,LOP -> 5 , ESI -> 6 , SL -> 7 )
                            //CL -> 1 EL -> 8 //C-OFF -> 11

                            const commonLeave = [6, 5, 2]
                            const nonCommonLeave = [1, 8, 11]
                            //POST DATA FOR COMMON LEAVE NOT INCLUDED THE SICK LEAVE IS SICK LEAVE HAVE HALF DAY 
                            const commonPostData = commonLeave?.map((el) => {
                                return {
                                    typeID: el,
                                    tableSLNO: leaveRequestDetlData?.find(e => e.leave_typeid === el)?.leave_processid ?? 0,
                                    leaveCOUNT: leaveRequestDetlData?.filter(e => e.leave_typeid === el).length,
                                    empNumber: leaveRequestDetlData?.find(e => e.leave_typeid === el)?.empNo ?? 0
                                }
                            })?.filter((e) => e.empNumber !== 0)

                            //POST DATA FOR SICK LEAVES
                            const sickLeavePostData = [7]?.map((el) => {
                                return {
                                    typeID: el,
                                    tableSLNO: leaveRequestDetlData?.find(e => e.leave_typeid === el)?.leave_processid ?? 0,
                                    leaveCOUNT: leaveRequestDetlData?.filter(e => e.leave_typeid === el)?.map(e => e.leaveCount)?.reduce((acc, curr) => acc + curr, 0),
                                    empNumber: leaveRequestDetlData?.find(e => e.leave_typeid === el)?.empNo ?? 0
                                }
                            })?.filter((e) => e.empNumber !== 0)
                            //POST DATA FOR NON COMMON LEAVES
                            const nonCommonPostData = leaveRequestDetlData?.filter((e) => ![6, 5, 2, 7]?.includes(e.leave_typeid))
                                ?.map((e) => {
                                    return {
                                        leaveTypeID: e.leave_typeid,
                                        tableSLNO: e.leave_processid,
                                        leaveCount: e.leaveCount,
                                        empNumber: e.empNo
                                    }
                                })

                            // console.log(sickLeavePostData)
                            // console.log(commonPostData)
                            // console.log(nonCommonPostData)
                            const comnPostData = [...commonPostData, ...sickLeavePostData]

                            //UPDATING COMMON LEAVES
                            const promiseToUpdateCommonLeave = comnPostData?.map((commonLeves) => {
                                return new Promise((resolve, reject) => {
                                    pool.query(
                                        `UPDATE hrm_leave_common 
                                        SET cmn_lv_balance = cmn_lv_balance - ?,
                                            cmn_lv_taken = cmn_lv_taken + ?
                                        WHERE hrm_lv_cmn = ?`,
                                        [
                                            commonLeves.leaveCOUNT,
                                            commonLeves.leaveCOUNT,
                                            commonLeves.tableSLNO
                                        ],
                                        (error, results, feilds) => {
                                            if (error) {
                                                reject({ status: 0 })
                                            } else {
                                                resolve({ status: 1 })
                                            }
                                        }
                                    )
                                })
                            })
                            //NON COMMON LEAVES UPDATION
                            const promiseToUpdateCasualLeave = nonCommonPostData?.map((nonCommonLeave) => {
                                return nonCommonLeave.leaveTypeID === 1 ? //CASUAL LEAVES
                                    new Promise((resolve, reject) => {
                                        pool.query(
                                            `UPDATE hrm_leave_cl SET hl_lv_tkn_status = 1 WHERE hrm_cl_slno = ?`,
                                            [nonCommonLeave.tableSLNO],
                                            (error, results, feilds) => {
                                                if (error) {
                                                    reject({ status: 0 })
                                                } else {
                                                    resolve({ status: 1 })
                                                }
                                            }
                                        )
                                    })
                                    : nonCommonLeave.leaveTypeID === 8 ? //EARN LEAVE
                                        new Promise((resolve, reject) => {
                                            pool.query(
                                                `UPDATE hrm_leave_earnlv SET hl_lv_tkn_status = 1 WHERE hrm_ernlv_slno = ?`,
                                                [nonCommonLeave.tableSLNO],
                                                (error, results, feilds) => {
                                                    if (error) {
                                                        reject({ status: 0 })
                                                    } else {
                                                        resolve({ status: 1 })
                                                    }
                                                }
                                            )
                                        })
                                        : nonCommonLeave.leaveTypeID === 11 ? //COMPANSATORY OFF
                                            new Promise((resolve, reject) => {
                                                pool.query(
                                                    `UPDATE hrm_leave_calculated SET hl_lv_tkn_status = 1 WHERE hrm_calc_holiday = ?`,
                                                    [nonCommonLeave.tableSLNO],
                                                    (error, results, feilds) => {
                                                        if (error) {
                                                            reject({ status: 0 })
                                                        } else {
                                                            resolve({ status: 1 })
                                                        }
                                                    }
                                                )
                                            }) : null
                            })

                            // console.log(promiseToUpdateCommonLeave)
                            // console.log(promiseToUpdateCasualLeave)

                            const LeaveUpdationPromise = [...promiseToUpdateCommonLeave, ...promiseToUpdateCasualLeave]

                            //UPDATION PROMISESS
                            await Promise.allSettled(LeaveUpdationPromise)
                                .then((result) => {
                                    // console.log(result)
                                    const successResult = result?.find((e) => e.status === 'rejected')
                                    if (successResult === undefined) {
                                        return res.status(200).json({
                                            success: 1,
                                            message: "Leave Request Submitted Successfully"
                                        });
                                    } else {
                                        //if successfull return the message
                                        // if no return all updation
                                    }
                                })
                                .catch((error) => {
                                    console.log(error) // if no return all updation
                                })


                        } else {
                            await cancelLeaveReqMasterTable(leaveRequestMasterData) //cancel leave request master table
                            return res.status(200).json({
                                success: 0,
                                message: "Error Saving Leave request"
                            });
                        }
                    } else {
                        return res.status(200).json({
                            success: 0,
                            message: message
                        });
                    }

                } else {
                    return res.status(200).json({
                        success: 0,
                        message: "Selected Date, Already Have a Leave Request"
                    });
                }


            } else {
                return res.status(200).json({
                    success: 0,
                    message: "Error !! - Checking Leave Already Exist"
                });
            }

        } else {
            return res.status(200).json({
                success: 0,
                message: "Error !! - Get UNIQUE IDENTIFIER LEAVE REQUEST"
            });
        }

    },
    getLeaveExcistOrNot: (req, res) => {
        const body = req.body;
        getLeaveExcistOrNot(body, (err, results) => {
            if (err) {
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
    creditCoff: (req, res) => {
        const body = req.body;
        updatePunchSlno(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            insertcompensatyoff(body, (err, results) => {
                if (err) {
                    logger.errorLogger(err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
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
                    return res.status(200).json({
                        success: 1,
                        message: "Insert Successfully!"
                    });
                });

            })
        })
    },
}