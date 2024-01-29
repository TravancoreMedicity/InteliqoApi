const { Console } = require("console");
const { min, addDays, subDays } = require("date-fns");
const logger = require('../../logger/logger')
const { array } = require("joi");
const moment = require("moment");
const { getEmployeeDetl, getEmployeeShiftDetl, getDepartmentShiftMast,
    getShiftDetl, getpunchdata, updatePunchInData, updatePunchOutData,
    getpunchmastdataupload, updatePunchDetails, updatePunchdata,
    getattandancecaldata, latecomingupdate, GetEmployeeShiftDetails,
    getPunchDetailsEmp, updatePunchInandPunchOut, updatePunchState,
    getCommonSettings, updateholidaycredit, updateholidaytaken,
    getPunchDataEmCodeWise, getPunchMasterData, getShiftfromPunchMaster,
    updatePunchMasterData, updatePunchMastDuty, getHolidayDate, getDutyPlan,
    getPunchMastDataCheckWoff, updatePunchMasWoff, checkAttendanceProcess, checkInOutMarked,
    checkAttendanceProcessDept, getEmpList, getEmployeeRights
} = require("../attendance_updation/attendance.service")
//SHIFT DETAILS
//get the shift details 
const shiftMasterDetl = (section, cb) => {
    getDepartmentShiftMast(section, (err, result) => {
        if (err) {
            logger.errorLogger(err)
            cb(err)
        }
        if (result) {
            const data = JSON.parse(result);
            const shift = JSON.parse(data[0].shft_code);
            const shiftId = shift.map(val => val.shiftcode)
            getShiftDetl(shiftId, (err, result) => {
                if (err) {
                    logger.errorLogger(err)
                    cb(err)
                }
                if (result) {
                    const shiftDetl = JSON.parse(result);
                    cb(null, shiftDetl)
                }
            })
        }
    })
}
//&& ot_request_flag === 0 && mis_punch_flag !== 1
//function for getting puch in time
const functionPunch = (punchdata, punchtmast, shiftdata, startDate, endDate,) => {
    const punshift = shiftdata.map((shiftsele) => {
        if ((punchtmast.shift_id === shiftsele.shft_slno) && punchtmast.ot_request_flag === 0 && punchtmast.mis_punch_flag !== 1) {
            const punchdatasearch = {
                slno: 1,
                emno: punchtmast.em_no,
                duty_day: punchtmast.duty_day,
                punchindata: punchtmast.duty_day + ' ' + moment(shiftsele.shft_chkin_start).format('HH:mm:ss'),
                punchinenddata: punchtmast.duty_day + ' ' + moment(shiftsele.shft_chkin_end).format('HH:mm:ss'),
                punchoutdata: punchtmast.duty_day + ' ' + moment(shiftsele.shft_chkout_start).format('HH:mm:ss'),
                punchoutenddata: punchtmast.duty_day + ' ' + moment(shiftsele.shft_chkout_end).format('HH:mm:ss'),
                punch_slno: punchtmast.punch_slno
            }
            return punchdatasearch
        }
        else return { slno: 0 }
    })
    // })
    const punchserachdata = punshift.flat(Infinity)
    //punchin data
    const punch_in_data = punchdata.map((punchmap) => {
        return punchserachdata.map((searchpunch) => {
            if ((punchmap.emp_code == searchpunch.emno) && (searchpunch.punchindata < punchmap.punch_time) && (punchmap.punch_time < searchpunch.punchinenddata)) {
                const d1 = {
                    slno: 1,
                    em_no: punchmap.emp_code,
                    punchtime: punchmap.punch_time,
                    punch_slno: searchpunch.punch_slno,
                    punchdaslno: punchmap.slno
                }
                return d1
            } else {
                return {
                    slno: 0
                }
            }
        })
    })

    //punch in time
    const punchin = punch_in_data.flat(Infinity).filter((val => {
        return (val.slno != 0)
    }))
    return punchin.filter((val) => {
        return val.punchdaslno === Math.min.apply(Math, punchin.map(function (o) {
            return o.punchdaslno;
        }))
    })
}
//&& ot_request_flag === 0 && mis_punch_flag !== 2
//function for getting puch out time
const functionPunchOut = (punchdata, punchtmast, shiftdata, startDate, endDate,) => {
    // const punshift = punchtmast.map((punchshift) => {
    const punshift = shiftdata.map((shiftsele) => {

        if (shiftsele.shft_cross_day === 0) {

            if ((punchtmast.shift_id === shiftsele.shft_slno) && punchtmast.ot_request_flag === 0 && punchtmast.mis_punch_flag !== 2) {
                const punchdatasearch = {
                    slno: 1,
                    emno: punchtmast.em_no,
                    duty_day: punchtmast.duty_day,
                    punchindata: punchtmast.duty_day + ' ' + moment(shiftsele.shft_chkin_start).format('HH:mm:ss'),
                    punchinenddata: punchtmast.duty_day + ' ' + moment(shiftsele.shft_chkin_end).format('HH:mm:ss'),
                    punchoutdata: punchtmast.duty_day + ' ' + moment(shiftsele.shft_chkout_start).format('HH:mm:ss'),
                    punchoutenddata: punchtmast.duty_day + ' ' + moment(shiftsele.shft_chkout_end).format('HH:mm:ss'),
                    punch_slno: punchtmast.punch_slno
                }
                return punchdatasearch
            }
            else return { slno: 0 }
        } else {
            if (punchtmast.shift_id === shiftsele.shft_slno) {

                const punchdatasearch = {
                    slno: 1,
                    emno: punchtmast.em_no,
                    duty_day: punchtmast.duty_day,
                    punchindata: punchtmast.duty_day + ' ' + moment(shiftsele.shft_chkin_start).format('HH:mm:ss'),
                    punchinenddata: punchtmast.duty_day + ' ' + moment(shiftsele.shft_chkin_end).format('HH:mm:ss'),
                    punchoutdata: moment(addDays(new Date(punchtmast.duty_day), 1)).format('YYYY-MM-DD') + ' ' + moment(shiftsele.shft_chkout_start).format('HH:mm:ss'),
                    punchoutenddata: moment(addDays(new Date(punchtmast.duty_day), 1)).format('YYYY-MM-DD') + ' ' + moment(shiftsele.shft_chkout_end).format('HH:mm:ss'),
                    punch_slno: punchtmast.punch_slno
                }

                return punchdatasearch
            }
            else return { slno: 0 }
        }

    })
    // })
    const punchserachdata = punshift.flat(Infinity)
    // punch out data
    const punch_out_data = punchdata.map((punchmap) => {
        return punchserachdata.map((searchpunch) => {
            if ((punchmap.emp_code == searchpunch.emno) && (searchpunch.punchoutdata < punchmap.punch_time) && (punchmap.punch_time < searchpunch.punchoutenddata)) {
                const d1 = {
                    slno: 1,
                    em_no: punchmap.emp_code,
                    punchtime: punchmap.punch_time,
                    punch_slno: searchpunch.punch_slno,
                    punchdaslno: punchmap.slno
                }
                return d1
            } else {
                return {
                    slno: 0
                }
            }
        })
    })

    //punch out time
    const punchout = punch_out_data.flat(Infinity).filter((val => {
        return (val.slno != 0)

    }))

    return punchout.filter((val) => {
        return val.punchdaslno === Math.max.apply(Math, punchout.map(function (o) {
            return o.punchdaslno;
        }))
    })
}
//CHECK IF THE DUTY PLAN UPDATED OR NOT
module.exports = {
    //Get the attendance data from the database
    validateAttendance: (req, res) => {
        const { startDate, endDate, department, departmentSec, cmpCode, emp_code } = req.body;
        const deptDetl = {
            dept: department,
            deptSec: departmentSec,
            cmp: cmpCode,
            start: startDate,
            end: endDate,
            EMP: emp_code
        }
        getEmployeeDetl(deptDetl, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (!results) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 1,
                    message: "No Employee "
                })
            }
            if (results) {
                //Deparment wise Employee details
                const empDetl = JSON.parse(results);
                var empId = []
                if (emp_code === 0) {
                    empId = empDetl.map((val) => val.em_id)
                }
                else {
                    empId.push(emp_code)
                }
                getEmployeeShiftDetl(empId, deptDetl, (err, result) => {
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    if (result) {
                        const data = JSON.parse(result);
                        //Check if, at least one shift is marked as 0 
                        const shiftMark = data.map(val => val.shift_id).find(ele => ele < 1);
                        if (shiftMark === 0) {
                            return res.status(200).json({
                                success: 0,
                                message: "Shift Marking Pending"
                            })
                        } else {
                            const newShiftDetl = data.map((element, index) => {
                                const { punch_slno, duty_day, shift_id, emp_id, em_no, punch_in, punch_out,
                                    shift_in, shift_out, hrs_worked, over_time, late_in, early_out, ot_request_flag,
                                    duty_status, lvreq_type, leave_type, holiday_flag, offday_falg, gross_salary, duty_worked
                                } = element;
                                const shiftin = moment(shift_in).format('HH:mm');
                                const shiftout = moment(shift_out).format('HH:mm');
                                return newElemet = {
                                    punch_slno,
                                    duty_day,
                                    shift_id,
                                    emp_id,
                                    em_no,
                                    punch_in: punch_in !== null ? moment(punch_in).format('HH:mm') : null,
                                    punch_out: punch_out !== null ? moment(punch_out).format('HH:mm') : null,
                                    shift_in: shiftin,
                                    shift_out: shiftout,
                                    hrs_worked,
                                    over_time,
                                    duty_status,
                                    ot_request_flag,
                                    lvreq_type,
                                    leave_type,
                                    late_in,
                                    early_out,
                                    holiday_flag,
                                    offday_falg,
                                    gross_salary,
                                    duty_worked,
                                    name: empDetl.find((val) => val.em_id === element.emp_id).em_name
                                }
                            })
                            return res.status(200).json({
                                success: 1,
                                data: newShiftDetl
                            })
                        }
                    }
                })
            }
        });
    },
    processAttendData: (req, res) => {
        //Destructure Department Details
        const { startDate, endDate, department, departmentSec, cmpCode, emp_code } = req.body;
        const deptDetl = {
            dept: department,
            deptSec: departmentSec,
            cmp: cmpCode,
            start: startDate,
            end: endDate,
        }
        //Get Department Employee Api to Database
        getEmployeeDetl(deptDetl, (err, empDetl_result) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    errBody: err,
                    message: "Error Getting Processing Attendance,Contact EDP"
                })
            }
            if (empDetl_result) {
                //Get the Employee and Department Details and Parse the Data
                const empDetl = JSON.parse(empDetl_result);
                //Employee Id Push To array for Send to database For getting the att-detl
                var empId = []
                if (emp_code === 0) {
                    empId = empDetl.map((val) => val.em_id)
                }
                else {
                    empId.push(emp_code)
                }

                getEmployeeShiftDetl(empId, deptDetl, (err, punchMast_data) => {

                    //Restrict the Frond End for Only data send to this function after complete the 
                    //Shift updation 
                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            errBody: err,
                            message: "Error Getting Attendance Detl"
                        })
                    }
                    if (punchMast_data) {
                        const datachk = JSON.parse(punchMast_data);
                        //Check if, at least one shift is marked as 0 
                        const shiftMark = datachk.map(val => val.shift_id).find(ele => ele < 1);
                        if (shiftMark === 0) {
                            return res.status(200).json({
                                success: 0,
                                message: "Shift Marking Pending"
                            })
                        }
                        //if no shift is marked zero
                        else {
                            const data = JSON.parse(punchMast_data);
                            //getting shift assigned to the selectedcdepartment
                            shiftMasterDetl(departmentSec, (err, deptSec_Shift) => {
                                if (err) {
                                    logger.errorLogger(err)
                                    return res.status(200).json({
                                        success: 0,
                                        errBody: err,
                                        message: "Error Getting Processing Attendance,Contact EDP"
                                    })
                                }
                                if (deptSec_Shift) {
                                    var empiddetl = empDetl.map((val) => {
                                        return (val.em_no)
                                    })
                                    const postdata = {
                                        empiddetl: empiddetl,
                                        startDate: moment(subDays(new Date(startDate), 1)).format('YYYY-MM-DD'),
                                        endDate: moment(addDays(new Date(endDate), 1)).format('YYYY-MM-DD'),
                                    }
                                    //getting punch details from the punch data table
                                    getpunchdata(postdata, (err, punchdata_result) => {

                                        if (err) {
                                            logger.errorLogger(err)
                                            return res.status(200).json({
                                                success: 0,
                                                errBody: err,
                                                message: "Error Getting Processing Attendance,Contact EDP"
                                            })
                                        } if (punchdata_result) {
                                            const punchdata = JSON.parse(punchdata_result);
                                            const mapPromiseFun =
                                                new Promise((resolve, reject) => {
                                                    if (data.length === 0) {
                                                        resolve('outresults')
                                                    }
                                                    else {
                                                        return data.map((value) => {
                                                            const shift = deptSec_Shift.filter(val => val.shft_slno === value.shift_id)
                                                            const punchInData = functionPunch(punchdata, value, shift, startDate, endDate)
                                                            if (punchInData.length !== 0) {
                                                                // update punchin data
                                                                updatePunchInData(punchInData, (err, results) => {
                                                                    if (err) {
                                                                        logger.errorLogger(err)
                                                                        reject('outerr')
                                                                    }
                                                                    if (results) {
                                                                        updatePunchdata(punchInData, (err, result) => {
                                                                            if (err) {
                                                                                logger.errorLogger(err)
                                                                                reject('outerr')
                                                                            }
                                                                            if (result) {

                                                                                resolve('outresults')
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            } else {
                                                                resolve('outresults')
                                                            }
                                                        })

                                                    }
                                                })
                                            const mapPromiseFun2 = new Promise((resolve, reject) => {
                                                if (data.length === 0) {

                                                    resolve('outresults')
                                                } else {

                                                    return data.map((value) => {
                                                        const shift = deptSec_Shift.filter(val => val.shft_slno === value.shift_id)
                                                        //  update punchout data
                                                        const punchOutData = functionPunchOut(punchdata, value, shift, startDate, endDate)
                                                        if (punchOutData.length !== 0) {

                                                            updatePunchOutData(punchOutData, (err, result) => {

                                                                if (err) {
                                                                    logger.errorLogger(err)
                                                                    reject('outerr')
                                                                }
                                                                if (result) {

                                                                    updatePunchdata(punchOutData, (err, result) => {

                                                                        if (err) {
                                                                            logger.errorLogger(err)
                                                                            reject('outerr')
                                                                        }
                                                                        if (result) {

                                                                            resolve('outresults')
                                                                        }

                                                                    })
                                                                }

                                                            })
                                                        } else {

                                                            resolve('outresults')
                                                        }

                                                    })

                                                }

                                            })
                                            Promise.all([mapPromiseFun2, mapPromiseFun]).then((value) => {
                                                return res.status(200).json({
                                                    success: 1,
                                                    message: "success",

                                                })

                                            }).catch((err) => {

                                                return res.status(200).json({
                                                    success: 0,
                                                    errBody: err,
                                                    message: "Error Getting Processing Attendance,Contact EDP"
                                                })

                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    },
    getpunchmastcalcu: (req, res) => {
        const { startDate, endDate, department, departmentSec, cmpCode, emp_code } = req.body;
        const deptDetl = {
            dept: department,
            deptSec: departmentSec,
            cmp: cmpCode,
            start: startDate,
            end: endDate,
        }
        getEmployeeDetl(deptDetl, (err, empDetl_result) => {


            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    errBody: err,
                    message: "Error Getting Processing Attendance,Contact EDP"
                })
            } if (empDetl_result) {
                //Get the Employee and Department Details and Parse the Data
                var emdno
                const empDetl = JSON.parse(empDetl_result);
                // to single employee data
                var newArray = empDetl.filter(function (val) {
                    return val.em_id == emp_code
                });
                if (emp_code === 0) {
                    emdno = empDetl.map((val) => {
                        return val.em_no
                    })
                } else {
                    emdno = newArray.map((val) => {
                        return val.em_no
                    })
                }
                const employedata = {
                    emdno: emdno,
                    startDate: startDate,
                    endDate: endDate
                }


                getpunchmastdataupload(employedata, (err, punchmast) => {
                    const punchmastjson = JSON.parse(punchmast);
                    // console.log(punchmastjson)
                    if (punchmastjson.length === 0) {
                        return res.status(200).json({
                            success: 1,
                            message: 'success'
                        });
                    } else {
                        getCommonSettings((err, gracesettings) => {
                            const punchmastjson = JSON.parse(punchmast);
                            if (gracesettings.length === 0) {
                                return res.status(200).json({
                                    success: 1,
                                    message: 'success'
                                });
                            } else {
                                const dataupload = punchmastjson.map((val) => {
                                    const grace = gracesettings.map((value) => {
                                        // if both the punch are present
                                        if (val.punch_out !== null && val.punch_in !== null) {
                                            // for work hourcalculation  diffrence of punchin and punchout
                                            const hours_worked = parseFloat((moment(val.punch_out).diff(moment(val.punch_in), 'minutes')))
                                            const shift_duration_in_min = parseInt(val.shift_duration_in_min)
                                            // overtime worked hors worked -shift duration
                                            const overtime = (hours_worked - shift_duration_in_min) - value.cmmn_grace_period
                                            // checkin grace period
                                            const shiftgracein = (moment(val.shift_in).add(value.cmmn_late_in, 'minutes').format('HH:mm'))
                                            const shiftgraceout = (moment(val.shift_out).subtract(value.cmmn_early_out, 'minutes').format('HH:mm'))
                                            const shiftgraceinhop = (moment(val.shift_in).add(value.cmmn_late_in_grace, 'minutes').format('HH:mm'))
                                            const shiftgraceouthop = (moment(val.shift_out).subtract(value.cmmn_early_out_grace, 'minutes').format('HH:mm'))
                                            const puncinhr = moment(val.punch_in).format('HH:mm')
                                            const puncouthr = moment(val.punch_out).format('HH:mm')
                                            var latein = 0
                                            var earlygo = 0
                                            //late coming
                                            if (shiftgracein <= puncinhr) {
                                                latein = parseFloat(moment.duration(puncinhr).asMinutes() - parseFloat(moment.duration(shiftgracein).asMinutes()))
                                            }
                                            //Early going
                                            if (shiftgraceout >= puncouthr) {
                                                earlygo = parseFloat(moment.duration(shiftgraceout).asMinutes() - parseFloat(moment.duration(puncouthr).asMinutes()))
                                            }
                                            //calculating duty status
                                            var duty_stat = 0
                                            if (shiftgraceinhop < puncinhr || shiftgraceouthop > puncouthr) {
                                                duty_stat = parseFloat(val.shft_duty_day) / 2
                                            }
                                            else {
                                                duty_stat = parseFloat(val.shft_duty_day)
                                            }
                                            //calculating duty day
                                            var dutyworked = 0;
                                            if (val.holiday_flag === 1 && val.gross_salary < 21000) {
                                                dutyworked = duty_stat + 1
                                            }
                                            else {
                                                dutyworked = duty_stat
                                            }
                                            const datatosave = {
                                                slno: 1,
                                                punch_slno: val.punch_slno,
                                                hours_worked: hours_worked,
                                                shift_duration_in_min: shift_duration_in_min,
                                                overtime: overtime > 0 ? overtime : 0,
                                                shiftgracein: shiftgracein,
                                                shiftgraceout: shiftgraceout,
                                                latein: latein,
                                                earlygo: earlygo,
                                                duty_status: duty_stat,
                                                duty_worked: dutyworked,

                                            }
                                            return datatosave
                                        } else if ((val.punch_out !== null || val.punch_in !== null)) {
                                            if (val.punch_out !== null) {
                                                const shiftgracsingleeout = (moment(val.shift_out).subtract(8, 'minutes').format('HH:mm'))
                                                const shiftgracesingleouthop = (moment(val.shift_out).subtract(15, 'minutes').format('HH:mm'))
                                                const datatosave = {
                                                    slno: 1,
                                                    punch_slno: val.punch_slno,
                                                    hours_worked: 0,
                                                    shift_duration_in_min: 0,
                                                    overtime: 0,
                                                    shiftgracein: 0,
                                                    shiftgraceout: 0,
                                                    latein: 0,
                                                    earlygo: 0,
                                                    duty_status: 0,
                                                    duty_worked: 0,

                                                }
                                                return datatosave
                                            } else if (val.punch_in !== null) {
                                                const datatosave = {
                                                    slno: 1,
                                                    punch_slno: val.punch_slno,
                                                    hours_worked: 0,
                                                    shift_duration_in_min: 0,
                                                    overtime: 0,
                                                    shiftgracein: 0,
                                                    shiftgraceout: 0,
                                                    latein: 0,
                                                    earlygo: 0,
                                                    duty_status: 0,
                                                    duty_worked: 0,

                                                }
                                                return datatosave
                                            }
                                            else {
                                                return { slno: 0 }
                                            }

                                        }
                                        else {

                                            return { slno: 0 }
                                        }
                                    })
                                    return grace
                                })
                                const result = updatePunchDetails(dataupload, res)
                                    .then((r) => {
                                        // console.log(res)
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
                            }
                        })
                    }

                })
            }
        })
    },

    getdataupdatecal: (req, res) => {
        const { startDate, endDate, department, departmentSec, cmpCode, emp_code } = req.body;
        const deptDetl = {
            dept: department,
            deptSec: departmentSec,
            cmp: cmpCode,
            start: startDate,
            end: endDate,
        }
        getEmployeeDetl(deptDetl, (err, empDetl_result) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    errBody: err,
                    message: "Error Getting Processing Attendance,Contact EDP"
                })
            }


            if (empDetl_result) {
                //Get the Employee and Department Details and Parse the Data
                var emdno

                const empDetl = JSON.parse(empDetl_result);
                // to single employee data
                var newArray = empDetl.filter(function (val) {
                    return val.em_id == emp_code
                });
                if (emp_code === 0) {
                    emdno = empDetl.map((val) => {
                        return val.em_no
                    })
                } else {
                    emdno = newArray.map((val) => {
                        return val.em_no
                    })
                }
                const employedata = {
                    emdno: emdno,
                    startDate: startDate,
                    endDate: endDate
                }
                const funcal = new Promise((resolve, reject) => {
                    emdno.map((val) => {
                        const employedata = {
                            emdno: val,
                            startDate: startDate,
                            endDate: endDate
                        }
                        getattandancecaldata(employedata, (err, result) => {
                            const dataforcalc = JSON.parse(JSON.stringify(result))
                            var d1 = 0;

                            const dataupdate = dataforcalc.map((latcalc) => {

                                if (latcalc.late_in > 0 && latcalc.late_in < 15) {
                                    d1 = d1 + 1
                                    if (d1 > 3) {
                                        d1 = 0
                                        return {
                                            date: latcalc.duty_day,
                                            em_no: latcalc.emp_id,
                                            punch_slno: latcalc.punch_slno,
                                            duty_status: latcalc.duty_worked / 2
                                        }

                                    }
                                    else {

                                        return {
                                            date: latcalc.duty_day,
                                            em_no: latcalc.emp_id,
                                            punch_slno: latcalc.punch_slno,
                                            duty_status: latcalc.duty_worked
                                        }
                                    }
                                }
                                else {
                                    return {
                                        date: latcalc.duty_day,
                                        em_no: latcalc.emp_id,
                                        punch_slno: latcalc.punch_slno,
                                        duty_status: latcalc.duty_worked
                                    }
                                }
                            })
                            latecomingupdate(dataupdate, result)

                                .then((r) => {
                                    resolve('outresults')

                                }).catch((e) => {

                                    reject('outerr')
                                })
                        })
                    })
                })
                Promise.all([funcal]).then((value) => {
                    return res.status(200).json({
                        success: 1,
                        message: "success",
                    })
                }).catch((err) => {
                    return res.status(200).json({
                        success: 0,
                        errBody: err,
                        message: "Error Getting Processing Attendance,Contact EDP"
                    })
                })
            }
        })
    },
    //Shift details of the employee of specific day
    GetEmployeeShiftDetails: (req, res) => {
        const body = req.body;
        GetEmployeeShiftDetails(body, (err, results) => {
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
    //punch details of an employee of a specified dates
    getPunchDetailsEmp: (req, res) => {
        const body = req.body;
        getPunchDetailsEmp(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infoLogger("No Records Found")
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
    updatePunchInandPunchOut: (req, res) => {
        const body = req.body;
        updatePunchInandPunchOut(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
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
    updatePunchState: (req, res) => {
        const body = req.body;
        updatePunchState(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
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
    updateholidaycredit: (req, res) => {
        const body = req.body;
        updateholidaycredit(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
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
    updateholidaytaken: (req, res) => {
        const body = req.body;
        const result = updateholidaytaken(body)
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
    getPunchDataEmCodeWise: (req, res) => {
        const body = req.body;
        getPunchDataEmCodeWise(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
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
    getPunchMasterData: (req, res) => {
        const body = req.body;
        getPunchMasterData(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                planData: results
            });

        });
    },
    getShiftfromPunchMaster: (req, res) => {
        const body = req.body;
        getShiftfromPunchMaster(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                shiftData: results
            });

        });
    },
    updatePunchMasterData: async (req, res) => {
        const body = req.body;
        updatePunchMasterData(body).then(results => {
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
    updatePunchMastDuty: async (req, res) => {
        const body = req.body;
        updatePunchMastDuty(body).then(results => {
            return res.status(200).json({
                succes: 1,
                messagee: 'Update Successfully'
            });
        }).catch(err => {
            return res.status(200).json({
                succes: 0,
                messagee: "Error Occured , Please Contact HRD / IT"
            });
        })
    },
    getHolidayDate: (req, res) => {
        const body = req.body;
        getHolidayDate(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                holidaydata: results
            });

        });
    },

    getDutyPlan: (req, res) => {
        const body = req.body;
        getDutyPlan(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    succes: 2,
                    messagee: "Record Not Found"
                });
            }

            return res.status(200).json({
                succes: 1,
                shiftdetail: results
            });

        });
    },

    getPunchMastDataCheckWoff: (req, res) => {
        const body = req.body;
        getPunchMastDataCheckWoff(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 2,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 1,
                punchCheckdata: results
            });

        });
    },

    updatePunchMasWoff: async (req, res) => {
        const body = req.body;
        updatePunchMasWoff(body, (err, results) => {

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
                message: "Department Updated Successfully"
            });

        });
    },

    checkAttendanceProcess: (req, res) => {
        const body = req.body
        checkAttendanceProcess(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
                data: results
            });
        });
    },
    checkInOutMarked: (req, res) => {
        const body = req.body
        checkInOutMarked(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(400).json({
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
                data: results
            });
        });
    },
    checkAttendanceProcessDept: (req, res) => {
        const body = req.body;
        checkAttendanceProcessDept(body, (err, results) => {
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
    getEmpList: (req, res) => {
        const body = req.body;
        getEmpList(body, (err, results) => {
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
    getEmployeeRights: (req, res) => {
        const body = req.body;
        getEmployeeRights(body, (err, results) => {
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
}