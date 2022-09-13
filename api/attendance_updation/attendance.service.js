const pool = require('../../config/database');
module.exports = {
    //CHECK THE PUNCHMASTER UPDATED OR NOT IF YES
    //GET THE PUNCH MASTER DATA 
    //IF NO
    //CHECK THE SHIFT ADDED OR NOT
    //GET THE PUNCH DATA EMP CODE WISE
    //GET THE PUNCH DATA FROM PUNCH MASTER IF THE DATA EXCIST
    //UPDATED THE PUNCH IN AND PUNCH OUT
    //GET THE UPDATED PUNHC MASTER
    //GET THE EMPLOYEEE DETAILS
    getEmployeeDetl: (data, callBack) => {

        pool.query(
            `CALL GET_EMPDATA(?,?,?)`,
            [
                data.dept,
                data.deptSec,
                data.cmp
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                callBack(null, JSON.stringify(result[0]))
            }
        )
    },
    getEmployeeShiftDetl: (data, empDetl, callBack) => {
        const { start, end } = empDetl;
        pool.query(
            `SELECT 
            punch_slno,duty_day,shift_id,emp_id,punch_master.em_no,punch_in,punch_out,duty_status,lvreq_type,leave_type,
            shift_in,shift_out,hrs_worked,over_time,late_in,early_out,ot_request_flag,ot_request_flag,mis_punch_flag,
            holiday_flag,gross_salary,duty_worked
            FROM punch_master 
            left join hrm_emp_master on hrm_emp_master.em_id=punch_master.emp_id
             WHERE emp_id IN (?) AND  date(duty_day) BETWEEN ? AND ?`,
            [
                data,
                start,
                end
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                callBack(null, JSON.stringify(result))
            }
        )
    },
    getDepartmentShiftMast: (section, callBack) => {
        pool.query(
            `SELECT shft_code FROM hrm_department_shift_master WHERE sect_id = ?`,
            [
                section
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                callBack(null, JSON.stringify(result))
            }
        )
    },
    getShiftDetl: (data, callBack) => {
        pool.query(
            `SELECT shft_slno,
                    shft_chkin_time,shft_chkout_time,
                    shft_cross_day,
                    shft_chkin_start,shft_chkin_end,
                    shft_chkout_start,shft_chkout_end,
                    shft_duty_day,
                    first_half_in,first_half_out,
                    second_half_in,second_half_out
            FROM hrm_shift_mast WHERE shft_slno IN (?)
            AND shft_status = 1`,
            [
                data
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                callBack(null, JSON.stringify(result))
            }
        )
    },
    getpunchdata: (data, callBack) => {
        pool.query(
            `SELECT slno,emp_code,punch_time FROM medi_hrm.punch_data where date (punch_time) between ? and ? and emp_code in (?) and punch_taken =0 ;`,
            [
                data.startDate, data.endDate, data.empiddetl
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                callBack(null, JSON.stringify(result))
            }
        )
    },
    //updating puch in data
    updatePunchInData: (data, callBack) => {
        if (data.length !== 0) {
            pool.query(
                `update punch_master
                            set punch_in=?
                          where punch_slno=?`,
                [
                    data[0].punchtime,
                    data[0].punch_slno
                ],
                (error, result, feild) => {

                    if (error) {

                        callBack(error)
                    }
                    callBack(null, JSON.stringify(result))
                }
            )
        }
    },
    updatePunchOutData: async (data, callBack) => {
        if (data.length !== 0) {
            pool.query(
                `update punch_master
                    set punch_out=?
                   where punch_slno=?`,
                [
                    data[0].punchtime,
                    data[0].punch_slno
                ],
                (error, result, feild) => {

                    if (error) {

                        callBack(error)
                    }
                    callBack(null, JSON.stringify(result))

                }
            )
        }
    },
    getpunchmastdataupload: (data, callBack) => {

        pool.query(
            `SELECT punch_slno, 
            duty_day,
            shift_id,
            hrm_shift_mast.shft_duty_day,shift_duration_in_min,
            emp_id,
            punch_master.em_no,
            punch_in,
            punch_out, 
            shift_in, 
            shift_out,
            ot_request_flag,
            mis_punch_flag, 
            holiday_flag,
            lvreq_type, 
            leave_type, 
            gross_salary,
            sublvreq_type
            FROM medi_hrm.punch_master 
           left join hrm_shift_mast on hrm_shift_mast.shft_slno =punch_master.shift_id
            left join hrm_emp_master on hrm_emp_master.em_id=punch_master.emp_id
            where duty_day between ? and ? and punch_master.em_no in(?);`,
            [
                data.startDate, data.endDate, data.emdno
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                callBack(null, JSON.stringify(result))
            }
        )
    },
    updatePunchDetails: (data) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                val.map((value) => {
                    if (value.slno === 1) {
                        pool.query(
                            `update punch_master set
                            duty_worked=?,
                            hrs_worked=?,
                            over_time=?,
                            late_in=?,
                            early_out=?,
                            duty_status=?,
                            updation_flag=?
                            where punch_slno=?`,
                            [
                                value.duty_worked,
                                value.hours_worked,
                                value.overtime,
                                value.latein,
                                value.earlygo,
                                value.duty_status,
                                1,
                                value.punch_slno,
                            ],
                            (error, results, fields) => {
                                if (error) {
                                    return reject(error)
                                }
                                return resolve(results)
                            }
                        )
                    }
                    else {
                        return resolve(1)
                    }
                })
            })
        })

    },


    updatePunchdata: (data, callBack) => {
        if (data.length !== 0) {
            pool.query(
                `update punch_data
                set punch_taken=?
                where slno=?`,
                [
                    1,
                    data[0].punchdaslno
                ],
                (error, result, feild) => {

                    if (error) {

                        callBack(error)
                    }
                    callBack(null, JSON.stringify(result))
                }
            )
        }
    },
    getattandancecaldata: (data, callBack) => {
        pool.query(
            `SELECT punch_slno, 
            duty_day,shift_in,shift_out, 
             emp_id, shift_id,
             punch_master.em_no, 
             punch_in,
             punch_out,  
             duty_worked, 
             hrs_worked, 
             holiday_flag,
             over_time,
             late_in, 
             early_out, 
             duty_status,
             ot_request_flag, mis_punch_flag,
             ifnull(lvreq_type,0)lvreq_type, leave_type,updation_flag,
             sublvreq_type,
             gross_salary
             FROM medi_hrm.punch_master
             left join hrm_emp_master on hrm_emp_master.em_id=punch_master.emp_id
             where punch_master.em_no IN (?) and duty_day between ? and ?`,
            [data.emdno, data.startDate, data.endDate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },

    latecomingupdate: (data, callBack) => {

        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `  update punch_master set  duty_status=? where punch_slno=?`,
                    [val.duty_status, val.punch_slno
                    ],
                    (error, results, feilds) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })

        })


    },
    GetEmployeeShiftDetails: (data, callBack) => {
        pool.query(
            `select shift_id,shift_in,shift_out,shft_cross_day,punch_in,punch_out from punch_master
            left join hrm_shift_mast on hrm_shift_mast.shft_slno=punch_master.shift_id
            where em_no=? and date(duty_day)=?`,
            [
                data.empno,
                data.dutyday
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                callBack(null, result)
            }
        )
    },
    getPunchDetailsEmp: (data, callBack) => {
        pool.query(
            `select slno,punch_time from punch_data
            where date(punch_time) IN(?) and emp_code=?`,
            [
                data.punch_time,
                data.emp_code
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                callBack(null, result)
            }
        )
    },
    //updating punch in and punch out of a specified employee in specified date
    updatePunchInandPunchOut: (data, callBack) => {
        pool.query(
            `update punch_master
             set punch_in=?,
            punch_out=?
            where duty_day=? and em_no=?`,
            [
                data.punchIn,
                data.punchOut,
                data.dutyday,
                data.empno
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                callBack(null, result)
            }
        )
    },
    //update punch state after employee updating punch
    updatePunchState: (data, callBack) => {
        pool.query(
            `update punch_data
            set punch_taken=0
            where punch_time IN (?) and emp_code=?`,
            [
                data.punch_time,
                data.emp_code,
            ],
            (error, result, feild) => {
                if (error) {
                    callBack(error)
                }
                callBack(null, result)
            }
        )
    },
    getCommonSettings: (callBack) => {
        pool.query(
            `select * from setting_mast`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    //update holiday credit
    updateholidaycredit: (data, callBack) => {
        pool.query(
            `update hrm_leave_holiday
            set hl_lv_credit=1
            where hl_date=?
            and em_no=?`,
            [
                data.duty_day,
                data.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateholidaytaken: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `update hrm_leave_holiday
                    set hl_lv_taken=1
                    where hl_date=?
                    and em_no=?`,
                    [
                        val.duty_day,
                        val.em_no
                    ],
                    (error, results, feilds) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })

        })
    },
}