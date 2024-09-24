const { log } = require('winston');
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
                punch_slno,duty_day,shift_id,emp_id,punch_master.em_no,
                punch_in,punch_out,duty_status,lvreq_type,leave_type,
                shift_in,shift_out,hrs_worked,over_time,late_in,
                early_out,ot_request_flag,ot_request_flag,mis_punch_flag,
                holiday_flag,gross_salary,duty_worked,offday_falg
            FROM punch_master 
            LEFT JOIN hrm_emp_master on hrm_emp_master.em_id=punch_master.emp_id
            WHERE emp_id IN (?) AND  date(duty_day) BETWEEN ? AND ? AND hrm_emp_master.em_no NOT IN (1,2) `,
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
            `SELECT slno,emp_code,punch_time FROM punch_data where date (punch_time) between ? and ? and emp_code in (?) and punch_taken =0 ;`,
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
            offday_falg,
            lvreq_type, 
            leave_type, 
            gross_salary,
            sublvreq_type
            FROM punch_master 
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
             offday_falg,
             over_time,
             late_in, 
             early_out, 
             duty_status,
             ot_request_flag, mis_punch_flag,
             ifnull(lvreq_type,0)lvreq_type, leave_type,updation_flag,
             sublvreq_type,
             gross_salary
             FROM punch_master
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
            `select punch_slno,
            duty_day,
            shift_id,
            emp_id,
            em_no,
            punch_in,
            punch_out,
            shift_in,
            shift_out,
            hrs_worked,
            late_in,
            early_out,
            duty_desc,
            duty_status,
            holiday_status,
            leave_status,
            lvereq_desc,
            lve_tble_updation_flag from punch_master
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
                set lve_tble_updation_flag=1,
                punch_in=?,
                    punch_out=?,
                    hrs_worked = ?,
                    late_in=?,
                    early_out =?
            where punch_slno = ?`,
            [
                data.in,
                data.out,
                data.hrsInMinuts,
                data.lateIn,
                data.earlyOut,
                data.slno,
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
                    `update 
                        hrm_leave_holiday
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
    getPunchDataEmCodeWise: (data, callBack) => {
        pool.query(
            `SELECT 
                emp_code,
                punch_time,
                punch_state
            FROM punch_data
            WHERE punch_time 
            BETWEEN ? AND ? AND emp_code = ?`,
            [
                data.preFromDate,
                data.preToDate,
                data.empId.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPunchDataEmCodeWiseDateWise: (data, callBack) => {
        pool.query(
            `SELECT 
                emp_code,
                punch_time,
                punch_state
            FROM punch_data
            WHERE punch_time 
            BETWEEN ? AND ? AND emp_code IN (?)`,
            [
                data.preFromDate,
                data.preToDate,
                data.empList
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPunchMasterData: (data, callBack) => {
        pool.query(
            `SELECT 
                punch_slno,
                duty_day,
                shift_id,
                emp_id,
                em_no,
                punch_in,
                punch_out,
                shift_in,
                shift_out,
                hrs_worked,
                late_in,
                early_out,
                duty_desc,
                duty_status
            FROM punch_master 
            WHERE duty_day 
            BETWEEN ? AND ? 
            AND em_no = ?`,
            [
                data.fromDate,
                data.toDate,
                data.empId.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPunchMastData: (data, callBack) => {
        pool.query(
            `SELECT 
                punch_slno,
                duty_day,
                shift_id,
                emp_id,
                em_no,
                punch_in,
                punch_out,
                shift_in,
                shift_out,
                hrs_worked,
                late_in,
                early_out,
                duty_desc,
                duty_status,
                holiday_status,
                leave_status,
                lvereq_desc,
                lve_tble_updation_flag
            FROM punch_master 
            WHERE duty_day BETWEEN ? AND ? 
            AND em_no IN (?)`,
            [
                data.fromDate_punchMaster,
                data.toDate_punchMaster,
                data.empList
            ],
            (error, results, feilds) => {
                // console.log(results)
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getShiftfromPunchMaster: (data, callBack) => {
        pool.query(
            `SELECT 
                shft_slno,
                shft_desc,
                shft_chkin_time,
                shft_chkout_time,
                shft_cross_day,
                shft_chkin_start,
                shft_chkin_end,
                shft_chkout_start,
                shft_chkout_end,
                shft_duty_day,
                night_off_flag
            FROM hrm_shift_mast 
            WHERE shft_slno in (?)
            AND shft_status = 1`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updatePunchMasterData: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE punch_master
                                SET punch_in = ?,
                                    punch_out = ?,
                                    hrs_worked =?,
                                    late_in = ?,
                                    early_out = ?,
                                    duty_status=?,
                                    duty_desc=?,
                                    holiday_slno=?,
                                    holiday_status=?
                                WHERE punch_slno = ? and lve_tble_updation_flag !=1 `,
                    [
                        data.punch_in,
                        data.punch_out,
                        data.hrs_worked,
                        data.lateIn,
                        data.earlyOut,
                        data.duty_status,
                        data.duty_desc,
                        data.holiday_slno,
                        data.holiday_status,
                        data.punch_slno,

                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )


            })
        })
        )
    },
    updatePunchMaster: (body) => {
        return Promise.allSettled(body?.map(async (e) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE punch_master
                        SET punch_in = ?,
                            punch_out = ?,
                            hrs_worked =?,
                            late_in = ?,
                            early_out = ?,
                            duty_status=?,
                            duty_desc=?,
                            lvereq_desc=?
                        WHERE punch_slno = ?`,
                    [
                        e.punch_in,
                        e.punch_out,
                        e.hrs_worked,
                        e.late_in,
                        e.early_out,
                        e.duty_status,
                        e.duty_desc,
                        e.lvereq_desc,
                        e.punch_slno,
                    ],
                    async (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })).then((updateResult) => {
            const dbUpdateResult = updateResult?.find(e => e.status === 'rejected')
            if (dbUpdateResult === undefined) {
                return 1
            } else {
                // @ts-ignore
                return dbUpdateResult?.reason
            }
        })
    },
    updatePunchMastDuty: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE punch_master
                                SET 
                                punch_in = ?,
                                punch_out = ?,
                                hrs_worked=?,
                                late_in=?,
                                early_out=?,
                                duty_status = ?,
                                duty_desc = ?,
                                holiday_slno=?,
                                holiday_status=?                              
                                WHERE punch_slno = ? and lve_tble_updation_flag!=1`,
                    [
                        data.punch_in,
                        data.punch_out,
                        data.hrs_worked,
                        data.late_in,
                        data.early_out,
                        data.duty_status,
                        data.duty_desc,
                        data.holiday_slno,
                        data.holiday_status,
                        data.punch_slno,
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )


            })
        })
        )
    },
    getHolidayDate: (data, callBack) => {
        pool.query(
            `select 
                hld_slno,hld_desc,hld_date 
            from hrm_yearly_holiday_list
            where month(hld_date)=? and year(hld_date)=?`,
            [
                data.month,
                data.year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getDutyPlan: (data, callBack) => {
        pool.query(
            `SELECT 
            date(duty_day)  as duty_day,
            shift_id,hrm_shift_mast.shft_desc
            FROM hrm_duty_plan 
            left join hrm_shift_mast on hrm_shift_mast.shft_slno=hrm_duty_plan.shift_id
            WHERE 
           date(duty_day)           
            BETWEEN ? AND ?
            AND em_no = ?`,
            [
                data.fromDate,
                data.toDate,
                data.empId.em_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDutyPlanBySection: (data, callBack) => {
        pool.query(
            `SELECT 
                plan_slno,
                em_no,
                date(duty_day)  as duty_day,
                shift_id,
                holiday,
                holiday_name,
                holiday_slno
            FROM hrm_duty_plan  
            WHERE date(duty_day) BETWEEN ? AND ? 
            AND em_no IN (?)`,
            [
                data.fromDate_dutyPlan,
                data.toDate_dutyPlan,
                data.empList
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPunchMastDataCheckWoff: (data, callBack) => {
        pool.query(
            `SELECT 
                punch_slno,
                duty_day,
                shift_id,
                emp_id,
                em_no,
                punch_in,
                punch_out,
                shift_in,
                shift_out,
                hrs_worked,
                late_in,
                early_out,
                duty_desc,
                duty_status
            FROM punch_master 
            WHERE duty_day 
            BETWEEN ? AND ? 
            AND em_no = ?`,
            [
                data.fromDate,
                data.toDate,
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

    updatePunchMasWoff: (data, callBack) => {
        pool.query(
            `UPDATE punch_master
            SET
                duty_status=?,
                duty_desc=?                                  
            WHERE punch_slno = ? and lve_tble_updation_flag !=1 `,
            [
                data.duty_status,
                data.duty_desc,
                data.punch_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    checkAttendanceProcess: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_attendance_marking where attendance_marking_month=?
            and em_no=?;
            `,
            [
                data.attendance_marking_month,
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

    checkInOutMarked: (data, callBack) => {
        pool.query(
            `
            SELECT 
                attendance_update_flag 
            FROM hrm_duty_plan
            WHERE duty_day between ? and ?
            AND em_no=? and attendance_update_flag=0;
            `,
            [
                data.fromDate,
                data.toDate,
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
    checkAttendanceProcessDept: (data, callBack) => {
        pool.query(
            `SELECT * FROM hrm_attendance_marking where attendance_marking_month='2023-10-01'
            and em_id IN (?);
            `,
            [
                data.attendance_marking_month,
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
    getEmpList: (data, callBack) => {
        pool.query(
            `select hrm_emp_master.em_no,
            hrm_emp_master.em_name,
            hrm_emp_master.em_id,
            hrm_emp_master.em_doj,
            hrm_emp_contract_detl.em_cont_start,
            hrm_emp_master.contract_status,
            hrm_emp_master.gross_salary,
            hrm_department.dept_id,
            hrm_dept_section.sect_id,
            em_department,
            em_dept_section,
            dept_name, 
            sect_name,
            desg_name
            FROM hrm_emp_master
            left join hrm_emp_contract_detl on hrm_emp_contract_detl.em_no = hrm_emp_master.em_no and hrm_emp_contract_detl.status = 0
            inner join hrm_department on hrm_emp_master.em_department=hrm_department.dept_id
            inner join hrm_dept_section on hrm_emp_master.em_dept_section=hrm_dept_section.sect_id
            inner join designation on hrm_emp_master.em_designation=designation.desg_slno
            where  hrm_emp_master.em_dept_section=?
                and hrm_emp_master.em_status=1
                and hrm_emp_master.em_no not in (1 ,2) ;`,
            [
                data.em_dept_section
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getEmployeeRights: (data, callBack) => {
        pool.query(
            `  SELECT * FROM module_group_user_rights where emp_slno=?`,
            [
                data.emid
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    sectionwiseEmppunchMast: (data, callBack) => {
        pool.query(
            `select punch_slno, duty_day,shift_id,punch_master.emp_id,punch_master.em_no,
            hrm_emp_master.em_name,punch_in,
            punch_out,shift_in,shift_out,hrs_worked,over_time,late_in,
            early_out,duty_status,holiday_status,leave_status,holiday_slno,
            lvereq_desc,duty_desc,lve_tble_updation_flag
            from  punch_master
            left join hrm_emp_master on hrm_emp_master.em_no=punch_master.em_no
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            where  date(duty_day) between ? and ? and em_dept_section=?
            `,
            [
                data.fromDate,
                data.toDate,
                data.sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    sectionwiseEmpDutyplan: (data, callBack) => {
        pool.query(
            `SELECT plan_slno,emp_id,hrm_emp_master.em_no,hrm_emp_master.em_name,shift_id,duty_day,
            attendance_update_flag,holiday,offday_flag,holiday_name,holiday_slno
            FROM hrm_duty_plan
            left join hrm_emp_master on hrm_emp_master.em_no=hrm_duty_plan.em_no
            left join hrm_dept_section on hrm_dept_section.sect_id=hrm_emp_master.em_dept_section
            where  duty_day between ? and ? and em_dept_section=?
            `,
            [
                data.fromDate,
                data.toDate,
                data.sect_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    // 
    checkAttendanceProcessSectionWise: (data, callBack) => {
        pool.query(
            `SELECT 
                marking_month
            FROM punchmarking_hr
            WHERE marking_month = ? 
            AND deptsec_slno = ?  
            AND last_update_date >= ?`,
            [
                data.markingMonth,
                data.sect_id,
                data.last_Date,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getHolidayListDateWise: (data, callBack) => {
        pool.query(
            `select 
                hld_slno,hld_desc,hld_date 
            from hrm_yearly_holiday_list
            where month(hld_date)=? and year(hld_date)=?`,
            [
                data.month,
                data.year
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updatePunchMarkingHR: (data, callBack) => {
        // console.log(data)
        pool.query(
            `UPDATE punchmarking_hr
                SET status = 1,
                    edit_user = ?,
                    last_update_date = ?
                WHERE marking_month = ? AND deptsec_slno = ?`,
            [
                data.loggedEmp,
                data.toDate_punchMaster,
                data.fromDate,
                data.section
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateDutyPlanTable: (data, callBack) => {
        pool.query(
            `UPDATE hrm_duty_plan
                SET attendance_update_flag = 1
                WHERE plan_slno IN (?)`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateDelStatDutyPlanTable: (data, callBack) => {
        pool.query(
            `UPDATE hrm_duty_plan
                SET attendance_update_flag = 0
                WHERE plan_slno IN (?)`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkPunchMarkingHR: (data, callBack) => {
        pool.query(
            `SELECT 
                    last_update_date
                FROM punchmarking_hr 
                WHERE marking_month = ? AND deptsec_slno = ?`,
            [
                data.month,
                data.section
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updatePunchMasterSingleRow: (data, callBack) => {
        pool.query(
            `UPDATE punch_master
            SET punch_in = ?,
                punch_out = ?,
                hrs_worked =?,
                late_in = ?,
                early_out = ?,
                duty_status=?,
                duty_desc=?,
                lvereq_desc=?,
                lve_tble_updation_flag = 1
            WHERE punch_slno = ? `,
            [
                data.punch_in,
                data.punch_out,
                data.hrs_worked,
                data.late_in,
                data.early_out,
                data.duty_status,
                data.duty_desc,
                data.lvereq_desc,
                data.punch_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updatePunchMasterCalCulcated: (body) => { // updated on 26/06/2024 04:24 PM (Ajith)
        return Promise.allSettled(body?.map(async (e) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE punch_master 
                        SET lvereq_desc = ?
                    WHERE punch_slno = ?`,
                    [
                        e.lvereq_desc,
                        e.punch_slno
                    ],
                    async (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })).then((updateResult) => {
            // console.log(updateResult)
            const dbUpdateResult = updateResult?.find(e => e.status === 'rejected')
            if (dbUpdateResult === undefined) {
                return 1
            } else {
                // @ts-ignore
                return dbUpdateResult?.reason
            }
        })
    }, // updated on 26/06/2024 04:24 PM (Ajith)
    getPunchReportLCCount: (data, callBack) => { //added on 27/06/2024 10:00 PM (Ajith)
        pool.query(
            `SELECT 
                punch_slno,
                duty_day,
                lvereq_desc,
                duty_desc,
                em_no
            FROM PUNCH_MASTER 
            WHERE em_no in (?)
            AND duty_day >= ? and duty_day <= ? 
            AND duty_desc = 'LC'`,
            [
                data.empList,
                data.fromDate,
                data.toDate,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },//added on 27/06/2024 10:00 PM (Ajith)
    updateLCPunchMaster: (data, callBack) => { //added on 27/06/2024 10:00 PM (Ajith)
        pool.query(
            `UPDATE punch_master 
                SET lvereq_desc = 'CHD'
            WHERE punch_slno IN (?)`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },//added on 27/06/2024 10:00 PM (Ajith)
    // punch_slno,
    // duty_day,
    // shift_id,
    // emp_id,
    // em_no,
    // punch_in,
    // punch_out,
    // shift_in,
    // shift_out,
    // hrs_worked,
    // late_in,
    // early_out,
    // duty_desc,
    // duty_status,
    // holiday_status,
    // leave_status,
    // lvereq_desc,
    // lve_tble_updation_flag
    getPData: (data, callBack) => {
        // console.log(data)
        pool.query(
            `SELECT 
                punch_slno,
                duty_day,
                shift_id,
                emp_id,
                em_no,
                punch_in,
                punch_out,
                shift_in,
                shift_out,
                hrs_worked,
                late_in,
                early_out,
                duty_desc,
                duty_status,
                holiday_status,
                leave_status,
                lvereq_desc,
                lve_tble_updation_flag            
            FROM punch_master 
            WHERE duty_day >= ? and duty_day <= ?
            AND em_no IN (?)`,
            [
                data.frDate,
                data.trDate,
                data.empList
            ],
            (error, datas, feilds) => {
                // console.log(datas)
                if (error) {
                    return callBack(error);
                }
                return callBack(null, datas);
            }
        )
    },
    monthlyUpdatePunchMaster: (body) => {
        return Promise.allSettled(body?.map(async (e) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE punch_master
                        SET punch_in = ?,
                            punch_out = ?,
                            hrs_worked =?,
                            late_in = ?,
                            early_out = ?,
                            duty_status=?,
                            duty_desc=?,
                            lvereq_desc=?
                        WHERE punch_slno = ?`,
                    [
                        e.punch_in,
                        e.punch_out,
                        e.hrs_worked,
                        e.late_in,
                        e.early_out,
                        e.duty_status,
                        e.duty_desc,
                        e.lvereq_desc,
                        e.punch_slno,
                    ],
                    async (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })).then((updateResult) => {
            const dbUpdateResult = updateResult?.find(e => e.status === 'rejected')
            if (dbUpdateResult === undefined) {
                return 1
            } else {
                // @ts-ignore
                return dbUpdateResult?.reason
            }
        })
    },
    deletePunchMasterSingleRow: (data, callBack) => {
        pool.query(
            `UPDATE punch_master
            SET punch_in = ?,
                punch_out = ?,
                hrs_worked =?,
                late_in = ?,
                early_out = ?,
                duty_status=?,
                duty_desc=?,
                lvereq_desc=?,
                leave_status=?,
                lve_tble_updation_flag = 0
            WHERE punch_slno = ? `,
            [
                data.punch_in,
                data.punch_out,
                data.hrs_worked,
                data.late_in,
                data.early_out,
                data.duty_status,
                data.duty_desc,
                data.lvereq_desc,
                null,
                data.punch_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateManualRequest: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    ` UPDATE punch_master
                    SET punch_in = ?,
                        punch_out = ?,
                        hrs_worked =0,
                        late_in = 0,
                        early_out = 0,
                        duty_status=1,
                        duty_desc=?,
                        lvereq_desc=?,
                        leave_status=1,
                        lve_tble_updation_flag = 1,
                        manual_request_flag=1
                    WHERE punch_slno = ? `,
                    [val.punch_in, val.punch_out, val.duty_desc, val.lvereq_desc, val.punch_slno],
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
    createManualrequestLog: (data, callBack) => {
        pool.query(
            `INSERT INTO manual_request_log 
                    (
                    em_id,
                    em_no,
                    duty_date,
                    lvereq_desc,
                    duty_desc,
                    create_user,
                    remrk,
                    punch_slno,
                    filename
                    ) 
                VALUES ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getManualRequestAll: (callBack) => {
        pool.query(
            `SELECT 
            manual_slno,
            manual_request_log.em_no,
            manual_request_log.em_id,
            em_name,
            duty_date,
            lvereq_desc,
            duty_desc,
            punch_slno,
            manual_request_date,
            filename
            FROM manual_request_log
            left join hrm_emp_master on hrm_emp_master.em_id=manual_request_log.em_id
            where delete_status=0 order by manual_request_log.manual_request_date DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    InactiveManualrequest: (data, callBack) => {
        pool.query(
            `UPDATE manual_request_log 
            SET delete_status=1,
            delete_comments=?,
            delete_user=?,
            delete_date=? 
            where manual_slno=? `,
            [
                data.delete_comments,
                data.delete_user,
                data.delete_date,
                data.manual_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}